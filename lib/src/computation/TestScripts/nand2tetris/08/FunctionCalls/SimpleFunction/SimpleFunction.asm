// SOURCE FILE SimpleFunction.vm
// function SimpleFunction.test 2
(SimpleFunction.vm.SimpleFunction.test)
D=0			// CPU line (0)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (1)
A=M			// CPU line (2)
M=D			// CPU line (3)
// - increment pointer SP
@SP			// CPU line (4)
M=M+1			// CPU line (5)
D=0			// CPU line (6)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (7)
A=M			// CPU line (8)
M=D			// CPU line (9)
// - increment pointer SP
@SP			// CPU line (10)
M=M+1			// CPU line (11)
// push local 0
@LCL			// CPU line (12)
D=M			// CPU line (13)
@0			// CPU line (14)
A=D+A			// CPU line (15)
D=M			// CPU line (16)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (17)
A=M			// CPU line (18)
M=D			// CPU line (19)
// - increment pointer SP
@SP			// CPU line (20)
M=M+1			// CPU line (21)
// push local 1
@LCL			// CPU line (22)
D=M			// CPU line (23)
@1			// CPU line (24)
A=D+A			// CPU line (25)
D=M			// CPU line (26)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (27)
A=M			// CPU line (28)
M=D			// CPU line (29)
// - increment pointer SP
@SP			// CPU line (30)
M=M+1			// CPU line (31)
// add
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP			// CPU line (32)
M=M-1			// CPU line (33)
// - read pointer SP to D-register
@SP			// CPU line (34)
A=M			// CPU line (35)
D=M			// CPU line (36)
// - pop to M
// - decrement pointer SP
@SP			// CPU line (37)
M=M-1			// CPU line (38)
A=M			// CPU line (39)
// -- the operation itself
D=D+M			// CPU line (40)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (41)
A=M			// CPU line (42)
M=D			// CPU line (43)
// - increment pointer SP
@SP			// CPU line (44)
M=M+1			// CPU line (45)
// not
// - Unary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP			// CPU line (46)
M=M-1			// CPU line (47)
// - read pointer SP to D-register
@SP			// CPU line (48)
A=M			// CPU line (49)
D=M			// CPU line (50)
// -- the operation itself
D=!D			// CPU line (51)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (52)
A=M			// CPU line (53)
M=D			// CPU line (54)
// - increment pointer SP
@SP			// CPU line (55)
M=M+1			// CPU line (56)
// push argument 0
@ARG			// CPU line (57)
D=M			// CPU line (58)
@0			// CPU line (59)
A=D+A			// CPU line (60)
D=M			// CPU line (61)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (62)
A=M			// CPU line (63)
M=D			// CPU line (64)
// - increment pointer SP
@SP			// CPU line (65)
M=M+1			// CPU line (66)
// add
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP			// CPU line (67)
M=M-1			// CPU line (68)
// - read pointer SP to D-register
@SP			// CPU line (69)
A=M			// CPU line (70)
D=M			// CPU line (71)
// - pop to M
// - decrement pointer SP
@SP			// CPU line (72)
M=M-1			// CPU line (73)
A=M			// CPU line (74)
// -- the operation itself
D=D+M			// CPU line (75)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (76)
A=M			// CPU line (77)
M=D			// CPU line (78)
// - increment pointer SP
@SP			// CPU line (79)
M=M+1			// CPU line (80)
// push argument 1
@ARG			// CPU line (81)
D=M			// CPU line (82)
@1			// CPU line (83)
A=D+A			// CPU line (84)
D=M			// CPU line (85)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (86)
A=M			// CPU line (87)
M=D			// CPU line (88)
// - increment pointer SP
@SP			// CPU line (89)
M=M+1			// CPU line (90)
// sub
// - Binary Arithmetic Operation
// - pop to D
// - decrement pointer SP
@SP			// CPU line (91)
M=M-1			// CPU line (92)
// - read pointer SP to D-register
@SP			// CPU line (93)
A=M			// CPU line (94)
D=M			// CPU line (95)
// - pop to M
// - decrement pointer SP
@SP			// CPU line (96)
M=M-1			// CPU line (97)
A=M			// CPU line (98)
// -- the operation itself
D=M-D			// CPU line (99)
// - push from D
// - write D-register to pointer SP
@SP			// CPU line (100)
A=M			// CPU line (101)
M=D			// CPU line (102)
// - increment pointer SP
@SP			// CPU line (103)
M=M+1			// CPU line (104)
// return
// --- Temp 0 = endFrame = LCL
@LCL			// CPU line (105)
D=M			// CPU line (106)
@R5			// CPU line (107)
M=D			// CPU line (108)
// --- Temp 1 = returnAddress = LCL - 5
@5			// CPU line (109)
A=D-A			// CPU line (110)
D=M			// CPU line (111)
@R6			// CPU line (112)
M=D			// CPU line (113)
// --- ARG = pop()
// - pop to D
// - decrement pointer SP
@SP			// CPU line (114)
M=M-1			// CPU line (115)
// - read pointer SP to D-register
@SP			// CPU line (116)
A=M			// CPU line (117)
D=M			// CPU line (118)
@ARG			// CPU line (119)
A=M			// CPU line (120)
M=D			// CPU line (121)
// --- SP = ARG + 1
@ARG			// CPU line (122)
D=M			// CPU line (123)
@SP			// CPU line (124)
M=D+1			// CPU line (125)
// Locate endFrame = temp0
// --- THAT  *(endFrame - 1)
@R5			// CPU line (126)
M=M-1			// CPU line (127)
A=M			// CPU line (128)
D=M			// CPU line (129)
@THAT			// CPU line (130)
M=D			// CPU line (131)
// --- THIS  *(endFrame - 2)
@R5			// CPU line (132)
M=M-1			// CPU line (133)
A=M			// CPU line (134)
D=M			// CPU line (135)
@THIS			// CPU line (136)
M=D			// CPU line (137)
// --- ARG  *(endFrame - 3)
@R5			// CPU line (138)
M=M-1			// CPU line (139)
A=M			// CPU line (140)
D=M			// CPU line (141)
@ARG			// CPU line (142)
M=D			// CPU line (143)
// --- LOCAL  *(endFrame - 4)
@R5			// CPU line (144)
M=M-1			// CPU line (145)
A=M			// CPU line (146)
D=M			// CPU line (147)
@LCL			// CPU line (148)
M=D			// CPU line (149)
// --- Retrieve return address and jump
@R6			// CPU line (150)
A=M			// CPU line (151)
0;JMP			// CPU line (152)