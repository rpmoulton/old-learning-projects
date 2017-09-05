%include "asm_io.inc"
segment .data

segment .bss 
	input1 resb 1
	input2 resb 1
	operation resb 1
	temp1 resb 1
	temp2 resb 1
	
segment .text
        global  asm_main
asm_main:
        enter   0,0               ; setup routine
        pusha
	;***************CODE STARTS HERE***************************
	call read_int
	mov [input1], eax
	push eax
	
	call read_int
	mov [input2], eax
	push eax
	
	call read_char
	call read_char
	mov [operation], al
	mov eax, [operation]
	push eax
	
	call compare
	pop eax
	pop eax
	pop eax
	add esp, 12
	mov eax, [operation]
	mov ebx, 'E'
	cmp eax, ebx
	jne prompt

				
	;***************CODE ENDS HERE*****************************
        popa
        mov     eax, 0            ; return back to C
        leave                     
        ret


;; Function for addition operation
addition:
	mov eax, [esp + 8]
	mov ebx, [esp + 12]
	add eax, ebx
	mov ecx, eax
	mov eax, 'O'
	call print_char
	mov eax, 'p'
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 12]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, [esp + 4]
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 8]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, '='
	call print_char
	mov eax, ' '
	call print_char
	mov eax, ecx
	call print_int
	call print_nl
	ret			;returns to main

;; Function for multiplication operation
multiplication:
	mov eax, [esp + 8]
	mov ebx, [esp + 12]
	mul ebx
	mov ecx, eax
	mov eax, 'O'
	call print_char
	mov eax, 'p'
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 12]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, [esp + 4]
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 8]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, '='
	call print_char
	mov eax, ' '
	call print_char
	mov eax, ecx
	call print_int
	call print_nl
	
	
	
	ret	

;; Function for exponential operation
exponential:
        mov eax, 'O'
	call print_char
	mov eax, 'p'
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 12]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, [esp + 4]
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 8]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, '='
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 12]
	mov [esp + 4], eax 
	mov eax, [esp + 12]
	mov ebx, [esp + 8]
	cmp ebx, 1
	jne exponentialB

exponentialB:
	mov eax, [esp + 12]
	imul eax, [esp + 4]
	mov [esp + 4], eax
	mov eax, [esp + 8]
	sub eax, 1
	mov [esp + 8], eax
	mov eax, [esp + 8]
	cmp eax, 1
	jg exponentialB
	je answer
	ret

answer:
	mov eax, [esp + 4]
	call print_int
	call print_nl
	ret
	
exponentialC:	      
	mov eax, 'O'
	call print_char
	mov eax, 'p'
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 12]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, [esp + 4]
	call print_char
	mov eax, ' '
	call print_char
	mov eax, [esp + 8]
	call print_int
	mov eax, ' '
	call print_char
	mov eax, '='
	call print_char
	mov eax, ' '
	call print_char	      
	ret			;returns to main


	
	
	
;; Compare loop function
compare:
	mov ecx, [esp + 4]
	mov ebx, '+'
	
	cmp ecx, ebx
	je addition

	mov ebx, '*'
	cmp ecx, ebx
	je multiplication

	mov ebx, '^'
	cmp ecx, ebx
	je exponential

	ret

prompt:
	call read_int
	mov [input1], eax
	push eax
	call read_int
	mov [input2], eax
	push eax

	call read_char
	call read_char
	mov [operation], al
	mov eax, [operation]
	push eax

	call compare

	pop eax
	pop eax
	pop eax
	add esp, 12

	mov eax, [operation]
	mov ecx, 'E'
	cmp eax, ecx
	jne prompt

	ret
