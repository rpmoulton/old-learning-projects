/*****
* Using Pthreads
*
**/

//includes
#include <stdio.h>      
#include <pthread.h>    
#include <semaphore.h>  

//function declaration
void * threadHandlingFunction (void * a );

// global variables 
sem_t semaphoreLock;
int count; 

int main()
{
    int i[2];
    pthread_t thread_a;
    pthread_t thread_b;
    
    // argument to the threads
    i[0] = 0; 
    i[1] = 1;
    
    //initialize semaphore
    sem_init(&semaphoreLock, 0, 1);     

    //create 2 threads                             
    pthread_create (&thread_a, NULL, threadHandlingFunction, (void *) &i[0]);
    pthread_create (&thread_b, NULL, threadHandlingFunction, (void *) &i[1]);
    

    //join the threads when they complete
    pthread_join(thread_a, NULL);
    pthread_join(thread_b, NULL);


    //destroy the semaphore
    sem_destroy(&semaphoreLock); 
                  
    //return
    return 0;
}

void * threadHandlingFunction (void * a )
{
	//declare variable
    // int x; 

    // //set x to the id
    // x = (int) a;

    long x = (long) a;

    //print message
    printf("Thread %ld - Is waiting to enter critical section...\n", x);

    //semaphore waits on the critical section
    sem_wait(&semaphoreLock);

    //Message to show in critical section
    printf("Thread %ld - Now in critical section...\n", x);

    //displays count variable
    printf("Thread %ld - count Value: %d\n", x, count);

    //increments count
    printf("Thread %ld - Incrementing count...\n", x);
    count++;

    //displays new count value
    printf("Thread %ld - New count Value: %d\n", x, count);

    //message to show leaving critical section
    printf("Thread %ld - Leaving critical section...\n", x);
    
    //post the semaphore   
    sem_post(&semaphoreLock);     
    

    //exit thread
    pthread_exit(0);
}
