%include "asm_io.inc"
segment .data 
prompt1 db 'Enter the 1st integer: ',0
prompt2 db "Enter the 2nd integer: ",0
prompt3 db "Enter the 3rd integer: ",0
prompt4 db "Enter the 4th integer: ",0
prompt5 db "Enter the 5th integer: ",0
outmsg1 db "The result is: ",0


segment .bss 
input1 resd 1
input2 resd 1
input3 resd 1
input4 resd 1
input5 resd 1

segment .text
       global  asm_main
asm_main:
        enter   0,0               ; setup routine
        pusha
	;***************CODE STARTS HERE***************************
mov eax, prompt1
call print_string

call read_int
mov [input1], eax

mov eax, prompt2
call print_string

call read_int
mov [input2], eax

mov eax, prompt3
call print_string

call read_int
mov [input3], eax

mov eax, prompt4
call print_string

call read_int
mov [input4], eax

mov eax, prompt5
call print_string

call read_int
mov [input5], eax


mov eax, [input1]
add eax, [input2]
add eax, [input3]
add eax, [input4]
add eax, [input5]
mov ebx, eax

mov eax, outmsg1
call print_string
mov eax, ebx
call print_int
call print_nl
		
	;***************CODE ENDS HERE*****************************
        popa
        mov     eax, 0            ; return back to C
        leave                     
        ret
