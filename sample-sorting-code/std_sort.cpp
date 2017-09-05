#include <iostream>
#include <algorithm>

/*************
 * Main sorts it using std::sort (the library function for sorting)
 *
 * This function uses a sort that is O(nlog(n))
 *************/
int main()
{
  //declare variables
  int SIZE = 10000;
  int intArray[SIZE];

  //fills array with values in DESCENDING order
  for (int i = 0; i < SIZE; i++)
    {
      intArray[i] = SIZE - i;
    }

  //starts clock
  double start = clock();

  //sorts in ASCENDING order 
  std::sort(intArray, intArray + SIZE);

  //ends clock
  double end = clock();

  //gets total time
  double difference = end - start;

  //displays total time
  std::cout << difference << std::endl;

  //returns
  return 0;
}
