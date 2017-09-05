"use strict";

var canvas;
var gl;
var points = []; //empty array, we put the points here as we do the subdivision
var tessellationGrade;
var angle;
var renderType;
var vertices;
var radios;
var theta = 0.0;
var thetaLoc;

var speed = 100;
var direction = true;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    initializeVariables();
    initializeUserInterface();
   
    tessellation(vertices[0], vertices[1], vertices[2], tessellationGrade);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
speed = 100;


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    thetaLoc = gl.getUniformLocation(program, "theta");

    
    document.getElementById("Direction").onclick = function () {
        direction = !direction;
    };




    render();
};

function initializeVariables()
{

    vertices = [
        vec2(-0.61,-0.35), // left-down corner
        vec2( 0,  0.7),  // center-up corner
        vec2( 0.61, -0.35) // right-down corner
    ]; 

    var angleValue = document.getElementById("slider-angle").value;
    angle = angleValue * Math.PI / 180;


    radios = document.getElementsByName('render-type');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            renderType = radios[i].value;
            break;
        }
    }

    tessellationGrade = document.getElementById("slider-tessellation").value;


}

function initializeUserInterface()
{
    document.getElementById("slider-angle").addEventListener("input", function(e){
            angle = this.value * Math.PI / 180;
            // speed = 100 - event.target.value;
            rerender();
    }, false);

    for (var i = 0, length = radios.length; i < length; i++) {
       radios[i].onclick = function() {
            renderType = this.value;
            rerender();
        };
    }

    document.getElementById("slider-tessellation").addEventListener("input", function(e){
            tessellationGrade = this.value;
            // speed = 100 - event.target.value;
            rerender();
    }, false);

     document.getElementById("slider").onchange = function(event) {
        speed = 100 - event.target.value;
    };

}

function twist(vector)
{
    var x = vector[0],
        y = vector[1],
        d = Math.sqrt(x * x + y * y),
        sinAngle = Math.sin(d * angle),
        cosAngle = Math.cos(d * angle);


        return [x * cosAngle - y * sinAngle, x * sinAngle + y * cosAngle];
}

function triangle (a, b, c)
{

    a = twist(a), b = twist(b), c = twist(c);

    if(renderType=="TRIANGLES")
    {
        points.push(a, b, c);
    } 
    else 
    {
        points.push(a, b);
        points.push(b, c);
        points.push(a, c);
    }
}

function tessellation(a, b, c, count)
{

    if(count===0)
    {
        triangle(a,b,c);
    } 
    else 
    {
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        count--;

        tessellation(a, ab, ac, count);
        tessellation(c, ac, bc, count);
        tessellation(b, bc, ab, count);
        tessellation(ac, bc, ab, count);
    }

}

function rerender()
{
    points = [];
    tessellation(vertices[0], vertices[1], vertices[2], tessellationGrade);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
 //   render();
}

function render() 
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    theta += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);


    if(renderType=="TRIANGLES"){
        gl.drawArrays( gl.TRIANGLES, 0, points.length );
    }
    else {
        gl.drawArrays( gl.LINES, 0, points.length );   
    }
    setTimeout(
        function () 
        {
            requestAnimFrame( render );
        },
        speed
    );
}
    
