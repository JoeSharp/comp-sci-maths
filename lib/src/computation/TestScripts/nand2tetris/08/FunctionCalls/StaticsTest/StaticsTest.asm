@Sys.vm.Sys.init
0;JMP
// SOURCE FILE Class1.vm
// function Class1.set 0
(Class1.vm.Class1.set)
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
// pop static 0
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@Class1.vm.0
M=D
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
// pop static 1
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@Class1.vm.1
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
// function Class1.get 0
(Class1.vm.Class1.get)
// push static 0
@Class1.vm.0
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
@Class1.vm.1
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
// SOURCE FILE Class2.vm
// function Class2.set 0
(Class2.vm.Class2.set)
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
// pop static 0
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@Class2.vm.0
M=D
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
// pop static 1
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@Class2.vm.1
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
// function Class2.get 0
(Class2.vm.Class2.get)
// push static 0
@Class2.vm.0
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
@Class2.vm.1
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
// push constant 6
@6
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 8
@8
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// call Class1.set 2
// -- jump to function Sys.vm, Class1.set
@Sys.vm.Class1.set.retAddr_1
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
// --- reposition ARG to SP - 5 - nArgs 2
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@2
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
@Sys.vm.Class1.set
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Class1.set.retAddr_1)
// pop temp 0 // Dumps the return value
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@R5
M=D
// push constant 23
@23
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 15
@15
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// call Class2.set 2
// -- jump to function Sys.vm, Class2.set
@Sys.vm.Class2.set.retAddr_2
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
// --- reposition ARG to SP - 5 - nArgs 2
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@2
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
@Sys.vm.Class2.set
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Class2.set.retAddr_2)
// pop temp 0 // Dumps the return value
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@R5
M=D
// call Class1.get 0
// -- jump to function Sys.vm, Class1.get
@Sys.vm.Class1.get.retAddr_3
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
// --- reposition ARG to SP - 5 - nArgs 0
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@0
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
@Sys.vm.Class1.get
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Class1.get.retAddr_3)
// call Class2.get 0
// -- jump to function Sys.vm, Class2.get
@Sys.vm.Class2.get.retAddr_4
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
// --- reposition ARG to SP - 5 - nArgs 0
// - read pointer SP to D-register
@SP
A=M
D=M
@5
D=D-A
@0
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
@Sys.vm.Class2.get
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Class2.get.retAddr_4)
// label WHILE
(WHILE)
// goto WHILE
@WHILE
0;JMP