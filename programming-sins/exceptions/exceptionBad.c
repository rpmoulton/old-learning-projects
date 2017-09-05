#include <stdio.h>

void exception()
{
  //declares an array
  char array[10];
  //declares number to be entered by user
  int inc;
  //prints prompt
  printf("Enter a number:");
  //gets number from user
  scanf("%d", &inc);
  //checks if the number in array exists
  if(array[inc])
    {
      printf("Try Statement worked (it wont)\n");
    }
  //if not, exception
  else
    {
      //this exception is bad because it doesnt accurately express what 
      //happened. It could be that the value doesnt exist, or is too 
      //large for the array and memory isnt there, or that the user
      //entered a negative number. 
      printf("Value not found\n");
    }
}


int main()
{
  exception();
  return (0);
}
