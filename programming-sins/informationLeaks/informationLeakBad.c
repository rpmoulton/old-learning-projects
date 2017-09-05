/**************************************************************************
 * Ryan Moulton
 * HW 1 - Sin 13 Race Conditions
 *
 * This program demonstrates how an error message that is written can give
 * away important information. This is an overly obvious demonstration.
 *************************************************************************/
//includes package for in/out
#include <stdio.h>


// This function prompts for username.
void promptUsername(char * username)
{ 
  //Prompts user for username.
  printf("Username: ");
  
  //Puts input from user into predefined variable.  
  scanf("%s", &username);
}


//this function prompts for password
void promptPass(char * password)
{
  //Prompts user for password  
  printf("Password: ");
  
  //Puts input from user into predefined variable.  
  scanf("%s", &password);
}


int main()
{
  //initialize variables. 
  char username[256];
  char password[256];
  char filepath[256] = "./config.txt";

  //calls prompt functions
  promptUsername(username);
  promptPass(password);

  //initialize file variables
  FILE *ifp, *ofp;
  char *mode = "r";
  char inputFile[256];
  char outputFilename[] = "out.list";
  int match = 0;


  //opens file
  ifp = fopen(filepath, mode);

  //if it cant find file
  if (ifp == NULL) 
    {
      //makes the new file
      ofp = fopen(filepath, "w");
    }

  //reads everything in the file.
  while (fscanf(ifp, "%s ", inputFile) != EOF)
    {
      //if there is a match for file information match is true
      if (username == inputFile)
	{
	  match = 1;
	}
    }

  //if match is true print success
  if(match == 1)
    {
      printf("Success");
    }

  //otherwise print error message depicting file path
  else
    {
      fprintf(stderr, "Your info was not found in %s\n", filepath);
    }

  //if it fails writing the new file, output error message
  if (ofp == NULL) 
    {
      fprintf(stderr, "Can't open output file %s!\n", outputFilename);
    }

  //closes the files
  fclose(ifp);
  fclose(ofp);

  //return
  return 0;
}
