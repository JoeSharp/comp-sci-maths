import simpleLogger from "simpleLogger";

simpleLogger.info('Hello HDL')

const codeLine = "Nand(a=notA, b=notB, out=out);"
const funky = 'boo'

const codeLineRegex = /(?<chip_name>[A-Za-z]+)\((?<parameters>([a-zA-Z]+=[a-zA-Z]+(?:,\s){0,1})+)\);/;

const found = codeLine.match(codeLineRegex);

simpleLogger.info(JSON.stringify(found));

simpleLogger.info(JSON.stringify(found.groups));

const found2 = funky.match(codeLineRegex);
simpleLogger.info('Found 2' + JSON.stringify(found2));

