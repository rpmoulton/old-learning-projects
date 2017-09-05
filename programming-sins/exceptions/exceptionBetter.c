#include <stdio.h>

void exception()
{
  //declares an array and initializes all values to 0 (not existing)
  int array[10] = {0};
  
  
  //declares number to be entered by user
  int inc;
  //prints prompt
  printf("Enter a number between 1-10, or greater than 10 for different error messages:");
  //gets number from user
  scanf("%d", &inc);

  //checks if the number in array exists
  if(array[inc] == 0)
    {
      printf("Value Does not exist\n");
    }
  //if not, checks to see if its too large for memory initialized
  else if (array[inc])
    {
      //this exception only executes if out of range of array
      printf("Value entered not in range of array\n");
    }
  //this is the code that would execute if there wasnt a problem.
  else
    {
      printf("All tests were successful this is real code (wont show)\n");
    }
}


int main()
{
  exception();
  return (0);
}
