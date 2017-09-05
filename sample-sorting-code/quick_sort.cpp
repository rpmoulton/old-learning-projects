#include <iostream>
#include <ctime>

/*************
 * This function prints the amount of time taken
 ***************/
void print(double time)
{
  std::cout << time << std::endl;
} 

/*************
 * This function swaps the parts of the array
 ****************/
void swap(int& a, int& b)
{
    int temp = a;
    a = b;
    b = temp;
}

/***************
 * This function gets the pivot point
 *************/
int getPivot(int a[], int first, int last)
{

  //declare variables
    int  p = first;
    int pivot = a[first];
 
    //sees if larger than pivot
    for(int i = first+1 ; i <= last ; i++)
    {
        if(a[i] <= pivot)
        {
            p++;
	    //swaps as necessary
            swap(a[i], a[p]);
        }
    }
 
    //swaps the first and pivot
    swap(a[p], a[first]);
 
    //returns
    return p;
}

/******************
 * This function does the quick sort
 *
 * Although quicksort is O(nlog(n)) the worst case scenario can be n^2 if
 * the numbers just happen to be ordered in the right way.
 ****************/
void quickSort( int a[], int first, int last )
{
  //declare variable
    int pivot;

    //checks to see which is larger 
    if(first < last)
    {
      //if its smaller it gets pivot and sorts
      pivot = getPivot(a, first, last);
      quickSort(a, first, pivot-1);
      quickSort(a, pivot+1, last);
    }
}

/************
 * Main delegates sorting responsibilites to other functions
 **************/
int main()
{
  //declares variables
  int SIZE = 10;
  int array[SIZE];

  //fills array in DECENDING order
  for (int i = 0; i < SIZE; i++)
    array[i] = SIZE - i;

  //starts clock
  double start = clock();

  //sorts the array
  quickSort(array, 0, SIZE-1);

  //stops clock
  double end = clock();

  //calculate total time
  double time = end - start;

  //prints time
  print(time);
     
  //returns
  return 0;
}
