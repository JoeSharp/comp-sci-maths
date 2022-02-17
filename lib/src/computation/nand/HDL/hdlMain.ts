import * as logger from 'winston';

logger.info('Hello HDL')

const codeLine = "Nand(a=notA, b=notB, out=out);"
const funky = 'boo'

const codeLineRegex = /(?<chip_name>[A-Za-z]+)\((?<parameters>([a-zA-Z]+=[a-zA-Z]+(?:,\s){0,1})+)\);/;

const found = codeLine.match(codeLineRegex);

logger.info(JSON.stringify(found));

logger.info(JSON.stringify(found.groups));

const found2 = funky.match(codeLineRegex);
logger.info('Found 2' + JSON.stringify(found2));

