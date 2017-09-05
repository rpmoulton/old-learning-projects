/***************************************************************************
 * Ryan Moulton
 * Homework 1 - Sin 13 Race Conditions
 *
 * This program will demonstrate a way to prevent race conditions from occuring
 * by using a 'mutex' lock so that the variable is locked during execution.
 **************************************************************************/
#include <pthread.h>
#include <stdio.h>

// This Is the main difference in the programs. This Lock prevents the two
// threads from accessing the same variable at the same time.
   pthread_mutex_t lock;




// this function is run by the second thread. 
void *threaded(void *accountPtr)
{ 
  //This starts the lock on the variable.
  pthread_mutex_lock(&lock);
  
  //initializes variable to be received from user.
  int amount = 0;
  
  //Prompts user for the amount to be added.
  printf("Please Enter an amount to be added:");
  
  //Receives input from user.
  scanf("%d", &amount);
  
  //This checks to make sure that the number entered by user is within the
  //range of an integer and wont fail.
  if(amount > 1000000000 || amount < 0)
    {
      printf("Number entered is too large / small for it to be accepted as an integer and will cause problems");
      return NULL;
    }
  
  //Sets a pointer to the memory location be incremented.
  int *amountptr = (int *)accountPtr;
  
  //Increments the memory location to the amount.
  for(int i = 0; i < amount; i++)
    {
      ++(*amountptr);
    }
  
  //This stops the lock.
  pthread_mutex_unlock(&lock);
  
  //Shows the amount after the adding. 
  printf ("Account balance after adding: %d\n", *amountptr);
  
  // the function must return something, so NULL
  return NULL;
}

//this function is run by the first thread
void first(int *accountPtr)
{
  //This starts the lock.
  pthread_mutex_lock(&lock);
  
  //This initializes the variable to be received from user
  int amount = 0;
  
  //Prompts user for an amount to be subtracted
  printf("Please Enter an amount to be subtracted:");
  
  //Takes input from user and puts it in variable
  scanf("%d", &amount);
  
  //This checks to make sure that the number entered by user is within the
  //range of an integer and wont fail.
  if(amount > 1000000000 || amount < 0)
    {
      printf("Number entered is too large / small for it to be accepted as an integer and will cause problems");
      return;
    }
  
  //Sets a pointer to memory location to be incremented.
  int *amountptr = (int *)accountPtr;
  
  //Increments memory downward.
  for(int i = 0; i < amount; i++)
    {
      --(*amountptr);
    }
  
  pthread_mutex_unlock(&lock);
  //add deposit amount to account amount 
  printf("Account balance after subtraction: %d\n", *accountPtr);
}



int main()
{
  // initialize amount for variable to be acted upon.
  int accessedVar = 1000;
  
  
  
  // show the initial value.
  printf("Initial Value: %d \n", accessedVar);
  
  // this variable is the second thread.
  pthread_t thread2;
  
  // this starts the second thread.
  if(pthread_create(&thread2, NULL, threaded, &accessedVar)) 
    {
      fprintf(stderr, "Error creating thread\n");
      return 1;
    }
  
  first(&accessedVar);
  
  // this joins both threads back together.
  if(pthread_join(thread2, NULL)) 
    {
      fprintf(stderr, "Error joining thread\n");
      return 2; 
    }
  
  
  return 0;
}
