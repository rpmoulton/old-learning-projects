/********************************************************************
 * Ryan Moulton
 *
 * It was easier and less time to make each sort a different 
 * file and not connect them so I did that. Algorithm O(n^2)
 ****************************************************************/
#include <iostream>
#include <ctime>

/*************
 * This function bubble sorts the array
 *************/
void bubbleSort(int *array, int length)
{
  //declare variables
  int i;
  int j;

  //2 for loops for bubble sort
  //for each element in the array we compare against the next element
  for(i = 0; i < length; i++)
  {
      for(j = 0; j < length; j++)
      {
        if(array[i] < array[j])
          {
              int temp=array[i]; 
              array[i] = array[j];
              array[j] = temp;
          }

      }

  }

}

/**************
 * This function prints the time taken to sort
 ************/
void print(int *array,int SIZE, double timeTaken)
{
	//print time taken
  	std::cout << timeTaken << std::endl;
}

/*****************
 * Main delegates responsibility to other functions
 ****************/
int main()
{
  	//declare variables
  	int SIZE = 100;
  	int a[SIZE];

  	//put numbers in array in DECENDING order
  	for (int i = 0; i < SIZE; i++)
    {
      a[i] = SIZE - i;
    }

  	//start clock
  	double start = clock();
  
  	//sorts in ASSENDING order
  	bubbleSort(a,SIZE);

  	//end clock
  	double end = clock();

  	//find time taken
  	double timeTaken = end - start;

  	//print time taken
  	print(a,SIZE,timeTaken);

  	//return 0 for success.
  	return 0;
}
