// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/08/ProgramFlow/BasicLoop/BasicLoopVME.tst

load SuperBasicLoop.vm,
output-file SuperBasicLoop.out,
compare-to SuperBasicLoop.cmp,
output-list RAM[0]%D1.6.1 RAM[256]%D1.6.1;

set sp 256,
set local 300,
set argument 400,
set argument[0] 3,

repeat 33 {
  vmstep;
}

output;
