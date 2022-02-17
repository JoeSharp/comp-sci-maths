// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/BasicTest/BasicTestVME.tst

load SuperBasicTest.vm,
output-file SuperBasicTest.out,
compare-to SuperBasicTest.cmp,
output-list RAM[0]%D1.6.1 
            RAM[300]%D1.6.1;
  
set sp 256,        // stack pointer
set local 300,     // base address of the local segment
set argument 400,  // base address of the argument segment
set this 3000,     // base address of the this segment
set that 3010;     // base address of the that segment

repeat 2 {        // SuperBasicTest.vm has 2 instructions
  vmstep;
}

// Outputs the stack base and some values
// from the tested memory segments
output;
