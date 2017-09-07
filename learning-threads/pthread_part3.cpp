/**********************************
  * Exam say hi from 5 threads and add even numbers subtract odd.
 ***********************************/

//include statements
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

//number of threads
#define NUM_THREADS	5

int size = 100;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

struct SampleStructure
{
	int numberArray[100];
  long value;
	long id;
};

int search = 5;

//function declarations
void fillArray(struct SampleStructure *);

void *doStuff( void *param)
{

   struct SampleStructure *MySampleStructure = param;
   long threadId = MySampleStructure->id;


   int start, end, temp, i;
    temp = size / NUM_THREADS;
    start = (threadId - 1) * temp;
    end = (threadId == NUM_THREADS) ? size : threadId * temp;


   

    
    for(i = start; i < end; i++)
    {
      long value = MySampleStructure->value;
      int number = MySampleStructure->numberArray[i]; 
       if (number == search)
        {
          printf(" %d + %d\n", value, number);
          value += 1;
          MySampleStructure->value = value;
        }
        else
        {
          // printf(" %d - %d\n", value, number);
          // value -= number;
          // MySampleStructure->value = value;
        }
    }

   pthread_mutex_unlock(&mutex);




  //print value to screen
  //printf("hi from thread %ld\n", threadId);
  pthread_exit(NULL); 
}




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

  	struct SampleStructure MySampleStructure;


	fillArray(&MySampleStructure);

  MySampleStructure.value = 0;



  	//create threads
   for (t = 1; t <= NUM_THREADS; t++)
    {
    	 pthread_mutex_lock(&mutex);
    	MySampleStructure.id = (long) t;
    
	  pthread_create( &tids[t], NULL, doStuff, (void *) &MySampleStructure);
	
     
    }
  

  //join threads together
  for (t = 1; t <= NUM_THREADS; t++)
    {
      pthread_join( tids[t], &status );

    }


  long value = MySampleStructure.value;

    printf("Total number of %d: %d\n", search, value);

  	//end
  	return 0;
}






void fillArray(struct SampleStructure *m)
{
 	int i;

 	for(i=0; i < size; i++)
 	{
  		m->numberArray[i] = rand() % 10;
      int number = m->numberArray[i];
      //printf("Number %d\n", number);
 	}
}

