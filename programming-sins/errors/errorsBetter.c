/**************************************************************************
 * Ryan Moulton
 * HW 1 - Sin 13 Race Conditions
 *
 * This program demonstrates how to properly handle errors.
 *************************************************************************/
//includes package for in/out
#include <stdio.h>
#include <unistd.h>

void file(char * filepath)
{
  //initialize file variables
  FILE *ifp, *ofp;
  char *mode = "r";
  char inputFile[256];
  char outputFilename[] = "out.list";
  int match = 0;


  //opens file

  if((ifp = fopen(filepath, mode)) == NULL)
    {
      printf("Error opening file.");
      return;
    }
  
  if(ifp)
    {
      printf("File exists, entering text into file.");
    }
  else
    {
      fclose(ifp);
    }
  //if it cant find file
  if (ifp == NULL) 
    {
      //makes the new file
      ofp = fopen(filepath, "w");
    }

  //reads everything in the file.
  fputs("Stuff into file\n", ifp);

  //if match is true print success
  if(match == 1)
    {
      printf("Success");
    }


  //if it fails writing the new file, output error message
  if (ofp == NULL) 
    {
      fprintf(stderr, "Can't open output file %s!\n", outputFilename);
    }

  //closes the files
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
