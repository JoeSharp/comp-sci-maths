class LmcMemory {
    contents: number[];

    constructor(size: number = 32) {
        this.contents = Array(size).fill(0);
    }

    set(address: number, value: number) {
        this.checkAddress(address);
        this.contents[address] = value;
    }

    /**
     * Get the contents of a memory location.
     *
     * @param address The address to retrieve
     * @returns The contents of that address
     */
    get(address: number) {
        this.checkAddress(address);
        return this.contents[address];
    }

    /**
     * Private function to validate an address before we try to access it
     * @param address The address to validate
     */
    checkAddress(address: number) {
        if (address < 0 || address > this.contents.length) {
            throw new Error("Invalid memory location")
        }
    }
}

export default LmcMemory;