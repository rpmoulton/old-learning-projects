#include <iostream>
#include <ctime> 

//declares function
void merge(int*,int*,int,int,int);

/***************
 * this function will do the merge sort
 *
 * it recursively checks values above and below the pivot point.
 * Algorithm O(nlog(n))
 ***************/
void mergesort(int *a, int*b, int low, int high)
{
  //declare variable
    int pivot;

    //sorts if the lower value is less than higher (recursively splits array into chunks until they become the same value)
    if(low<high)
    {
      //set the middle value as the pivot
      pivot=(low+high)/2;

      //recursively call mergesort for the lower values of the array below the pivot point
      mergesort(a,b,low,pivot);

      //recursively call mergesort for the higher values of the array above the pivot point
      mergesort(a,b,pivot+1,high);

      //this function will find the lower value of the chunk of the array and "merge it"
      merge(a,b,low,pivot,high);
    }
}

/**************
 * This function will merge the arrays
 **************/
void merge(int *a, int *b, int low, int pivot, int high)
{
  //declare variables
  int h;
  int i;
  int j;
  int k;
  h=low;
  i=low;
  j=pivot+1;
 
  //start merges

  //while low number is less than pivot and pivot +1 is less than highest number
  while((h<=pivot)&&(j<=high))
  {
    //go through array checking if low value is less than higher value if so, assign to array b
    if(a[h]<=a[j])
    {
      b[i]=a[h];
      h++;
    }
    else
    {
      b[i]=a[j];
      j++;
    }
    i++;
  }

  //if value h is greater than the pivot
  if(h > pivot)
  {
    for(k = j; k <= high; k++)
    {
      b[i]=a[k];
      i++;
    }
  }
  //otherwise its less than the pivot
  else
  {
    for(k = h; k <= pivot; k++)
    {
      b[i]=a[k];
      i++;
    }
  }

  //put the stored values of b back into a for the range we sorted.
  for(k = low; k <= high; k++)
  {
     a[k]=b[k];
  }
}
 
/*****************
 * Main declares variables and delegates responsibility to other functions
 ******************/
int main()
{
  //declare variables
  int SIZE = 10;
  int a[SIZE];
  int num;

  //fills array in DECENDING order
  for (int i = 0; i < SIZE; i++)
  {
    a[i] = SIZE - i;
  }
 
 
  //declares second array
  int b[SIZE];

  //starts clock
  double start = clock();

  //sorts
  mergesort(a,b,0,SIZE-1);

  //ends clock
  double end = clock();

  //finds time taken
  double difference = end - start;

  //displays time taken
  std::cout << difference << std::endl;

  return 0;
}
