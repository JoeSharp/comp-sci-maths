// SOURCE FILE StaticTest.vm
// push constant 111
@111
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 333
@333
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 888
@888
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop static 8
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@StaticTest.vm.8
M=D
// pop static 3
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@StaticTest.vm.3
M=D
// pop static 1
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@StaticTest.vm.1
M=D
// push static 3
@StaticTest.vm.3
D=M
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push static 1
@StaticTest.vm.1
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
// push static 8
@StaticTest.vm.8
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