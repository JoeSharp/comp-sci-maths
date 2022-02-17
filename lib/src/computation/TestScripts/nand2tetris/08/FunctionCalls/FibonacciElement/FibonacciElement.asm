@Sys.vm.Sys.init
0;JMP
// SOURCE FILE Main.vm
// function Main.fibonacci 0
(Main.vm.Main.fibonacci)
// push argument 0
@ARG
D=M
@0
A=D+A
D=M
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 2
@2
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// lt                     // checks if n<2
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - pop to M
// - decrement pointer SP
@SP
M=M-1
A=M
// -- the operation itself
// - comparison operation
D=M-D
@IsTrue_1
// -- the comparison operation itself
D;JLT
D=0
@IsDone_2
0;JMP
(IsTrue_1)
D=-1
(IsDone_2)
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// if-goto IF_TRUE
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@IF_TRUE
D;JNE
// goto IF_FALSE
@IF_FALSE
0;JMP
// label IF_TRUE          // if n<2, return n
(IF_TRUE)
// push argument 0        
@ARG
D=M
@0
A=D+A
D=M
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// return
// --- Temp 0 = endFrame = LCL
@LCL
D=M
@R5
M=D
// --- Temp 1 = returnAddress = LCL - 5
@5
A=D-A
D=M
@R6
M=D
// --- ARG = pop()
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@ARG
A=M
M=D
// --- SP = ARG + 1
@ARG
D=M
@SP
M=D+1
// Locate endFrame = temp0
// --- THAT  *(endFrame - 1)
@R5
M=M-1
A=M
D=M
@THAT
M=D
// --- THIS  *(endFrame - 2)
@R5
M=M-1
A=M
D=M
@THIS
M=D
// --- ARG  *(endFrame - 3)
@R5
M=M-1
A=M
D=M
@ARG
M=D
// --- LOCAL  *(endFrame - 4)
@R5
M=M-1
A=M
D=M
@LCL
M=D
// --- Retrieve return address and jump
@R6
A=M
0;JMP
// label IF_FALSE         // if n>=2, returns fib(n-2)+fib(n-1)
(IF_FALSE)
// push argument 0
@ARG
D=M
@0
A=D+A
D=M
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 2
@2
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// sub
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - pop to M
// - decrement pointer SP
@SP
M=M-1
A=M
// -- the operation itself
D=M-D
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// call Main.fibonacci 1  // computes fib(n-2)
// -- jump to function Main.vm, Main.fibonacci
@Main.vm.Main.fibonacci.retAddr_3
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@LCL
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@ARG
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@THIS
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@THAT
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// --- reposition ARG to SP - 5 - nArgs 1
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@1
D=D-A
@ARG
M=D
// --- set LCL to SP
// - read pointer SP to D-register
@SP
A=M
D=M
@LCL
M=D
// --- Jump to the function
@Main.vm.Main.fibonacci
0;JMP
// --- Make a place for the return to come back to
(Main.vm.Main.fibonacci.retAddr_3)
// push argument 0
@ARG
D=M
@0
A=D+A
D=M
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 1
@1
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// sub
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - pop to M
// - decrement pointer SP
@SP
M=M-1
A=M
// -- the operation itself
D=M-D
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// call Main.fibonacci 1  // computes fib(n-1)
// -- jump to function Main.vm, Main.fibonacci
@Main.vm.Main.fibonacci.retAddr_4
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@LCL
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@ARG
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@THIS
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@THAT
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// --- reposition ARG to SP - 5 - nArgs 1
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@1
D=D-A
@ARG
M=D
// --- set LCL to SP
// - read pointer SP to D-register
@SP
A=M
D=M
@LCL
M=D
// --- Jump to the function
@Main.vm.Main.fibonacci
0;JMP
// --- Make a place for the return to come back to
(Main.vm.Main.fibonacci.retAddr_4)
// add                    // returns fib(n-1) + fib(n-2)
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - pop to M
// - decrement pointer SP
@SP
M=M-1
A=M
// -- the operation itself
D=D+M
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// return
// --- Temp 0 = endFrame = LCL
@LCL
D=M
@R5
M=D
// --- Temp 1 = returnAddress = LCL - 5
@5
A=D-A
D=M
@R6
M=D
// --- ARG = pop()
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@ARG
A=M
M=D
// --- SP = ARG + 1
@ARG
D=M
@SP
M=D+1
// Locate endFrame = temp0
// --- THAT  *(endFrame - 1)
@R5
M=M-1
A=M
D=M
@THAT
M=D
// --- THIS  *(endFrame - 2)
@R5
M=M-1
A=M
D=M
@THIS
M=D
// --- ARG  *(endFrame - 3)
@R5
M=M-1
A=M
D=M
@ARG
M=D
// --- LOCAL  *(endFrame - 4)
@R5
M=M-1
A=M
D=M
@LCL
M=D
// --- Retrieve return address and jump
@R6
A=M
0;JMP
// SOURCE FILE Sys.vm
// function Sys.init 0
(Sys.vm.Sys.init)
// push constant 4
@4
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// call Main.fibonacci 1   // computes the 4'th fibonacci element
// -- jump to function Sys.vm, Main.fibonacci
@Sys.vm.Main.fibonacci.retAddr_5
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@LCL
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@ARG
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@THIS
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
@THAT
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// --- reposition ARG to SP - 5 - nArgs 1
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@1
D=D-A
@ARG
M=D
// --- set LCL to SP
// - read pointer SP to D-register
@SP
A=M
D=M
@LCL
M=D
// --- Jump to the function
@Sys.vm.Main.fibonacci
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Main.fibonacci.retAddr_5)
// label WHILE
(WHILE)
// goto WHILE              // loops infinitely
@WHILE
0;JMP