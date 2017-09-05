var mazeSize = 17000;  
var cameraRotationChanged = true;
var angle;
var movX,
	movZ;
var movXRL, 
 	movZRL;
var movementVec 	= new THREE.Vector3(0, 0, 0);
var movementVecRL 	= new THREE.Vector3(0, 0, 0);
var	mouseDown = false
  , mouseDownX;

var   camera
	, cameraBox
	, scene
	, renderer
	, youImage
	, finishImage
	, geometry
	, material
	, mesh
	, endFinishLight
	, keyEvents 
	=  {
	   	'up': false,
	   	'down': false,
	   	'right': false,
	   	'left' : false
	   };

var   PI2 = 2 * Math.PI
	, movementAmount = 35
	, canvasContext
	, scale = 1
	, maze;
    
  
function createOverviewPane()
{
	var canvas = document.querySelector('#canvas2d');
	
	var w = 200, 
		h = 200;
		canvas.width 	= w;
		canvas.height 	= h;
		scale 			= w / mazeSize; 	
		canvasContext 	= canvas.getContext('2d');
		canvasContext.lineJoin	= 'round';
		canvasContext.lineCap	= 'round';
		canvasContext.lineWidth	= 2.0 ;			

}

function createScene()
{

	var sceneTemp = new THREE.Scene();

	keyEvents = 
	{
			'up': false,
			'down': false,
			'right': false,
			'left' : false
	};

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = -mazeSize / 2 + 500;
    camera.position.x = -mazeSize / 2 + 500;
    camera.rotation.y = Math.PI;
    sceneTemp.add(camera);

	var cameraBoxGeo = new THREE.CubeGeometry(10,10,10);
	var cameraBoxMat = new THREE.MeshBasicMaterial({wireframe: true, color: 0x0f0});

	cameraBox = new THREE.Mesh(cameraBoxGeo, cameraBoxMat);

	var startPLight = new THREE.PointLight(0xD2F700, 1, 1000);
	startPLight.position.x = -mazeSize / 2 + 400 ;
	startPLight.position.z = -mazeSize / 2 + 400 ;
	startPLight.position.y = 600;	
	sceneTemp.add(startPLight);	
	endFinishLight = new THREE.PointLight(0xD2F700, 1, 2000);
	endFinishLight.position.x = mazeSize / 2 - 400 ;
	endFinishLight.position.z = mazeSize / 2 - 400 ;
	endFinishLight.position.y = 600;
			
	sceneTemp.add(endFinishLight);
	
    var ceilinggeo = new THREE.CubeGeometry(mazeSize, 1, mazeSize);   
   		
   	var ceilingTexture = THREE.ImageUtils.loadTexture("textureImages/ceiling.jpg");
	ceilingTexture.repeat.set(100, 100);
	ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
	
	
	var ceilingMaterial = new THREE.MeshPhongMaterial({ 
		  map: ceilingTexture
		, color: 0xffffff
		, ambient: 0x777777
		, specular: 0x999999
		, shininess: 15, shading: THREE.SmoothShading 
	});

    var ceilingMesh = new THREE.Mesh(ceilinggeo, ceilingMaterial);
    
    sceneTemp.add(ceilingMesh);

	ceilingMesh.rotation.x += Math.PI;
	
	ceilingMesh.position.y += 1003;

    geometry = new THREE.CubeGeometry(mazeSize, 1, mazeSize); 
   
   	var imgTexture = THREE.ImageUtils.loadTexture("textureImages/floor.jpg");
	imgTexture.repeat.set(100,100);
	imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
	
	material = new THREE.MeshPhongMaterial({
		  map: imgTexture
		, color: 0xffffff
		, ambient: 0x777777
		, specular: 0x999999
		, shininess: 15
		, shading: THREE.SmoothShading 
	});

    mesh = new THREE.Mesh(geometry, material);
    
    sceneTemp.add(mesh);

	camera.position.y += 600;

	var light = new THREE.AmbientLight(0xEFEFEF);
	
	sceneTemp.add(light);

	return sceneTemp;

}
		
function createMaze()
{
	var maze2DSize = mazeSize / 1000;
	
	maze = new Maze(maze2DSize, maze2DSize, 1000);
	
	maze.paint2D(canvasContext, scale);

	maze.paint();
}
	
function initialize() 
{

	createOverviewPane();

    scene = createScene();

	createMaze();

    pause = false;
		        
    renderer = new THREE.WebGLRenderer();
   	        
    renderer.setSize(window.innerWidth, window.innerHeight);
	
    renderer.domElement.className = 'canvas3d';

    document.body.appendChild(renderer.domElement);

}
		
		
			
		
		
function move() 
{     
	var collisions; 
    requestAnimationFrame(move);
    render();

	if(keyEvents.up || keyEvents.down || keyEvents.right || keyEvents.left)
	{

		if(cameraRotationChanged)
		{
		    angle = Math.PI / 2 + camera.rotation.y;
			movX = -movementAmount * Math.cos(angle);
			movZ = movementAmount * Math.sin(angle);
			movXRL = -movementAmount * Math.cos(camera.rotation.y);
			movZRL = movementAmount * Math.sin(camera.rotation.y);
			cameraRotationChanged = false;
		}

		if(keyEvents.up)
		{
			movementVec.x = -movX;
			movementVec.z = -movZ;
		}

		if(keyEvents.down)
		{
			movementVec.x = movX;
			movementVec.z = movZ;
		}


		if(keyEvents.left)
		{
			movementVecRL.x = movXRL;
			movementVecRL.z = movZRL;
		}

		if(keyEvents.right)
		{
			movementVecRL.x = -movXRL;
			movementVecRL.z = -movZRL;
		}
			
		collisions = maze.checkIntersections(movementVec, movementVecRL);			
			
		if(keyEvents.up && !collisions.up) 
		{
			camera.position.x -= movX;
			camera.position.z -= movZ;
		}	
		if(keyEvents.down && !collisions.down) 
		{
			camera.position.x += movX;
			camera.position.z += movZ;
		}	
		if(keyEvents.right && !collisions.right) 
		{
			camera.position.x -= movXRL;
			camera.position.z -= movZRL;
		}	
		if(keyEvents.left && !collisions.left) 
		{
			camera.position.x += movXRL;
			camera.position.z += movZRL;
		}
		maze.paint2D(canvasContext, scale);	
		
	}	


	var endDif = endFinishLight.position.distanceTo(camera.position);
	
	if(endDif < 300)
	{
		pause = true;
		newGame();
	}
	cameraBox.position.x = camera.position.x;
	cameraBox.position.y = camera.position.y;
	cameraBox.position.z = camera.position.z;
	cameraBox.rotation.x = camera.rotation.x;
	cameraBox.rotation.y = camera.rotation.y;
	cameraBox.rotation.z = camera.rotation.z;
}
		
function render() 
{
    renderer.render(scene, camera);
}

function newGame()
{
	cameraRotationChanged = true;
	scene = createScene();
	createMaze();
	pause = false;
}
	    
	    
window.addEventListener('keydown', function(event) 
{
	var key = event.keyCode || event.which;

	switch(key) 
	{
		case 38:
		case 87:
			keyEvents.up = true;
		break;
		
		case 40:
		case 83:
			keyEvents.down = true;
		break;
		
		case 39:
		case 68:
			keyEvents.right = true;
		break;
		
		case 37:
		case 65:
			keyEvents.left = true;
		break;

	}
		   	
}, false);
	    
	    
window.addEventListener('keyup', function(event) 
{
	var key = event.keyCode || event.which;

	switch (key) 
	{
		case 38:
		case 87:
			keyEvents.up = false;
		break;
		
		case 40:
		case 83:
			keyEvents.down = false;
		break;
		
		case 39:
		case 68:
			keyEvents.right = false;
		break;
		
		case 37:
		case 65:
			keyEvents.left = false;
		break;
	}
		
	
}, false);
 

	    
	    
window.addEventListener('mousemove', function(event) 
{
	if(mouseDown)
	{	
	
		var diff 	= event.pageX - mouseDownX;
		var theta 	= (diff * Math.PI * 2) / window.innerWidth;
    	camera.rotation.y -= theta;
		mouseDownX 	= event.pageX;
    	cameraRotationChanged = true;
		maze.paint2D(canvasContext, scale);	
	}
	
}, false);
	    
	    
window.addEventListener('mousedown',function(event)
{
	mouseDownX = event.pageX;
	mouseDown = true;
	
}, false);
	    
window.addEventListener('mouseup', function(event) 
{	    
   	mouseDown = false;
}, false);
	    
	    
window.onload = function()
{

	youImage 		= new Image();
	finishImage 	= new Image();
    youImage.src 	= "textureImages/you.jpg";
    finishImage.src = "textureImages/finish.png";
	initialize();
	move();

};

function Stack()
{
	this.els = [];
}
	
Stack.prototype = {

	push: function(el)
	{
		this.els.push(el);
	},
	
	peek: function()
	{
		if(this.els.length > 0)
		{
			return this.els[this.els.length - 1];
		}
		else
		{
			return null;
		}
	},
	
	pop: function()
	{
		var el 		= this.els[this.els.length - 1];
		this.els 	= this.els.slice(0, this.els.length - 1);
		return el;
	},
	
	size: function()
	{
		return this.els.length;
	}

};
	
function Cell(i, j, size)
{
	this.i 			= i;
	this.j 			= j;
	this.visited 	= false;
	this.size 		= size;
	this.east 		= true;
	this.west 		= true;
	this.north 		= true;
	this.south 		= true;
	this.PI2 		= 2 * Math.PI;
	this.mesh 		= {};
	this.collision 	= {
					'east' : false,
					'west' : false,
					'north': false,
					'south': false
					  };
}
	
	
Cell.prototype = {
	paint: function()
	{
		var   x
			, y;
		if(this.east)
		{
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall( x + this.size, y, x + this.size, y + this.size, 'east');
		}
		if(this.west)
		{
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall(x, y, x, y + this.size, 'west');
		}
		if(this.north){
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall(x, y, x + this.size, y, 'north');
		}
		if(this.south)
		{
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall(x, y + this.size, x + this.size, y + this.size, 'south');
		}		
	},
		
		
	paint2D: function(g, scale)
	{
		var camX = camera.position.x * scale + 100, 
		camY = camera.position.z * scale + 100;

		var angle = -camera.rotation.y - Math.PI / 2
		,  amount = 10;

		g.save();
		g.translate(camX, camY);
		g.rotate(angle - Math.PI / 2);
		g.drawImage(youImage, -youImage.width / 2, -youImage.height / 2);
		g.rotate(-angle + Math.PI / 2);
		g.translate(-camX, -camY);	
		g.restore();


		var x
		  , y;
		if(this.east)
		{
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall2D(g, scale,  x + this.size, y, x + this.size, y + this.size, 'east');
		}
		 if(this.west)
		 {
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall2D(g, scale, x, y, x, y + this.size, 'west');
		}
		if(this.north)
		{
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall2D(g, scale, x, y, x + this.size, y, 'north');
		}
		if(this.south)
		{
			x = this.j * this.size;
			y = this.i * this.size;
			this.drawWall2D(g, scale, x, y + this.size, x + this.size, y + this.size, 'south');
		}

		var   endX = endFinishLight.position.x * scale + 100
			, endY = endFinishLight.position.z * scale + 100;		
			
		g.save();
		g.translate(endX, endY);
		g.drawImage(finishImage, -finishImage.width / 2, -finishImage.height / 2);
		g.translate(-endX, -endY);	
		g.restore();


		
		
	},
		
		
	drawWall: function(x, y, x2, y2, dir)
	{
		var w = this.size;
		
		var angle = Math.atan2(y2 - y, x2 - x);
		
		var imgTexture = THREE.ImageUtils.loadTexture("textureImages/wall.jpg"); 
		imgTexture.repeat.set(12, 12);
		imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
		
		var wallH = 1024;	
		
		var wallGeo = new THREE.CubeGeometry(w, wallH, 32);
		
		var wallMaterial = new THREE.MeshPhongMaterial({ 
			  map: imgTexture
			, color: 0xffffff
			, ambient: 0xF0EFEF
			, specular: 0x999999
			, shininess: 15
			, perPixel: true
			, shading: THREE.SmoothShading 
		});
		
        var wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
		
		wallMesh.rotation.y = -angle;
		wallMesh.position.x = x - Math.abs(w / 2 * Math.sin(angle)) - mazeSize / 2 + w / 2;
		wallMesh.position.z = y - Math.abs(w / 2 * Math.cos(angle)) - mazeSize / 2 + w / 2;
		wallMesh.position.y += wallH / 2;	
		
		this.mesh[dir] = wallMesh;

        scene.add(wallMesh);
	},
		

	getDistance: function(x1, y1, x2, y2, x3, y3)
	{
		var p2p1D = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) ;
		var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / p2p1D;
		var x = x1 + u * (x2 - x1);
		var y = y1 + u * (y2 - y1);
	
		if(u < 0)
		{
			x = x1;
			y = y1;
		}
		else if(u > 1)
		{
			x = x2;
			y = y2;
		}
		
		var distance = Math.sqrt(Math.pow(x3 - x, 2) + Math.pow(y3 - y, 2));
		
		return distance;
	},
		
		
	drawWall2D: function(g, scale, x, y, x2, y2, direction)
	{
		var xp1 = x  * scale
		  , yp1 = y  * scale
		  , xp2 = x2 * scale
		  , yp2 = y2 * scale;

		g.beginPath();
		
		g.moveTo(xp1, yp1);
		g.lineTo(xp2, yp2);

		g.strokeStyle = '#FFFFFF';

			
		g.stroke();
			
		g.closePath();	
	}
		
		
		
	
};

function Maze(w, h, size)
{
	this.sections 	= [];
	this.w 		= w;
	this.h 		= h;
	this.size 	= size;
	this.init();
	this.makeMaze();
}
	
Maze.prototype = 
{
	init: function()
	{
		var i = 0, j = 0;
		for(; i < this.h; i += 1)
		{
			this.sections.push([]);
			for(j = 0; j < this.w; j += 1)
			{
				this.sections[i][j] = new Cell(i, j, this.size);
			}
		}
 
	},
	
	paint: function()
	{
		var i = 0, j = 0;
		for(; i < this.h; i += 1)
		{
			for(j = 0; j < this.w; j += 1)
			{
				this.sections[i][j].paint();
			}
		}
	
	},
	
	
	paint2D: function(g, scale)
	{
		g.clearRect(0, 0, 200, 200);
		
		var i = 0, j = 0;
		for(; i < this.h; i += 1)
		{
			for(j = 0; j < this.w; j += 1)
			{
				this.sections[i][j].paint2D(g, scale);
			}
		}
					
	},
	
	collision: function(box1, box2)
	{
		var cXmax = box1.max.x,  
			cXmin = box1.min.x,
			cYmax = box1.max.y, 
			cYmin = box1.min.y,
			cZmax = box1.max.z,
			cZmin = box1.min.z;

		var wXmax = box2.max.x,  
			wXmin = box2.min.x,
			wYmax = box2.max.y,  
			wYmin = box2.min.y,
			wZmax = box2.max.z,
			wZmin = box2.min.z;
			
		var xB = wXmin < cXmax && wXmax > cXmin,
			yB = wYmin < cYmax && wYmax > cYmin,
			zB = wZmin < cZmax && wZmax > cZmin; 

		return xB && yB && zB;
	},

	
	checkIntersections: function(movementUD, movementRL)
	{
		var angle = camera.rotation.y;
		
		var i = 0, j = 0;
			
		var collision = 
		{
			'right': false,
			'left' : false,
			'up'   : false,
			'down' : false
		};

	
		cameraBox.geometry.computeBoundingBox();
	
		var cbox = cameraBox.geometry.boundingBox;
		cbox.max.addSelf(cameraBox.position);
		cbox.min.addSelf(cameraBox.position);
		cbox.max.addSelf(movementUD);
		cbox.min.addSelf(movementUD);
		cameraBox.geometry.boundingBox = false;
		cameraBox.geometry.computeBoundingBox();

		var cboxRL = cameraBox.geometry.boundingBox;
		cboxRL.max.addSelf(cameraBox.position);
		cboxRL.min.addSelf(cameraBox.position);
		cboxRL.max.addSelf(movementRL);
		cboxRL.min.addSelf(movementRL);	
		
		for(; i < this.h; i += 1)
		{
			for(j = 0; j < this.w; j += 1)
			{
				var walls = this.sections[i][j].mesh;
				for(var dir in  walls)
				{
					if(walls.hasOwnProperty(dir))
					{
						var wall = walls[dir];

						wall.geometry.computeBoundingBox();


						var angle = wall.rotation.y;
					
						var box = wall.geometry.boundingBox;

						if(wall.rotation.y !== 0)
						{
							var temp = box.max.z;
							box.max.z = box.max.x;
							box.max.x = temp;

					   	 	temp = box.min.z;
							box.min.z = box.min.x;
							box.min.x = temp;

						}

						box.max.addSelf(wall.position);
						box.min.addSelf(wall.position);
				
						if(this.collision(cbox, box))
						{
							collision.up = true;
							collision.down = true;
						}

						if(this.collision(cboxRL, box))
						{
							collision.left = true;
							collision.right = true;
						}
					}
				} 
			}
		}
	return collision;
	},
	
	makeMaze: function() 
	{
		var stack = new Stack();
		var total = this.w * this.h;
		var currentI =  ~~(Math.random() * this.h);
		var currentJ =	~~(Math.random() * this.w);
		var visited = 1;	
		var nC = 0;
		while(visited < total)
		{
			nC = this.getUnvisitedNeighborCount(currentI, currentJ);

			if(nC >= 1)
			{
				var neighbors = this.getUnvisitedNeighbors(currentI, currentJ);
				
				var selected = neighbors[~~(Math.random() * neighbors.length)];
				
				this.removeWallBetween(currentI, currentJ, selected);
				
				stack.push(this.sections[currentI][currentJ]);
				
				this.sections[currentI][currentJ].visited = true;
				selected.visited = true;
				
				currentI = selected.i;
				currentJ = selected.j;
				
				visited += 1;
			
			}
			else
			{
				var el = stack.pop();
				currentI = el.i;
				currentJ = el.j;
			}
		
		}
	},
	
	removeWallBetween: function(i, j ,neighbor)
	{
		if(i > 0)
		{
			if(this.sections[i - 1][j] === neighbor)
			{
				this.sections[i][j].north = false;
				neighbor.south = false;
			}
		}
		
		if(i < this.h - 1)
		{
			if(this.sections[i + 1][j]  === neighbor)
			{
				this.sections[i][j].south = false;
				neighbor.north = false;
			}
		}
		
		if(j > 0){
			if(this.sections[i][j - 1] === neighbor)
			{
				this.sections[i][j].west = false;
				neighbor.east = false;
			}
		}
		
		if(j < this.w - 1){
			if(this.sections[i][j + 1] === neighbor){
				this.sections[i][j].east = false;
				neighbor.west = false;
			}
		}
	},
	
	getUnvisitedNeighborCount: function(i, j) 
	{
		var c = 0;
		
		if(i > 0)
		{
			if(!this.sections[i - 1][j].visited)
			{
				c += 1;
			}
		}
		
		if(i < this.h - 1)
		{
			if(!this.sections[i + 1][j].visited)
			{
				c += 1;
			}
		}
		
		if(j > 0)
		{
			if(!this.sections[i][j - 1].visited)
			{
				c += 1;
			}
		}
		
		if(j < this.w - 1){
			if(!this.sections[i][j + 1].visited)
			{
				c += 1;
			}
		}
		
		return c;		
	},
	
	
	getUnvisitedNeighbors: function(i, j) 
	{
		var neighbors = [];
		if(i > 0)
		{
			if(!this.sections[i - 1][j].visited)
			{
				neighbors.push(this.sections[i - 1][j]);
			}
		}
		
		if(i < this.h - 1)
		{
			if(!this.sections[i + 1][j].visited)
			{
				neighbors.push(this.sections[i + 1][j]);
			}
		}
		
		if(j > 0){
			if(!this.sections[i][j - 1].visited)
			{
				neighbors.push(this.sections[i][j - 1]);
			}
		}
		
		if(j < this.w - 1)
		{
			if(!this.sections[i][j + 1].visited){
				neighbors.push(this.sections[i][j + 1]);
			}
		}
		return neighbors;		
	}
	

};
