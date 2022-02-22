import linkedListReducer, { getInitialLinkedListState, linkedListGet, linkedListGetAll } from "./linkedListReducer";

describe("Linked List (Functional)", () => {
    test.only("Just Append", () => {
        let myList = getInitialLinkedListState();

        myList = linkedListReducer(myList, { type: 'append', value: 'Joe' }); // Joe
        myList = linkedListReducer(myList, { type: 'append', value: 'Kate' }); // Joe, Kate
        myList = linkedListReducer(myList, { type: 'append', value: 'Tom' }); // Joe, Kate, Tom
        myList = linkedListReducer(myList, { type: 'append', value: 'Indigo' }); // Joe, Kate, Tom, Indigo

        const items = linkedListGetAll(myList);
        expect(items).toStrictEqual(["Joe", "Kate", "Tom", "Indigo"]);

    })

    test("Normal Use", () => {
        let myList = getInitialLinkedListState();

        myList = linkedListReducer(myList, { type: 'append', value: 'Joe' }); // Joe
        myList = linkedListReducer(myList, { type: 'append', value: 'Kate' }); // Joe, Kate
        myList = linkedListReducer(myList, { type: 'insert', index: 1, value: 'Indigo' }); // Joe, Indigo, Kate
        myList = linkedListReducer(myList, { type: 'insert', index: 1, value: 'Tom' }); // Joe, Tom, Indigo, Kate
        myList = linkedListReducer(myList, { type: 'append', value: 'Kirsten' }); // Joe, Tom, Indigo, Kate, Kirsten

        const items = linkedListGetAll(myList);
        expect(items).toStrictEqual(["Joe", "Tom", "Indigo", "Kate", "Kirsten"]);

        myList = linkedListReducer(myList, { type: 'remove', index: 2 });
        expect(myList.lastResult).toBe("Indigo");
        const get2 = linkedListGet(myList, 2);
        expect(get2).toBe("Kate");

        myList = linkedListReducer(myList, { type: 'removeMatch', match: (i) => i === "Tom" });
        expect(myList.lastResult).toBe("Tom");
        const get2Again = linkedListGet(myList, 2);
        expect(get2Again).toBe("Kirsten");

        // Check that iteration works
        const asArr = linkedListGetAll(myList);
        expect(asArr).toEqual(["Joe", "Kate", "Kirsten"]);
    });
})


