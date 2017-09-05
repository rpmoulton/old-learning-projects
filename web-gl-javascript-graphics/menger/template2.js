
var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var last_stored_axis = axis;
var theta = [ 0, 0, 0 ];

var thetaLoc;

var flag = true;

var inverse = false;

var default_starting_point = 0.5;

var cBuffer;
var vColor;
var vPosition;

var vertexColors = [
        [ 0.93, 0.8, 0.8, 1.0 ],  
        [ 0.88, 0.0, 0.0, 1.0 ],  
        [ 0.7, 0.0, 1.0, 1.0 ],
        [ 1.0, 1.0, 1.0, 1.0 ],  
        [ 0.0, 0.0, 1.0, 1.0 ],  
        [ 1.0, 0.0, 1.0, 1.0 ]  
    ];

var startingVertexArray = [
        vec4( -default_starting_point, -default_starting_point, -default_starting_point , 1.0),
        vec4( -default_starting_point, -default_starting_point, default_starting_point , 1.0),
        vec4( default_starting_point, -default_starting_point, -default_starting_point , 1.0),
        vec4( default_starting_point, -default_starting_point, default_starting_point , 1.0),
        vec4( -default_starting_point, default_starting_point, -default_starting_point , 1.0), 
        vec4( -default_starting_point, default_starting_point, default_starting_point , 1.0), 
        vec4( default_starting_point, default_starting_point, -default_starting_point , 1.0), 
        vec4( default_starting_point, default_starting_point, default_starting_point , 1.0) 
    ];

var totalSteps = 1;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    buildCube(startingVertexArray, totalSteps);
    

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.93, 0.93, 0.93, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);


    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    

    document.getElementById("ButtonT").onclick = function(){flag = !flag;};
    

    render();
}

function quad(a, b, c, d, vertex_array, surface_number) 
{
    if(vertex_array.length != 8)
        alert("Something not being passed right!");

    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertex_array[indices[i]] );
        colors.push(vertexColors[surface_number]);   
    }
}

function colorCube(colorVerticies)
{
    var surface_number = 0;
    quad( 5, 1, 3, 7, colorVerticies, surface_number); // black
    surface_number++;
    quad( 7, 3, 2, 6, colorVerticies, surface_number); // red
    surface_number++;
    quad( 3, 1, 0, 2, colorVerticies, surface_number); // yellow
    surface_number++;
    quad( 6, 4, 5, 7, colorVerticies, surface_number); // green
    surface_number++;
    quad( 0, 4, 6, 2, colorVerticies, surface_number); // blue
    surface_number++;
    quad( 4, 0, 1, 5, colorVerticies, surface_number); // magenta
}



function buildCube(verticesArray, steps) {
    
    var add_more_steps = steps;
    
    
    if (steps == 0)
        colorCube(verticesArray);
    

    else {
        steps--;
        
       
        var array_0 = verticesArray[0];
        var array_1 = verticesArray[1];
        var array_2 = verticesArray[2];
        var array_4 = verticesArray[4];
        
          
        var x = array_0[0];
        var y = array_0[1];
        var z = array_0[2];
        
       
        var distance_x = (Math.sqrt( Math.pow((array_0[0] - array_2[0]), 2) 
                + Math.pow((array_0[1] - array_2[1]), 2) 
                + Math.pow((array_0[2] - array_2[2]), 2) 
            ))/3;
        
        var distance_y = (Math.sqrt( Math.pow((array_0[0] - array_4[0]), 2) 
                + Math.pow((array_0[1] - array_4[1]), 2) 
                + Math.pow((array_0[2] - array_4[2]), 2) 
            ))/3;
        
        var distance_z = (Math.sqrt( Math.pow((array_0[0] - array_1[0]), 2) 
                + Math.pow((array_0[1] - array_1[1]), 2) 
                + Math.pow((array_0[2] - array_1[2]), 2) 
            ))/3;
        
        var ac = distance_x;
        var ae = distance_y;
        var ab = distance_z;
        
     
        
        // ========================================================
        // square 1/3 
        // bottom 
        if ( inverse == false ) {
            var arrayOfVertices_1 = [
                vec4( x, y, z, 1.0), // origin
                vec4((ac + x), y, z, 1.0), // towards x
                vec4(x       , y, (ab + z), 1.0), // towards z
                vec4((ac + x), y, (ab + z), 1.0),
                // top
                vec4(    x   ,( ae + y ),z, 1.0), // towards y
                vec4((ac + x),( ae + y ),z, 1.0),
                vec4(    x   ,( ae + y ),(ab + z), 1.0),
                vec4((ac + x),( ae + y ),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_1, steps);

            // square 2/3 
            // bottom
            //failing!!! 
            var arrayOfVertices_2 = [
                vec4((ac + x)    ,     y , z , 1.0),
                vec4((2 * ac + x),     y , z , 1.0),
                vec4((ac + x)    ,     y , (ab + z), 1.0),
                vec4((2 * ac + x),     y , (ab + z), 1.0),
                // top
                vec4((ac + x)    ,     (ae + y) , z , 1.0),
                vec4((2 * ac + x),     (ae + y) , z , 1.0),
                vec4((ac + x)    ,     (ae + y) , (ab + z), 1.0),
                vec4((2 * ac + x),     (ae + y) , (ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);

            // square 3/3 
            // bottom 
            var arrayOfVertices_3 = [
                vec4((2 * ac + x),y,z, 1.0),
                vec4((3 * ac + x),y,z, 1.0),
                vec4((2 * ac + x),y,(ab + z), 1.0),
                vec4((3 * ac + x),y,(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(ae + y),z, 1.0),
                vec4((3 * ac + x),(ae + y),z, 1.0),
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);
        }

        

        
     
        // square 1/3 (middle row)
        // bottom 
        // render if inverse 
        if( inverse == false ) {
           var arrayOfVertices = [     
                vec4(x,(ae + y),z, 1.0),
                vec4((ac + x),(ae + y),z, 1.0),
                vec4(x,(ae + y),(ab + z), 1.0),
                vec4((ac + x),(ae + y),(ab + z), 1.0),
                // top
                vec4(x,(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4(x,(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }

       if( inverse == true && add_more_steps > 1 ) {
           var arrayOfVertices = [     
                vec4(x,(ae + y),z, 1.0),
                vec4((ac + x),(ae + y),z, 1.0),
                vec4(x,(ae + y),(ab + z), 1.0),
                vec4((ac + x),(ae + y),(ab + z), 1.0),
                // top
                vec4(x,(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4(x,(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }

        // square 2/3 vec4(middle row)
        // bottom 
        // render if inverse 
        if( inverse == true ) {
            var arrayOfVertices = [
                vec4((ac + x),(ae + y),z, 1.0),
                vec4((2 * ac + x),(ae + y),z, 1.0),
                vec4((ac + x),(ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                // top
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0)
            ];
            colorCube(arrayOfVertices);
            buildCube(arrayOfVertices, steps);
            
        }
        // square 3/3 (middle row)
        // bottom 
        // render if inverse 

        if( inverse == false ) {
            var arrayOfVertices = [     
                vec4((2 * ac + x),(ae + y),z, 1.0),
                vec4((3 * ac + x),(ae + y),z, 1.0),
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((3 * ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices = [     
                vec4((2 * ac + x),(ae + y),z, 1.0),
                vec4((3 * ac + x),(ae + y),z, 1.0),
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((3 * ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        // ========================================================
        // ========================================================
        // square 1/3 (top row)
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices_1 = [     
                vec4(x,(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4(x,(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                // top
                vec4(x,(3 * ae + y),z, 1.0),
                vec4((ac + x),(3 * ae + y),z, 1.0),
                vec4(x,(3 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_1, steps);
            // square 2/3 (top row)
            // bottom
            var arrayOfVertices_2 = [ 
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                // top
                vec4((ac + x),(3 * ae + y),z, 1.0),
                vec4((2 * ac + x),(3 * ae + y),z, 1.0),
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);

            // square 3/3 (top row)
            // bottom 
            var arrayOfVertices_3 = [ 
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((3 * ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(3 * ae + y),z, 1.0),
                vec4((3 * ac + x),(3 * ae + y),z, 1.0),
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);

        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices_1 = [     
                vec4(x,(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4(x,(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                // top
                vec4(x,(3 * ae + y),z, 1.0),
                vec4((ac + x),(3 * ae + y),z, 1.0),
                vec4(x,(3 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_1, steps);
            // square 2/3 (top row)
            // bottom
            var arrayOfVertices_2 = [ 
                vec4((ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                // top
                vec4((ac + x),(3 * ae + y),z, 1.0),
                vec4((2 * ac + x),(3 * ae + y),z, 1.0),
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);

            // square 3/3 (top row)
            // bottom 
            var arrayOfVertices_3 = [ 
                vec4((2 * ac + x),(2 * ae + y),z, 1.0),
                vec4((3 * ac + x),(2 * ae + y),z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(3 * ae + y),z, 1.0),
                vec4((3 * ac + x),(3 * ae + y),z, 1.0),
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);

        }
//         ========================================================

    
        // ===================middle=====================
        // square 1/3 
        // bottom 
        if( inverse == false ) {
           var arrayOfVertices = [     
                vec4(    x   ,         y    , ( ab + z), 1.0),
                vec4((ac + x),         y    , ( ab + z), 1.0),
                vec4(    x   ,         y    , ( 2 * ab + z), 1.0),
                vec4((ac + x),         y    , ( 2 * ab + z), 1.0),
                // top
                vec4(    x   , ( ae + y )   , (ab + z), 1.0),
                vec4((ac + x), ( ae + y )   , (ab + z), 1.0),
                vec4(    x   , ( ae + y )   , (2 * ab + z), 1.0),
                vec4((ac + x), ( ae + y )   , (2 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }

        if( inverse == true && add_more_steps > 1 ) {
           var arrayOfVertices = [     
                vec4(    x   ,         y    , ( ab + z), 1.0),
                vec4((ac + x),         y    , ( ab + z), 1.0),
                vec4(    x   ,         y    , ( 2 * ab + z), 1.0),
                vec4((ac + x),         y    , ( 2 * ab + z), 1.0),
                // top
                vec4(    x   , ( ae + y )   , (ab + z), 1.0),
                vec4((ac + x), ( ae + y )   , (ab + z), 1.0),
                vec4(    x   , ( ae + y )   , (2 * ab + z), 1.0),
                vec4((ac + x), ( ae + y )   , (2 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }

        // square 2/3 
        // bottom 
        // checked
        if( inverse == true ) {
            var arrayOfVertices = [
                vec4((ac + x),   y, (ab + z),     1.0),
                vec4((2* ac + x), y, (ab + z),     1.0),
                vec4((ac + x),   y, (2 * ab + z), 1.0),
                vec4((2* ac + x), y, (2 * ab + z), 1.0),
                // top
                vec4((ac + x),     (ae + y), (ab + z),     1.0),
                vec4((2 * ac + x), (ae + y), (ab + z),     1.0),
                vec4((ac + x),     (ae + y), (2 * ab + z), 1.0),
                vec4((2 * ac + x), (ae + y), (2 * ab + z), 1.0)
            ];
            colorCube(arrayOfVertices);
            buildCube(arrayOfVertices, steps);
        }

        // square 3/3 
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices = [  
                vec4((2 * ac + x),y,(ab + z), 1.0),    // 
                vec4((3 * ac + x),y,(ab + z), 1.0),    // 
                vec4((2 * ac + x),y,(2 * ab + z), 1.0),    // 
                vec4((3 * ac + x),y,(2 * ab + z), 1.0),    // 
                // top
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices = [  
                vec4((2 * ac + x),y,(ab + z), 1.0),    // 
                vec4((3 * ac + x),y,(ab + z), 1.0),    // 
                vec4((2 * ac + x),y,(2 * ab + z), 1.0),    // 
                vec4((3 * ac + x),y,(2 * ab + z), 1.0),    // 
                // top
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        // ========================================================
        // ========================================================

        // square 1/3 (middle row)
        // bottom 
        if( inverse == true ) {
            // checked
            var arrayOfVertices_1 = [
                vec4(x,(ae + y),(ab + z), 1.0),
                vec4((ac + x),(ae + y),(ab + z), 1.0),
                vec4(x,(ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0),
                // top
                vec4(x,(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0)
            ];
            colorCube(arrayOfVertices_1);
            buildCube(arrayOfVertices_1, steps);
//             square 2/3 (middle row)
//             bottom 
//             checked
            var arrayOfVertices_2 = [
                vec4((ac + x),(ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                // top
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0)
            ];
            colorCube(arrayOfVertices_2);
            buildCube(arrayOfVertices_2, steps);

            // square 3/3 (middle row)
            // bottom
            // checked
            var arrayOfVertices_3 = [
                vec4((2 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0)
            ];
            colorCube(arrayOfVertices_3);
            buildCube(arrayOfVertices_3, steps);
        }
     
        // square 1/3 (top row)
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices = [     
                vec4(x,(2 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0),
                // top
                vec4(x,(3 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4(x,(3 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);

        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices = [     
                vec4(x,(2 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0),
                // top
                vec4(x,(3 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0),    // z, 1.0),
                vec4(x,(3 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(2 * ab + z), 1.0),    // (ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);

        }
        // square 2/3 (top row)
        // bottom 
        if( inverse == true ) {
            // here's the problem
            var arrayOfVertices = [    
                vec4((ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                // top
                vec4((ac + x),(3 * ae + y),(ab + z), 1.0),
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(3 * ae + y),(2 * ab + z), 1.0)
            ];
            colorCube(arrayOfVertices);
            buildCube(arrayOfVertices, steps);
        }

        // square 3/3 (top row)
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices = [     
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((3 * ac + x),(3 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((2 * ac + x),(3 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices = [     
                vec4((2 * ac + x),(2 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((3 * ac + x),(2 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0),
                // top
                vec4((2 * ac + x),(3 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((3 * ac + x),(3 * ae + y),(ab + z), 1.0), //z, 1.0),
                vec4((2 * ac + x),(3 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(2 * ab + z), 1.0), //(ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        // ========================================================



        // ==================front==================    
        // square 1/3 
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices_1 = [     
                vec4(x,y,(2 * ab + z), 1.0), // 0
                vec4((ac + x),y,(2 * ab + z), 1.0), // 1
                vec4(x,y,(3 * ab + z), 1.0), // 2
                vec4((ac + x),y,(3 * ab + z), 1.0), // 3
                // top
                vec4(x,( ae + y ),(2 * ab + z), 1.0), // 4
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0), // 5
                vec4(x,(ae + y),(3 * ab + z), 1.0), // 6
                vec4((ac + x),( ae + y ),(3 * ab + z), 1.0) // 7
            ];
            buildCube(arrayOfVertices_1, steps);

                // square 2/3 
                // bottom
            var arrayOfVertices_2 = [
                vec4((ac + x),y,(2 * ab + z), 1.0),
                vec4((2 * ac + x),y,(2 * ab + z), 1.0),
                vec4((ac + x),y,(3 * ab + z), 1.0),
                vec4((2 * ac + x),y,(3 * ab + z), 1.0),
                // top
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(3 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);
            var arrayOfVertices_3 = [
                // square 3/3 
                // bottom 
                vec4((2 * ac + x),y,(2 * ab + z), 1.0),
                vec4((3 * ac + x),y,(2 * ab + z), 1.0),
                vec4((2 * ac + x),y,(3 * ab + z), 1.0),
                vec4((3 * ac + x),y,(3 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices_1 = [     
                vec4(x,y,(2 * ab + z), 1.0), // 0
                vec4((ac + x),y,(2 * ab + z), 1.0), // 1
                vec4(x,y,(3 * ab + z), 1.0), // 2
                vec4((ac + x),y,(3 * ab + z), 1.0), // 3
                // top
                vec4(x,( ae + y ),(2 * ab + z), 1.0), // 4
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0), // 5
                vec4(x,(ae + y),(3 * ab + z), 1.0), // 6
                vec4((ac + x),( ae + y ),(3 * ab + z), 1.0) // 7
            ];
            buildCube(arrayOfVertices_1, steps);

                // square 2/3 
                // bottom
            var arrayOfVertices_2 = [
                vec4((ac + x),y,(2 * ab + z), 1.0),
                vec4((2 * ac + x),y,(2 * ab + z), 1.0),
                vec4((ac + x),y,(3 * ab + z), 1.0),
                vec4((2 * ac + x),y,(3 * ab + z), 1.0),
                // top
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(3 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);
            var arrayOfVertices_3 = [
                // square 3/3 
                // bottom 
                vec4((2 * ac + x),y,(2 * ab + z), 1.0),
                vec4((3 * ac + x),y,(2 * ab + z), 1.0),
                vec4((2 * ac + x),y,(3 * ab + z), 1.0),
                vec4((3 * ac + x),y,(3 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);
        }
        // ========================================================
        // ========================================================
        // square 1/3 (middle row)
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices = [
                vec4(x,(ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4(x,(ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(3 * ab + z), 1.0),
                // top
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4(x,(2 * ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices = [
                vec4(x,(ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4(x,(ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(ae + y),(3 * ab + z), 1.0),
                // top
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4(x,(2 * ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }

        // square 2/3 (middle row)
        // bottom 
        if( inverse == true ) {
            var arrayOfVertices = [
                vec4(  (ac + x)  ,(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4(  (ac + x)  ,(ae + y),(3 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0),
                // top
                vec4(  (ac + x)  ,(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4(  (ac + x)  ,(2 * ae + y),(3 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(3 * ab + z), 1.0)
            ];
            colorCube(arrayOfVertices);
            buildCube(arrayOfVertices, steps);
        }
            // square 3/3 (middle row)
            // bottom 
        if( inverse == false ) {
            var arrayOfVertices = [
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(3 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices = [
                vec4((2 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(ae + y),(3 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices, steps);
        }
        // ========================================================
        // ========================================================
        // square 1/3 (top row)
        // bottom 
        if( inverse == false ) {
            var arrayOfVertices_1 = [
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4(x,(2 * ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                // top
                vec4(x,(3 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4(x,(3 * ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_1, steps);
            // square 2/3 (top row)
            // bottom 

            var arrayOfVertices_2 = [ 
                vec4((ac + x) , (2 * ae + y) , (2 * ab + z), 1.0),
                vec4((2 * ac + x) , (2 * ae + y) , (2 * ab + z), 1.0),
                vec4((ac + x) , (2 * ae + y) , (3 * ab + z), 1.0),
                vec4((2 * ac + x) , (2 * ae + y) , (3 * ab + z), 1.0),
                // top
                vec4((ac + x) , (3 * ae + y) , (2 * ab + z), 1.0),
                vec4((2 * ac + x) , (3 * ae + y) , (2 * ab + z), 1.0),
                vec4((ac + x) , (3 * ae + y) , (3 * ab + z), 1.0),
                vec4((2 * ac + x) , (3 * ae + y) , (3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);
            // square 3/3 (top row)
            // bottom 
            var arrayOfVertices_3 = [ 
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(3 * ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);
        }
        
        if( inverse == true && add_more_steps > 1 ) {
            var arrayOfVertices_1 = [
                vec4(x,(2 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4(x,(2 * ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                // top
                vec4(x,(3 * ae + y),(2 * ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4(x,(3 * ae + y),(3 * ab + z), 1.0),
                vec4((ac + x),(3 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_1, steps);
            // square 2/3 (top row)
            // bottom 

            var arrayOfVertices_2 = [ 
                vec4((ac + x) , (2 * ae + y) , (2 * ab + z), 1.0),
                vec4((2 * ac + x) , (2 * ae + y) , (2 * ab + z), 1.0),
                vec4((ac + x) , (2 * ae + y) , (3 * ab + z), 1.0),
                vec4((2 * ac + x) , (2 * ae + y) , (3 * ab + z), 1.0),
                // top
                vec4((ac + x) , (3 * ae + y) , (2 * ab + z), 1.0),
                vec4((2 * ac + x) , (3 * ae + y) , (2 * ab + z), 1.0),
                vec4((ac + x) , (3 * ae + y) , (3 * ab + z), 1.0),
                vec4((2 * ac + x) , (3 * ae + y) , (3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_2, steps);
            // square 3/3 (top row)
            // bottom 
            var arrayOfVertices_3 = [ 
                vec4((2 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(2 * ae + y),(3 * ab + z), 1.0),
                // top
                vec4((2 * ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(2 * ab + z), 1.0),
                vec4((2 * ac + x),(3 * ae + y),(3 * ab + z), 1.0),
                vec4((3 * ac + x),(3 * ae + y),(3 * ab + z), 1.0)
            ];
            buildCube(arrayOfVertices_3, steps);
        }
        // ========================================================
        // ========================================================
        
    }
}

function draw(stepsVariable){
    points = [];
    colors = [];
    


    buildCube(startingVertexArray, stepsVariable);


    
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    
    
//    render();
}

function changeSteps(){


    totalSteps = document.getElementById("number_of_steps").value;
    draw(totalSteps);
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, points.length );

    requestAnimFrame( render );
}
