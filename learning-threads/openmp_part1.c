/*****
* Program to learn openmp threading in c
*
****/

//include files
#include <stdio.h>
#include <stdlib.h>

void fillArray(int array[][500]);
void printArray(int array[][500]);
void multiply( int matrixA[][500], int matrixB[][500], int solution[][500]);

int size = 100;

int main()
{
 srand(1);

 omp_set_num_threads(4);

 int matrixA[500][500];
 int matrixB[500][500];

 int solutionMatrix[500][500];

 fillArray(matrixA);
 fillArray(matrixB);

 multiply( matrixA, matrixB, solutionMatrix);
 printArray(solutionMatrix);

}

void multiply( int matrixA[][500], int matrixB[][500], int solution[][500])
{
 int i,j,k;

#pragma omp parallel for private(i, j, k)
for(i = 0; i < size; i++)
{
 printf("Que pasa? from %d\n", omp_get_thread_num());
  for(j = 0;j < size; j++)
  {
   for(k = 0; k < size; k++)
   {
    solution[i][j] += matrixA[i][k] * matrixB[k][j];
   }
  }
 }
}
void fillArray(int array[][500])
{
 int i, j;

 for(i=0; i < size; i++)
 {
  for(j=0; j< size; j++)
  {
   array[i][j] = rand() % 10;
  }
 }
}

void printArray(int array[][500])
{

 int i, j;

 for(i = 0; i < size; i++)
 {
  for(j = 0; j < size; j++)
  {
   printf("%4d ", array[i][j]);
  }
  printf("\n");
 }
 printf("\n\n");

}

