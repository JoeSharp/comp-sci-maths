@Sys.vm.Sys.init
0;JMP
// SOURCE FILE Sys.vm
// function Sys.init 0
(Sys.vm.Sys.init)
// push constant 4000	// test THIS and THAT context save
@4000
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop pointer 0
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@THIS
M=D
// push constant 5000
@5000
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop pointer 1
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
// call Sys.main 0
// -- jump to function Sys.vm, Sys.main
@Sys.vm.Sys.main.retAddr_1
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
@Sys.vm.Sys.main
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Sys.main.retAddr_1)
// pop temp 1
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@R6
M=D
// label LOOP
(LOOP)
// goto LOOP
@LOOP
0;JMP
// function Sys.main 5
(Sys.vm.Sys.main)
D=0
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
D=0
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
D=0
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
D=0
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
D=0
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// push constant 4001
@4001
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop pointer 0
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@THIS
M=D
// push constant 5001
@5001
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop pointer 1
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
// push constant 200
@200
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop local 1
@LCL
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
// push constant 40
@40
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop local 2
@LCL
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
// pop local 3
@LCL
D=M
@3
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
// push constant 123
@123
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// call Sys.add12 1
// -- jump to function Sys.vm, Sys.add12
@Sys.vm.Sys.add12.retAddr_2
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
@Sys.vm.Sys.add12
0;JMP
// --- Make a place for the return to come back to
(Sys.vm.Sys.add12.retAddr_2)
// pop temp 0
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
// push local 1
@LCL
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
// push local 2
@LCL
D=M
@2
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
// push local 3
@LCL
D=M
@3
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
// push local 4
@LCL
D=M
@4
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
// function Sys.add12 0
(Sys.vm.Sys.add12)
// push constant 4002
@4002
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop pointer 0
// - pop to D
// - decrement pointer SP
@SP
M=M-1
// - read pointer SP to D-register
@SP
A=M
D=M
@THIS
M=D
// push constant 5002
@5002
D=A
// - push from D
// - write D-register to pointer SP
@SP
A=M
M=D
// - increment pointer SP
@SP
M=M+1
// pop pointer 1
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
// push constant 12
@12
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