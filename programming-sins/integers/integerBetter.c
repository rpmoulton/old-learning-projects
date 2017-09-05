/**************************************************************************
 * Ryan Moulton
 * HW 5 - Sin 07 Integer Overflows
 *
 * This program demonstrates how to check for integer overflows that could
 * cause problems.
 *************************************************************************/
//includes package for in/out
#include <stdio.h>
#include <limits.h>

// This function prompts for a number.
void prompt(int starter)
{ 
  //Prompts user for username.
  printf("Please enter an integer: ");
  
  //Puts input from user into predefined variable.  
  scanf("%d", &starter);

  int calc = 2;
  int calc2 = 999999999;
  int i;

  
  for (i = 0; i < starter; i++)
    {
      if (calc2 > 0 && calc > INT_MAX - calc2)
	{
	  printf("OVERFLOW DETECTED num too large, exiting\n");
	  return;
	}
      else
      calc = calc + calc2;
    }

  printf("The number entered was: %d.\n",starter );
  printf("%d was added to %d %d times.\n",starter, calc2,starter);
  printf("The number after calculation was: %d\n", calc);
 
}



int main()
{
  //initialize variables. 
  unsigned long int starter;

  //calls prompt functions
  prompt(starter);

  return 0;
}
