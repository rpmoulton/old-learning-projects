/**************************************************************************
 * Ryan Moulton
 * HW 1 - Sin 13 Race Conditions
 *
 * This program demonstrates an unhandled race condition where two loops
 * can get executed at the same time and return an unexpected result.
 *************************************************************************/

#include <pthread.h>
#include <stdio.h>

// This function is run by the second thread.
void *threaded(void *accountPtr)
{ 
  //initializes variable to be received from user.
  int amount = 0;

  //Prompts user for variable.
  printf("Please Enter an amount to be added:");

  //Puts input from user into predefined variable.
  scanf("%d", &amount);

  //This checks to make sure that the number entered by user is within the
  //range of an integer and wont fail.
  if(amount > 1000000000 || amount < 0)
    {
      printf("Number entered is too large / small for it to be accepted as an integer and will cause problems");
      return NULL;
    }

  int *amountptr = (int *)accountPtr;
  for(int i = 0; i < amount; i++)
    {
      ++(*amountptr);
    }

  //add deposit amount to account amount 
  printf ("Account balance after deposit: %d\n", *amountptr);
  
  // the function must return something, so NULL
  return NULL;
}

//this function is run by the first thread
void first(int *accountPtr)
{
  //Initializes variable to be received from user
  int amount = 0;

  //Prompts user for a number to be subtracted
  printf("Please Enter an amount to be subtracted:");

  //Takes input from user and puts it into pre-defined variable
  scanf("%d", &amount);

  //This checks to make sure that the number entered by user is within the
  //range of an integer and wont fail.
  if(amount > 1000000000 || amount < 0)
    {
      printf("Number entered is too large / small for it to be accepted as an integer and will cause problems");
      return;
    }

  //Sets a pointer to be incremented
  int *amountptr = (int *)accountPtr;

  //Increments memory possibly at same time as other thread if numbers large.
  for(int i = 0; i < amount; i++)
    {
      --(*amountptr);
    }

  //Displays amount after subtraction
  printf ("Account balance after subtraction: %d\n", *amountptr);
  
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

  //The function used by first thread.  
  first(&accessedVar);
  
  // this joins both threads back together.
  if(pthread_join(thread2, NULL)) 
    {
      fprintf(stderr, "Error joining thread\n");
      return 2; 
    }
  
  return 0;
}
