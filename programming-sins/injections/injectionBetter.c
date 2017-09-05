#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv)
{
  
  char cat[] = "cat ";
  char *command;
  size_t commandLength;
  char *temp = argv[1];
  char input[256];
  strcpy(input,temp);
  int index;
  int flag = 0;

  for (int i = 0; i < 256; i++)
    {
      if (input[i] == ';')
	{
	  input[i] = '\0';
	  break;
	}
      else if (input[i] == '|')
	{
	  input[i] = '\0';
	  break;
	}
    }

  commandLength = strlen(cat) + strlen(argv[1]) +1;
  command = (char *) malloc(commandLength);
  strncpy(command, cat, commandLength);
  strncat(command, input, (commandLength-strlen(cat)));

  system(command);
  return (0);
}
