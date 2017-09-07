/******************************
* Project - Parallel Temperature change
*
* Newtons Law
******************************/

//includes io and math from STL
#include <stdio.h>
#include <math.h>

//creates an object struct
struct Objects
{
	//x and y are for the array
 int x;
 int y;

//temp is the temperature
 float temp;

};

//function declarations
void printArray(float array[][50]);
void fillArray(float array[][50]);
void padArray(float array[][50]);
void transformArray(float inArray[][50], float outArray[][50], struct Objects object);
float getAvg(float array[][50], int i, int j, struct Objects object);
float newtonsMethod(float roomTemp, struct Objects object);
void insertObject( struct Objects object, float array[][50] );

//number of rows and columns
int rows = 10;
int columns = 10;

//sets initil temperature to 72 F
float initialTemp = 72;

int main()
{

//instanciates and instance of the object and sets values
 struct Objects object;
 object.x = 5;
 object.y = 5;
 object.temp = 200;

//sets array variables and counter variables
 int i,j;
 float arrayA[50][50];
 float arrayB[50][50];

//sets the array padding and the walls of the room
 padArray( arrayB );
 padArray( arrayA );

 //fills the 'room' array with the initial temperature
 fillArray( arrayA );

//prints off the array
 printArray( arrayA );
 //puts space after the 'room'
 printf("\n\n");

//inserts the hot object into the room
 insertObject(object, arrayA);

//prints off the room
 printArray(arrayA);

 //puts space after the room
 printf("\n\n");


 for(i = 0; i < 2; i++)
 {
 	//changes the 'room' temperature of array B
  transformArray( arrayA, arrayB, object);
  printArray(arrayB );
  printf("\n\n");

//changes the 'room' temperature of array A
  transformArray( arrayB, arrayA, object);
  printArray(arrayA );
  printf("\n\n");
 }



 return 0;
}

//inserts object into the 'room'
void insertObject( struct Objects object, float array[][50] )
{
	//x and y are coordinates of the room
 int x = object.x;
 int y = object.y;

//inserts hot object
 array[x][y] = object.temp;
}

//calculates newtons law
float newtonsMethod(float roomTemp, struct Objects object)
{
	//sets variables for equation
 float c = -.056;
 float changeInTemp = roomTemp - initialTemp;
 float exponential = exp(c);

// printf("%.2f + ( %.2f - %.2f )e^%.2f\n",
//      initialTemp, roomTemp, initialTemp, exponential);

//calculates the equation into the result
 float result = initialTemp + (exponential * changeInTemp );

 //printf("%.2f\n", result);

 return result;
}

//makes the changes to the temperature of the 'room'
void transformArray(float inArray[][50], float outArray[][50], struct Objects object)
{
 int i, j;
 int m, n;
 float average;

//creates 4 threads
 omp_set_num_threads(4);

 #pragma omp parallel for

 for(i = 1; i < rows + 1; i++)
 {
  printf("%d\n",i);
  for(j = 1; j < columns + 1; j++)
  {
   if(object.x == i && object.y == j)
        object.temp = inArray[i][j];

   average = getAvg(inArray, i, j, object);
   outArray[i][j] = newtonsMethod(average, object);


//   outArray[i][j] = newtonsMethod(inArray[i][j]);
  // printf("%d ", sum);
  }
 }
 //printf("\n");
}


//Edge "wall" of room is -999 in matrix
//if we hit a wall don't use that value in the average
float getAvg(float array[][50], int i, int j, struct Objects object)
{

	//initialize variables
 float sum = 0;
 int numberOfVals = 9;
 float average;

 if (array[i][j] == object.temp)
  average = object.temp;
 else
 {
  if (array[i-1][j+1] == -999) numberOfVals--;
  else sum += array[i-1][j+1];

  if (array[i][j+1] == -999) numberOfVals--;
  else sum += array[i][j+1];

  if (array[i+1][j+1] == -999) numberOfVals--;
  else sum += array[i+1][j+1];

  if (array[i-1][j] == -999) numberOfVals--;
  else sum += array[i-1][j];

  if (array[i-1][j] == -999) numberOfVals--;
  else sum += array[i-1][j];

  if (array[i][j] == -999) numberOfVals--;
  else sum += array[i][j];

  if (array[i-1][j-1] == -999) numberOfVals--;
  else sum += array[i-1][j-1];

  if (array[i][j-1] == -999) numberOfVals--;
  else sum += array[i][j-1];

  if (array[i+1][j-1] == -999) numberOfVals--;
  else sum += array[i+1][j-1];

  average = sum / numberOfVals;
 }

 return average;
}

//puts the 'walls' in the 'room' array
void padArray(float array[][50])
{
 int i,j;

 for( i = 0; i < rows + 2; i++)
 {
  for( j = 0; j < columns + 2; j++)
  {
   array[i][j] = -999;          //These are the "wall" in our room
  }
 }
}

//fills array with the starting temperature
void fillArray(float array[][50])
{
 //FILE *fp;
 //fp = fopen( "startingNums", "r" );

 int i, j;

  for(i = 1; i < rows + 1; i++)
  {
   for(j = 1; j < columns + 1; j++)
   {
    //fscanf( fp, "%d", &array[i][j]);
    array[i][j] = initialTemp;
   }
  }
}

//prints off the entire array
void printArray( float array[][50])
{

 int i, j;

 for(i = 1; i < rows + 1; i++)
 {
  for(j = 1; j < columns + 1; j++)
  {
   printf("%3.2f ", array[i][j]);
  }
  printf("\n");
 }
}
