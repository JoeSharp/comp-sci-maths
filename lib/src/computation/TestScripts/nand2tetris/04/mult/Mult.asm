// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.
// numberOfTimes = R[0]
// R[1] = base number
@total // 16
M=0

@R0
D=M+1
@n // 17
M=D

(LOOP)
@n
M=M-1
D=M
@END
D;JEQ // if n === 0, GOTO END

@total
D=M
@R1
D=D+M
@total
M=D

@LOOP
0;JEQ


(END)
@END
0;JMP