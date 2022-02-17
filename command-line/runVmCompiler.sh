#yarn build 
echo "Memory Access - Super Basic Test" 
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/SuperBasicTest/ \
    --asm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/SuperBasicTest/SuperBasicTest.asm

echo "Memory Access - Basic Test" 
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/BasicTest/ \
    --asm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/BasicTest/BasicTest.asm

echo "Memory Access - Pointer Test"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/PointerTest/ \
    --asm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/PointerTest/PointerTest.asm

echo "Memory Access - Static Test"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/StaticTest/ \
    --asm=./src/computation/TestScripts/nand2tetris/07/MemoryAccess/StaticTest/StaticTest.asm


echo "Stack Arithmetic - Simple Add"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/07/StackArithmetic/SimpleAdd/ \
    --asm=./src/computation/TestScripts/nand2tetris/07/StackArithmetic/SimpleAdd/SimpleAdd.asm

echo "Stack Arithmetic - Stack Test"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/07/StackArithmetic/StackTest/ \
    --asm=./src/computation/TestScripts/nand2tetris/07/StackArithmetic/StackTest/StackTest.asm

echo "Program Flow - Super Basic Loop"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/08/ProgramFlow/SuperBasicLoop/ \
    --asm=./src/computation/TestScripts/nand2tetris/08/ProgramFlow/SuperBasicLoop/SuperBasicLoop.asm

echo "Program Flow - Basic Loop"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/08/ProgramFlow/BasicLoop/ \
    --asm=./src/computation/TestScripts/nand2tetris/08/ProgramFlow/BasicLoop/BasicLoop.asm

echo "Program Flow - Fibonacci Series"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/08/ProgramFlow/FibonacciSeries/ \
    --asm=./src/computation/TestScripts/nand2tetris/08/ProgramFlow/FibonacciSeries/FibonacciSeries.asm

echo "Function Calls - Simple Function"
node dist/main.js hack-vm-compiler \
    --vm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/SimpleFunction/ \
    --asm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/SimpleFunction/SimpleFunction.asm \
    --cpu

echo "Function Calls - Fibonacci Element"
node dist/main.js hack-vm-compiler \
   --vm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/FibonacciElement/ \
   --asm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/FibonacciElement/FibonacciElement.asm

echo "Function Calls - Nested Call"
node dist/main.js hack-vm-compiler \
   --vm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/NestedCall/ \
   --asm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/NestedCall/NestedCall.asm

echo "Function Calls - Statics Test"
node dist/main.js hack-vm-compiler \
   --vm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/StaticsTest/ \
   --asm=./src/computation/TestScripts/nand2tetris/08/FunctionCalls/StaticsTest/StaticsTest.asm