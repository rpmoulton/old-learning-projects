#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv)
{
  //Array that holds linux command
  char linuxOp[] = "cat ";

  //pointer for command
  char *command;

  //gets commandLength
  size_t commandLength;

  //gets the length of the command.
  commandLength = strlen(linuxOp) + strlen(argv[1]) +1;

  //allocates space with command
  command = (char *) malloc(commandLength);

  //copys string
  strncpy(command, linuxOp, commandLength);

  //does first command and then grabs user input.
  strncat(command, argv[1], (commandLength-strlen(linuxOp)));

  //does the commands from user input.
  system(command);
  return (0);
}
