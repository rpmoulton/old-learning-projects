/**************************************************************************
 * Ryan Moulton
 * HW 7 - Sin 06 String Problems
 *
 * This program demonstrates how an entered string can have unexpected results
 * if it is not cleaned.
 *************************************************************************/
//includes package for in/out
#include <stdio.h>


// This function prompts for username.
void prompt(char * input)
{ 
  //Prompts user for username.
  printf("String: ");
  
  //Puts input from user into predefined variable.  
  scanf("%s", &input);

  printf("%s", &input);
}


int main(int argc, char* argv[])
{
  //initialize variables. 
  char input[256];
  
  //calls prompt functions
  prompt(input);
  
  

 
  return 0;
}
