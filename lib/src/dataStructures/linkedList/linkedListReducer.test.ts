import linkedListReducer, { getInitialLinkedListState, linkedListGet, linkedListGetAll } from "./linkedListReducer";

describe("Linked List (Functional)", () => {
    test("Just Append", () => {
        let myList = getInitialLinkedListState();

        myList = linkedListReducer(myList, { type: 'insert', logicalIndex: 0, value: 'Joe' }); // Joe
        myList = linkedListReducer(myList, { type: 'append', value: 'Kate' }); // Joe, Kate
        myList = linkedListReducer(myList, { type: 'append', value: 'Tom' }); // Joe, Kate, Tom
        myList = linkedListReducer(myList, { type: 'append', value: 'Indigo' }); // Joe, Kate, Tom, Indigo

        const items = linkedListGetAll(myList);
        expect(items).toStrictEqual(["Joe", "Kate", "Tom", "Indigo"]);

        const itemsGotIndividually = Array(4)
            .fill(null)
            .map((_, i) => linkedListGet(myList, i))
            .map(({ value }) => value);
        expect(itemsGotIndividually).toStrictEqual(["Joe", "Kate", "Tom", "Indigo"]);
    })

    test("Append and Remove at index", () => {
        let myList = getInitialLinkedListState();

        myList = linkedListReducer(myList, { type: 'append', value: 'Joe' }); // Joe
        myList = linkedListReducer(myList, { type: 'append', value: 'Kate' }); // Joe, Kate
        myList = linkedListReducer(myList, { type: 'append', value: 'Tom' }); // Joe, Kate, Tom
        myList = linkedListReducer(myList, { type: 'append', value: 'Indigo' }); // Joe, Kate, Tom, Indigo
        myList = linkedListReducer(myList, { type: 'append', value: 'Kirsten' }); // Joe, Kate, Tom, Indigo, Kirsten

        myList = linkedListReducer(myList, { type: 'remove', logicalIndex: 1 }) // Kate
        myList = linkedListReducer(myList, { type: 'remove', logicalIndex: 3 }) // Kirsten

        const itemsGotIndividually = Array(3)
            .fill(null)
            .map((_, i) => linkedListGet(myList, i))
            .map(({ value }) => value);
        expect(itemsGotIndividually).toStrictEqual(["Joe", "Tom", "Indigo"]);
    })

    test("Append and Remove Match", () => {
        let myList = getInitialLinkedListState();

        myList = linkedListReducer(myList, { type: 'append', value: 'Joe' }); // Joe
        myList = linkedListReducer(myList, { type: 'append', value: 'Kate' }); // Joe, Kate
        myList = linkedListReducer(myList, { type: 'append', value: 'Tom' }); // Joe, Kate, Tom
        myList = linkedListReducer(myList, { type: 'append', value: 'Indigo' }); // Joe, Kate, Tom, Indigo
        myList = linkedListReducer(myList, { type: 'append', value: 'Kirsten' }); // Joe, Kate, Tom, Indigo, Kirsten

        myList = linkedListReducer(myList, { type: 'removeMatch', match: (d) => d === "Kate" })
        myList = linkedListReducer(myList, { type: 'removeMatch', match: (d) => d === "Tom" })

        const itemsGotIndividually = Array(3)
            .fill(null)
            .map((_, i) => linkedListGet(myList, i))
            .map(({ value }) => value);
        expect(itemsGotIndividually).toStrictEqual(["Joe", "Indigo", "Kirsten"]);
    })

    test("All Usages", () => {
        let myList = getInitialLinkedListState();

        myList = linkedListReducer(myList, { type: 'append', value: 'Joe' }); // Joe
        myList = linkedListReducer(myList, { type: 'append', value: 'Kate' }); // Joe, Kate
        myList = linkedListReducer(myList, { type: 'insert', logicalIndex: 1, value: 'Indigo' }); // Joe, Indigo, Kate
        myList = linkedListReducer(myList, { type: 'insert', logicalIndex: 1, value: 'Tom' }); // Joe, Tom, Indigo, Kate

        myList = linkedListReducer(myList, { type: 'append', value: 'Kirsten' }); // Joe, Tom, Indigo, Kate, Kirsten

        const items = linkedListGetAll(myList);
        expect(items).toStrictEqual(["Joe", "Tom", "Indigo", "Kate", "Kirsten"]);

        myList = linkedListReducer(myList, { type: 'remove', logicalIndex: 2 });
        expect(myList.lastResult).toBeDefined();
        expect(myList.lastResult.value).toBe("Indigo");
        const get2 = linkedListGet(myList, 2);
        expect(get2.value).toBe("Kate"); // Joe, Tom, Kate, Kirsten

        myList = linkedListReducer(myList, { type: 'removeMatch', match: (i) => i === "Tom" });
        expect(myList.lastResult).toBeDefined();
        expect(myList.lastResult.value).toBe("Tom");
        const get2Again = linkedListGet(myList, 2);
        expect(get2Again.value).toBe("Kirsten");  // Joe, Kate, Kirsten

        // Check that iteration works
        const asArr = linkedListGetAll(myList);
        expect(asArr).toEqual(["Joe", "Kate", "Kirsten"]);
    });
})


