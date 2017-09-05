/**************************************************************************
 * Ryan Moulton
 * HW 7 - Sin 05 Buffer Overload
 *
 * This program demonstrates how a buffer overload can cause problems
 *************************************************************************/
//includes package for in/out
#include <stdio.h>
#include <string.h>

// This function prompts for username.
void prompt(char * variable)
{ 
  //Prompts user for username.
  char buff[16];

  strcpy(buff, variable);

  //Puts input from user into predefined variable.  
  printf("%s\n", buff);
}



int main(int argc, char* argv[])
{
  //initialize variables. 

  prompt(argv[1]);

  return 1;
}
