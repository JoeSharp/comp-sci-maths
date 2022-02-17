// SOURCE FILE FibonacciSeries.vm
// push argument 1
@ARG
D=M
@1
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
// pop pointer 1           // that = argument[1]
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@THAT
M=D
// push constant 0
@0
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop that 0              // first element in the series = 0
@THAT
D=M
@0
D=D+A
@R5
M=D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - write D-register to pointer R5
@R5
A=M
M=D
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
// pop that 1              // second element in the series = 1
@THAT
D=M
@1
D=D+A
@R5
M=D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - write D-register to pointer R5
@R5
A=M
M=D
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
// pop argument 0          // num_of_elements -= 2 (first 2 elements are set)
@ARG
D=M
@0
D=D+A
@R5
M=D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - write D-register to pointer R5
@R5
A=M
M=D
// label MAIN_LOOP_START
(MAIN_LOOP_START)
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
// if-goto COMPUTE_ELEMENT // if num_of_elements > 0, goto COMPUTE_ELEMENT
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@COMPUTE_ELEMENT
D;JNE
// goto END_PROGRAM        // otherwise, goto END_PROGRAM
@END_PROGRAM
0;JMP
// label COMPUTE_ELEMENT
(COMPUTE_ELEMENT)
// push that 0
@THAT
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
// push that 1
@THAT
D=M
@1
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
// add
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
// pop that 2              // that[2] = that[0] + that[1]
@THAT
D=M
@2
D=D+A
@R5
M=D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - write D-register to pointer R5
@R5
A=M
M=D
// push pointer 1
@THAT
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
// add
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
// pop pointer 1           // that += 1
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@THAT
M=D
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
// pop argument 0          // num_of_elements--
@ARG
D=M
@0
D=D+A
@R5
M=D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
// - write D-register to pointer R5
@R5
A=M
M=D
// goto MAIN_LOOP_START
@MAIN_LOOP_START
0;JMP
// label END_PROGRAM
(END_PROGRAM)