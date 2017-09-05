%include "asm_io.inc"
segment .data 			;initialized variables
	outmsg1 db "The minimum is ", 0 ;first message outputed
	outmsg2 db "The maximum is ", 0 ;second predifined message
	outmsg3 db "The product is ", 0 ;product message
	outmsg4 db "The GCD is ", 0	;gcd message

segment .bss			;input that is not predefined
	input1 resd 1		;first input read in from user
	input2 resd 1		;second input read in from user
	input3 resd 1		;third input read in from user
	minimum resd 1		;variable to store minimum value
	maximum resd 1		;variable to store max value
	product resd 1		;variable to store product
	gcd resd 1		;variable to store gcd

segment .text
        global  asm_main
asm_main:
        enter   0,0               ; setup routine
        pusha
	;***************CODE STARTS HERE***************************

	;; Read in numbers from user
	call read_int		;read first number
	mov [input1], eax	;move readin number to input1
	call read_int		;read 2nd number
	mov [input2], eax	;move deadin number to input2
	call read_int		;read 3rd number
	mov [input3], eax	;move readin number to input3

	;; multiply inputs to get product
	imul eax, [input1]	;multiply input 3 with input1 put in eax
	imul eax, [input2]	;multiply answer with input2 put in eax
	mov [product], eax	;total product of 3 numbers stored in product

	;; Comparisons to find max and min
	mov eax, [input1]	;mov input1 into eax for comparison
	mov ebx, [input2]	;move input 2 into ebx for comparison
	cmp eax, ebx	 	;does flag comparison between first 2 numbers
	jl eaxless1		;if first is less than second go to eaxless
	jge ebxless1		;if second is less than first go to ebxless

	;; Case 1 < 2 (from first part)
eaxless1:
	mov ebx, [input3]	;input 3 replaces greater number to b compared
	cmp eax, ebx		;check which is less 1 or 3
	jl final1		;if input 1 is less go to final1
	jge final2		;if input3 is less go to final2

	;; Case 1 < 2 and 1 < 3 (2nd part)
final1:				;1 < 2,  1 < 3, 1 is least, but compare 2 and 3
	mov [minimum], eax	;moves minimum value into variable
	mov eax, [input2]	;moves input 2 into eax to b compared
	mov ebx, [input3]	;moves input 3 into ebx to b compared
	cmp eax, ebx		;compares input 2 and 3
	jl greatest1		;if input 2 is less go to greatest1
	jge greatest2		;if input 3 is less go to greatest2

	;; Case 1 < 2 and 3 < 1::1 must be largest no need for additional check
final2:				;3 < 1, 1 < 2, 3 is least but compare 1 and 2
	mov [minimum], ebx      ;move input 3 into minimum
	mov ebx, [input2]	;move input2 into ebx to move into variable
	mov [maximum], ebx	;move input2 into maximum

	;; Case 1 < 2 and 2 < 3. 3 is now greatest (3rd part)
greatest1:			;2 < 3 so 3 is greatest; input 3 in ebx
	mov [maximum], ebx	;move input3 into maximum
	cmp eax, ebx		;comparison to bring functions together
	jl endcomp		;endcomp is function all parts go to

	;; Case 1 < 2 and 3 < 2. 2 is now greatest (3rd part)
greatest2:			;3 < 2 so 2 is greatest; input 2 in eax
	mov [maximum], eax	;move input2 into maximum
	cmp eax, ebx		;comparison to bring functions together
	jge endcomp		;endcomp is function all parts go to

	;; Case 2 < 1 (From first part)
ebxless1:			;2 < 1
	mov eax, [input3]	;input 3 replaces greater number to b compared
	cmp eax, ebx		;check which is less 2 or 3
	jl final3		;if input 3 is less go to final 3
	jge final4		;if input 2 is less go to final 4

	;; Case 2 < 1 and 3 < 2 (part 2)
final3:				;2 < 1, 3 < 2, input3 is min (eax)
	mov [minimum], eax	;moves 3 into minimum
	mov eax, [input1]	;input 1 must be greatest (above logic)
	mov [maximum], eax	;eax now holds input1 it goes into maximum
	mov ebx, [input2]	;move input2 into ebx for comparison
	cmp eax, ebx		;comparison to bring functions together
	jge endcomp		;endcomp is function all pieces go to

	;; Case 2 < 1 and 2 < 3 (part 2)
final4:				;2 < 1, 2 < 3
	mov [minimum], ebx	;move 2 into minimum
	mov ebx, [input1]	;compare input3 and input1
	cmp eax, ebx		;compare 3 and 1
	jl greatest3		;if input 3 is less go greatest3
	jge greatest4		;if input 1 is less go greatest4

	;; Case 2 < 1 and 3 < 1  (part 3)
greatest3:			;3 < 1 so 1 is greatest; 1 is in ebx
	mov [maximum], ebx	;move input 1 into maximum
	cmp eax, ebx		;comparison to bring back together
	jl endcomp		;all functions go to endcomp

	;; Case 2 < 1 and 1 < 3 (part 3) 
greatest4:			;1 < 3 so 3 is greatest; 3 is in eax
	mov [maximum], eax	;move input 3 into maximum
	cmp eax, ebx		;comparison to bring together
	jge endcomp		;function brought together


	;; End of Comparisons for min and max
	;; Output all variables known thus far
endcomp:			;function all comparisons go to
	mov eax, outmsg1	;moves first message to eax for output
	call print_string	;prints message of min value
	mov eax, [minimum]	;moves min value to eax for output
	call print_int		;prints min value
	call print_nl		;prints newline
	mov eax, outmsg2	;moves second message to eax for output
	call print_string	;prints message of max value
	mov eax, [maximum]	;moves max value to eax for output
	call print_int		;prints max value
	call print_nl		;prints newline
	mov eax, outmsg3	;moves third message to eax for ouput
	call print_string	;prints message of product
	mov eax, [product]	;moves product to eax for output
	call print_int		;prints product value
	call print_nl		;prints newline



	
	;; All is correct to this point. time for GCD!!
	mov eax, [input1] 	;get input 1 in eax for comparison
	mov ebx, [input2]	;get input 2 in ebx for comparison
	cmp eax, ebx		;compare input1 and input2
	jl lessgcd		;if input1 is less go to less gcd
	jg greatergcd		;if input2 is less go to 
	je part2

	;; Recursive function for when 1 < 2 
lessgcd:			;if input1 is less than input2
	sub ebx, eax		;subtract input1 from input2
	cmp eax, ebx		;check again
	jl lessgcd		;if less repeat this function
	jg greatergcd		;if greater hop to greater function
	je part2		;if equal hop to part 2

	;; Recursive function for when 2 < 1
greatergcd:			;if input2 is less than input1
	sub eax, ebx		;subtract input2 from input1
	cmp eax, ebx		;compare again
	jl lessgcd		;if less hop to less function
	jg greatergcd		;if greater repeat this function
	je part2		;if equal hop to part 2

	;; When equal move on and add 3rd number
part2:				;once the numbers are equal gcd is found
	mov ebx, [input3]	;must find gcd with 3rd number
	cmp eax, ebx		;compare with new number
	jl round2less		;if less go to next less function
	jg round2greater	;if greater go to next greater function
	je part3		;hop to part 3

	;; New recursive function 1 < 2
round2less:			;This function is same as lessgcd except
	sub ebx, eax		;that it goes to part 3 once equal. couldnt
	cmp eax, ebx		;repeat old function or would get infinite
	jl round2less		;loop.
	jg round2greater
	je part3

	;; New recursive function 2 < 3
round2greater:			;This function is same as greatergcd except
	sub eax, ebx		;that it goes to part 3 once equal. couldnt
	cmp eax, ebx		;repeat old function or would get infitie
	jl round2less		;loop.
	jg round2greater
	je part3

	;; Once Equal, common denominator is found for all 3 numbers
	;; Time to output the answer and message.
part3:
	mov [gcd], eax		;move the new answer into variable gcd
	mov eax, outmsg4	;move last message into eax for output
	call print_string	;print message for gcd
	mov eax, [gcd]		;move gcd answer into eax
	call print_int		;print gcd answer
	call print_nl		;print a newline

	;***************CODE ENDS HERE*****************************
        popa
        mov     eax, 0            ; return back to C
        leave                     
        ret
