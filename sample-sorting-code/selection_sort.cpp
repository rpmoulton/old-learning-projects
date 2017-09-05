#include <iostream>
#include <algorithm>
 
/***********
 * This function prints the time taken on the screen
 ************/
void print(double time)
{
  std::cout << time << std::endl;
}

/***********
 * This function does the selection sort
 *************/
void selectionSort(int a[], int SIZE)
{
  //for loop to sort
  for (int i = 0; i < SIZE; i++)
  {
    int j = i;
 
    
    for (int l = i + 1; l < SIZE; l++)
    {
      if (a[l] < a[j])
      j = l;
    }
    
    //swaps as necessary
    std::swap(a[i], a[j]);
  }
}

/*************
 * Main delegates sorting responsibility to other functions
 ****************/
int main()
{
  //declare variables
  int SIZE = 100;
  int array[SIZE];

  //fill array with values in DECENDING order
  for (int i = 0; i < SIZE; i++)
    array[i] = SIZE - i;

  //starts clock
  double start = clock();

  //sorts in ASCENDING order
  selectionSort(array, SIZE);

  //ends clock
  double end = clock();

  //finds total time taken
  double time = end - start;

  //prints time taken on screen
  print(time);

  //returns
  return 0;
}
