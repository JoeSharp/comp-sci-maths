import HashTable from "./HashTable";

describe("Hash Table", () => {
    test("Simple", () => {
        // small capacity to ensure clashing
        const hashTable = new HashTable(
            5)
        const items = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"];

        items.forEach(item => hashTable.addItem(item));

        expect(hashTable.contains('Monday')).toBeTruthy();
        expect(hashTable.contains('Funday')).toBeFalsy();
    })
});