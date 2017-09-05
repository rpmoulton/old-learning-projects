#include <iostream>
#include <ctime>

/**************
 * This function prints the amount of time taken
 *****************/
void print(double time)
{
  //print total time taken
  std::cout << time << std::endl;
}
 
/***************
 * This function sorts by insertion
 *
 * Although this is still O(n^2) it is a little more 
 * efficient than bubble and selection sort.
 **************/
void insertion_sort(int a[], int length)
{
  //declare variables
  int i;
  int j;
  int temp;

  //for loop for insertion sort
  for (i = 1; i < length; i++)  
  {  
    j = i;  
    while (j > 0 && a[j - 1] > a[j])
    {
      temp = a[j];
      a[j] = a[j - 1];
      a[j - 1] = temp;
      j--;
    }
  }
}
 
/*************
 * Main declares variables and delegates responsibility
 ***************/
int main() 
{ 
  //declares variables
  int SIZE = 10;
  int array[SIZE];

  //fills array in DECENDING order
  for (int i = 0; i < SIZE; i++)
  {
    array[i] = SIZE - i;
  }

  //starts clock
  double start = clock();

  //sorts array
  insertion_sort(array, SIZE);

  //ends clock
  double end = clock();

  //calculates time taken
  double total = end - start;

  //prints time taken
  print(total);

  //return
  return 0;
}
