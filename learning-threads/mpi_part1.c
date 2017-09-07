/********
* Program to learn MPI in c
*
****/


//include files
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) 
{
	// Initialize the MPI environment
	MPI_Init(NULL, NULL);

	// Find out rank, size
	int world_rank;
	int world_size;
	MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
	MPI_Comm_size(MPI_COMM_WORLD, &world_size);

	/* sample code from example
    MPI_Send(&number, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
    MPI_Recv(&number, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
	*/

	/////////////////////////////////////////////	
	int token = 0;

	int cmdArgs = atoi(argv[1]);
	
	for (int i = 0; i < cmdArgs; i++)
	{

		if ( world_rank == 0 )
		{
			printf("Proc 0 of %d %d \n", world_rank, world_size);
			token += 100;
		    MPI_Send(&token, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);

    		MPI_Recv(&token, 1, MPI_INT, world_size - 1, 0, 
					MPI_COMM_WORLD, MPI_STATUS_IGNORE);
			printf("%d has token %d\n", world_rank, token);
		}
		else
		{
    		MPI_Recv(&token, 1, MPI_INT, world_rank - 1, 0, 
			MPI_COMM_WORLD, MPI_STATUS_IGNORE);
			printf("%d has token %d\n", world_rank, token);
			
    		token += 100;
    		MPI_Send(&token, 1, MPI_INT, (world_rank + 1)
			 % world_size, 	0, MPI_COMM_WORLD);
		}
	}

	/////////////////////////////////////////////	
	MPI_Finalize();
	return 0;
}
