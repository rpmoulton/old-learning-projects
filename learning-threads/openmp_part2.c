/**********************************
 * Parallel Computing
 *
 * Say hi from 5 threads and add even numbers subtract odd.
 ***********************************/


//include files
#include <stdio.h>
#include <stdlib.h>

 void fillArray(int array[10]);
// void printArray(int array[][500]);
void doStuff( int numberArray[],  int solution);

int size = 10;

int main()
{
 srand(1);

 omp_set_num_threads(4);

int numberArray[10];

int solution = 0;

 fillArray(numberArray);
 // fillArray(matrixB);

 //printArray(numberArray);
 //printArray(matrixB);

 doStuff( numberArray, solution);
 // printArray(solutionMatrix);

}

void doStuff( int numberArray[10], int solution)
{
 int i;
#pragma omp parallel for private(i)
for(i = 0; i < size; i++)
{
 printf("Hi from %d\n", omp_get_thread_num());

   if (i % 2 == 0)
   {
      solution += numberArray[i];
      printf("%d", solution);
   }
   else
  {
    solution -= numberArray[i];
          printf("End Number:%d\n", solution);

  }
 }
}

void fillArray(int array[10])
{
 int j;

  for(j=0; j< size; j++)
  {
   array[j] = rand() % 10;
  }
}



