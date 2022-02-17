import { simpleLogger } from "common";

// We can create a list
const colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

// Then iterate over the items in the list using the forEach function on array
simpleLogger.info('These are the colours of the rainbow')
colours.forEach(colour => {
    simpleLogger.info(colour);
})