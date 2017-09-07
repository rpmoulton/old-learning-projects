/**********************************
 * CSC 410 Parallel Computing
 * MatMul 3 ways
 *
 * Create a matrix using pthreads
 ***********************************/

//include statements
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

//number of threads
#define NUM_THREADS	4

int size = 100;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

struct matrixs
{
	int matrixA[500][500];
	int matrixB[500][500];
	int solution[500][500];
	long id;
};


//function declarations
void fillArrays(struct matrixs *);
void printArray(struct matrixs *);
void *multiply( void *param);






//main function
int main()
{
	srand(1);
  	//declare threads
  	pthread_t tids[NUM_THREADS];

  	//thread id number
  	long t;

  	//status
  	void *status;

  	struct matrixs MyMatrixs;


	fillArrays(&MyMatrixs);





  	//create threads
   for (t = 1; t <= NUM_THREADS; t++)
    {
    	 pthread_mutex_lock(&mutex);
    	MyMatrixs.id = (long) t;
    
	  pthread_create( &tids[t], NULL, multiply, (void *) &MyMatrixs);
	
	  wait(10);
     
    }
  

  //join threads together
  for (t = 1; t <= NUM_THREADS; t++)
    {
      pthread_join( tids[t], &status );

    }


  
 // multiply( matrixA, matrixB, solutionMatrix);
 	printArray(&MyMatrixs);

  	//end
  	return 0;
}




void *multiply( void *param)//int matrixA[][500], int matrixB[][500], int solution[][500])
{
 
 	struct matrixs *MyMatrixs = param;
 	long threadId = MyMatrixs->id;
 	int i,j,k;
 	pthread_mutex_unlock(&mutex);
 	//printf("%d\n",threadId);

 	int start, end, temp;
 	temp = size / NUM_THREADS;
 	start = (threadId - 1) * temp;
 	end = (threadId == NUM_THREADS) ? size : threadId * temp;
	for(i = start; i < end; i++)
	{
  		for(j = 0;j < size; j++)
  		{
   			for(k = 0; k < size; k++)
   			{
    			MyMatrixs->solution[i][j] += MyMatrixs->matrixA[i][k] * MyMatrixs->matrixB[k][j];
   			}
  		}
 	}


 	 pthread_exit(NULL);	
}

void fillArrays(struct matrixs *m)
{
 	int i, j;

 	for(i=0; i < size; i++)
 	{
  		for(j=0; j< size; j++)
  		{
   			m->matrixA[i][j] = rand() % 10;
   			m->matrixB[i][j] = rand() % 10;

  		}
 	}
}

void printArray(struct matrixs *m)
{

 	int i, j;

 	for(i = 0; i < size; i++)
 	{
  		for(j = 0; j < size; j++)
  		{
   			printf("%4d ", m->solution[i][j]);
  		}
  		printf("\n");
 	}
 	printf("\n\n");

}
