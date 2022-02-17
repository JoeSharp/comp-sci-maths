// SOURCE FILE BasicTest.vm
// push constant 10
@10
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop local 0
@LCL
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
// push constant 21
@21
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 22
@22
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop argument 2
@ARG
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
// pop argument 1
@ARG
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
// push constant 36
@36
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop this 6
@THIS
D=M
@6
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
// push constant 42
@42
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 45
@45
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop that 5
@THAT
D=M
@5
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
// pop that 2
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
// push constant 510
@510
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop temp 6
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@R11
M=D
// push local 0
@LCL
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
// push that 5
@THAT
D=M
@5
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
// push this 6
@THIS
D=M
@6
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
// push this 6
@THIS
D=M
@6
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
// push temp 6
@R11
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