/**************************************************************************
 * Ryan Moulton
 * HW 1 - Sin 13 Race Conditions
 *
 * This program demonstrates how to properly handle errors.
 *************************************************************************/
//includes package for in/out
#include <stdio.h>
#include <assert.h>

void file(char * filepath)
{
  //initialize file variables
  FILE *ifp, *ofp;
  char *mode = "r";
  char inputFile[256];
  char outputFilename[] = "out.list";

  //opens file
  ifp = fopen(filepath, mode);
  assert(ifp);

  //reads everything in the file.
  fputs("Stuff into file\n", ifp);

  fclose(ifp);
}

int main()
{
  //initialize variable.
  char filepath[256] = "./config.txt";


  file(filepath);


  //return
  return 0;
}
