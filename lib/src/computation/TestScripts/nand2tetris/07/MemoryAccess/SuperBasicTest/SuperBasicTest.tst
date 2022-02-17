// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/BasicTest/BasicTest.tst

load SuperBasicTest.asm,
output-file SuperBasicTest.out,
compare-to SuperBasicTest.cmp,
output-list RAM[0]%D1.6.1 RAM[300]%D1.6.1;

set RAM[0] 256,   // stack pointer
set RAM[1] 300,   // base address of the local segment
set RAM[2] 400,   // base address of the argument segment
set RAM[3] 3000,  // base address of the this segment
set RAM[4] 3010,  // base address of the that segment

repeat 35 {      // enough cycles to complete the execution
  ticktock;
}

// Outputs the stack base and some values
// from the tested memory segments
output;
