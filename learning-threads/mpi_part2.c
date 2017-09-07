/*****
 * The second piece in learning MPI in c
 *
 */

//include files
#include <string.h>
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[])
{
    // Initialize the MPI environment
    MPI_Init(NULL, NULL);

    // Find out rank, size
    int myrank;
    int world_size;
    int numbers[60];
    int N[3], H = 100;
    int bigList[10];
    MPI_Comm_rank(MPI_COMM_WORLD, &myrank);
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    /////////////////////////////////////////////
    if ( myrank == 0 )
    {

        printf("Proc 0 of %d %d \n", myrank, world_size);

        MPI_Send(&N, 3, MPI_INT, 1, 0, MPI_COMM_WORLD);

        MPI_Recv(&N, 3, MPI_INT, world_size - 1, 0,
                                MPI_COMM_WORLD, MPI_STATUS_IGNORE);

        memcpy(bigList, N, 3);


       // printf("%d has token %d\n", myrank, token);

        MPI_Bcast(&bigList, 9, MPI_INT, 0, MPI_COMM_WORLD);
    }
    else
    {

        MPI_Recv(&N, 3, MPI_INT, myrank - 1, 0,
                MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        //printf("%d has token %d\n", myrank, token);
        int sum;
        int max;
        int min;
        for (int i =0; i< 3; i++)
        {
            N[i] = rand() % 100;
            sum += N[i];
            if (N[i] < min || i == 0)
            min = N[i];
            if(N[i] > max || i == 0)
            N[i] = max;
        }

        MPI_Send(&N, 3, MPI_INT, (myrank + 1)
                 % world_size,  0, MPI_COMM_WORLD);



        MPI_Bcast(&bigList, 9, MPI_INT, 0, MPI_COMM_WORLD);



        printf("%d has sum %d min %d max %d\n", myrank,sum, min, max);

    }


    /////////////////////////////////////////////
    MPI_Finalize();
    return 0;
}

