'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');

function traverseInOrder(tree, visit) {
    if (!!tree.leftBranch) {
        traverseInOrder(tree.leftBranch, visit);
    }
    if (!!tree.value) {
        visit(tree.value);
    }
    if (!!tree.rightBranch) {
        traverseInOrder(tree.rightBranch, visit);
    }
}

function traversePostOrder(tree, visit) {
    if (!!tree.leftBranch) {
        traversePostOrder(tree.leftBranch, visit);
    }
    if (!!tree.rightBranch) {
        traversePostOrder(tree.rightBranch, visit);
    }
    if (!!tree.value) {
        visit(tree.value);
    }
}

function traversePreOrder(tree, visit) {
    if (!!tree.value) {
        visit(tree.value);
    }
    if (!!tree.leftBranch) {
        traversePreOrder(tree.leftBranch, visit);
    }
    if (!!tree.rightBranch) {
        traversePreOrder(tree.rightBranch, visit);
    }
}

class LinkedItem {
    constructor(value, nextItem) {
        this.value = value;
        this.nextItem = nextItem;
    }
    setNextItem(item) {
        this.nextItem = item;
    }
    getNextItem() {
        return this.nextItem;
    }
    getValue() {
        return this.value;
    }
}

function isString(x) {
    return typeof x === "string";
}
let nextId = 0;
const generateUniqueId = () => `${nextId++}`;
const generateLineRef = (rawLineRef) => {
    if (rawLineRef === undefined) {
        return {
            id: generateUniqueId()
        };
    }
    if (isString(rawLineRef)) {
        return {
            id: generateUniqueId(),
            originalLine: rawLineRef
        };
    }
    if ('id' in rawLineRef) {
        return rawLineRef;
    }
    else {
        return Object.assign({ id: generateUniqueId() }, rawLineRef);
    }
};
const ROOT_RECURSION_KEY = 50;
const getStringVertex = (value) => ({
    key: value,
    value,
});
const defaultEqualityCheck = (a, b) => a === b;
function simpleSwap(arr, from, to) {
    const swapItem = arr[from];
    arr[from] = arr[to];
    arr[to] = swapItem;
}
// tslint:disable-next-line: no-empty
const emptyObserver = () => { };
// This needs to work for strings and numbers, which is why I cannot use b-a
const anyComparator = (a, b) => {
    if (a > b) {
        return +1;
    }
    else if (b > a) {
        return -1;
    }
    else {
        return 0;
    }
};
/**
 * Comparator function that uses simple arithmetic comparison.
 * based on https://www.w3schools.com/js/js_array_sort.asp
 * If the result is negative a is sorted before b.
 * If the result is positive b is sorted before a.
 * If the result is 0 no changes are done with the sort order of the two values.
 *
 * @param {number | string} a First item
 * @param {number | string} b Second item
 */
const arithmeticComparator = (a, b) => a - b;
const stringComparator = (a, b) => a.localeCompare(b);
class ObservableVersioned {
    constructor() {
        this.version = 0;
        this.tickObserver = emptyObserver;
    }
    setTickObserver(tickObserver) {
        this.tickObserver = tickObserver;
    }
    tickVersion() {
        this.version += 1;
        this.tickObserver();
    }
}

const NO_MATCH = -1;

class LinkedList extends ObservableVersioned {
    constructor() {
        super();
        this.startItem = undefined;
        this.length = 0;
    }
    *[Symbol.iterator]() {
        let cItem = this.startItem;
        while (!!cItem) {
            yield cItem.getValue();
            cItem = cItem.getNextItem();
        }
    }
    size() {
        return this.length;
    }
    toArray() {
        const arr = [];
        for (const i of this) {
            arr.push(i);
        }
        return arr;
    }
    isEmpty() {
        return this.length === 0;
    }
    empty() {
        this.startItem = undefined;
        this.length = 0;
        return this;
    }
    insert(index, item) {
        let inserted = false;
        const newItem = new LinkedItem(item);
        if (index === 0) {
            newItem.setNextItem(this.startItem);
            this.startItem = newItem;
            inserted = true;
        }
        else {
            let tIndex = 1;
            let currentItem = this.startItem;
            while (!!currentItem) {
                if (tIndex === index) {
                    newItem.setNextItem(currentItem.getNextItem());
                    currentItem.setNextItem(newItem);
                    inserted = true;
                    break;
                }
                tIndex += 1;
                currentItem = currentItem.getNextItem();
            }
        }
        if (inserted) {
            this.length += 1;
            this.tickVersion();
        }
        return inserted;
    }
    get(index) {
        let tIndex = 0;
        let cItem = this.startItem;
        while (!!cItem) {
            if (tIndex === index) {
                return cItem.getValue();
            }
            cItem = cItem.getNextItem();
            tIndex += 1;
        }
        return undefined;
    }
    appendAll(...items) {
        items.forEach(i => this.append(i));
        return this;
    }
    append(item) {
        const newItem = new LinkedItem(item);
        if (!!this.startItem) {
            let currentItem = this.startItem;
            while (!!currentItem.getNextItem()) {
                currentItem = currentItem.getNextItem();
            }
            currentItem.setNextItem(newItem);
        }
        else {
            this.startItem = newItem;
        }
        this.length += 1;
        this.tickVersion();
        return this;
    }
    contains(matchFunction) {
        return this.findMatch(matchFunction) !== NO_MATCH;
    }
    findMatch(matchFunction) {
        let index = 0;
        let cItem = this.startItem;
        while (!!cItem) {
            if (matchFunction(cItem.getValue())) {
                return index;
            }
            cItem = cItem.getNextItem();
            index += 1;
        }
        this.tickVersion();
        return NO_MATCH;
    }
    /**
     * Removes
     * @param {function} matchFunction Returns true for the object being removed
     * @returns The removed item
     */
    removeMatch(matchFunction) {
        let removed;
        let index = 0;
        let cItem = this.startItem;
        while (!!cItem) {
            if (matchFunction(cItem.getValue())) {
                removed = this.remove(index);
                break;
            }
            cItem = cItem.getNextItem();
            index += 1;
        }
        this.tickVersion();
        return removed;
    }
    /**
     * Remove an item in a specific position
     * @param {number} index The index of the object to remove
     * @returns The removed item
     */
    remove(index) {
        let removed;
        if (index === 0) {
            if (!!this.startItem) {
                removed = this.startItem.getValue();
                this.startItem = this.startItem.getNextItem();
            }
        }
        else {
            let tIndex = 1;
            let currentItem = this.startItem;
            while (!!currentItem.getNextItem()) {
                if (tIndex === index) {
                    const toRemove = currentItem.getNextItem();
                    if (!!toRemove) {
                        removed = toRemove.getValue();
                        currentItem.setNextItem(toRemove.getNextItem());
                        break;
                    }
                }
                currentItem = currentItem.getNextItem();
                tIndex += 1;
            }
        }
        if (removed) {
            this.length -= 1;
            this.tickVersion();
        }
        return removed;
    }
    toString() {
        // return [this].reduce((acc, curr) => (acc += ` ${curr.getValue()}`), "");
        const arr = [];
        for (const i of this) {
            arr.push(i);
        }
        return arr.join(" ");
    }
}

class Queue extends ObservableVersioned {
    constructor() {
        super();
        this.items = new LinkedList();
    }
    toString() {
        return JSON.stringify(this.items);
    }
    size() {
        return this.items.size();
    }
    getItems() {
        return this.items.toArray();
    }
    empty() {
        this.items.empty();
        return this;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    push(item) {
        this.items.append(item);
        this.tickVersion();
        return this;
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error("Queue Empty");
        }
        this.tickVersion();
        return this.items.remove(0);
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue Empty");
        }
        return this.items.get(0);
    }
}

/**
 * Breadth first and Depth first traversals have a common shape.
 * This function allows us to create generic traversals with different
 * linear data structures.
 *
 * Given a factory for a linear data structure, this function returns
 * a function which can then be used for traversing a graph.
 */
const graphTraversal = (dataStructureFactory) => (graph, startingVertex, visit) => {
    const visited = [];
    const visitDataStructure = dataStructureFactory();
    visitDataStructure.push(startingVertex);
    while (visitDataStructure.size() > 0) {
        const visiting = visitDataStructure.pop();
        if (visiting === undefined)
            break; // shouldn't happen
        // Stack/Queue may contain same vertex twice, if we've already seen it, skip it
        if (!visited.includes(visiting)) {
            visit(graph.getVertex(visiting));
            visited.push(visiting);
        }
        graph.getOutgoing(visiting) // you could attack these in any order
            .filter(n => !visited.includes(n.to.key))
            .forEach(n => visitDataStructure.push(n.to.key));
    }
};

var breadthFirstSearch = graphTraversal(() => new Queue());

class Stack extends ObservableVersioned {
    constructor() {
        super();
        this.stackPointer = 0;
        // Use an array for the items, common exam question
        this.items = [];
    }
    size() {
        return this.stackPointer;
    }
    empty() {
        this.stackPointer = 0;
        return this;
    }
    isEmpty() {
        return this.stackPointer === 0;
    }
    getItems() {
        return this.items.filter((_, i) => i < this.stackPointer);
    }
    toString(itemToString) {
        return `Items: ${this.items.map(itemToString).join('\n\t')}`;
    }
    push(item) {
        this.items[this.stackPointer++] = item;
        this.tickVersion();
        return this;
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack Underflow");
        }
        this.tickVersion();
        return this.items[--this.stackPointer];
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack Underflow");
        }
        return this.items[this.stackPointer - 1];
    }
}

var depthFirstSearch = graphTraversal(() => new Stack());

const defaultUtility = {
    compare: anyComparator,
    observe: emptyObserver,
    swap: simpleSwap,
};
function bubbleSort(inputList, { compare = anyComparator, observe = emptyObserver, swap = simpleSwap, } = defaultUtility) {
    const outputList = [...inputList];
    for (let top = outputList.length - 1; top > 0; top--) {
        observe("Iterating Top Value", outputList, { top });
        let anySwapsMade = false;
        for (let current = 0; current < top; current++) {
            observe("Bubbling", outputList, { top, current });
            if (compare(outputList[current], outputList[current + 1], {
                aIndex: current,
                bIndex: current + 1,
            }) > 0) {
                swap(outputList, current, current + 1);
                anySwapsMade = true;
            }
        }
        if (!anySwapsMade)
            break;
    }
    return outputList;
}

function insertionSort(inputList, { compare = anyComparator, observe = emptyObserver, swap = simpleSwap, }) {
    if (inputList.length < 2) {
        return inputList;
    }
    // Don't modify the input
    const outputList = [...inputList];
    for (let index = 1; index < outputList.length; index++) {
        observe("Placing Item", outputList, { index });
        let itemPlace = index;
        while (itemPlace > 0) {
            const lower = itemPlace - 1;
            const upper = itemPlace;
            observe("Seeking Place", outputList, {
                index,
                lower,
                upper,
            });
            const comparison = compare(outputList[lower], outputList[upper], {
                aIndex: lower,
                bIndex: upper,
            });
            // The compare returns -ve if the first item is 'greater than' the second one
            if (comparison > 0) {
                // Temporary variable to prevent overwrites
                swap(outputList, lower, upper);
            }
            else {
                itemPlace = upper;
                break;
            }
            itemPlace -= 1;
        }
    }
    return outputList;
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition(arr, utilities, low, high) {
    const { compare = anyComparator, observe = emptyObserver, swap = simpleSwap, } = utilities;
    // pivot (Element to be placed at right position)
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element
    for (let j = low; j <= high - 1; j++) {
        observe("Partioning", arr, { pivot: high, low, high, i, j });
        // If current element is smaller than the pivot
        if (compare(arr[j], pivot, { aIndex: j, bIndex: high }) < 0) {
            i++; // increment index of smaller element
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}
/**
 * Recursive form of the quick sort, this expects the various quick sort parameters to be setup.
 * It then calls itself until it is dealing with a one item list.
 *
 * @param arr The input array to sort, this function DOES modify the array
 * @param utilities The various comparison/swapping utilities
 * @param low Pointer to low point of this division of the list
 * @param high Pointer to high point of this division of the list
 */
function quickSortR(arr, utilities, low, high) {
    const { observe = emptyObserver } = utilities;
    observe("Recursing", arr, { low, high });
    if (low < high) {
        /* pi is partitioning index, arr[pi] is now
               at right place */
        const pi = partition(arr, utilities, low, high);
        quickSortR(arr, utilities, low, pi - 1); // Before pi
        quickSortR(arr, utilities, pi + 1, high); // After pi
    }
}
/**
 * The entry point for the quick sort algorithm.
 *
 * @param inputList The list to sort, this function does not modify this list
 * @param utilities The various comparison/swapping uility functions required by observers.
 */
function quickSort(inputList, utilities) {
    if (inputList.length < 2) {
        return inputList;
    }
    // Make a copy, don't change input list
    const outputList = [...inputList];
    // This function recursively operates on the data in place
    quickSortR(outputList, utilities, 0, inputList.length - 1);
    return outputList;
}

function mergeSortR(inputList, utilities, leftPointer, rightPointer, parentKey = ROOT_RECURSION_KEY, levelAdjust = ROOT_RECURSION_KEY / 2) {
    // Have we reached the bottom of our recursion? This is the exit condition!
    if (leftPointer === rightPointer) {
        return [inputList[leftPointer]];
    }
    const { compare = anyComparator, observe = emptyObserver, split = emptyObserver, join = emptyObserver, } = utilities;
    // Calculate the mid point
    const middle = Math.floor((leftPointer + rightPointer) / 2);
    const listA = {
        key: (parentKey - levelAdjust).toString(10),
        data: inputList.slice(leftPointer, middle + 1),
    };
    const listB = {
        key: (parentKey + levelAdjust).toString(10),
        data: inputList.slice(middle + 1, rightPointer + 1),
    };
    observe("Recursing", inputList, { leftPointer, rightPointer, middle });
    split(parentKey.toString(10), listA, listB);
    // Recurse sort both halves to yield the two lists to merge
    const firstHalf = mergeSortR(inputList, utilities, leftPointer, middle, parentKey - levelAdjust, levelAdjust / 2);
    const secondHalf = mergeSortR(inputList, utilities, middle + 1, rightPointer, parentKey + levelAdjust, levelAdjust / 2);
    // Merge the two halves into a single sorted list
    const outputList = [];
    let firstPtr = 0;
    let secondPtr = 0;
    while (firstPtr < firstHalf.length && secondPtr < secondHalf.length) {
        // Comparator returns +ve if the second item is larger than first
        if (compare(firstHalf[firstPtr], secondHalf[secondPtr], {
            aIndex: leftPointer + firstPtr,
            bIndex: middle + secondPtr,
        }) > 0) {
            outputList.push(secondHalf[secondPtr]);
            secondPtr += 1;
        }
        else {
            outputList.push(firstHalf[firstPtr]);
            firstPtr += 1;
        }
    }
    // Push any stragglers from whichever list has items remaining
    firstHalf.filter((_, i) => i >= firstPtr).forEach((i) => outputList.push(i));
    secondHalf
        .filter((_, i) => i >= secondPtr)
        .forEach((i) => outputList.push(i));
    join(listA, listB, outputList);
    return outputList;
}
function mergeSort(inputList, utilities) {
    // Is it worth sorting?
    if (inputList.length < 2) {
        return inputList;
    }
    return mergeSortR(inputList, utilities, 0, inputList.length - 1);
}

class BinaryTree extends ObservableVersioned {
    constructor(compare, value) {
        super();
        this.compare = compare;
        this.value = value;
        this.leftBranch = null;
        this.rightBranch = null;
    }
    clear() {
        this.value = undefined;
        this.leftBranch = null;
        this.rightBranch = null;
    }
    toString() {
        if (this.leftBranch !== null && this.rightBranch !== null) {
            return `(${this.leftBranch.toString()} ${this.value} ${this.rightBranch.toString()})`;
        }
        else if (this.leftBranch !== null) {
            return `(${this.leftBranch.toString()} ${this.value} null)`;
        }
        else if (this.rightBranch !== null) {
            return `(null ${this.value} ${this.rightBranch.toString()})`;
        }
        else {
            return `${this.value}`;
        }
    }
    contains(item) {
        if (this.value === item) {
            return true;
        }
        else if (this.leftBranch && this.leftBranch.contains(item)) {
            return true;
        }
        else if (this.rightBranch && this.rightBranch.contains(item)) {
            return true;
        }
        return false;
    }
    add(item) {
        if (this.value === undefined) {
            this.value = item;
        }
        else if (this.compare(item, this.value) < 0) {
            if (!!this.leftBranch) {
                this.leftBranch.add(item);
            }
            else {
                this.leftBranch = new BinaryTree(this.compare, item);
            }
        }
        else {
            if (!!this.rightBranch) {
                this.rightBranch.add(item);
            }
            else {
                this.rightBranch = new BinaryTree(this.compare, item);
            }
        }
        this.tickVersion();
        return this;
    }
}

class BinaryTreeStrings extends BinaryTree {
    constructor(value) {
        super(stringComparator, value);
    }
}

class BinaryTreeNumber extends BinaryTree {
    constructor(value) {
        super(arithmeticComparator, value);
    }
}

class Graph extends ObservableVersioned {
    /**
     * A constructor that accepts existing graph details.
     * Allows it to be used as a copy constructor.
     *
     * @param graphData Existing graph data
     * @param areVerticesEqual Function to determine if two vertices are equal
     */
    constructor() {
        super();
        this.vertices = [];
        this.edges = [];
    }
    areVerticesEqual(a, b) {
        return a.key === b.key;
    }
    /**
     * Clear any vertices and edges
     * @returns This to allow method chaining
     */
    clearAll() {
        this.vertices = [];
        this.edges = [];
        this.tickVersion();
        return this;
    }
    /**
     * Remove all edges to and from a given vertex, leave the vertex on the graph though
     * @param vertex The vertex to disconnect
     */
    disconnectVertex(vertex) {
        this.removeVertex(vertex);
        this.addVertex(vertex);
        return this;
    }
    /**
     * Register the existence of a vertex,
     * this might be done to represent disconnected vertexs,
     * or to simply prepare the list of vertexs before edges are known.
     *
     * @param vertex The vertex to add
     * @returns this, to allow method chaining
     */
    addVertex(vertex) {
        this.vertices = [
            ...this.vertices.filter(v => !this.areVerticesEqual(v, vertex)),
            vertex
        ];
        this.tickVersion();
        return this;
    }
    /**
     *
     * @param key The string representation of the vertex to search for
     */
    getVertex(key) {
        return this.vertices.find((v) => v.key === key);
    }
    /**
     * Remove the existence of a vertex,
     * will also remove any edges from/to the given vertex.
     * @param vertex The vertex to remove
     */
    removeVertex(vertex) {
        this.vertices = this.vertices.filter((v) => !this.areVerticesEqual(v, vertex));
        this.edges = this.edges.filter(({ from, to }) => !(this.areVerticesEqual(from, vertex) ||
            this.areVerticesEqual(to, vertex)));
        this.tickVersion();
        return this;
    }
    /**
     *
     * @param from The source vertex
     * @param to The destination vertex
     */
    removeEdge(from, to) {
        this.edges = this.edges.filter((l) => !(this.areVerticesEqual(l.from, from) && this.areVerticesEqual(l.to, to)));
        this.tickVersion();
        return this;
    }
    /**
     * Add a new Edge to the graph, one direction only
     * @param {string} from The source vertex
     * @param {string} to The destination vertex
     * @param {number} weight The weighting to attach
     * @returns this to allow method chaining
     */
    addUnidirectionalEdge(from, to, weight = 1.0) {
        this.addVertex(from);
        this.addVertex(to);
        this.edges = [
            ...this.edges.filter((l) => !(this.areVerticesEqual(l.from, from) &&
                this.areVerticesEqual(l.to, to))),
            { from, to, weight },
        ];
        this.tickVersion();
        return this;
    }
    /**
     * Add a new Edge to the graph, add both directions
     * @param {string} from The source vertex
     * @param {string} to The destination vertex
     * @param {number} weight The weighting to attach
     * @returns this to allow method chaining
     */
    addBiDirectionalEdge(from, to, weight = 1.0) {
        this.addVertex(from);
        this.addVertex(to);
        this.edges = [
            ...this.edges.filter((l) => !((this.areVerticesEqual(l.from, from) &&
                this.areVerticesEqual(l.to, to)) ||
                (this.areVerticesEqual(l.from, to) &&
                    this.areVerticesEqual(l.to, from)))),
            { from, to, weight },
            { from: to, to: from, weight },
        ];
        this.tickVersion();
        return this;
    }
    /**
     * Find a Edge between a specific source and destination vertex.
     * @param from The source vertex
     * @param to The destination vertex
     * @returns The Edge if one exists
     */
    getEdge(from, to) {
        return this.edges.find((l) => this.areVerticesEqual(l.from, from) && this.areVerticesEqual(l.to, to));
    }
    /**
     * Access edges coming into a specific vertex
     * @param vertex The from vertex
     */
    getIncoming(toKey) {
        return this.edges.filter((l) => l.to.key === toKey);
    }
    /**
     * Access the edges from a specific vertex
     * @param {string} vertex The from vertex
     */
    getOutgoing(fromKey) {
        return this.edges.filter((l) => l.from.key === fromKey);
    }
    /**
     * This function will look for a Edge between the two vertexs (in that specific direction)
     * It will return the weight of the Edge between the two.
     * If there is no Edge, it will return Infinity.
     *
     * @param {string} from The source vertex
     * @param {string} to The destination vertex
     * @return The weight of the Edge, or Infinity if there is no Edge.
     */
    getEdgeWeight(from, to) {
        const edge = this.getEdge(from, to);
        return !!edge ? edge.weight : Infinity;
    }
    /**
     * Represent the graph as a string, it will use tabs and newlines to space things out.
     */
    toString() {
        return `Graph\n${[...this.vertices]
            .map((vertex) => ({
            from: vertex,
            edges: this.getOutgoing(vertex.key),
        })) // make the entries into a nicer looking object
            .map(({ from, edges }) => `From: ${from.key}\n${edges
            .map(({ to, weight }) => `\tTo: ${to.key} (${weight})`)
            .join("\n")}` // each outgoing Edge should be represented on it's own line
        )
            .join("\n")}`; // Each section will be separated by a newline
    }
}

/**
 * A simple wrapper around the fully capable Graph class which just allows strings to be related, using bi-directional links
 */
class SimpleGraph extends Graph {
    constructor() {
        super();
        this.verticesByValue = {};
    }
    getVertex(vertex) {
        if (!this.verticesByValue[vertex]) {
            this.verticesByValue[vertex] = getStringVertex(vertex);
        }
        return this.verticesByValue[vertex];
    }
    addLink(from, to, weight = 1.0) {
        this.addBiDirectionalEdge(this.getVertex(from), this.getVertex(to), weight);
        return this;
    }
    getConnectedVertices(from) {
        return this.getOutgoing(from)
            .map((x) => x.to)
            .map((x) => x.value);
    }
}

class PriorityQueue extends ObservableVersioned {
    constructor() {
        super();
        this.items = new LinkedList();
    }
    getSize() {
        return this.items.size();
    }
    toString() {
        return this.items.toString();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    toArray() {
        return this.items.toArray();
    }
    /**
     * Removes
     * @param {function} matchFunction Returns true for the object being removed
     * @returns The removed item
     */
    removeMatch(matchFunction) {
        this.tickVersion();
        return this.items.removeMatch(matchFunction);
    }
    enqueue(newItem) {
        let index = 0;
        for (const item of this.items) {
            if (newItem.priority > item.priority) {
                // Insert item at this point and return
                this.items.insert(index, newItem);
                return;
            }
            index += 1;
        }
        // Just push onto the end
        this.items.append(newItem);
        this.tickVersion();
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue Empty");
        }
        this.tickVersion();
        return this.items.remove(0);
    }
}

class CircularQueue extends ObservableVersioned {
    constructor(capacity = 10) {
        super();
        this.frontPointer = 0;
        this.rearPointer = 0;
        this.items = new Array(capacity);
        this.size = 0;
        this.capacity = capacity;
    }
    getSize() {
        return this.size;
    }
    isFull() {
        return this.size === this.capacity;
    }
    isEmpty() {
        return this.size === 0;
    }
    enqueue(item) {
        if (this.isFull()) {
            throw new Error("Queue Full");
        }
        this.items[this.rearPointer] = item;
        this.rearPointer += 1;
        this.rearPointer %= this.items.length;
        this.size += 1;
        this.tickVersion();
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue Empty");
        }
        const item = this.items[this.frontPointer];
        this.frontPointer += 1;
        this.frontPointer %= this.items.length;
        this.size -= 1;
        this.tickVersion();
        return item;
    }
}

class GoLCell {
    constructor(isAlive = false) {
        this.neighbours = [];
        this.isAlive = isAlive;
    }
    withNeighbour(n) {
        this.neighbours.push(n);
        return this;
    }
    prepare() {
        const aliveNeighbours = this.neighbours.reduce((acc, curr) => curr.isAlive ? acc + 1 : acc, 0);
        switch (aliveNeighbours) {
            case 2:
                this.willBeAlive = this.isAlive;
                break;
            case 3:
                this.willBeAlive = true;
                break;
            default:
                this.willBeAlive = false;
                break;
        }
        return this;
    }
    iterate() {
        this.isAlive = this.willBeAlive;
        return this;
    }
}

/**
 *
 * from https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */
class GameOfLife {
    constructor(width, height, preset = []) {
        this.cellRows = [];
        // Create all the cells
        for (let x = 0; x < width; x++) {
            const row = [];
            for (let y = 0; y < height; y++) {
                row.push(new GoLCell());
            }
            this.cellRows.push(row);
        }
        // Tell each cell about neighbours
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const cell = this.cellRows[x][y];
                // West
                if (x > 0)
                    cell.withNeighbour(this.cellRows[x - 1][y]);
                // East
                if (x + 1 < width)
                    cell.withNeighbour(this.cellRows[x + 1][y]);
                // North
                if (y > 0)
                    cell.withNeighbour(this.cellRows[x][y - 1]);
                // South
                if (y + 1 < height)
                    cell.withNeighbour(this.cellRows[x][y + 1]);
                // South West
                if (x > 0 && y + 1 < height)
                    cell.withNeighbour(this.cellRows[x - 1][y + 1]);
                // North West
                if (x > 0 && y > 0)
                    cell.withNeighbour(this.cellRows[x - 1][y - 1]);
                // South East
                if (x + 1 < width && y + 1 < height)
                    cell.withNeighbour(this.cellRows[x + 1][y + 1]);
                // North East
                if (x + 1 < width && y > 0)
                    cell.withNeighbour(this.cellRows[x + 1][y - 1]);
            }
        }
        // Program in the preset
        preset
            .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
            .forEach(([x, y]) => this.cellRows[x][y].isAlive = true);
    }
    update() {
        this.cellRows.forEach(r => r.forEach(c => c.prepare()));
        this.cellRows.forEach(r => r.forEach(c => c.iterate()));
    }
    toString() {
        return this.cellRows.map(row => row.map(c => c.isAlive).map(a => a ? 'X' : '.').join('')).join('\n');
    }
}

const addSpacing = (value, spacing) => {
    return [...value]
        .map((s, i) => i > 0 && (value.length - i) % spacing.digits === 0
        ? `${spacing.character}${s}`
        : s)
        .join("");
};
class PositiveNumberBase {
    constructor(name, symbols, emojis, spacing, width = 0) {
        this.name = name;
        this.symbols = symbols;
        this.base = this.symbols.length;
        this.emojis = emojis;
        this.spacing = spacing;
        this.width = width;
        this.max = Math.pow(2, this.width);
        this.min = 0;
    }
    toString(value) {
        return addSpacing(this.toDigits(value).join(""), this.spacing);
    }
    toDigits(value) {
        const digits = [];
        // Successive division, using remainder to figure out next digit
        // Works out from LSD to MSD
        let divValue = value;
        while (divValue > 0) {
            const remainder = divValue % this.base;
            digits.unshift(this.symbols[remainder]);
            divValue = Math.floor(divValue / this.base);
        }
        // Add any required padding
        while (digits.length < this.width) {
            digits.unshift(this.symbols[0]);
        }
        return digits;
    }
    fromDigits(digits) {
        return this.fromString(digits.join(""));
    }
    fromString(asStringWithSpacing) {
        const asString = asStringWithSpacing.replace(this.spacing.character, "");
        let value = 0;
        let placeValue = 1;
        Array.from(asString)
            .reverse()
            .forEach((digit) => {
            const indexOf = this.symbols.indexOf(digit);
            value += indexOf * placeValue;
            placeValue *= this.base;
        });
        return value;
    }
    withWidth(width) {
        return new PositiveNumberBase(this.name, this.symbols, this.emojis, this.spacing, width);
    }
}
const binaryInteger = new PositiveNumberBase("Binary", ["0", "1"], ["0️⃣", "1️⃣"], {
    character: " ",
    digits: 4,
}, 8);
const denaryInteger = new PositiveNumberBase("Denary", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"], {
    character: ",",
    digits: 3,
}, 1);
const hexadecimalInteger = new PositiveNumberBase("Hexadecimal", [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
], [
    "0️⃣",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
], {
    character: " ",
    digits: 2,
}, 2);

class TwosComplement {
    constructor(name, width) {
        this.name = name;
        this.width = width;
        this.base = 2;
        this.spacing = binaryInteger.spacing;
        this.binaryLessOne = binaryInteger.withWidth(width - 1);
        const logOfWidth = Math.log2(width);
        if (!Number.isInteger(logOfWidth))
            throw new Error(`Width must be a power of 2, but is ${width} with log2 of ${logOfWidth}`);
        this.max = this.binaryLessOne.max - 1;
        this.min = -this.binaryLessOne.max;
    }
    toString(value) {
        return addSpacing(this.toDigits(value).join(""), this.spacing);
    }
    toDigits(value) {
        if (value >= 0) {
            return ["0", ...this.binaryLessOne.toDigits(value)];
        }
        else {
            const diff = Math.abs(this.min) - Math.abs(value);
            const diffBin = this.binaryLessOne.toDigits(diff);
            return ["1", ...diffBin];
        }
    }
    fromDigits(digits) {
        return this.fromString(digits.join(""));
    }
    fromString(asStringRaw) {
        const asString = asStringRaw.replace(this.spacing.character, "");
        if (asString[0] === "0") {
            return this.binaryLessOne.fromString(asStringRaw);
        }
        else {
            const diff = this.binaryLessOne.fromString(asStringRaw.slice(1));
            return -(Math.abs(this.min) - diff);
        }
    }
    withWidth(width) {
        return new TwosComplement(this.name, width);
    }
}
const signed8bitBinary = new TwosComplement("8-bit Twos Complement", 8);
const signed16bitBinary = new TwosComplement("16-bit Twos Complement", 16);

const hexSingleDigit = hexadecimalInteger.withWidth(1);
class TwosComplementHex {
    constructor(name, twosComplementBinary) {
        this.name = name;
        this.width = twosComplementBinary.width / 4;
        this.base = 16;
        this.spacing = hexadecimalInteger.spacing;
        this.twosComplementBinary = twosComplementBinary;
        this.max = this.twosComplementBinary.max;
        this.min = this.twosComplementBinary.min;
    }
    toString(value) {
        return addSpacing(this.toDigits(value).join(""), this.spacing);
    }
    toDigits(value) {
        const binDigits = this.twosComplementBinary.toDigits(value);
        const asBinInteger = binaryInteger.fromDigits(binDigits);
        let remaining = asBinInteger;
        const asHex = Array(this.width)
            .fill(null)
            .map(() => {
            const remainder = remaining % 16;
            remaining = Math.floor(remaining / 16);
            return hexSingleDigit.toDigits(remainder)[0];
        })
            .reverse();
        return asHex;
    }
    fromDigits(digits) {
        let value = 0;
        digits
            .map((d) => hexSingleDigit.fromDigits([d]))
            .forEach((d) => {
            value = 16 * value + d;
        });
        const asBinIntegerDigits = binaryInteger.toString(value);
        return this.twosComplementBinary.fromString(asBinIntegerDigits);
    }
    fromString(asStringRaw) {
        const asString = asStringRaw.replace(this.spacing.character, "");
        return this.fromDigits([...asString]);
    }
    withWidth(width) {
        switch (width) {
            case 4:
                return new TwosComplementHex(this.name, signed8bitBinary);
            case 8:
                return new TwosComplementHex(this.name, signed16bitBinary);
        }
        throw new Error(`Unsupported Width ${width} for Twos Complement Hex`);
    }
}
const signed8bitHex = new TwosComplementHex("8-bit Twos Complement (Hex)", signed8bitBinary);
const signed16bitHex = new TwosComplementHex("16-bit Twos Complement (Hex)", signed16bitBinary);

const DICTIONARY_HEADER = '[Dictionary]';
const ENCODED_HEADER = '[Encoded]';
const PART_DELIMITER = '|';
class DictionaryEncoder {
    constructor() {
        this.nextNumber = 0;
        this.wordsByNumber = {};
        this.numbersByWords = {};
        this.encoded = [];
    }
    registerWord(id, word) {
        this.wordsByNumber[id] = word;
        this.numbersByWords[word] = id;
        return this;
    }
    getWordNumber(word) {
        if (this.numbersByWords[word] === undefined) {
            const id = this.nextNumber++;
            this.registerWord(id, word);
        }
        return this.numbersByWords[word];
    }
    withText(theText) {
        const FIND_BITS_REGEX = /[^\s]+[\s]*/gm;
        theText.match(FIND_BITS_REGEX).forEach((word) => {
            const wordNumber = this.getWordNumber(word);
            this.encoded.push(wordNumber);
        });
        return this;
    }
    encode() {
        return [
            DICTIONARY_HEADER,
            ...Object.entries(this.wordsByNumber).map(([id, word]) => `${id}=${word}`),
            ENCODED_HEADER,
            ...this.encoded
        ].join(PART_DELIMITER);
    }
    /**
     * Rebuild the original text from the encoded parts.
     * @param transformWord A function that can be used to make in line changes to specific identified words.
     * This might be used by a user interface to create a version of the text with highlighting token.
     * @returns
     */
    rebuild(transformWord = (id, word) => word) {
        return this.encoded
            .map(id => transformWord(id, this.wordsByNumber[id]))
            .join('');
    }
    /**
     *
     * @returns The rebuilt length / encoded length. It should be higher than 1 if we saved data, less than 1 if it actually cost us.
     */
    assessEfficiency() {
        const encoded = this.encode();
        const rebuilt = this.rebuild();
        return rebuilt.length / encoded.length;
    }
    static decode(encoded) {
        const dictionaryEncoder = new DictionaryEncoder();
        const parts = encoded.split(PART_DELIMITER);
        let dictionaryDone = false;
        parts.forEach(part => {
            switch (part) {
                case DICTIONARY_HEADER:
                    break;
                case ENCODED_HEADER:
                    dictionaryDone = true;
                    break;
                default:
                    if (dictionaryDone) {
                        dictionaryEncoder.encoded.push(parseInt(part, 10));
                    }
                    else {
                        const subParts = part.split('=');
                        if (subParts.length !== 2) {
                            throw new Error(`Invalid dictionary entry ${part}`);
                        }
                        const [idStr, word] = subParts;
                        dictionaryEncoder.registerWord(parseInt(idStr, 10), word);
                    }
                    break;
            }
        });
        return dictionaryEncoder;
    }
}

/**
 * A class the execute run length encoding on a building input.
 * It accepts more and more data accumulating an 'encoded' array.
 */
class RunLengthEncoder {
    constructor(equalityCheck = defaultEqualityCheck) {
        this.equalityCheck = equalityCheck;
        this.encoded = [];
    }
    update(...data) {
        // Guard statement against empty input
        if (data.length === 0)
            return this;
        // If this is the first data item...
        let startIndex = 0;
        if (this.encoded.length === 0) {
            this.encoded.push({
                value: data[startIndex],
                count: 1
            });
            startIndex++;
        }
        for (let i = startIndex; i < data.length; i++) {
            if (this.equalityCheck(this.encoded[this.encoded.length - 1].value, data[i])) {
                this.encoded[this.encoded.length - 1].count++;
            }
            else {
                this.encoded.push({
                    value: data[i],
                    count: 1
                });
            }
        }
        return this;
    }
    getEncoded() {
        return this.encoded;
    }
}

const MAX_ITERATIONS = 20;
/**
 * Utility function to round a number to 2 decimal places.
 * Required enough to warran it's own function, page ranks should be displayed this way.
 *
 * @param x The number to round
 * @returns The rounded number
 */
const roundTo2Dp = (x) => x !== undefined ? parseFloat(x.toFixed(2)) : 0;
({
    iterations: 0,
    graph: new Graph(),
    ranks: {},
    rankHistory: [],
    dampingFactor: 0.85,
});
/**
 * Create an initial state for the page rank algorithm.
 * The returned state object can be used in a reducer, it stores everything successive iterations will need.
 *
 * @param graph The graph which describes the linked pages.
 * @param dampingFactor The damping factor to apply during the page rank iterations
 */
const initialisePageRank = (graph, dampingFactor = 0.85) => {
    const firstRanks = [...graph.vertices]
        .map((v) => v.key)
        .reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr]: 1 })), {});
    return {
        iterations: 0,
        graph,
        ranks: firstRanks,
        rankHistory: [firstRanks],
        dampingFactor,
    };
};
/**
 * Extracts the page rank of a page, rounded to 2 d.p.
 * @param state The page rank state, as yielded by the iterate function
 * @param page The specific page we are interested in
 */
const extractPageRank = ({ ranks }, page) => {
    return ranks[page];
};
/**
 * Processes one iteration of the page rank algorithm.
 * Is a pure function which accepts current state and returns new state after the iteration.
 *
 * @param state The current page rank state
 * @returns The new page rank state
 */
const iteratePageRank = ({ iterations, graph, ranks, rankHistory, dampingFactor, }) => {
    if (iterations > MAX_ITERATIONS) {
        return {
            iterations,
            graph,
            ranks,
            rankHistory,
            dampingFactor,
        };
    }
    const newRanks = Object.assign({}, ranks);
    graph.vertices.forEach((page) => {
        const rank = graph.edges
            .filter((edge) => graph.areVerticesEqual(edge.to, page))
            .map((edge) => edge.from)
            .map((incoming) => newRanks[incoming.key] /
            graph.edges.filter((l) => graph.areVerticesEqual(l.from, incoming))
                .length)
            .reduce((acc, curr) => acc + curr, 0);
        newRanks[page.key] = 1 - dampingFactor + dampingFactor * rank;
    });
    return {
        iterations: iterations + 1,
        graph,
        ranks: newRanks,
        rankHistory: [...rankHistory, newRanks],
        dampingFactor,
    };
};

var EdgeCurrentWeightCalcType;
(function (EdgeCurrentWeightCalcType) {
    EdgeCurrentWeightCalcType[EdgeCurrentWeightCalcType["unknown"] = 0] = "unknown";
    EdgeCurrentWeightCalcType[EdgeCurrentWeightCalcType["shorterRouteFound"] = 1] = "shorterRouteFound";
    EdgeCurrentWeightCalcType[EdgeCurrentWeightCalcType["existingRouteStillQuickest"] = 2] = "existingRouteStillQuickest";
})(EdgeCurrentWeightCalcType || (EdgeCurrentWeightCalcType = {}));

/**
 * Calls the walkPath generator function and puts all the nodes into an array, returns the array.
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} destinationNode
 * @returns An array containing the path (walking backwards), it will be empty if no route was found
 */
function getPathTo({ graph, shortestPathTree, node, }) {
    const path = [];
    // If there is no available path to the destination, feed back empty list
    const endpoint = shortestPathTree[node.key];
    if (!endpoint || endpoint.viaNode === undefined) {
        return path;
    }
    for (const p of walkPath({ graph, shortestPathTree, node })) {
        path.push(p);
    }
    return path.reverse();
}
/**
 * Given a shortestPathTree taken from the dijkstra function below,
 * this walks from one node to another through the shortest path identified
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} viaNode The start point of the journey
 * @param {string} destinationNode The end point of the journey
 */
function* walkPath({ shortestPathTree, node, }) {
    while (!!node) {
        yield node;
        const thisShortestPath = shortestPathTree[node.key];
        if (thisShortestPath === undefined) {
            break;
        }
        node = thisShortestPath.viaNode;
    }
}
// A hueristic that always returns a constant value will have no effect.
const emptyHeuristic = () => 0;
/**
 * Executes Dijkstras routing algorithm, returning the shortest path tree for the given source node.
 *
 * This algorithm can end early if the toNode is specified, here is a discussion of the validity of this...
 * https://stackoverflow.com/questions/23906530/dijkstras-end-condition
 *
 * This algorithm accepts a heuristic cost function, which allows it to be used
 * to execute the A* algorithm.
 *
 * @param {Graph} graph The graph that contains all the nodes and links
 * @param {string} sourceNode The node we are travelling from
 * @param {string | undefined} destinationNode // The node we are aiming for, can be omitted
 * @param {function} getHeuristicCost // Given a node, returns an estimated remaining cost to the destination.
 * @param {function} observer // Allows the caller to monitor the steps of the algorithm.
 * @returns Shortest Path Tree { [node] : {cost: number, viaNode: string} }
 */
function dijstraks({ graph, sourceNodeKey, destinationNodeKey, getHeuristicCost = emptyHeuristic, observer = emptyObserver, }) {
    const sourceNode = graph.getVertex(sourceNodeKey);
    const destinationNode = destinationNodeKey && graph.getVertex(destinationNodeKey);
    // The output of this function is the shortest path tree, derived by the algorithm.
    // The caller can then use this tree to derive a path using the getPathTo function above.
    const shortestPathTree = {};
    // Build a priority queue, where the nodes are arranged in order of
    // distance from the source (smallest to largest)
    const currentDistances = new PriorityQueue();
    // Add the 'from' node, it doesn't go via anything, and it's distance is zero
    currentDistances.enqueue({
        node: sourceNode,
        viaNode: undefined,
        cost: 0,
        priority: Infinity,
    });
    // Add all the other nodes, with a distance of Infinity
    graph.vertices
        .filter((node) => !graph.areVerticesEqual(node, sourceNode))
        .map((node) => ({ node, viaNode: undefined, cost: Infinity, priority: 0 }))
        .forEach((n) => currentDistances.enqueue(n));
    // Give the observer the START
    observer({ shortestPathTree, currentDistances, outgoing: [] });
    // While there are items in the queue to check...
    while (!currentDistances.isEmpty()) {
        // Take the node that is the shortest distance from our source node
        const currentItem = currentDistances.dequeue();
        // Work out what amendments to make to the priority queue
        const outgoing = graph
            .getOutgoing(currentItem.node.key)
            .filter(({ to }) => shortestPathTree[to.key] === undefined) // only those that aren't in our tree already
            .map((edge) => {
            const { to: node, weight } = edge;
            let totalCost = weight;
            let calcResult = EdgeCurrentWeightCalcType.unknown;
            // Remove the matching item from our current known distances
            // It will either be replaced as is, or replaced with updated details
            const otherItem = currentDistances.removeMatch((d) => graph.areVerticesEqual(d.node, node));
            // What is the distance to this other node, from our current node?
            const newPotentialDistance = currentItem.cost + weight + getHeuristicCost(currentItem.node);
            // Have we found a shorter route?
            if (newPotentialDistance < otherItem.cost) {
                totalCost = newPotentialDistance;
                // Replace the node with our new distance and via details
                currentDistances.enqueue({
                    node,
                    cost: newPotentialDistance,
                    viaNode: currentItem.node,
                    priority: 1 / newPotentialDistance,
                });
                calcResult = EdgeCurrentWeightCalcType.shorterRouteFound;
            }
            else {
                totalCost = otherItem.cost;
                // Just put the current one back
                currentDistances.enqueue(otherItem);
                calcResult = EdgeCurrentWeightCalcType.existingRouteStillQuickest;
            }
            return {
                edge,
                totalCost,
                calcResult,
            };
        });
        // Tell any observer the step
        observer({ currentItem, shortestPathTree, currentDistances, outgoing });
        // Put this item into our set (using node as a key)
        shortestPathTree[currentItem.node.key] = {
            cost: currentItem.cost,
            viaNode: currentItem.viaNode,
            priority: 1 / currentItem.cost,
        };
        // Have we reached the destination? Quit early
        if (!!destinationNode &&
            graph.areVerticesEqual(currentItem.node, destinationNode)) {
            break;
        }
    }
    // Give the Observer the END
    observer({ shortestPathTree, currentDistances, outgoing: [] });
    return shortestPathTree;
}

/**
 * Executes a binary search.
 * This is the recursive form of the function.
 *
 * Based on pseudocode from
 * https://www.geeksforgeeks.org/binary-search/
 *
 * @param data The data to search through
 * @param match A function that can be used to compare any item with our criteria
 * @param left The left pointer, bounds this segment (part of the recursion)
 * @param right The right pointer, bounds this segment (part of the recursion)
 */
function binarySearchR(data, searchItem, utilities, left, right) {
    // Exit condition...
    if (right < left) {
        return NO_MATCH;
    }
    const { observe = emptyObserver, compare } = utilities;
    // Calculate the mid point
    const mid = Math.floor(left + (right - left) / 2);
    observe("Recursing", { left, right, mid });
    // Compare the midpoint to our criteria
    const compareMid = compare(searchItem, data[mid]);
    // If the element is present in the middle itself
    if (compareMid === 0) {
        return mid;
    }
    else if (compareMid < 0) {
        // If element is smaller than mid, then
        // it can only be present in left subarray
        return binarySearchR(data, searchItem, utilities, left, mid - 1);
    }
    else {
        // Else the element can only be present
        // in right subarray
        return binarySearchR(data, searchItem, utilities, mid + 1, right);
    }
}
function binarySearch(data, searchItem, utilities) {
    return binarySearchR(data, searchItem, utilities, 0, data.length - 1);
}

/**
 * perform a linear search on an array
 *
 * @param {array} data The array
 * @param {function} compare Accepts each item and
 *  returns 0 if its a match,
 * -ve if the item is 'less than'
 * +ve if item is 'greater than'
 * @return {object} The matching item in the array
 */
function linearSearch(data, searchItem, { compare, observe = emptyObserver }) {
    for (let i = 0; i < data.length; i++) {
        observe("Looking", { i });
        if (compare(data[i], searchItem) === 0) {
            return i;
        }
    }
    return NO_MATCH;
}

const ASM_FILE_EXTENSION = '.asm';
var CpuInstructionType;
(function (CpuInstructionType) {
    CpuInstructionType["label"] = "Label";
    CpuInstructionType["directAddress"] = "Direct_Address";
    CpuInstructionType["namedAddress"] = "Named_Address";
    CpuInstructionType["compute"] = "Comute";
})(CpuInstructionType || (CpuInstructionType = {}));
var ComputeDestination;
(function (ComputeDestination) {
    ComputeDestination["M"] = "M";
    ComputeDestination["D"] = "D";
    ComputeDestination["MD"] = "MD";
    ComputeDestination["A"] = "A";
    ComputeDestination["AM"] = "AM";
    ComputeDestination["AD"] = "AD";
    ComputeDestination["AMD"] = "AMD";
})(ComputeDestination || (ComputeDestination = {}));
var ComputeComputation;
(function (ComputeComputation) {
    ComputeComputation["ZERO"] = "0";
    ComputeComputation["ONE"] = "1";
    ComputeComputation["NEGATIVE_ONE"] = "-1";
    ComputeComputation["D"] = "D";
    ComputeComputation["A"] = "A";
    ComputeComputation["NOT_D"] = "!D";
    ComputeComputation["NOT_A"] = "!A";
    ComputeComputation["NEGATIVE_D"] = "-D";
    ComputeComputation["NEGATIVE_A"] = "-A";
    ComputeComputation["D_PLUS_ONE"] = "D+1";
    ComputeComputation["D_MINUS_ONE"] = "D-1";
    ComputeComputation["A_PLUS_ONE"] = "A+1";
    ComputeComputation["A_MINUS_ONE"] = "A-1";
    ComputeComputation["D_PLUS_A"] = "D+A";
    ComputeComputation["D_MINUS_A"] = "D-A";
    ComputeComputation["A_MINUS_D"] = "A-D";
    ComputeComputation["D_AND_A"] = "D&A";
    ComputeComputation["D_OR_A"] = "D|A";
    ComputeComputation["M"] = "M";
    ComputeComputation["NOT_M"] = "!M";
    ComputeComputation["M_PLUS_ONE"] = "M+1";
    ComputeComputation["M_MINUS_ONE"] = "M-1";
    ComputeComputation["D_PLUS_M"] = "D+M";
    ComputeComputation["D_MINUS_M"] = "D-M";
    ComputeComputation["M_MINUS_D"] = "M-D";
    ComputeComputation["D_AND_M"] = "D&M";
    ComputeComputation["D_OR_M"] = "D|M";
})(ComputeComputation || (ComputeComputation = {}));
var ComputeJump;
(function (ComputeJump) {
    ComputeJump["JGT"] = "JGT";
    ComputeJump["JEQ"] = "JEQ";
    ComputeJump["JGE"] = "JGE";
    ComputeJump["JLT"] = "JLT";
    ComputeJump["JNE"] = "JNE";
    ComputeJump["JLE"] = "JLE";
    ComputeJump["JMP"] = "JMP";
})(ComputeJump || (ComputeJump = {}));

const COMMENT_STARTS = ['//', '/**', '*', ' *',];
const stripComment = (input) => {
    for (const c of COMMENT_STARTS) {
        const commentIndex = input.indexOf(c);
        if (commentIndex !== -1) {
            return input.substr(0, commentIndex).trim();
        }
    }
    return input.trim();
};

const LABEL_REGEX = /\((?<label>[_A-Za-z0-9\.]+)\)/;
const A_INSTRUCTION_DIRECT_REGEX = /^@(?<address>[0-9]+)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const A_INSTRUCTION_NAMED_REGEX = /^@(?<label>[_A-Za-z0-9._]+)\s*(?:\/\/(?<comment>.*)){0,1}$/;
// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
const createRegExpOptions = (o) => Object.values(o)
    .map((s) => escapeRegExp(s))
    .join("|");
const DEST_OPTS = createRegExpOptions(ComputeDestination);
const COMP_OPTS = createRegExpOptions(ComputeComputation);
const JUMP_OPTS = createRegExpOptions(ComputeJump);
const C_INSTRUCTION_REGEX = new RegExp(`^(?:(?:(?<destination>${DEST_OPTS})=)|=){0,1}(?<computation>${COMP_OPTS})(?:;(?<jump>${JUMP_OPTS})){0,1}\\s*(?:\/\/(?<comment>.*)){0,1}$`);
const parseHackAsm = (rawLineRef) => {
    const ref = generateLineRef(rawLineRef);
    // strip comment
    const input = stripComment(ref.originalLine);
    // Blank lines...
    if (input.length === 0)
        return;
    // Is this a label?
    const label = input.match(LABEL_REGEX);
    if (label !== null) {
        return {
            ref,
            type: CpuInstructionType.label,
            label: label.groups.label,
        };
    }
    // Is this an address instruction with direct value?
    const aDirect = input.match(A_INSTRUCTION_DIRECT_REGEX);
    if (aDirect !== null) {
        return {
            ref,
            type: CpuInstructionType.directAddress,
            address: parseInt(aDirect.groups.address, 10),
        };
    }
    // Is this an address instruction with named value?
    const aNamed = input.match(A_INSTRUCTION_NAMED_REGEX);
    if (aNamed !== null) {
        return {
            ref,
            type: CpuInstructionType.namedAddress,
            label: aNamed.groups.label,
        };
    }
    // Is this a computation?
    const compute = input.match(C_INSTRUCTION_REGEX);
    if (compute !== null) {
        return {
            ref,
            type: CpuInstructionType.compute,
            destination: compute.groups.destination,
            computation: compute.groups.computation,
            jump: compute.groups.jump,
        };
    }
    throw new Error(`Invalid Hack ASM Line: ${input}`);
};

const generateHackAsm = (input, registers = {}) => {
    switch (input.type) {
        case CpuInstructionType.directAddress:
            return `@${input.address}`;
        case CpuInstructionType.namedAddress:
            return `@${input.label in registers
                ? registers[input.label]
                : input.label}`;
        case CpuInstructionType.label:
            return `(${input.label})`;
        case CpuInstructionType.compute:
            return `${input.destination ? `${input.destination}=` : ``}${input.computation}${input.jump ? `;${input.jump}` : ""}`;
    }
};

class MemorySegment {
    constructor(memory, stack) {
        this.memory = memory;
        this.stack = stack;
    }
    push(index) {
        const value = this.get(index);
        this.stack.push(value);
    }
    pop(index) {
        const value = this.stack.pop();
        this.set(index, value);
    }
    set(index, value) {
        this.memory.set(this.getAddress(index), value);
    }
    get(index) {
        return this.memory.get(this.getAddress(index));
    }
}

const generateTempRegisterName = (index) => `R${index + 5}`;
/**
 * Implements memory segments which are simply arrays located within the CPU memory.
 * POP
 * addr = firstAddress + i, SP--, *addr=*SP
 *
 * PUSH
 * addr = firstAddress + i, *SP = *addr, SP++
 */
class MemorySegmentTemp extends MemorySegment {
    constructor(memory, stack, firstAddress, length) {
        super(memory, stack);
        this.firstAddress = firstAddress;
        this.lastAddress = this.firstAddress + length;
        for (let i = 0; i < length; i++) {
            memory.labels[generateTempRegisterName(i)] = i + this.firstAddress;
        }
    }
    getAddress(index) {
        const address = this.firstAddress + index;
        if (address > this.lastAddress) {
            throw new Error(`This segment does not contain enough registers to access ${index}`);
        }
        return address;
    }
    toString() {
        return Array(this.lastAddress - this.firstAddress).fill(null).map((_, i) => this.get(i)).join(', ');
    }
}

var VMInstructionType;
(function (VMInstructionType) {
    VMInstructionType[VMInstructionType["arithmetic"] = 0] = "arithmetic";
    VMInstructionType[VMInstructionType["push"] = 1] = "push";
    VMInstructionType[VMInstructionType["pop"] = 2] = "pop";
    VMInstructionType[VMInstructionType["label"] = 3] = "label";
    VMInstructionType[VMInstructionType["goto"] = 4] = "goto";
    VMInstructionType[VMInstructionType["ifgoto"] = 5] = "ifgoto";
    VMInstructionType[VMInstructionType["function"] = 6] = "function";
    VMInstructionType[VMInstructionType["return"] = 7] = "return";
    VMInstructionType[VMInstructionType["call"] = 8] = "call";
})(VMInstructionType || (VMInstructionType = {}));
const SYSTEM_INIT_FUNCTION_NAME = 'Sys.init';
const VM_FILE_EXTENSION = '.vm';
const ASM_MEM_SEG_SYMBOL_STACK_PTR = 'SP';
const ASM_MEM_SEG_SYMBOL_LOCAL = 'LCL';
const ASM_MEM_SEG_SYMBOL_LOCAL_EXP = 'LOCAL';
const ASM_MEM_SEG_SYMBOL_ARGUMENTS = 'ARG';
const ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP = 'ARGUMENT';
const ASM_MEM_SEG_SYMBOL_THIS = 'THIS';
const ASM_MEM_SEG_SYMBOL_THAT = 'THAT';
const MEM_ADDRESS_STACK_PTR = 0;
const MEM_SEG_ADDRESS_ARGUMENTS = 2;
const MEM_SEG_ADDRESS_LOCAL = 1;
const MEM_SEG_ADDRESS_THIS = 3;
const MEM_SEG_ADDRESS_THAT = 4;
const MEM_SEG_TEMP_START = 5;
const MEM_SEG_TEMP_LENGTH = 8;
var VMArithmeticOperation;
(function (VMArithmeticOperation) {
    VMArithmeticOperation["add"] = "add";
    VMArithmeticOperation["sub"] = "sub";
    VMArithmeticOperation["neg"] = "neg";
    VMArithmeticOperation["eq"] = "eq";
    VMArithmeticOperation["gt"] = "gt";
    VMArithmeticOperation["lt"] = "lt";
    VMArithmeticOperation["and"] = "and";
    VMArithmeticOperation["or"] = "or";
    VMArithmeticOperation["not"] = "not";
})(VMArithmeticOperation || (VMArithmeticOperation = {}));
var VMSegment;
(function (VMSegment) {
    VMSegment["local"] = "local";
    VMSegment["argument"] = "argument";
    VMSegment["this"] = "this";
    VMSegment["that"] = "that";
    VMSegment["constant"] = "constant";
    VMSegment["static"] = "static";
    VMSegment["pointer"] = "pointer";
    VMSegment["temp"] = "temp";
})(VMSegment || (VMSegment = {}));

const DEFAULT_VALUE = 0;
const MEMORY_SIZE = Math.pow(2, 15);
const VARIABLE_START = 0x10;
const SCREEN = 0x4000;
const KBD = 0x6000;
class RAMSimulator {
    constructor(size = MEMORY_SIZE) {
        this.size = size;
        this.labels = {};
        this.reset();
    }
    setLabel(name, value) {
        this.labels[name.toUpperCase()] = value;
    }
    reset() {
        this.contents = [];
        this.labels = Object.assign(Object.assign({}, Array(16)
            .fill(null)
            .map((_, i) => `R${i}`)
            .reduce((acc, curr, i) => (Object.assign(Object.assign({}, acc), { [curr]: i })), {})), { SCREEN,
            KBD });
        this.nextNamedRegisterAddress = VARIABLE_START;
        // These are the named registers required by the Virtual Machine
        this.labels[ASM_MEM_SEG_SYMBOL_STACK_PTR] = MEM_ADDRESS_STACK_PTR;
        this.labels[ASM_MEM_SEG_SYMBOL_LOCAL] = MEM_SEG_ADDRESS_LOCAL;
        this.labels[ASM_MEM_SEG_SYMBOL_LOCAL_EXP] = MEM_SEG_ADDRESS_LOCAL;
        this.labels[ASM_MEM_SEG_SYMBOL_ARGUMENTS] = MEM_SEG_ADDRESS_ARGUMENTS;
        this.labels[ASM_MEM_SEG_SYMBOL_ARGUMENTS_EXP] = MEM_SEG_ADDRESS_ARGUMENTS;
        this.labels[ASM_MEM_SEG_SYMBOL_THIS] = MEM_SEG_ADDRESS_THIS;
        this.labels[ASM_MEM_SEG_SYMBOL_THAT] = MEM_SEG_ADDRESS_THAT;
        for (let i = 0; i < MEM_SEG_TEMP_LENGTH; i++) {
            this.setLabel(generateTempRegisterName(i), i + MEM_SEG_TEMP_START);
        }
    }
    checkIndex(index) {
        if (index < 0 || index >= this.size)
            throw new Error(`Invalid memory address ${index}`);
    }
    setLabelled(label, ...values) {
        const index = this.getOrCreateLabel(label);
        this.set(index, ...values);
    }
    set(index, ...values) {
        this.checkIndex(index);
        values.forEach((value, i) => (this.contents[index + i] = value));
    }
    getLabelled(label) {
        const index = this.getOrCreateLabel(label);
        return this.get(index);
    }
    get(index) {
        this.checkIndex(index);
        return this.contents[index] || DEFAULT_VALUE;
    }
    getOrCreateLabel(rawLabel) {
        const label = rawLabel.toUpperCase();
        if (!(label in this.labels)) {
            // Create new variable from 16 onwards
            this.labels[label] = this.nextNamedRegisterAddress;
            this.nextNamedRegisterAddress++;
        }
        return this.labels[label];
    }
    toString(...windows) {
        return `RAM:
    ${windows.map(w => `${w.start}-${w.end}: ` + Array(w.end - w.start + 1).fill(null).map((_, i) => this.get(i + w.start)).join(', ')).join('\n\t')}
        \nNamed Registers:
${Object.entries(this.labels)
            .map(([key, value]) => `\t${key}=${value.toString(10)}`)
            .join(",")}`;
    }
}

const EMPTY_ALU = {
    lastComputation: ComputeComputation.ZERO,
    lastResult: 0,
    aRegister: 0,
    dRegister: 0,
    mContents: 0,
};
class HackCpu {
    constructor() {
        this.dataRegister = 0;
        this.addressRegister = 0;
        this.programCounter = 0;
        this.memory = new RAMSimulator();
        this.program = [];
        this.alu = Object.assign({}, EMPTY_ALU);
        this.reset();
    }
    getMemory() {
        return this.memory;
    }
    toString(...windows) {
        return `D: ${this.dataRegister}
A: ${this.addressRegister},
PC: ${this.programCounter} - Next Instruction: ${this.programCounter < this.program.length ? generateHackAsm(this.program[this.programCounter]) : 'OFF THE END'},
\nProgram:
${this.program.map((s, i) => `\t${i} (${s.ref.originalLineNumber}) - ${generateHackAsm(s)}`).join("\n")}
Memory:
${this.memory.toString(...windows)}
`;
    }
    setPC(value) {
        this.programCounter = value;
    }
    setA(value) {
        this.addressRegister = value;
    }
    setD(value) {
        this.dataRegister = value;
    }
    reset() {
        this.programCounter = 0;
        this.dataRegister = 0;
        this.addressRegister = 0;
        this.alu = Object.assign({}, EMPTY_ALU);
        this.memory.reset();
    }
    loadParsedProgram(rawInstructions) {
        this.program = [];
        while (rawInstructions.length > 0) {
            const instruction = rawInstructions.shift();
            if (instruction.type === CpuInstructionType.label) {
                this.memory.setLabel(instruction.label, this.program.length);
            }
            else {
                this.program.push(instruction);
            }
        }
        // Replace any named register jumps with specific jumps
        this.program = this.program.map((p) => {
            if (p.type === CpuInstructionType.namedAddress) {
                const address = this.memory.getOrCreateLabel(p.label);
                return {
                    ref: p.ref,
                    type: CpuInstructionType.directAddress,
                    address,
                };
            }
            return p;
        });
    }
    loadProgram(input) {
        const rawInstructions = input
            .map((s, i) => parseHackAsm({ originalLine: s, originalLineNumber: i }))
            .filter((l) => l !== undefined);
        this.loadParsedProgram(rawInstructions);
    }
    getNextCodeLine() {
        // Just return if we have run off end of the memory
        if (this.programCounter >= this.program.length)
            return undefined;
        if (this.programCounter < 0)
            throw new Error(`CPU Program Counter Became Negative ${this.programCounter}`);
        return this.program[this.programCounter];
    }
    tick() {
        const instruction = this.getNextCodeLine();
        if (instruction === undefined)
            return false;
        // console.log(`CPU Running ${generateHackAsm(instruction)}`)
        this.executeInstruction(instruction);
        return true;
    }
    executeInstruction(instruction) {
        switch (instruction.type) {
            case CpuInstructionType.directAddress:
                return this.goToDirectAddress(instruction);
            case CpuInstructionType.compute:
                return this.compute(instruction);
            case CpuInstructionType.namedAddress:
                throw new Error('GoTo Named Address should have been replaced on program load');
        }
    }
    goToDirectAddress({ address }) {
        this.addressRegister = address;
        this.programCounter++;
        return true;
    }
    /* tslint:disable:no-bitwise */
    compute({ computation, destination, jump }) {
        let result = 0;
        this.alu.lastComputation = computation;
        this.alu.aRegister = this.addressRegister;
        this.alu.dRegister = this.dataRegister;
        this.alu.mContents = this.memory.get(this.addressRegister);
        switch (computation) {
            case ComputeComputation.ZERO:
                result = 0;
                break;
            case ComputeComputation.ONE:
                result = 1;
                break;
            case ComputeComputation.NEGATIVE_ONE:
                result = -1;
                break;
            case ComputeComputation.D:
                result = this.dataRegister;
                break;
            case ComputeComputation.A:
                result = this.addressRegister;
                break;
            case ComputeComputation.NOT_D:
                result = ~this.dataRegister;
                break;
            case ComputeComputation.NOT_A:
                result = ~this.addressRegister;
                break;
            case ComputeComputation.NEGATIVE_D:
                result = -this.dataRegister;
                break;
            case ComputeComputation.NEGATIVE_A:
                result = -this.addressRegister;
                break;
            case ComputeComputation.D_PLUS_ONE:
                result = this.dataRegister + 1;
                break;
            case ComputeComputation.D_MINUS_ONE:
                result = this.dataRegister - 1;
                break;
            case ComputeComputation.A_PLUS_ONE:
                result = this.addressRegister + 1;
                break;
            case ComputeComputation.A_MINUS_ONE:
                result = this.addressRegister - 1;
                break;
            case ComputeComputation.D_PLUS_A:
                result = this.dataRegister + this.addressRegister;
                break;
            case ComputeComputation.D_MINUS_A:
                result = this.dataRegister - this.addressRegister;
                break;
            case ComputeComputation.A_MINUS_D:
                result = this.addressRegister - this.dataRegister;
                break;
            case ComputeComputation.D_AND_A:
                result = this.dataRegister & this.addressRegister;
                break;
            case ComputeComputation.D_OR_A:
                result = this.dataRegister | this.addressRegister;
                break;
            case ComputeComputation.M:
                result = this.memory.get(this.addressRegister);
                break;
            case ComputeComputation.NOT_M:
                result = ~this.memory.get(this.addressRegister);
                break;
            case ComputeComputation.M_PLUS_ONE:
                result = this.memory.get(this.addressRegister) + 1;
                break;
            case ComputeComputation.M_MINUS_ONE:
                result = this.memory.get(this.addressRegister) - 1;
                break;
            case ComputeComputation.D_PLUS_M:
                result = this.dataRegister + this.memory.get(this.addressRegister);
                break;
            case ComputeComputation.D_MINUS_M:
                result = this.dataRegister - this.memory.get(this.addressRegister);
                break;
            case ComputeComputation.M_MINUS_D:
                result = this.memory.get(this.addressRegister) - this.dataRegister;
                break;
            case ComputeComputation.D_AND_M:
                result = this.dataRegister & this.memory.get(this.addressRegister);
                break;
            case ComputeComputation.D_OR_M:
                result = this.dataRegister | this.memory.get(this.addressRegister);
                break;
        }
        this.alu.lastResult = result;
        switch (destination) {
            case ComputeDestination.M:
                this.memory.set(this.addressRegister, result);
                break;
            case ComputeDestination.D:
                this.dataRegister = result;
                break;
            case ComputeDestination.MD:
                this.memory.set(this.addressRegister, result);
                this.dataRegister = result;
                break;
            case ComputeDestination.A:
                this.addressRegister = result;
                break;
            case ComputeDestination.AM:
                this.addressRegister = result;
                this.memory.set(this.addressRegister, result);
                break;
            case ComputeDestination.AD:
                this.addressRegister = result;
                this.dataRegister = result;
                break;
            case ComputeDestination.AMD:
                this.addressRegister = result;
                this.memory.set(this.addressRegister, result);
                this.dataRegister = result;
                break;
        }
        let shouldJump = false;
        switch (jump) {
            case ComputeJump.JGT:
                shouldJump = result > 0;
                break;
            case ComputeJump.JEQ:
                shouldJump = result === 0;
                break;
            case ComputeJump.JGE:
                shouldJump = result >= 0;
                break;
            case ComputeJump.JLT:
                shouldJump = result < 0;
                break;
            case ComputeJump.JNE:
                shouldJump = result !== 0;
                break;
            case ComputeJump.JLE:
                shouldJump = result <= 0;
                break;
            case ComputeJump.JMP:
                shouldJump = true;
                break;
        }
        if (shouldJump) {
            this.programCounter = this.addressRegister;
        }
        else {
            this.programCounter++;
        }
        return true;
    }
}

var CpuTestInstructionType;
(function (CpuTestInstructionType) {
    CpuTestInstructionType["setNamedRegisterIndex"] = "Set Named Register (index)";
    CpuTestInstructionType["setNamedRegister"] = "Set Named Register";
    CpuTestInstructionType["ticktock"] = "ticktock";
    CpuTestInstructionType["vmstep"] = "VM Step";
    CpuTestInstructionType["repeat"] = "Repeat";
    CpuTestInstructionType["repeatEnd"] = "Repeat END";
    CpuTestInstructionType["output"] = "Output";
    CpuTestInstructionType["setOutput"] = "Set Output";
})(CpuTestInstructionType || (CpuTestInstructionType = {}));
const isOutputRam = (testOutput) => {
    return testOutput.address !== undefined;
};
/* tslint:disable:no-empty */
const NO_OP = () => { };

const boolToBin = (v) => {
    if (v === undefined)
        return "-";
    if (v === true)
        return "1";
    if (v === false)
        return "0";
};

const LOAD_REGEX = /^(?:load)\s(?<load>.+)(?:,|;)$/;
const OUTPUT_FILE_REGEX = /^(?:output\-file)\s(?<outputFile>.+)(?:,|;)$/;
const COMPARE_TO_REGEX = /^(?:compare\-to)\s(?<compareTo>.+)(?:,|;)$/;
const OUTPUT_RAM_FRAGMENT_REGEX = /^(?:RAM\[)(?<address>[0-9]+)(?:\]\%(?<format>[A-Z]))(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const OUTPUT_VAR_FRAGMENT_REGEX = /^(?<variable>[^\%\%\[\]]+)\%(?<format>[A-Z])(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const OUTPUT_REGEX = /^\s*(output;)$/;
const REQUIRED_FILE_REGEXES = {
    load: LOAD_REGEX,
    outputFile: OUTPUT_FILE_REGEX,
    compareTo: COMPARE_TO_REGEX,
};
const parseRequiredFile = (rawInput, name) => {
    const input = stripComment(rawInput);
    const match = input.match(REQUIRED_FILE_REGEXES[name]);
    if (!!match) {
        return match.groups[name];
    }
};
const OUTPUT_LIST_START = 'output-list ';
const CODE_LINE_END = ';';
const isStartOfOutput = (rawInput) => stripComment(rawInput).startsWith(OUTPUT_LIST_START);
const parseOutputFormat = (rawInput, startedCollectingOutput, results) => {
    const input = stripComment(rawInput);
    const isValidOutput = startedCollectingOutput || input.startsWith(OUTPUT_LIST_START);
    const stillCollecting = !input.endsWith(CODE_LINE_END);
    if (isValidOutput) {
        const parts = input.replace(OUTPUT_LIST_START, '')
            .replace(CODE_LINE_END, '')
            .split(' ')
            .map(t => t.trim());
        parts
            .map((p) => p.match(OUTPUT_RAM_FRAGMENT_REGEX))
            .filter((m) => m !== null)
            .map((m) => ({
            heading: `RAM[${m.groups.address}]`,
            address: parseInt(m.groups.address, 10),
            format: m.groups.format,
            spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
        }))
            .forEach((of) => results.push(of));
        parts
            .map((p) => p.match(OUTPUT_VAR_FRAGMENT_REGEX))
            .filter((m) => m !== null)
            .map((m) => ({
            heading: m.groups.variable,
            variable: m.groups.variable,
            format: m.groups.format,
            spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
        }))
            .forEach((of) => results.push(of));
    }
    return {
        isValidOutput,
        stillCollecting
    };
};
const parseOutputInstruction = (input) => stripComment(input).match(OUTPUT_REGEX) !== null;
const spacePad = (value, width) => {
    while (value.length < width) {
        value = ` ${value}`;
    }
    return value;
};
const RADIX_BY_CODE = {
    D: 10,
};
const formatString = (value, spacing) => {
    if (spacing.length === 3) {
        return `${spacePad("", spacing[0])}${spacePad(value, spacing[1])}${spacePad("", spacing[2])}`;
    }
    // Not sure, just dump out the value
    return value.toString();
};
const formatNumber = (value, format, spacing) => formatString(value.toString(RADIX_BY_CODE[format]), spacing);
const formatBoolean = (value, format, spacing) => formatString(boolToBin(value), spacing);

const SET_NAMED_REGISTER_AT_INDEX_REGEX = /^(set\s(?<namedRegister>[A-Za-z]+)\[)(?<index>[0-9]+)+(\]\s)(?<value>\-{0,1}[0-9]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const SET_NAMED_REGISTER_REGEX = /^(set\s(?<namedRegister>[A-Za-z]+)\s)(?<value>[0-9]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const TICKTOCK_REGEX = /^\s*(ticktock;)$/;
const VMSTEP_REGEX = /^\s*(vmstep;)$/;
const REPEAT_START_REGEX = /^\s*(?:repeat)\s*(?<count>[0-9]+)\s*(?:\{)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const REPEAT_END_REGEX = /^\s*(\})\s*$/;
const LOAD_ALL_REGEX = /^\s*(load)[;,]{0,1}\s*$/;
const parseSetNamedRegisterAtIndex = (input, lineNumber) => {
    const match = input.match(SET_NAMED_REGISTER_AT_INDEX_REGEX);
    if (!!match) {
        return {
            type: CpuTestInstructionType.setNamedRegisterIndex,
            lineContent: input,
            lineNumber,
            registerName: match.groups.namedRegister,
            index: parseInt(match.groups.index, 10),
            value: parseInt(match.groups.value, 10),
        };
    }
    return;
};
const parseSetNamedRegister = (input, lineNumber) => {
    const match = input.match(SET_NAMED_REGISTER_REGEX);
    if (!!match) {
        return {
            type: CpuTestInstructionType.setNamedRegister,
            lineContent: input,
            lineNumber,
            registerName: match.groups.namedRegister,
            value: parseInt(match.groups.value, 10),
        };
    }
    return;
};
const parseTickTockInstruction = (input) => input.match(TICKTOCK_REGEX) !== null;
const parseVmStepInstruction = (input) => input.match(VMSTEP_REGEX) !== null;
const parseLoadAllInstruction = (input) => input.match(LOAD_ALL_REGEX) !== null;
const parseRepeatStart = (input, lineNumber) => {
    const match = input.match(REPEAT_START_REGEX);
    if (!!match) {
        return {
            type: CpuTestInstructionType.repeat,
            lineNumber,
            lineContent: input,
            count: parseInt(match.groups.count, 10),
            instructions: [],
        };
    }
    return;
};
const parseRepeatEnd = (input) => input.match(REPEAT_END_REGEX) !== null;
const parseTestScript = (input) => {
    let outputFile;
    let compareTo;
    let load;
    let loadAll;
    let outputList = [];
    const testInstructions = [];
    const stackInstructions = new Stack();
    stackInstructions.push(testInstructions);
    let stillCollectingOutput = true;
    let startedCollectingOutput = false;
    input
        .map((s, i) => ({ lineContent: stripComment(s), lineNumber: i }))
        .filter(({ lineContent }) => lineContent.length > 0) // Get rid of empty lines
        .forEach(({ lineContent, lineNumber }) => {
        // Check for load file (if not already seen)
        const checkLoad = parseRequiredFile(lineContent, "load");
        if (!!checkLoad) {
            load = checkLoad;
            return;
        }
        const checkLoadAll = parseLoadAllInstruction(lineContent);
        if (checkLoadAll) {
            loadAll = true;
            return;
        }
        // Check for output file (if not already seen)
        const checkOutputFile = parseRequiredFile(lineContent, "outputFile");
        if (!!checkOutputFile) {
            outputFile = checkOutputFile;
            return;
        }
        // Check for output file (if not already seen)
        if (!compareTo) {
            compareTo = parseRequiredFile(lineContent, "compareTo");
            if (!!compareTo)
                return;
        }
        // Now we are into commands
        // Repeat Start
        const repeatCommand = parseRepeatStart(lineContent, lineNumber);
        if (!!repeatCommand) {
            stackInstructions.peek().push(repeatCommand);
            stackInstructions.push(repeatCommand.instructions);
            return;
        }
        // Repeat End
        if (parseRepeatEnd(lineContent)) {
            stackInstructions.pop();
            return;
        }
        // Tick Tock
        if (parseTickTockInstruction(lineContent)) {
            const tickTock = {
                type: CpuTestInstructionType.ticktock,
                lineContent,
                lineNumber,
            };
            stackInstructions.peek().push(tickTock);
            return;
        }
        if (parseVmStepInstruction(lineContent)) {
            const vmstep = {
                type: CpuTestInstructionType.vmstep,
                lineContent,
                lineNumber
            };
            stackInstructions.peek().push(vmstep);
            return;
        }
        // Output
        if (parseOutputInstruction(lineContent)) {
            const output = {
                type: CpuTestInstructionType.output,
                lineContent,
                lineNumber,
            };
            stackInstructions.peek().push(output);
            return;
        }
        // Check for Set RAM
        const setRam = parseSetNamedRegisterAtIndex(lineContent, lineNumber);
        if (!!setRam) {
            stackInstructions.peek().push(setRam);
            return;
        }
        // Check for Set PC
        const setPC = parseSetNamedRegister(lineContent, lineNumber);
        if (!!setPC) {
            stackInstructions.peek().push(setPC);
            return;
        }
        // Output format
        if (isStartOfOutput(lineContent)) {
            outputList = [];
        }
        if (stillCollectingOutput || isStartOfOutput(lineContent)) {
            const { isValidOutput, stillCollecting } = parseOutputFormat(lineContent, startedCollectingOutput, outputList);
            stillCollectingOutput = stillCollecting;
            if (!stillCollecting) {
                const setOutput = {
                    type: CpuTestInstructionType.setOutput,
                    outputList,
                    lineContent,
                    lineNumber,
                };
                stackInstructions.peek().push(setOutput);
            }
            if (isValidOutput) {
                startedCollectingOutput = true;
                return;
            }
        }
        // Not recognised in any way...throw error
        throw new Error(`Invalid test script line: ${lineContent} on line ${lineNumber}`);
    });
    return {
        outputFile,
        compareTo,
        load,
        loadAll,
        testInstructions,
    };
};

class TestRunner {
    constructor(objectUnderTest, directory, fileLoader, scriptParser, sourceFileExtension) {
        this.fileLoader = fileLoader;
        this.directory = directory;
        this.objectUnderTest = objectUnderTest;
        this.scriptParser = scriptParser;
        this.allFilesInDirectory = fs.readdirSync(this.directory).filter(d => d.endsWith(sourceFileExtension));
    }
    reset() {
        this.testOutput = [];
        this.commandStack = new Stack();
        this.commandStack.push([...this.testScript.testInstructions]);
        this.compareTo = this.fileLoader(this.directory, this.testScript.compareTo);
        this.currentOutputList = [];
    }
    loadScript(data) {
        this.testScript = this.scriptParser(data);
        const programs = [];
        if (!!this.testScript.load) {
            programs.push({
                filename: this.testScript.load,
                contents: this.fileLoader(this.directory, this.testScript.load)
            });
        }
        else if (!!this.testScript.loadAll) {
            this.allFilesInDirectory.forEach(p => programs.push({
                filename: p,
                contents: this.fileLoader(this.directory, p)
            }));
        }
        this.loadPrograms(...programs);
        this.reset();
    }
    addToLog(log, check = true) {
        if (this.testOutput.length >= this.compareTo.length) {
            throw new Error(`Too many log lines output from test, expecting ${this.compareTo.length}`);
        }
        if (check) {
            // Check against compareTo
            const nextCompareLine = this.compareTo[this.testOutput.length];
            if (nextCompareLine !== log) {
                throw new Error(`Comparing Failure on Line ${this.testOutput.length}\n\tExpected: \'${nextCompareLine}\'\n\tReceived: \'${log}\'`);
            }
        }
        // Assume all is good
        this.testOutput.push(log);
    }
    step(toEnd = false) {
        while (!this.commandStack.isEmpty()) {
            while (this.commandStack.peek().length > 0) {
                const instruction = this.commandStack.peek().shift();
                this.runInstruction(instruction);
                if (!toEnd)
                    return; // Just run one command
            }
            this.commandStack.pop();
        }
    }
    runToEnd() {
        this.step(true);
    }
}

class HackCpuTestRunner extends TestRunner {
    constructor(directory, fileLoader) {
        super(new HackCpu(), directory, fileLoader, parseTestScript, ASM_FILE_EXTENSION);
    }
    loadPrograms(...programs) {
        if (programs.length !== 1)
            throw new Error('CPU Test Runner can only support a single program file');
        this.objectUnderTest.loadProgram(programs[0].contents);
    }
    runInstruction(instruction) {
        this.lastInstruction = instruction;
        switch (instruction.type) {
            case CpuTestInstructionType.output:
                return this.handleOutputInstruction();
            case CpuTestInstructionType.ticktock:
                return this.handleTickTockInstruction();
            case CpuTestInstructionType.repeat:
                return this.handleRepeatInstruction(instruction);
            case CpuTestInstructionType.setNamedRegisterIndex:
                return this.handleSetNamedRegisterAtIndexInstruction(instruction);
            case CpuTestInstructionType.setNamedRegister:
                return this.handleSetNamedRegisterInstruction(instruction);
            case CpuTestInstructionType.setOutput:
                return this.handleSetOutputInstruction(instruction);
        }
    }
    handleSetOutputInstruction(instruction) {
        this.currentOutputList = instruction.outputList;
        const log = this.currentOutputList
            .map(({ heading, spacing }) => formatString(heading, spacing))
            .join("|");
        this.addToLog(`|${log}|`, false);
    }
    handleTickTockInstruction() {
        this.objectUnderTest.tick();
    }
    handleRepeatInstruction({ count, instructions }) {
        const newNestedInstructions = [];
        for (let x = 0; x < count; x++) {
            instructions.forEach((i) => newNestedInstructions.push(i));
        }
        this.commandStack.push(newNestedInstructions);
    }
    handleSetNamedRegisterAtIndexInstruction({ registerName, index, value }) {
        if (registerName === 'RAM') {
            this.objectUnderTest.memory.set(index, value);
        }
    }
    handleSetNamedRegisterInstruction({ value, registerName }) {
        switch (registerName) {
            case 'PC':
                this.objectUnderTest.setPC(value);
                break;
        }
    }
    handleOutputInstruction() {
        const log = this.currentOutputList
            .map((output) => {
            if (isOutputRam(output)) {
                const { address, format, spacing } = output;
                return formatNumber(this.objectUnderTest.memory.get(address), format, spacing);
            }
            else {
                throw new Error("Unsupported method, outputting variables from Hack CPU");
            }
        })
            .join("|");
        this.addToLog(`|${log}|`);
    }
}

/**
 * Implements memory segments which are simply arrays located within the CPU memory.
 *
 * POP
 * addr = segmentPtr + i, SP--, *addr=*SP
 *
 * PUSH
 * addr = segmentPtr + i, *SP = *addr, SP++
 */
class MemorySegmentArray extends MemorySegment {
    constructor(memory, stack, symbol, baseAddressLocation, baseAddress) {
        super(memory, stack);
        this.symbol = symbol;
        this.baseAddressLocation = baseAddressLocation;
        this.memory.setLabel(this.symbol, this.baseAddressLocation);
        this.memory.setLabelled(this.symbol, baseAddress);
    }
    getAddress(index = 0) {
        const ptrLocation = this.memory.getLabelled(this.symbol);
        const address = ptrLocation + index;
        return address;
    }
    setAddress(index) {
        this.memory.setLabelled(this.symbol, index);
    }
    toString() {
        return Array(16).fill(null).map((_, i) => this.get(i)).join(', ');
    }
}

/**
 * Allows us to push constant values onto the stack.
 *
 * push
 * *SP = i, SP++
 */
class MemorySegmentConstant extends MemorySegment {
    getAddress(index) {
        throw new Error("Method not implemented.");
    }
    set(index, value) {
        throw new Error("Method not implemented.");
    }
    get(index) {
        return index;
    }
    toString() {
        return 'Constant';
    }
}

/**
 * 0 = this
 * 1 = that
 *
 * push pointer 0/1
 *
 * *SP = THIS/THAT; SP++
 *
 * pop pointer 0/1
 * SP--; THIS/THAT = *SP
 */
class MemorySegmentPointer extends MemorySegment {
    constructor(memory, stack, thisSegment, thatSegment) {
        super(memory, stack);
        this.thisSegment = thisSegment;
        this.thatSegment = thatSegment;
    }
    getAddress(index) {
        let segment;
        switch (index) {
            case 0:
                segment = this.thisSegment;
                break;
            case 1:
                segment = this.thatSegment;
                break;
            default: throw new Error(`Invalid index for pointer segment, only allow 0/1, received ${index}`);
        }
        return segment.baseAddressLocation;
    }
    toString() {
        return [0, 1].map(i => this.get(i)).join(',');
    }
}

const DEFAULT_STACK_POINTER_VALUE = 256;
class MemoryStack {
    constructor(memory, stackPointerAddress = MEM_ADDRESS_STACK_PTR, stackPointerValue = DEFAULT_STACK_POINTER_VALUE) {
        this.memory = memory;
        this.memory.setLabel(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointerAddress);
        this.initialStackPointerValue = stackPointerValue;
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointerValue);
    }
    setSP(index) {
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, index);
    }
    getSP() {
        return this.memory.getLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR);
    }
    push(value) {
        const stackPointer = this.getSP();
        this.memory.set(stackPointer, value);
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointer + 1);
    }
    pop() {
        const stackPointer = this.getSP();
        if (stackPointer === this.initialStackPointerValue) {
            throw new Error("Stack Underflow, popping from empty stack");
        }
        this.memory.setLabelled(ASM_MEM_SEG_SYMBOL_STACK_PTR, stackPointer - 1);
        return this.memory.get(stackPointer - 1);
    }
    peek() {
        const stackPointer = this.getSP();
        if (stackPointer === this.initialStackPointerValue) {
            throw new Error("Stack Underflow, popping from empty stack");
        }
        return this.memory.get(stackPointer - 1);
    }
    toString() {
        return Array(16).fill(null).map((_, i) => this.memory.get(i + this.initialStackPointerValue)).join(', ');
    }
}

const parseVMSegment = (segmentName) => {
    if (segmentName in VMSegment) {
        return segmentName;
    }
    throw new Error(`Invalid segment name ${segmentName}`);
};
const parseVmInstruction = (rawLineRef) => {
    const ref = generateLineRef(rawLineRef);
    const input = stripComment(ref.originalLine);
    if (input.length === 0)
        return;
    const parts = input.split(' ');
    // Is this a single word command?
    switch (parts.length) {
        case 1: {
            // Is this an arithmetic command?
            if (input in VMArithmeticOperation) {
                return {
                    type: VMInstructionType.arithmetic,
                    operation: input,
                    ref
                };
            }
            if (input === 'return') {
                return {
                    type: VMInstructionType.return,
                    ref
                };
            }
            throw new Error(`Could not parse VM Command on line ${ref.originalLineNumber}: ${input}`);
        }
        case 2: {
            switch (parts[0]) {
                case 'label':
                    return {
                        type: VMInstructionType.label,
                        label: parts[1],
                        ref
                    };
                case 'goto':
                    return {
                        type: VMInstructionType.goto,
                        label: parts[1],
                        ref
                    };
                case 'if-goto':
                    return {
                        type: VMInstructionType.ifgoto,
                        label: parts[1],
                        ref
                    };
            }
        }
        case 3: {
            const part2 = parseInt(parts[2], 10);
            switch (parts[0]) {
                case 'push':
                    return {
                        type: VMInstructionType.push,
                        segment: parseVMSegment(parts[1]),
                        index: part2,
                        ref
                    };
                case 'pop':
                    return {
                        type: VMInstructionType.pop,
                        segment: parseVMSegment(parts[1]),
                        index: part2,
                        ref
                    };
                case 'call':
                    return {
                        type: VMInstructionType.call,
                        functionName: parts[1],
                        numberArgs: part2,
                        ref
                    };
                case 'function':
                    return {
                        type: VMInstructionType.function,
                        functionName: parts[1],
                        numberVars: part2,
                        ref
                    };
                default:
                    throw new Error(`Invalid VM Command line, 3 parts, but doesn't conform to stack command`);
            }
        }
    }
};

const getStaticAsmVariable = (sourceFilename, index) => `${sourceFilename}.${index}`;
/**
 * The static segment is implemented using variables in global space.
 * RAM 16 to RAM 255
 * Foo.vm contains pop static 5
 *
 * // D=stack pop
 * @Foo.5
 * M=D
 *
 * Create one of these memory segments for each file being parsed...I think
 */
class MemorySegmentStatic extends MemorySegment {
    constructor(memory, stack) {
        super(memory, stack);
        this.reset();
    }
    reset() {
        this.createdVariables = [];
    }
    setSourceFilename(sourceFilename) {
        this.sourceFilename = sourceFilename;
    }
    getAddress(index) {
        const variableName = this.getVariableName(index);
        return this.memory.getOrCreateLabel(variableName);
    }
    getVariableName(index) {
        return getStaticAsmVariable(this.sourceFilename, index);
    }
    toString() {
        return '\t' + this.createdVariables.map(c => `${c}: ${this.memory.getLabelled(c)}`).join('\n\t');
    }
}

/**
 * Converts from our internal representation of VM commands to their string equivalent
 *
 * @param vmInstruction The instruction as previously parsed, or created programmatically
 * @returns The string representation of this command to write to file
 */
const generateHackVm = (vmInstruction) => {
    switch (vmInstruction.type) {
        case VMInstructionType.pop:
            return `pop ${vmInstruction.segment} ${vmInstruction.index}`;
        case VMInstructionType.push:
            return `push ${vmInstruction.segment} ${vmInstruction.index}`;
        case VMInstructionType.arithmetic:
            return vmInstruction.operation;
        case VMInstructionType.call:
            return `call ${vmInstruction.functionName} ${vmInstruction.numberArgs}`;
        case VMInstructionType.function:
            return `function ${vmInstruction.functionName} ${vmInstruction.numberVars}`;
        case VMInstructionType.ifgoto:
            return `if-goto ${vmInstruction.label}`;
        case VMInstructionType.goto:
            return `goto ${vmInstruction.label}`;
        case VMInstructionType.label:
            return `label ${vmInstruction.label}`;
        case VMInstructionType.return:
            return 'return';
    }
};

/* tslint:disable:no-empty */
class HackVm {
    // Initalise new VM
    constructor() {
        this.memory = new RAMSimulator();
        this.callStack = new Stack();
        this.program = [];
        this.programCounter = 0;
        this.stack = new MemoryStack(this.memory, 0, 128);
        const localSegment = new MemorySegmentArray(this.memory, this.stack, ASM_MEM_SEG_SYMBOL_LOCAL, MEM_SEG_ADDRESS_LOCAL, 700);
        const argumentSegment = new MemorySegmentArray(this.memory, this.stack, ASM_MEM_SEG_SYMBOL_ARGUMENTS, MEM_SEG_ADDRESS_ARGUMENTS, 800);
        const thisSegment = new MemorySegmentArray(this.memory, this.stack, ASM_MEM_SEG_SYMBOL_THIS, MEM_SEG_ADDRESS_THIS, 900);
        const thatSegment = new MemorySegmentArray(this.memory, this.stack, ASM_MEM_SEG_SYMBOL_THAT, MEM_SEG_ADDRESS_THAT, 1000);
        const constantSegment = new MemorySegmentConstant(this.memory, this.stack);
        const staticSegment = new MemorySegmentStatic(this.memory, this.stack); // will need fixing later....;
        const tempSegment = new MemorySegmentTemp(this.memory, this.stack, MEM_SEG_TEMP_START, MEM_SEG_TEMP_LENGTH);
        const pointerSegment = new MemorySegmentPointer(this.memory, this.stack, thisSegment, thatSegment);
        this.memorySegments = {
            [VMSegment.local]: localSegment,
            [VMSegment.argument]: argumentSegment,
            [VMSegment.this]: thisSegment,
            [VMSegment.that]: thatSegment,
            [VMSegment.constant]: constantSegment,
            [VMSegment.static]: staticSegment,
            [VMSegment.temp]: tempSegment,
            [VMSegment.pointer]: pointerSegment
        };
        this.reset();
    }
    getMemorySegmentLocation(name, index) {
        if (!(name in this.memorySegments)) {
            throw new Error(`Invalid memory segment ${name}`);
        }
        const segment = this.memorySegments[name];
        return segment.getAddress(index);
    }
    getMemory() {
        return this.memory;
    }
    setMemorySegment(name, index, value) {
        if (name in this.memorySegments) {
            this.memorySegments[name].set(index, value);
            return true;
        }
        return false;
    }
    reset() {
        this.programCounter = 0;
        this.getMemorySegmentStatic().reset();
    }
    getMemorySegmentArgument() {
        return this.memorySegments[VMSegment.argument];
    }
    getMemorySegmentLocal() {
        return this.memorySegments[VMSegment.local];
    }
    getMemorySegmentThis() {
        return this.memorySegments[VMSegment.this];
    }
    getMemorySegmentThat() {
        return this.memorySegments[VMSegment.that];
    }
    getMemorySegmentStatic() {
        return this.memorySegments[VMSegment.static];
    }
    getMemorySegmentConstant() {
        return this.memorySegments[VMSegment.constant];
    }
    getMemorySegmentTemp() {
        return this.memorySegments[VMSegment.temp];
    }
    getMemorySegmentPointer() {
        return this.memorySegments[VMSegment.pointer];
    }
    loadProgram(...sourceFiles) {
        if (sourceFiles.length === 0)
            throw new Error('No source files given to VM');
        let sysInitFound;
        this.programCounter = 0;
        this.program = [];
        this.programLabels = {};
        // Assume the program starts at line zero
        const staticMemorySegment = this.getMemorySegmentStatic();
        staticMemorySegment.setSourceFilename(sourceFiles[0].filename);
        sourceFiles.forEach(({ filename, contents }) => {
            contents
                .map((s, i) => parseVmInstruction({
                sourceFilename: filename,
                originalLine: s,
                originalLineNumber: i
            }))
                .filter(s => s !== undefined)
                .forEach(v => {
                if (v.type === VMInstructionType.function) {
                    if (v.functionName === SYSTEM_INIT_FUNCTION_NAME) {
                        sysInitFound = v.ref.sourceFilename;
                    }
                }
                this.program.push(v);
            });
        });
        // Check for Sys.init if there are multiple VM files.
        if (sourceFiles.length > 1 && sysInitFound === undefined)
            throw new Error('Multi file VM program with no Sys.init found.');
        // If there is a Sys.init. Add instructions at the start to call that function
        // Otherwise we are assuming the program starts at the start of the VM instructions
        if (sysInitFound !== undefined) {
            const goToSysInit = {
                type: VMInstructionType.call,
                functionName: SYSTEM_INIT_FUNCTION_NAME,
                numberArgs: 0,
                ref: generateLineRef({
                    sourceFilename: 'ROOT',
                })
            };
            this.program.unshift(goToSysInit);
        }
        this.program.forEach((v, i) => {
            switch (v.type) {
                case VMInstructionType.function:
                    this.programLabels[v.functionName] = i;
                    break;
                case VMInstructionType.label:
                    this.programLabels[v.label] = i + 1;
                    break;
            }
        });
        this.programCounter = 0;
        this.steps = 0;
    }
    getNextCodeLine() {
        if (this.programCounter >= this.program.length)
            return undefined;
        if (this.programCounter < 0)
            throw new Error(`VM Program Counter Became Negative ${this.programCounter}`);
        return this.program[this.programCounter];
    }
    step() {
        // Just return if we have run off end of the memory
        const nextCodeLine = this.getNextCodeLine();
        if (nextCodeLine === undefined)
            return false;
        this.executeInstruction(nextCodeLine);
        this.steps++;
        return true;
    }
    executeInstruction(instruction) {
        switch (instruction.type) {
            case VMInstructionType.arithmetic:
                return this.executeArithemtic(instruction.operation);
            case VMInstructionType.push:
                return this.executeStackPushInstruction(instruction.segment, instruction.index);
            case VMInstructionType.pop:
                return this.executeStackPopInstruction(instruction.segment, instruction.index);
            case VMInstructionType.call:
                return this.executeCall(instruction.functionName, instruction.numberArgs);
            case VMInstructionType.function:
                return this.executeFunction(instruction.ref.sourceFilename, instruction.functionName, instruction.numberVars);
            case VMInstructionType.goto:
                return this.executeGoTo(instruction.label);
            case VMInstructionType.ifgoto:
                return this.executeIfGoTo(instruction.label);
            case VMInstructionType.label:
                return this.executeLabel(instruction.label);
            case VMInstructionType.return:
                return this.executeReturn();
        }
    }
    /* tslint:disable:no-bitwise */
    executeArithemtic(operation) {
        switch (operation) {
            case VMArithmeticOperation.add:
                this.executeBinaryOperationNumber((a, b) => a + b);
                break;
            case VMArithmeticOperation.sub:
                this.executeBinaryOperationNumber((a, b) => b - a);
                break;
            case VMArithmeticOperation.gt:
                this.executeBinaryOperationBool((a, b) => a < b);
                break;
            case VMArithmeticOperation.lt:
                this.executeBinaryOperationBool((a, b) => a > b);
                break;
            case VMArithmeticOperation.eq:
                this.executeBinaryOperationBool((a, b) => a === b);
                break;
            case VMArithmeticOperation.neg: {
                const t = this.stack.pop();
                this.stack.push(-t);
                break;
            }
            case VMArithmeticOperation.and:
                this.executeBinaryOperationNumber((a, b) => a & b);
                break;
            case VMArithmeticOperation.or:
                this.executeBinaryOperationNumber((a, b) => a | b);
                break;
            case VMArithmeticOperation.not: {
                const value = this.stack.pop();
                this.stack.push(~value);
                break;
            }
        }
        this.programCounter++;
    }
    executeBinaryOperationBool(op) {
        const a = this.stack.pop();
        const b = this.stack.pop();
        const res = op(a, b);
        this.stack.push(res ? -1 : 0);
    }
    executeBinaryOperationNumber(op) {
        const a = this.stack.pop();
        const b = this.stack.pop();
        const res = op(a, b);
        this.stack.push(res);
    }
    executeStackPushInstruction(segmentName, index) {
        const segment = this.memorySegments[segmentName];
        segment.push(index);
        this.programCounter++;
    }
    executeStackPopInstruction(segmentName, index) {
        const segment = this.memorySegments[segmentName];
        segment.pop(index);
        this.programCounter++;
    }
    executeFunction(sourceFilename, functionName, numberVars) {
        const staticMemorySegment = this.getMemorySegmentStatic();
        staticMemorySegment.setSourceFilename(sourceFilename);
        for (let i = 0; i < numberVars; i++) {
            this.stack.push(0);
        }
        this.programCounter++;
        this.callStack.push(functionName);
    }
    executeLabel(label) {
        this.programCounter++;
    }
    executeGoTo(label) {
        if (!(label in this.programLabels))
            throw new Error(`Could not jump to label ${label}, not recognised`);
        this.programCounter = this.programLabels[label];
    }
    executeIfGoTo(label) {
        const d = this.stack.pop();
        if (d !== 0) {
            this.executeGoTo(label);
        }
        else {
            this.programCounter++;
        }
    }
    executeReturn() {
        const endFrame = this.getMemorySegmentLocal().getAddress();
        const returnAddress = this.memory.get(endFrame - 5);
        const returnValue = this.stack.pop();
        this.getMemorySegmentArgument().set(0, returnValue);
        this.stack.setSP(this.getMemorySegmentArgument().getAddress() + 1);
        this.getMemorySegmentThat().setAddress(this.memory.get(endFrame - 1));
        this.getMemorySegmentThis().setAddress(this.memory.get(endFrame - 2));
        this.getMemorySegmentArgument().setAddress(this.memory.get(endFrame - 3));
        this.getMemorySegmentLocal().setAddress(this.memory.get(endFrame - 4));
        // AWOOGA AWOOGA, we should pop the call stack, this is going to get scary
        this.programCounter = returnAddress;
        // Some tests will not actually make a call
        this.callStack.pop();
        // If we have reached end of call stack, just push program counter off the end
        if (this.callStack.isEmpty()) {
            this.programCounter = this.program.length;
        }
    }
    executeCall(functionName, numberArgs) {
        this.stack.push(this.programCounter + 1);
        this.stack.push(this.getMemorySegmentLocal().getAddress());
        this.stack.push(this.getMemorySegmentArgument().getAddress());
        this.stack.push(this.getMemorySegmentThis().getAddress());
        this.stack.push(this.getMemorySegmentThat().getAddress());
        this.getMemorySegmentArgument().setAddress(this.stack.getSP() - 5 - numberArgs);
        this.getMemorySegmentLocal().setAddress(this.stack.getSP());
        this.executeGoTo(functionName);
    }
    toString(...windows) {
        return `Hack Virtual Machine
        PC: ${this.programCounter}
        Stack
        ${this.stack.toString()}
        Segments
        ${Object.entries(this.memorySegments).map(([type, segment]) => `${type}: ${segment.toString()}`).join('\n\t')}
        ${this.memory.toString(...windows)}
        Program:
${this.program.map((vmInstruction, i) => `${i}: ${generateHackVm(vmInstruction)}`).join('\n\t')}
    Program Labels:
        ${Object.entries(this.programLabels)
            .map(([key, value]) => `\t${key}=${value.toString(10)}`)
            .join(",")}
            `;
    }
}

class HackVmTestRunner extends TestRunner {
    constructor(hackVm, directory, fileLoader) {
        super(hackVm, directory, fileLoader, parseTestScript, VM_FILE_EXTENSION);
    }
    loadPrograms(...programs) {
        this.objectUnderTest.loadProgram(...programs);
    }
    runInstruction(instruction) {
        this.lastInstruction = instruction;
        switch (instruction.type) {
            case CpuTestInstructionType.output:
                this.handleOutputInstruction();
                break;
            case CpuTestInstructionType.vmstep:
                this.handleVmStepInstruction();
                break;
            case CpuTestInstructionType.repeat:
                this.handleRepeatInstruction(instruction);
                break;
            case CpuTestInstructionType.setNamedRegisterIndex:
                this.handleSetNamedRegisterAtIndexInstruction(instruction);
                break;
            case CpuTestInstructionType.setNamedRegister:
                this.handleSetNamedRegister(instruction);
                break;
            case CpuTestInstructionType.setOutput:
                this.handleSetOutputInstruction(instruction);
                break;
            default:
                throw new Error(`Unsupported instruction ${instruction.type}`);
        }
        // console.log(JSON.stringify(instruction));
        // console.log(this.objectUnderTest.toString(
        //     { start: 0, end: 4 }, // CPU will use Temp0, which means those won't agree
        //     { start: 16, end: 20 }, // static variables
        //     { start: 310, end: 330 },
        // ));
    }
    handleSetOutputInstruction(instruction) {
        this.currentOutputList = instruction.outputList;
        const log = this.currentOutputList
            .map(({ heading, spacing }) => formatString(heading, spacing))
            .join("|");
        this.addToLog(`|${log}|`, false);
    }
    handleVmStepInstruction() {
        this.objectUnderTest.step();
    }
    handleRepeatInstruction({ count, instructions }) {
        const newNestedInstructions = [];
        for (let x = 0; x <= count; x++) {
            instructions.forEach((i) => newNestedInstructions.push(i));
        }
        this.commandStack.push(newNestedInstructions);
    }
    handleSetNamedRegisterAtIndexInstruction({ registerName, index, value }) {
        if (registerName === 'RAM') {
            return this.objectUnderTest.getMemory().set(index, value);
        }
        const address = this.objectUnderTest.getMemorySegmentLocation(registerName, index);
        if (address >= 0) {
            return this.objectUnderTest.getMemory().set(address, value);
        }
    }
    handleSetNamedRegister({ value, registerName }) {
        this.objectUnderTest.getMemory().setLabelled(registerName, value);
    }
    getCurrentOutput() {
        return this.currentOutputList
            .map((output) => {
            if (isOutputRam(output)) {
                const { address, format, spacing } = output;
                return formatNumber(this.objectUnderTest.getMemory().get(address), format, spacing);
            }
            else {
                throw new Error("Unsupported method, outputting variables from Hack CPU");
            }
        })
            .join("|");
    }
    handleOutputInstruction() {
        this.addToLog(`|${this.getCurrentOutput()}|`);
    }
}

class BinaryPin {
    constructor(receivers = []) {
        this.receivers = [];
        receivers.forEach((r) => this.receivers.push(r));
        this.newOutputObserver = NO_OP;
        this.newValueObserver = NO_OP;
    }
    withNewOutputObserver(o) {
        this.newOutputObserver = o;
        return this;
    }
    withNewValueObserver(o) {
        this.newValueObserver = o;
        return this;
    }
    connectRecipient(...receivers) {
        receivers.forEach((r) => this.receivers.push(r));
        this.newOutputObserver();
        return this;
    }
    send(newValue, force = false) {
        if (force || !this.lastOutput || newValue !== this.lastOutput) {
            this.lastOutput = newValue;
            this.receivers.forEach((r) => r.send(newValue));
            this.newValueObserver();
        }
        return this;
    }
}

class Chip {
    constructor(name, inputs, outputs) {
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
        this.pins = {};
        this.buses = {};
    }
    createPin(name, ...pins) {
        if (name in this.pins)
            throw new Error(`Pin already exists on ${this.name}: ${name}`);
        // Single output
        if (pins.length === 1) {
            this.pins[name] = pins[0];
            return;
        }
        // Multiple Outputs, create a splitter
        if (pins.length > 1) {
            this.pins[name] = new BinaryPin().connectRecipient(...pins);
            return;
        }
    }
    createBus(name, bus) {
        if (name in this.buses)
            throw new Error(`Pin already exists on ${this.name}: ${name}`);
        this.buses[name] = bus;
    }
    getBus(name) {
        if (!(name in this.buses))
            throw new Error(`Output Bus ${name} doesn't exist on ${this.name}`);
        return this.buses[name];
    }
    getPin(name, index = 0) {
        if (name in this.pins && index === 0) {
            return this.pins[name];
        }
        if (name in this.buses) {
            return this.buses[name].getPin(index);
        }
        throw new Error(`Could not find pin called ${name} at ${index} on ${this.name}`);
    }
}

const WORD_LENGTH = 16;
const ZERO_WORD = Array(WORD_LENGTH).fill(false);
const PIN_A = "a";
const PIN_B = "b";
const PIN_INPUT = "in";
const PIN_OUTPUT = "out";
const PIN_SELECTOR = "sel";
const PIN_LOAD = "load";
const PIN_ADDRESS = "address";

class Nand extends Chip {
    constructor() {
        super("Nand", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.a = new BinaryPin().withNewValueObserver(() => this.updateValue());
        this.b = new BinaryPin().withNewValueObserver(() => this.updateValue());
        this.output = new BinaryPin().withNewOutputObserver(() => this.updateValue(true));
        this.updateValue();
        this.createPin(PIN_A, this.a);
        this.createPin(PIN_B, this.b);
        this.createPin(PIN_OUTPUT, this.output);
    }
    updateValue(force = false) {
        // This is the only logical expression we calculate natively, everything else is combinations of this!!!
        const newValue = !(this.a.lastOutput && this.b.lastOutput);
        this.output.send(newValue, force);
    }
}

/**
 * Not gate:
 * out = not in
 */
//  CHIP Not {
//     IN in;
//     OUT out;
//     PARTS:
//     Nand(a=in, b=in, out=out);
// }
class Not extends Chip {
    constructor() {
        super("Not", [PIN_INPUT], [PIN_OUTPUT]);
        this.nand = new Nand();
        // External Wiring
        this.createPin(PIN_INPUT, this.nand.getPin(PIN_A), this.nand.getPin(PIN_B));
        this.createPin(PIN_OUTPUT, this.nand.getPin(PIN_OUTPUT));
    }
}

/**
 * And gate:
 * out = 1 if (a == 1 and b == 1)
 *       0 otherwise
 */
//  CHIP And {
//   IN a, b;
//   OUT out;
//   PARTS:
//   Nand(a=a, b=b, out=notAandB);
//   Not(in=notAandB, out=out);
// }
class And extends Chip {
    constructor() {
        super("And", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.nand = new Nand();
        this.not = new Not();
        // Internal Wiring
        this.nand.getPin(PIN_OUTPUT).connectRecipient(this.not.getPin(PIN_INPUT));
        // External wiring
        this.createPin(PIN_A, this.nand.getPin(PIN_A));
        this.createPin(PIN_B, this.nand.getPin(PIN_B));
        this.createPin(PIN_OUTPUT, this.not.getPin(PIN_OUTPUT));
    }
}

/**
 * Or gate:
 * out = 1 if (a == 1 or b == 1)
 *       0 otherwise
 */
//   CHIP Or {
//     IN a, b;
//     OUT out;
//     PARTS:
//     // Put your code here:
//     Not(in=a, out=notA);
//     Not(in=b, out=notB);
//     Nand(a=notA, b=notB, out=out);
// }
class Or extends Chip {
    constructor() {
        super("Or", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.nandNotA = new Not();
        this.nandNotB = new Not();
        this.nandNotANotB = new Nand();
        // Internal Wiring
        this.nandNotA.getPin(PIN_OUTPUT).connectRecipient(this.nandNotANotB.getPin(PIN_A));
        this.nandNotB.getPin(PIN_OUTPUT).connectRecipient(this.nandNotANotB.getPin(PIN_B));
        // External Wiring
        this.createPin(PIN_A, this.nandNotA.getPin(PIN_INPUT));
        this.createPin(PIN_B, this.nandNotB.getPin(PIN_INPUT));
        this.createPin(PIN_OUTPUT, this.nandNotANotB.getPin(PIN_OUTPUT));
    }
}

/**
 * Exclusive-or gate:
 * out = not (a == b)
 */
//  CHIP Xor {
//     IN a, b;
//     OUT out;
//     PARTS:
//     Not (in=a, out=nota);
//     Not (in=b, out=notb);
//     And (a=a, b=notb, out=aAndNotb);
//     And (a=nota, b=b, out=notaAndb);
//     Or (a=aAndNotb, b=notaAndb, out=out);
// }
class Xor extends Chip {
    constructor() {
        super("Xor", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.notA = new Not();
        this.notB = new Not();
        this.aAndNotB = new And();
        this.notaAndB = new And();
        this.outOr = new Or();
        // Internal Wiring
        this.notA.getPin(PIN_OUTPUT).connectRecipient(this.notaAndB.getPin(PIN_A));
        this.notB.getPin(PIN_OUTPUT).connectRecipient(this.aAndNotB.getPin(PIN_B));
        this.aAndNotB.getPin(PIN_OUTPUT).connectRecipient(this.outOr.getPin(PIN_A));
        this.notaAndB.getPin(PIN_OUTPUT).connectRecipient(this.outOr.getPin(PIN_B));
        // External Wiring
        this.createPin(PIN_A, this.notA.getPin(PIN_INPUT), this.aAndNotB.getPin(PIN_A));
        this.createPin(PIN_B, this.notB.getPin(PIN_INPUT), this.notaAndB.getPin(PIN_B));
        this.createPin(PIN_OUTPUT, this.outOr.getPin(PIN_OUTPUT));
    }
}

/**
 * Computes the sum of two bits.
 */
//  CHIP HalfAdder {
//     IN a, b;    // 1-bit inputs
//     OUT sum,    // Right bit of a + b
//         carry;  // Left bit of a + b
//     PARTS:
//     // Put you code here:
//     Xor(a=a, b=b, out=sum);
//     And(a=a, b=b, out=carry);
// }
const PIN_SUM = "sum";
const PIN_CARRY = "carry";
class HalfAdder extends Chip {
    constructor() {
        super("HalfAdder", [PIN_A, PIN_B], [PIN_SUM, PIN_CARRY]);
        this.sum = new Xor();
        this.carry = new And();
        // External Wiring
        this.createPin(PIN_A, this.sum.getPin(PIN_A), this.carry.getPin(PIN_A));
        this.createPin(PIN_B, this.sum.getPin(PIN_B), this.carry.getPin(PIN_B));
        this.createPin(PIN_SUM, this.sum.getPin(PIN_OUTPUT));
        this.createPin(PIN_CARRY, this.carry.getPin(PIN_OUTPUT));
    }
}

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
//  CHIP DMux {
//     IN in, sel;
//     OUT a, b;
//     PARTS:
//     // Put your code here:
//     Not(in=sel, out=notSel);
//     And(a=in, b=notSel, out=a);
//     And(a=in, b=sel, out=b);
// }
class Dmux extends Chip {
    constructor() {
        super("Dmux", [PIN_INPUT, PIN_SELECTOR], [PIN_A, PIN_B]);
        this.notSel = new Not();
        this.inAndNotSel = new And();
        this.inAndSel = new And();
        // Internal Wiring
        this.notSel.getPin(PIN_OUTPUT).connectRecipient(this.inAndNotSel.getPin(PIN_B));
        // External Wiring
        this.createPin(PIN_INPUT, this.inAndNotSel.getPin(PIN_A), this.inAndSel.getPin(PIN_A));
        this.createPin(PIN_SELECTOR, this.notSel.getPin(PIN_INPUT), this.inAndSel.getPin(PIN_B));
        this.createPin(PIN_A, this.inAndNotSel.getPin(PIN_OUTPUT));
        this.createPin(PIN_B, this.inAndSel.getPin(PIN_OUTPUT));
    }
}

const createPinArray = (width = WORD_LENGTH) => Array(width)
    .fill(null)
    .map(() => new BinaryPin());
class BinaryBus {
    constructor(pins = createPinArray()) {
        this.pins = pins;
    }
    getWidth() {
        return this.pins.length;
    }
    send(values, startIndex = 0) {
        values.forEach((v, i) => {
            const index = i + startIndex;
            if (index >= this.pins.length)
                throw new Error(`Writing too much data ${values.length} starting at ${startIndex} to bus ${name} which is ${this.pins.length} bits wide`);
            this.pins[index].send(v);
        });
    }
    getPin(index = 0) {
        // Is this a pin we have seen before?
        if (index > this.pins.length || !this.pins[index]) {
            this.pins[index] = new BinaryPin();
        }
        return this.pins[index];
    }
    connectPin(pin, index = 0) {
        if (index > this.pins.length) {
            throw new Error(`Attempting to connect bus pin ${index} with only ${this.pins.length} available`);
        }
        this.pins[index].connectRecipient(pin);
        return this;
    }
    connect(bus, startIndex = 0, endIndex = WORD_LENGTH) {
        bus.pins.forEach((pin, i) => {
            const index = startIndex + i;
            if (index > this.pins.length) {
                throw new Error(`Attempting to connect bus pin ${index} with only ${this.pins.length} available`);
            }
            if (index <= endIndex) {
                this.pins[index].connectRecipient(pin);
            }
        });
        return this;
    }
    getValue() {
        return this.pins.map((r) => r.lastOutput);
    }
}

/**
 * 4-way demultiplexor:
 * {a, b, c, d} = {in, 0, 0, 0} if sel == 00
 *                {0, in, 0, 0} if sel == 01
 *                {0, 0, in, 0} if sel == 10
 *                {0, 0, 0, in} if sel == 11
 */
//  CHIP DMux4Way {
//     IN in, sel[2];
//     OUT a, b, c, d;
//     PARTS:
//     Not(in=sel[1], out=notSel1);
//     And(a=in, b=notSel1, out=inAndNotSel1);
//     DMux(in=inAndNotSel1, sel=sel[0], a=a, b=b);
//     And(a=in, b=sel[1], out=inAndSel1);
//     DMux(in=inAndSel1, sel=sel[0], a=c, b=d);
// }
const PIN_C = "c";
const PIN_D = "d";
class Dmux4Way extends Chip {
    constructor() {
        super("Dmux4Way", [PIN_INPUT, PIN_SELECTOR], [PIN_A, PIN_B, PIN_C, PIN_D]);
        // in=1, sel=01
        // Demux AB, CD, sel = sel[0]
        this.notSel1 = new Not(); // false
        this.inAndNotSel1 = new And(); // false
        this.dmuxAB = new Dmux(); // in=false
        this.inAndSel1 = new And(); // true
        this.dmuxCD = new Dmux(); // in=true
        // Internal Wiring
        this.notSel1.getPin(PIN_OUTPUT).connectRecipient(this.inAndNotSel1.getPin(PIN_B));
        this.inAndNotSel1.getPin(PIN_OUTPUT).connectRecipient(this.dmuxAB.getPin(PIN_INPUT));
        this.inAndSel1.getPin(PIN_OUTPUT).connectRecipient(this.dmuxCD.getPin(PIN_INPUT));
        // External Wiring
        this.createPin(PIN_INPUT, this.inAndNotSel1.getPin(PIN_A), this.inAndSel1.getPin(PIN_A));
        this.createBus(PIN_SELECTOR, new BinaryBus([
            new BinaryPin([
                this.dmuxAB.getPin(PIN_SELECTOR),
                this.dmuxCD.getPin(PIN_SELECTOR),
            ]),
            new BinaryPin([
                this.notSel1.getPin(PIN_INPUT),
                this.inAndSel1.getPin(PIN_B),
            ]),
        ]));
        this.createPin(PIN_A, this.dmuxAB.getPin(PIN_A));
        this.createPin(PIN_B, this.dmuxAB.getPin(PIN_B));
        this.createPin(PIN_C, this.dmuxCD.getPin(PIN_A));
        this.createPin(PIN_D, this.dmuxCD.getPin(PIN_B));
    }
}

/**
 * Computes the sum of three bits.
 */
//  CHIP FullAdder {
//     IN a, b, c;  // 1-bit inputs
//     OUT sum,     // Right bit of a + b + c
//         carry;   // Left bit of a + b + c
//     PARTS:
//     HalfAdder(a=a, b=b, sum=sumAB, carry=carryAB);
//     HalfAdder(a=sumAB, b=c, sum=sum, carry=carryABC);
//     Or(a=carryAB, b=carryABC, out=carry);
// }
class FullAdder extends Chip {
    constructor() {
        super("FullAdder", [PIN_A, PIN_B, PIN_C], [PIN_SUM, PIN_CARRY]);
        this.addAB = new HalfAdder();
        this.addABC = new HalfAdder();
        this.carryOr = new Or();
        // Internal Wiring
        this.addAB.getPin(PIN_SUM).connectRecipient(this.addABC.getPin(PIN_A));
        this.addAB.getPin(PIN_CARRY).connectRecipient(this.carryOr.getPin(PIN_A));
        this.addABC.getPin(PIN_CARRY).connectRecipient(this.carryOr.getPin(PIN_B));
        // External Wiring
        this.createPin(PIN_A, this.addAB.getPin(PIN_A));
        this.createPin(PIN_B, this.addAB.getPin(PIN_B));
        this.createPin(PIN_C, this.addABC.getPin(PIN_B));
        this.createPin(PIN_SUM, this.addABC.getPin(PIN_SUM));
        this.createPin(PIN_CARRY, this.carryOr.getPin(PIN_OUTPUT));
    }
}

/**
 * Adds two 16-bit values.
 * The most significant carry bit is ignored.
 */
//  CHIP Add16 {
//     IN a[16], b[16];
//     OUT out[16];
//     PARTS:
//     HalfAdder(a=a[0], b=b[0], sum=out[0], carry=carry0);
//     FullAdder(a=a[1], b=b[1], c=carry0, sum=out[1], carry=carry1);
//     FullAdder(a=a[2], b=b[2], c=carry1, sum=out[2], carry=carry2);
//     FullAdder(a=a[3], b=b[3], c=carry2, sum=out[3], carry=carry3);
//     FullAdder(a=a[4], b=b[4], c=carry3, sum=out[4], carry=carry4);
//     FullAdder(a=a[5], b=b[5], c=carry4, sum=out[5], carry=carry5);
//     FullAdder(a=a[6], b=b[6], c=carry5, sum=out[6], carry=carry6);
//     FullAdder(a=a[7], b=b[7], c=carry6, sum=out[7], carry=carry7);
//     FullAdder(a=a[8], b=b[8], c=carry7, sum=out[8], carry=carry8);
//     FullAdder(a=a[9], b=b[9], c=carry8, sum=out[9], carry=carry9);
//     FullAdder(a=a[10], b=b[10], c=carry9, sum=out[10], carry=carry10);
//     FullAdder(a=a[11], b=b[11], c=carry10, sum=out[11], carry=carry11);
//     FullAdder(a=a[12], b=b[12], c=carry11, sum=out[12], carry=carry12);
//     FullAdder(a=a[13], b=b[13], c=carry12, sum=out[13], carry=carry13);
//     FullAdder(a=a[14], b=b[14], c=carry13, sum=out[14], carry=carry14);
//     FullAdder(a=a[15], b=b[15], c=carry14, sum=out[15], carry=overflow);
// }
class Add16 extends Chip {
    constructor() {
        super("Add16", [PIN_A, PIN_B], [PIN_OUTPUT, PIN_CARRY]);
        this.halfAdd0 = new HalfAdder();
        this.adder1 = new FullAdder();
        this.adder2 = new FullAdder();
        this.adder3 = new FullAdder();
        this.adder4 = new FullAdder();
        this.adder5 = new FullAdder();
        this.adder6 = new FullAdder();
        this.adder7 = new FullAdder();
        this.adder8 = new FullAdder();
        this.adder9 = new FullAdder();
        this.adder10 = new FullAdder();
        this.adder11 = new FullAdder();
        this.adder12 = new FullAdder();
        this.adder13 = new FullAdder();
        this.adder14 = new FullAdder();
        this.adder15 = new FullAdder();
        const fullAdders = [
            this.adder1,
            this.adder2,
            this.adder3,
            this.adder4,
            this.adder5,
            this.adder6,
            this.adder7,
            this.adder8,
            this.adder9,
            this.adder10,
            this.adder11,
            this.adder12,
            this.adder13,
            this.adder14,
            this.adder15,
        ];
        const adders = [this.halfAdd0, ...fullAdders];
        // Internal wiring
        this.halfAdd0.getPin(PIN_CARRY).connectRecipient(this.adder1.getPin(PIN_C));
        fullAdders.forEach((fullAdder, i) => {
            if (i < fullAdders.length - 1) {
                fullAdder.getPin(PIN_CARRY).connectRecipient(fullAdders[i + 1].getPin(PIN_C));
            }
        });
        // External Wiring
        this.createBus(PIN_A, new BinaryBus(adders.map((a) => a.getPin(PIN_A))));
        this.createBus(PIN_B, new BinaryBus(adders.map((a) => a.getPin(PIN_B))));
        this.createBus(PIN_OUTPUT, new BinaryBus(adders.map((a) => a.getPin(PIN_SUM))));
        this.createPin(PIN_CARRY, this.adder15.getPin(PIN_CARRY));
    }
}

/**
 * 16-bit incrementer:
 * out = in + 1 (arithmetic addition)
 */
//  CHIP Inc16 {
//     IN in[16];
//     OUT out[16];
//     PARTS:
//    // Put you code here:
//    Add16(a=in, b[0]=true, b[1..7]=false, out=out);
// }
class Inc16 extends Chip {
    constructor() {
        super("Inc16", [PIN_INPUT], [PIN_OUTPUT]);
        this.adder = new Add16();
        this.adder
            .getBus(PIN_B)
            .send([true, false, false, false, false, false, false, false]);
        // External wiring
        this.createBus(PIN_INPUT, this.adder.getBus(PIN_A));
        this.createBus(PIN_OUTPUT, this.adder.getBus(PIN_OUTPUT));
    }
}

/**
 * Multiplexor:
 * out = a if sel == 0
 *       b otherwise
 */
//  CHIP Mux {
//     IN a, b, sel;
//     OUT out;
//     PARTS:
//     // Put your code here:
//     And(a=b, b=sel, out=bAndSel);
//     Not(in=sel, out=notSel);
//     And(a=a, b=notSel, out=aAndNotSel);
//     Or(a=aAndNotSel, b=bAndSel, out=out);
// }
class Mux extends Chip {
    constructor() {
        super("Mux", [PIN_A, PIN_B, PIN_SELECTOR], [PIN_OUTPUT]);
        this.bAndSel = new And();
        this.notSel = new Not();
        this.aAndNotSel = new And();
        this.aAndNotSelOrBAndSel = new Or();
        // Internal Wiring
        this.notSel.getPin(PIN_OUTPUT).connectRecipient(this.aAndNotSel.getPin(PIN_B));
        this.bAndSel
            .getPin(PIN_OUTPUT)
            .connectRecipient(this.aAndNotSelOrBAndSel.getPin(PIN_B));
        this.aAndNotSel
            .getPin(PIN_OUTPUT)
            .connectRecipient(this.aAndNotSelOrBAndSel.getPin(PIN_A));
        // External Wiring
        this.createPin(PIN_A, this.aAndNotSel.getPin(PIN_A));
        this.createPin(PIN_B, this.bAndSel.getPin(PIN_A));
        this.createPin(PIN_SELECTOR, this.notSel.getPin(PIN_INPUT), this.bAndSel.getPin(PIN_B));
        this.createPin(PIN_OUTPUT, this.aAndNotSelOrBAndSel.getPin(PIN_OUTPUT));
    }
}

/**
 * 16-bit multiplexor:
 * for i = 0..15 out[i] = a[i] if sel == 0
 *                        b[i] if sel == 1
 */
//  CHIP Mux16 {
//     IN a[16], b[16], sel;
//     OUT out[16];
//     PARTS:
//     Not(in=sel, out=notSel);
//     Mux(a=a[0], b=b[0], sel=sel, out=out[0]);
//     Mux(a=a[1], b=b[1], sel=sel, out=out[1]);
//     Mux(a=a[2], b=b[2], sel=sel, out=out[2]);
//     Mux(a=a[3], b=b[3], sel=sel, out=out[3]);
//     Mux(a=a[4], b=b[4], sel=sel, out=out[4]);
//     Mux(a=a[5], b=b[5], sel=sel, out=out[5]);
//     Mux(a=a[6], b=b[6], sel=sel, out=out[6]);
//     Mux(a=a[7], b=b[7], sel=sel, out=out[7]);
//     Mux(a=a[8], b=b[8], sel=sel, out=out[8]);
//     Mux(a=a[9], b=b[9], sel=sel, out=out[9]);
//     Mux(a=a[10], b=b[10], sel=sel, out=out[10]);
//     Mux(a=a[11], b=b[11], sel=sel, out=out[11]);
//     Mux(a=a[12], b=b[12], sel=sel, out=out[12]);
//     Mux(a=a[13], b=b[13], sel=sel, out=out[13]);
//     Mux(a=a[14], b=b[14], sel=sel, out=out[14]);
//     Mux(a=a[15], b=b[15], sel=sel, out=out[15]);
// }
class Mux16 extends Chip {
    constructor() {
        super("Mux16", [PIN_A, PIN_B, PIN_SELECTOR], [PIN_OUTPUT]);
        this.muxes = Array(WORD_LENGTH)
            .fill(null)
            .map((_, i) => new Mux());
        // External Wiring
        this.createPin(PIN_SELECTOR, ...this.muxes.map((m) => m.getPin(PIN_SELECTOR)));
        this.createBus(PIN_A, new BinaryBus(this.muxes.map((m) => m.getPin(PIN_A))));
        this.createBus(PIN_B, new BinaryBus(this.muxes.map((m) => m.getPin(PIN_B))));
        this.createBus(PIN_OUTPUT, new BinaryBus(this.muxes.map((m) => m.getPin(PIN_OUTPUT))));
    }
}

/**
 * 16-bit Not:
 * for i=0..15: out[i] = not in[i]
 */
/**
 CHIP Not16 {
    IN in[16];
    OUT out[16];

    PARTS:
    Not(in=in[0], out=out[0]);
    Not(in=in[1], out=out[1]);
    Not(in=in[2], out=out[2]);
    Not(in=in[3], out=out[3]);
    Not(in=in[4], out=out[4]);
    Not(in=in[5], out=out[5]);
    Not(in=in[6], out=out[6]);
    Not(in=in[7], out=out[7]);
    Not(in=in[8], out=out[8]);
    Not(in=in[9], out=out[9]);
    Not(in=in[10], out=out[10]);
    Not(in=in[11], out=out[11]);
    Not(in=in[12], out=out[12]);
    Not(in=in[13], out=out[13]);
    Not(in=in[14], out=out[14]);
    Not(in=in[15], out=out[15]);
}
 */
class Not16 extends Chip {
    constructor() {
        super("Not16", [PIN_INPUT], [PIN_OUTPUT]);
        this.nots = Array(WORD_LENGTH)
            .fill(null)
            .map((_, i) => new Not());
        // External Wiring
        this.createBus(PIN_INPUT, new BinaryBus(this.nots.map((n) => n.getPin(PIN_INPUT))));
        this.createBus(PIN_OUTPUT, new BinaryBus(this.nots.map((n) => n.getPin(PIN_OUTPUT))));
    }
}

/**
 * 8-way Or:
 * out = (in[0] or in[1] or ... or in[7])
 */
//  CHIP Or8Way {
//     IN in[8];
//     OUT out;
//     PARTS:
//     Or(a=in[0], b=in[1], out=or1);
//     Or(a=or1, b=in[2], out=or2);
//     Or(a=or2, b=in[3], out=or3);
//     Or(a=or3, b=in[4], out=or4);
//     Or(a=or4, b=in[5], out=or5);
//     Or(a=or5, b=in[6], out=or6);
//     Or(a=or6, b=in[7], out=out);
// }
class Or8Way extends Chip {
    constructor() {
        super("Or8Way", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.or1 = new Or();
        this.or2 = new Or();
        this.or3 = new Or();
        this.or4 = new Or();
        this.or5 = new Or();
        this.or6 = new Or();
        this.orOut = new Or();
        // Internal Wiring
        this.or1.getPin(PIN_OUTPUT).connectRecipient(this.or2.getPin(PIN_A));
        this.or2.getPin(PIN_OUTPUT).connectRecipient(this.or3.getPin(PIN_A));
        this.or3.getPin(PIN_OUTPUT).connectRecipient(this.or4.getPin(PIN_A));
        this.or4.getPin(PIN_OUTPUT).connectRecipient(this.or5.getPin(PIN_A));
        this.or5.getPin(PIN_OUTPUT).connectRecipient(this.or6.getPin(PIN_A));
        this.or6.getPin(PIN_OUTPUT).connectRecipient(this.orOut.getPin(PIN_A));
        // External Wiring
        this.createBus(PIN_INPUT, new BinaryBus([
            this.or1.getPin(PIN_A),
            ...[
                this.or1,
                this.or2,
                this.or3,
                this.or4,
                this.or5,
                this.or6,
                this.orOut,
            ].map((o) => o.getPin(PIN_B)),
        ]));
        this.createPin(PIN_OUTPUT, this.orOut.getPin(PIN_OUTPUT));
    }
}

/**
 * 16-bit bitwise And:
 * for i = 0..15: out[i] = (a[i] and b[i])
 */
//  CHIP And16 {
//     IN a[16], b[16];
//     OUT out[16];
//     PARTS:
//     And(a=a[0], b=b[0], out=out[0]);
//     And(a=a[1], b=b[1], out=out[1]);
//     And(a=a[2], b=b[2], out=out[2]);
//     And(a=a[3], b=b[3], out=out[3]);
//     And(a=a[4], b=b[4], out=out[4]);
//     And(a=a[5], b=b[5], out=out[5]);
//     And(a=a[6], b=b[6], out=out[6]);
//     And(a=a[7], b=b[7], out=out[7]);
//     And(a=a[8], b=b[8], out=out[8]);
//     And(a=a[9], b=b[9], out=out[9]);
//     And(a=a[10], b=b[10], out=out[10]);
//     And(a=a[11], b=b[11], out=out[11]);
//     And(a=a[12], b=b[12], out=out[12]);
//     And(a=a[13], b=b[13], out=out[13]);
//     And(a=a[14], b=b[14], out=out[14]);
//     And(a=a[15], b=b[15], out=out[15]);
// }
class And16 extends Chip {
    constructor() {
        super("And16", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.ands = Array(WORD_LENGTH)
            .fill(null)
            .map((_, i) => new And());
        // External Wiring
        this.createBus(PIN_A, new BinaryBus(this.ands.map((a) => a.getPin(PIN_A))));
        this.createBus(PIN_B, new BinaryBus(this.ands.map((a) => a.getPin(PIN_B))));
        this.createBus(PIN_OUTPUT, new BinaryBus(this.ands.map((a) => a.getPin(PIN_OUTPUT))));
    }
}

/**
 * The ALU (Arithmetic Logic Unit).
 * Computes one of the following functions:
 * x+y, x-y, y-x, 0, 1, -1, x, y, -x, -y, !x, !y,
 * x+1, y+1, x-1, y-1, x&y, x|y on two 16-bit inputs,
 * according to 6 input bits denoted zx,nx,zy,ny,f,no.
 * In addition, the ALU computes two 1-bit outputs:
 * if the ALU output == 0, zr is set to 1; otherwise zr is set to 0;
 * if the ALU output < 0, ng is set to 1; otherwise ng is set to 0.
 */
// Implementation: the ALU logic manipulates the x and y inputs
// and operates on the resulting values, as follows:
// if (zx == 1) set x = 0        // 16-bit constant
// if (nx == 1) set x = !x       // bitwise not
// if (zy == 1) set y = 0        // 16-bit constant
// if (ny == 1) set y = !y       // bitwise not
// if (f == 1)  set out = x + y  // integer 2's complement addition
// if (f == 0)  set out = x & y  // bitwise and
// if (no == 1) set out = !out   // bitwise not
// if (out == 0) set zr = 1
// if (out < 0) set ng = 1
/*
CHIP ALU {
    IN
        x[16], y[16],  // 16-bit inputs
        zx, // zero the x input?
        nx, // negate the x input?
        zy, // zero the y input?
        ny, // negate the y input?
        f,  // compute out = x + y (if 1) or x & y (if 0)
        no; // negate the out output?

    OUT
        out[16], // 16-bit output
        zr, // 1 if (out == 0), 0 otherwise
        ng; // 1 if (out < 0),  0 otherwise

    PARTS:

    // Use the flags for the x input to generate xProcessed
    Mux16(a=x, b[0..15]=false, sel=zx, out=xZero);
    Not16(in=xZero, out=notXZero);
    Mux16(a=xZero, b=notXZero, sel=nx, out=xProcessed);

    // Use the flags for the y input to generate yProcessed
    Mux16(a=y, b[0..15]=false, sel=zy, out=yZero);
    Not16(in=yZero, out=notYZero);
    Mux16(a=yZero, b=notYZero, sel=ny, out=yProcessed);

    // Calculate both results of combining x and y, select the correct one into fOut
    Add16(a=xProcessed, b=yProcessed, out=xPlusy);
    And16(a=xProcessed, b=yProcessed, out=xAndy);
    Mux16(a=xAndy, b=xPlusy, sel=f, out=fOut);

    // Calculate negation of output and select negative flag, output, and split version of output for evaluation of zero
    Not16(in=fOut, out=notFOut);
    Mux16(a=fOut, b=notFOut, sel=no, out[15]=ng, out[0..7]=preOut1, out[8..15]=preOut2, out=out);

    // Set the is zero flag
    Or8Way(in=preOut1, out=zrLsb);
    Or8Way(in=preOut2, out=zrMsb);
    Or(a=zrLsb, b=zrMsb, out=nzr);
    Not(in=nzr, out=zr);
}
*/
const PIN_X = "x";
const PIN_Y = "y";
const PIN_ZX = "zx";
const PIN_NX = "nx";
const PIN_ZY = "zy";
const PIN_NY = "ny";
const PIN_F$1 = "f";
const PIN_NO = "no";
const PIN_ZR = "zr";
const PIN_NG = "ng";
class ALU extends Chip {
    constructor() {
        super("ALU", [PIN_X, PIN_Y, PIN_ZX, PIN_NX, PIN_ZY, PIN_NY, PIN_F$1, PIN_NO], [PIN_OUTPUT, PIN_ZR, PIN_NG]);
        this.xZero = new Mux16();
        this.notXZero = new Not16();
        this.xProcessed = new Mux16();
        this.yZero = new Mux16();
        this.notYZero = new Not16();
        this.yProcessed = new Mux16();
        this.xPlusy = new Add16();
        this.xAndy = new And16();
        this.fOut = new Mux16();
        this.notFOut = new Not16();
        this.out = new Mux16();
        this.zrLsb = new Or8Way();
        this.zrMsb = new Or8Way();
        this.nzr = new Or();
        this.zr = new Not();
        this.xZero.getBus(PIN_B).send(Array(WORD_LENGTH).fill(false));
        this.xZero.getBus(PIN_OUTPUT).connect(this.notXZero.getBus(PIN_INPUT));
        this.xZero.getBus(PIN_OUTPUT).connect(this.xProcessed.getBus(PIN_A));
        this.notXZero.getBus(PIN_OUTPUT).connect(this.xProcessed.getBus(PIN_B));
        this.yZero.getBus(PIN_B).send(Array(WORD_LENGTH).fill(false));
        this.yZero.getBus(PIN_OUTPUT).connect(this.notYZero.getBus(PIN_INPUT));
        this.yZero.getBus(PIN_OUTPUT).connect(this.yProcessed.getBus(PIN_A));
        this.notYZero.getBus(PIN_OUTPUT).connect(this.yProcessed.getBus(PIN_B));
        this.xProcessed.getBus(PIN_OUTPUT).connect(this.xPlusy.getBus(PIN_A));
        this.yProcessed.getBus(PIN_OUTPUT).connect(this.xPlusy.getBus(PIN_B));
        this.xProcessed.getBus(PIN_OUTPUT).connect(this.xAndy.getBus(PIN_A));
        this.yProcessed.getBus(PIN_OUTPUT).connect(this.xAndy.getBus(PIN_B));
        this.xAndy.getBus(PIN_OUTPUT).connect(this.fOut.getBus(PIN_A));
        this.xPlusy.getBus(PIN_OUTPUT).connect(this.fOut.getBus(PIN_B));
        this.fOut.getBus(PIN_OUTPUT).connect(this.notFOut.getBus(PIN_INPUT));
        this.fOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_A));
        this.notFOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_B));
        this.fOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_A));
        this.notFOut.getBus(PIN_OUTPUT).connect(this.out.getBus(PIN_B));
        this.out.getBus(PIN_OUTPUT).connect(this.zrLsb.getBus(PIN_INPUT), 0, 7); // preOut1
        this.out.getBus(PIN_OUTPUT).connect(this.zrMsb.getBus(PIN_INPUT), 8, 15); // preOut2
        this.zrLsb.getPin(PIN_OUTPUT).connectRecipient(this.nzr.getPin(PIN_A));
        this.zrMsb.getPin(PIN_OUTPUT).connectRecipient(this.nzr.getPin(PIN_B));
        this.nzr.getPin(PIN_OUTPUT).connectRecipient(this.zr.getPin(PIN_INPUT));
        // External Wiring
        this.createBus(PIN_X, this.xZero.getBus(PIN_A));
        this.createBus(PIN_Y, this.yZero.getBus(PIN_A));
        this.createPin(PIN_ZX, this.xZero.getPin(PIN_SELECTOR));
        this.createPin(PIN_ZY, this.yZero.getPin(PIN_SELECTOR));
        this.createPin(PIN_NX, this.xProcessed.getPin(PIN_SELECTOR));
        this.createPin(PIN_NY, this.yProcessed.getPin(PIN_SELECTOR));
        this.createPin(PIN_F$1, this.fOut.getPin(PIN_SELECTOR));
        this.createPin(PIN_NO, this.out.getPin(PIN_SELECTOR));
        this.createBus(PIN_OUTPUT, this.out.getBus(PIN_OUTPUT));
        this.createPin(PIN_NG, this.out.getBus(PIN_OUTPUT).getPin(15)); // FIX!!!
        this.createPin(PIN_ZR, this.zr.getPin(PIN_OUTPUT));
    }
}

class DataFlipFlop extends Chip {
    constructor(clock) {
        super("DFF", [PIN_INPUT], [PIN_OUTPUT]);
        this.value = false;
        this.input = new BinaryPin();
        this.output = new BinaryPin();
        clock.registerClocked(this);
        this.createPin(PIN_INPUT, this.input);
        this.createPin(PIN_OUTPUT, this.output);
    }
    tick() {
        this.tickValue = this.input.lastOutput;
    }
    tock() {
        this.output.send(this.tickValue);
    }
}

/**
 * 1-bit register:
 * If load[t] == 1 then out[t+1] = in[t]
 *                 else out does not change (out[t+1] = out[t])
 */
// CHIP Bit {
//     IN in, load;
//     OUT out;
//     PARTS:
//     // Put your code here:
//     Mux(a=t1, b=in, sel=load, out=w1);
//     DFF(in=w1, out=t1, out=out);
// }
class Bit extends Chip {
    constructor(clock) {
        super("Bit", [PIN_INPUT, PIN_LOAD], [PIN_OUTPUT]);
        this.mux = new Mux();
        this.dff = new DataFlipFlop(clock);
        // Internal Wiring
        this.dff.getPin(PIN_OUTPUT).connectRecipient(this.mux.getPin(PIN_A)); // t1
        this.mux.getPin(PIN_OUTPUT).connectRecipient(this.dff.getPin(PIN_INPUT)); // w1
        // External Wiring
        this.createPin(PIN_INPUT, this.mux.getPin(PIN_B));
        this.createPin(PIN_LOAD, this.mux.getPin(PIN_SELECTOR));
        this.createPin(PIN_OUTPUT, this.dff.getPin(PIN_OUTPUT));
    }
}

/**
 * 16-bit register:
 * If load[t] == 1 then out[t+1] = in[t]
 * else out does not change
 */
//  CHIP Register {
//     IN in[16], load;
//     OUT out[16];
//     PARTS:
//     // Put your code here:
//     Bit(in=in[0], out=out[0], load=load);
//     Bit(in=in[1], out=out[1], load=load);
//     Bit(in=in[2], out=out[2], load=load);
//     Bit(in=in[3], out=out[3], load=load);
//     Bit(in=in[4], out=out[4], load=load);
//     Bit(in=in[5], out=out[5], load=load);
//     Bit(in=in[6], out=out[6], load=load);
//     Bit(in=in[7], out=out[7], load=load);
//     Bit(in=in[8], out=out[8], load=load);
//     Bit(in=in[9], out=out[9], load=load);
//     Bit(in=in[10], out=out[10], load=load);
//     Bit(in=in[11], out=out[11], load=load);
//     Bit(in=in[12], out=out[12], load=load);
//     Bit(in=in[13], out=out[13], load=load);
//     Bit(in=in[14], out=out[14], load=load);
//     Bit(in=in[15], out=out[15], load=load);
// }
class Register extends Chip {
    constructor(clock) {
        super("Register", [PIN_INPUT, PIN_LOAD], [PIN_OUTPUT]);
        this.bits = Array(WORD_LENGTH)
            .fill(null)
            .map(() => new Bit(clock));
        // this.pins = new BinaryBus();
        this.outputBus = new BinaryBus();
        // External Wiring
        this.createBus(PIN_INPUT, new BinaryBus(this.bits.map((b) => b.getPin(PIN_INPUT))));
        this.createPin(PIN_LOAD, ...this.bits.map((b) => b.getPin(PIN_LOAD)));
        this.createBus(PIN_OUTPUT, new BinaryBus(this.bits.map((b) => b.getPin(PIN_OUTPUT))));
    }
}

/**
 * A 16-bit counter with load and reset control bits.
 * if      (reset[t] == 1) out[t+1] = 0
 * else if (load[t] == 1)  out[t+1] = in[t]
 * else if (inc[t] == 1)   out[t+1] = out[t] + 1  (integer addition)
 * else                    out[t+1] = out[t]
 */
const PIN_INCREMENT = "inc";
const PIN_RESET = "reset";
//  CHIP PC {
//     IN in[16],load,inc,reset;
//     OUT out[16];
//     PARTS:
//     // Increment the last value, select the incremented one if possible
//     Inc16(in=lastPC, out=lastPCplusOne);
//     Mux16(a=lastPC, b=lastPCplusOne, sel=inc, out=io);
//     // Loading input takes precendence over incremented value
//     Mux16(a=io, b=in, sel=load, out=lo);
//     // Reset has highest priority
//     Mux16(a=lo, b[0..15]=false, sel=reset, out=ro);
//     // Create that time spacing
//     Register(in=ro, out=lastPC, out=out, load=true);
// }
class PC extends Chip {
    constructor(clock) {
        super("PC", [PIN_INPUT, PIN_LOAD, PIN_RESET, PIN_INCREMENT], [PIN_OUTPUT]);
        this.incrementer = new Inc16();
        this.incrementMux = new Mux16();
        this.loadMux = new Mux16();
        this.resetMux = new Mux16();
        this.register = new Register(clock);
        this.lastPCFork = new BinaryBus();
        // Internal Wiring
        this.incrementer
            .getBus(PIN_OUTPUT)
            .connect(this.incrementMux.getBus(PIN_B));
        this.lastPCFork.connect(this.incrementer.getBus(PIN_INPUT));
        this.lastPCFork.connect(this.incrementMux.getBus(PIN_A));
        this.incrementMux.getBus(PIN_OUTPUT).connect(this.loadMux.getBus(PIN_A));
        this.loadMux.getBus(PIN_OUTPUT).connect(this.resetMux.getBus(PIN_A));
        this.resetMux.getBus(PIN_OUTPUT).connect(this.register.getBus(PIN_INPUT));
        this.register.getPin(PIN_LOAD).send(true);
        this.register.getBus(PIN_OUTPUT).connect(this.lastPCFork);
        this.resetMux.getBus(PIN_B).send(ZERO_WORD);
        // External Wiring
        this.createPin(PIN_LOAD, this.loadMux.getPin(PIN_SELECTOR));
        this.createPin(PIN_INCREMENT, this.incrementMux.getPin(PIN_SELECTOR));
        this.createPin(PIN_RESET, this.resetMux.getPin(PIN_SELECTOR));
        this.createBus(PIN_INPUT, this.loadMux.getBus(PIN_B));
        this.createBus(PIN_OUTPUT, this.register.getBus(PIN_OUTPUT));
    }
}

/**
 * 16-bit bitwise Or:
 * for i = 0..15 out[i] = (a[i] or b[i])
 */
//  CHIP Or16 {
//     IN a[16], b[16];
//     OUT out[16];
//     PARTS:
//     Or(a=a[0], b=b[0], out=out[0]);
//     Or(a=a[1], b=b[1], out=out[1]);
//     Or(a=a[2], b=b[2], out=out[2]);
//     Or(a=a[3], b=b[3], out=out[3]);
//     Or(a=a[4], b=b[4], out=out[4]);
//     Or(a=a[5], b=b[5], out=out[5]);
//     Or(a=a[6], b=b[6], out=out[6]);
//     Or(a=a[7], b=b[7], out=out[7]);
//     Or(a=a[8], b=b[8], out=out[8]);
//     Or(a=a[9], b=b[9], out=out[9]);
//     Or(a=a[10], b=b[10], out=out[10]);
//     Or(a=a[11], b=b[11], out=out[11]);
//     Or(a=a[12], b=b[12], out=out[12]);
//     Or(a=a[13], b=b[13], out=out[13]);
//     Or(a=a[14], b=b[14], out=out[14]);
//     Or(a=a[15], b=b[15], out=out[15]);
// }
class Or16 extends Chip {
    constructor() {
        super("Or16", [PIN_A, PIN_B], [PIN_OUTPUT]);
        this.ors = Array(WORD_LENGTH)
            .fill(null)
            .map((_, i) => new Or());
        // External Wiring
        this.createBus(PIN_A, new BinaryBus(this.ors.map((o) => o.getPin(PIN_A))));
        this.createBus(PIN_B, new BinaryBus(this.ors.map((o) => o.getPin(PIN_B))));
        this.createBus(PIN_OUTPUT, new BinaryBus(this.ors.map((o) => o.getPin(PIN_OUTPUT))));
    }
}

/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
//  CHIP DMux8Way {
//     IN in, sel[3];
//     OUT a, b, c, d, e, f, g, h;
//     PARTS:
//     Not(in=sel[2], out=notSel2);
//     And(a=in, b=notSel2, out=inAndNotSel2);
//     DMux4Way(in=inAndNotSel2, sel=sel[0..1], a=a, b=b, c=c, d=d);
//     And(a=in, b=sel[2], out=inAndSel2);
//     DMux4Way(in=inAndSel2, sel=sel[0..1], a=e, b=f, c=g, d=h);
// }
const PIN_E = "e";
const PIN_F = "f";
const PIN_G = "g";
const PIN_H = "h";
class Dmux8Way extends Chip {
    constructor() {
        super("Dmux8Way", [PIN_INPUT, PIN_SELECTOR], [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F, PIN_G, PIN_H]);
        this.notSel2 = new Not();
        this.inAndNotSel2 = new And();
        this.dmuxABCD = new Dmux4Way();
        this.inAndSel2 = new And();
        this.dmuxEFGH = new Dmux4Way();
        // Internal Wiring
        this.notSel2.getPin(PIN_OUTPUT).connectRecipient(this.inAndNotSel2.getPin(PIN_B));
        this.inAndNotSel2
            .getPin(PIN_OUTPUT)
            .connectRecipient(this.dmuxABCD.getPin(PIN_INPUT));
        this.inAndSel2.getPin(PIN_OUTPUT).connectRecipient(this.dmuxEFGH.getPin(PIN_INPUT));
        // External Wiring
        this.createPin(PIN_INPUT, this.inAndNotSel2.getPin(PIN_A), this.inAndSel2.getPin(PIN_A));
        this.createBus(PIN_SELECTOR, new BinaryBus(createPinArray(3))
            .connect(this.dmuxABCD.getBus(PIN_SELECTOR), 0, 1)
            .connect(this.dmuxEFGH.getBus(PIN_SELECTOR), 0, 1)
            .connectPin(this.notSel2.getPin(PIN_INPUT), 2)
            .connectPin(this.inAndSel2.getPin(PIN_B), 2));
        this.createPin(PIN_A, this.dmuxABCD.getPin(PIN_A));
        this.createPin(PIN_B, this.dmuxABCD.getPin(PIN_B));
        this.createPin(PIN_C, this.dmuxABCD.getPin(PIN_C));
        this.createPin(PIN_D, this.dmuxABCD.getPin(PIN_D));
        this.createPin(PIN_E, this.dmuxEFGH.getPin(PIN_A));
        this.createPin(PIN_F, this.dmuxEFGH.getPin(PIN_B));
        this.createPin(PIN_G, this.dmuxEFGH.getPin(PIN_C));
        this.createPin(PIN_H, this.dmuxEFGH.getPin(PIN_D));
    }
}

/**
 * 4-way 16-bit multiplexor:
 * out = a if sel == 00
 *       b if sel == 01
 *       c if sel == 10
 *       d if sel == 11
 */
//  CHIP Mux4Way16 {
//     IN a[16], b[16], c[16], d[16], sel[2];
//     OUT out[16];
//     PARTS:
//     Mux16(a=a, b=b, sel=sel[0], out=aOrB);
//     Mux16(a=c, b=d, sel=sel[0], out=cOrD);
//     Mux16(a=aOrB, b=cOrD, sel=sel[1], out=out);
// }
class Mux4Way16 extends Chip {
    constructor() {
        super("Mux4Way16", [PIN_A, PIN_B, PIN_C, PIN_D, PIN_SELECTOR], [PIN_OUTPUT]);
        this.aOrB = new Mux16();
        this.cOrD = new Mux16();
        this.outMux = new Mux16();
        // Internal Wiring
        this.aOrB.getBus(PIN_OUTPUT).connect(this.outMux.getBus(PIN_A));
        this.cOrD.getBus(PIN_OUTPUT).connect(this.outMux.getBus(PIN_B));
        // External Wiring
        this.createBus(PIN_A, this.aOrB.getBus(PIN_A));
        this.createBus(PIN_B, this.aOrB.getBus(PIN_B));
        this.createBus(PIN_C, this.cOrD.getBus(PIN_A));
        this.createBus(PIN_D, this.cOrD.getBus(PIN_B));
        this.createBus(PIN_SELECTOR, new BinaryBus([
            new BinaryPin([
                this.aOrB.getPin(PIN_SELECTOR),
                this.cOrD.getPin(PIN_SELECTOR),
            ]),
            this.outMux.getPin(PIN_SELECTOR),
        ]));
        this.createBus(PIN_OUTPUT, this.outMux.getBus(PIN_OUTPUT));
    }
}

/**
 * 8-way 16-bit multiplexor:
 * out = a if sel == 000
 *       b if sel == 001
 *       etc.
 *       h if sel == 111
 */
//  CHIP Mux8Way16 {
//     IN a[16], b[16], c[16], d[16],
//        e[16], f[16], g[16], h[16],
//        sel[3];
//     OUT out[16];
//     PARTS:
//     // Put your code here:
//     Mux4Way16(a=a, b=b, c=c, d=d, sel=sel[0..1], out=abcd);
//     Mux4Way16(a=e, b=f, c=g, d=h, sel=sel[0..1], out=efgh);
//     Mux16(a=abcd, b=efgh, sel=sel[2], out=out);
// }
class Mux8Way16 extends Chip {
    constructor() {
        super("Mux8Way16", [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F, PIN_G, PIN_H, PIN_SELECTOR], [PIN_OUTPUT]);
        this.abcd = new Mux4Way16();
        this.efgh = new Mux4Way16();
        this.outMux = new Mux16();
        // Internal Wiring
        this.abcd.getBus(PIN_OUTPUT).connect(this.outMux.getBus(PIN_A));
        this.efgh.getBus(PIN_OUTPUT).connect(this.outMux.getBus(PIN_B));
        this.createBus(PIN_A, this.abcd.getBus(PIN_A));
        this.createBus(PIN_B, this.abcd.getBus(PIN_B));
        this.createBus(PIN_C, this.abcd.getBus(PIN_C));
        this.createBus(PIN_D, this.abcd.getBus(PIN_D));
        this.createBus(PIN_E, this.efgh.getBus(PIN_A));
        this.createBus(PIN_F, this.efgh.getBus(PIN_B));
        this.createBus(PIN_G, this.efgh.getBus(PIN_C));
        this.createBus(PIN_H, this.efgh.getBus(PIN_D));
        this.createBus(PIN_SELECTOR, new BinaryBus(createPinArray(3))
            .connect(this.abcd.getBus(PIN_SELECTOR), 0, 1)
            .connect(this.efgh.getBus(PIN_SELECTOR), 0, 1)
            .connectPin(this.outMux.getPin(PIN_SELECTOR), 2));
        this.createBus(PIN_OUTPUT, this.outMux.getBus(PIN_OUTPUT));
    }
}

/**
 * Memory of 8 registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then
 * the in value is loaded into the memory location specified by address
 * (the loaded value will be emitted to out from the next time step onward).
 */
//  CHIP RAM8 {
//     IN in[16], load, address[3];
//     OUT out[16];
//     PARTS:
//     DMux8Way(in=load, sel=address, a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);
//     Register(in=in, out=ra, load=la);
//     Register(in=in, out=rb, load=lb);
//     Register(in=in, out=rc, load=lc);
//     Register(in=in, out=rd, load=ld);
//     Register(in=in, out=re, load=le);
//     Register(in=in, out=rf, load=lf);
//     Register(in=in, out=rg, load=lg);
//     Register(in=in, out=rh, load=lh);
//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address, out=out);
// }
class RAM8 extends Chip {
    constructor(clock) {
        super("RAM8", [PIN_INPUT, PIN_LOAD, PIN_ADDRESS], [PIN_OUTPUT]);
        this.demux = new Dmux8Way();
        this.mux = new Mux8Way16();
        this.registers = Array(WORD_LENGTH)
            .fill(null)
            .map(() => new Register(clock));
        this.addressFork = new BinaryBus(createPinArray(3));
        this.inputFork = new BinaryBus();
        this.registers.forEach((r) => this.inputFork.connect(r.getBus(PIN_INPUT)));
        this.addressFork
            .connect(this.demux.getBus(PIN_SELECTOR))
            .connect(this.mux.getBus(PIN_SELECTOR));
        [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F$1, PIN_G, PIN_H].forEach((pin, i) => {
            this.demux.getPin(pin).connectRecipient(this.registers[i].getPin(PIN_LOAD));
            this.registers[i].getBus(PIN_OUTPUT).connect(this.mux.getBus(pin));
        });
        this.createPin(PIN_LOAD, this.demux.getPin(PIN_INPUT));
        this.createBus(PIN_ADDRESS, this.addressFork);
        this.createBus(PIN_INPUT, this.inputFork);
        this.createBus(PIN_OUTPUT, this.mux.getBus(PIN_OUTPUT));
    }
}

/**
 * Memory of 64 registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then
 * the in value is loaded into the memory location specified by address
 * (the loaded value will be emitted to out from the next time step onward).
 */
//  CHIP RAM64 {
//     IN in[16], load, address[6];
//     OUT out[16];
//     PARTS:
//     // Which sub register are we loading?
//     DMux8Way(in=load, sel=address[0..2], a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);
//     // Each sub register is fed input and the demuxed load indicator, and the sub address
//     RAM8(in=in, out=ra, address=address[3..5], load=la);
//     RAM8(in=in, out=rb, address=address[3..5], load=lb);
//     RAM8(in=in, out=rc, address=address[3..5], load=lc);
//     RAM8(in=in, out=rd, address=address[3..5], load=ld);
//     RAM8(in=in, out=re, address=address[3..5], load=le);
//     RAM8(in=in, out=rf, address=address[3..5], load=lf);
//     RAM8(in=in, out=rg, address=address[3..5], load=lg);
//     RAM8(in=in, out=rh, address=address[3..5], load=lh);
//     // Select which sub register we are outputting
//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address[0..2], out=out);
// }
class RAM64 extends Chip {
    constructor(clock) {
        super("RAM64", [PIN_INPUT, PIN_LOAD, PIN_ADDRESS], [PIN_OUTPUT]);
        this.demux = new Dmux8Way();
        this.mux = new Mux8Way16();
        this.ram = Array(WORD_LENGTH)
            .fill(null)
            .map(() => new RAM8(clock));
        this.addressFork = new BinaryBus(createPinArray(6));
        this.inputFork = new BinaryBus();
        this.ram.forEach((r) => {
            this.inputFork.connect(r.getBus(PIN_INPUT));
            this.addressFork.connect(r.getBus(PIN_ADDRESS), 3, 5);
        });
        this.addressFork
            .connect(this.demux.getBus(PIN_SELECTOR), 0, 2)
            .connect(this.mux.getBus(PIN_SELECTOR), 0, 2);
        [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F$1, PIN_G, PIN_H].forEach((pin, i) => {
            this.demux.getPin(pin).connectRecipient(this.ram[i].getPin(PIN_LOAD));
            this.ram[i].getBus(PIN_OUTPUT).connect(this.mux.getBus(pin));
        });
        this.createPin(PIN_LOAD, this.demux.getPin(PIN_INPUT));
        this.createBus(PIN_ADDRESS, this.addressFork);
        this.createBus(PIN_INPUT, this.inputFork);
        this.createBus(PIN_OUTPUT, this.mux.getBus(PIN_OUTPUT));
    }
}

/**
 * Memory of 512 registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then
 * the in value is loaded into the memory location specified by address
 * (the loaded value will be emitted to out from the next time step onward).
 */
//  CHIP RAM512 {
//     IN in[16], load, address[9];
//     OUT out[16];
//     PARTS:
//     // Which sub register are we loading?
//     DMux8Way(in=load, sel=address[0..2], a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);
//     // Each sub register is fed input and the demuxed load indicator, and the sub address
//     RAM64(in=in, out=ra, address=address[3..8], load=la);
//     RAM64(in=in, out=rb, address=address[3..8], load=lb);
//     RAM64(in=in, out=rc, address=address[3..8], load=lc);
//     RAM64(in=in, out=rd, address=address[3..8], load=ld);
//     RAM64(in=in, out=re, address=address[3..8], load=le);
//     RAM64(in=in, out=rf, address=address[3..8], load=lf);
//     RAM64(in=in, out=rg, address=address[3..8], load=lg);
//     RAM64(in=in, out=rh, address=address[3..8], load=lh);
//     // Select which sub register we are outputting
//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address[0..2], out=out);
// }
class RAM512 extends Chip {
    constructor(clock) {
        super("RAM512", [PIN_INPUT, PIN_LOAD, PIN_ADDRESS], [PIN_OUTPUT]);
        this.demux = new Dmux8Way();
        this.mux = new Mux8Way16();
        this.ram = Array(WORD_LENGTH)
            .fill(null)
            .map(() => new RAM64(clock));
        this.addressFork = new BinaryBus(createPinArray(9));
        this.inputFork = new BinaryBus();
        this.ram.forEach((r) => {
            this.inputFork.connect(r.getBus(PIN_INPUT));
            this.addressFork.connect(r.getBus(PIN_ADDRESS), 3, 8);
        });
        this.addressFork
            .connect(this.demux.getBus(PIN_SELECTOR), 0, 2)
            .connect(this.mux.getBus(PIN_SELECTOR), 0, 2);
        [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F$1, PIN_G, PIN_H].forEach((pin, i) => {
            this.demux.getPin(pin).connectRecipient(this.ram[i].getPin(PIN_LOAD));
            this.ram[i].getBus(PIN_OUTPUT).connect(this.mux.getBus(pin));
        });
        this.createPin(PIN_LOAD, this.demux.getPin(PIN_INPUT));
        this.createBus(PIN_ADDRESS, this.addressFork);
        this.createBus(PIN_INPUT, this.inputFork);
        this.createBus(PIN_OUTPUT, this.mux.getBus(PIN_OUTPUT));
    }
}

/**
 * Memory of 4K registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then
 * the in value is loaded into the memory location specified by address
 * (the loaded value will be emitted to out from the next time step onward).
 */
//  CHIP RAM4K {
//     IN in[16], load, address[12];
//     OUT out[16];
//     PARTS:
//     // Which sub register are we loading?
//     DMux8Way(in=load, sel=address[0..2], a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);
//     // Each sub register is fed input and the demuxed load indicator, and the sub address
//     RAM512(in=in, out=ra, address=address[3..11], load=la);
//     RAM512(in=in, out=rb, address=address[3..11], load=lb);
//     RAM512(in=in, out=rc, address=address[3..11], load=lc);
//     RAM512(in=in, out=rd, address=address[3..11], load=ld);
//     RAM512(in=in, out=re, address=address[3..11], load=le);
//     RAM512(in=in, out=rf, address=address[3..11], load=lf);
//     RAM512(in=in, out=rg, address=address[3..11], load=lg);
//     RAM512(in=in, out=rh, address=address[3..11], load=lh);
//     // Select which sub register we are outputting
//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address[0..2], out=out);
// }
class RAM4K extends Chip {
    constructor(clock) {
        super("RAM4K", [PIN_INPUT, PIN_LOAD, PIN_ADDRESS], [PIN_OUTPUT]);
        this.demux = new Dmux8Way();
        this.mux = new Mux8Way16();
        this.ram = Array(WORD_LENGTH)
            .fill(null)
            .map(() => new RAM512(clock));
        this.addressFork = new BinaryBus(createPinArray(9));
        this.inputFork = new BinaryBus();
        this.ram.forEach((r) => {
            this.inputFork.connect(r.getBus(PIN_INPUT));
            this.addressFork.connect(r.getBus(PIN_ADDRESS), 3, 11);
        });
        this.addressFork
            .connect(this.demux.getBus(PIN_SELECTOR), 0, 2)
            .connect(this.mux.getBus(PIN_SELECTOR), 0, 2);
        [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F$1, PIN_G, PIN_H].forEach((pin, i) => {
            this.demux.getPin(pin).connectRecipient(this.ram[i].getPin(PIN_LOAD));
            this.ram[i].getBus(PIN_OUTPUT).connect(this.mux.getBus(pin));
        });
        this.createPin(PIN_LOAD, this.demux.getPin(PIN_INPUT));
        this.createBus(PIN_ADDRESS, this.addressFork);
        this.createBus(PIN_INPUT, this.inputFork);
        this.createBus(PIN_OUTPUT, this.mux.getBus(PIN_OUTPUT));
    }
}

const chipFactory = {
    // Arithmetic
    Add16: () => new Add16(),
    FullAdder: () => new FullAdder(),
    HalfAdder: () => new HalfAdder(),
    Inc16: () => new Inc16(),
    // CPU
    ALU: () => new ALU(),
    PC: (c) => new PC(c),
    // Logic
    And: () => new And(),
    And16: () => new And16(),
    Nand: () => new Nand(),
    Not: () => new Not(),
    Not16: () => new Not16(),
    Or: () => new Or(),
    Or8Way: () => new Or8Way(),
    Or16: () => new Or16(),
    Xor: () => new Xor(),
    // Memory
    Bit: (c) => new Bit(c),
    DFF: (c) => new DataFlipFlop(c),
    RAM4K: (c) => new RAM4K(c),
    RAM8: (c) => new RAM8(c),
    RAM64: (c) => new RAM64(c),
    RAM512: (c) => new RAM512(c),
    Register: (c) => new Register(c),
    // Multiplexing
    Dmux: () => new Dmux(),
    Dmux4Way: () => new Dmux4Way(),
    Dmux8Way: () => new Dmux8Way(),
    Mux: () => new Mux(),
    Mux4Way16: () => new Mux4Way16(),
    Mux8Way16: () => new Mux8Way16(),
    Mux16: () => new Mux(),
};

class Clock {
    constructor() {
        this.count = 0;
        this.state = false;
        this.chips = [];
    }
    tick() {
        this.state = true;
        this.chips.forEach((c) => c.tick());
    }
    tock() {
        this.state = false;
        this.count++;
        this.chips.forEach((c) => c.tock());
    }
    ticktock() {
        this.tick();
        this.tock();
    }
    registerClocked(clocked) {
        this.chips.push(clocked);
    }
}

const HDL_FILE_EXTENSION = '.hdl';
var NandTestInstructionType;
(function (NandTestInstructionType) {
    NandTestInstructionType[NandTestInstructionType["setPin"] = 0] = "setPin";
    NandTestInstructionType[NandTestInstructionType["setBus"] = 1] = "setBus";
    NandTestInstructionType[NandTestInstructionType["eval"] = 2] = "eval";
    NandTestInstructionType[NandTestInstructionType["output"] = 3] = "output";
    NandTestInstructionType[NandTestInstructionType["setOutput"] = 4] = "setOutput";
})(NandTestInstructionType || (NandTestInstructionType = {}));

const EVAL_REGEX = /^\s*(eval(,|;))\s*$/;
const SET_PIN_REGEX = /^(?:set\s(?<pin>[A-Za-z0-9]+)\s)(?<value>[0|1])(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const SET_BUS_REGEX = /^(?:set\s(?<bus>[A-Za-z0-9]+)\s)(?<value>[0|1]+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const parseEvalInstruction = (input) => input.match(EVAL_REGEX) !== null;
const parseSetPin = (input, lineNumber) => {
    const match = input.match(SET_PIN_REGEX);
    if (!!match) {
        return {
            type: NandTestInstructionType.setPin,
            lineContent: input,
            lineNumber,
            pin: match.groups.pin,
            value: match.groups.value === "1",
        };
    }
    return;
};
const parseSetBus = (input, lineNumber) => {
    const match = input.match(SET_BUS_REGEX);
    if (!!match) {
        return {
            type: NandTestInstructionType.setBus,
            lineContent: input,
            lineNumber,
            bus: match.groups.bus,
            values: match.groups.value.split("").map((s) => s === "1"),
        };
    }
    return;
};
const parseNandTestScript = (input) => {
    let outputFile;
    let compareTo;
    let load;
    let outputList = [];
    const testInstructions = [];
    let stillCollectingOutput = true;
    let startedCollectingOutput = false;
    input
        .map((s, i) => ({ lineContent: stripComment(s), lineNumber: i }))
        .filter(({ lineContent }) => lineContent.length > 0) // Get rid of empty lines
        .forEach(({ lineContent, lineNumber }) => {
        // Check for load file (if not already seen)
        if (!load) {
            load = parseRequiredFile(lineContent, "load");
            if (!!load)
                return;
        }
        // Check for output file (if not already seen)
        if (!outputFile) {
            outputFile = parseRequiredFile(lineContent, "outputFile");
            if (!!outputFile)
                return;
        }
        // Check for output file (if not already seen)
        if (!compareTo) {
            compareTo = parseRequiredFile(lineContent, "compareTo");
            if (!!compareTo)
                return;
        }
        if (isStartOfOutput(lineContent)) {
            outputList = [];
        }
        if (stillCollectingOutput || isStartOfOutput(lineContent)) {
            const { isValidOutput, stillCollecting } = parseOutputFormat(lineContent, startedCollectingOutput, outputList);
            stillCollectingOutput = stillCollecting;
            if (!stillCollecting) {
                const setOutput = {
                    type: NandTestInstructionType.setOutput,
                    outputList,
                    lineContent,
                    lineNumber,
                };
                testInstructions.push(setOutput);
            }
            if (isValidOutput) {
                startedCollectingOutput = true;
                return;
            }
        }
        // Check for eval
        if (parseEvalInstruction(lineContent)) {
            testInstructions.push({
                type: NandTestInstructionType.eval,
                lineContent,
                lineNumber,
            });
            return;
        }
        // Output
        if (parseOutputInstruction(lineContent)) {
            testInstructions.push({
                type: NandTestInstructionType.output,
                lineContent,
                lineNumber,
            });
            return;
        }
        // Check for set pin
        const setPin = parseSetPin(lineContent, lineNumber);
        if (!!setPin) {
            testInstructions.push(setPin);
            return;
        }
        // Check for set bus
        const setBus = parseSetBus(lineContent, lineNumber);
        if (!!setBus) {
            testInstructions.push(setBus);
            return;
        }
    });
    return {
        outputFile,
        compareTo,
        load,
        loadAll: false,
        testInstructions
    };
};

class NandTestRunner extends TestRunner {
    constructor(chip, directory, fileLoader) {
        super(chip, directory, fileLoader, parseNandTestScript, HDL_FILE_EXTENSION);
        this.fileLoader = fileLoader;
        this.chip = chip;
    }
    loadPrograms(...programs) {
        // LOAD HDL INTO GENERIC CHIP
        // throw new Error("Method not implemented.");
    }
    runInstruction(instruction) {
        switch (instruction.type) {
            case NandTestInstructionType.eval:
                break;
            case NandTestInstructionType.output:
                this.handleOutputInstruction();
                break;
            case NandTestInstructionType.setOutput:
                this.handleSetOutputInstruction(instruction);
                break;
            case NandTestInstructionType.setPin:
                this.handleSetPin(instruction);
                break;
            case NandTestInstructionType.setBus:
                this.handleSetBus(instruction);
                break;
        }
    }
    handleSetOutputInstruction({ outputList }) {
        this.currentOutputList = outputList;
        const log = this.currentOutputList
            .map(({ heading, spacing }) => formatString(heading, spacing))
            .join("|");
        this.addToLog(`|${log}|`, false);
    }
    handleSetPin({ pin, value }) {
        this.objectUnderTest.getPin(pin).send(value);
    }
    handleSetBus({ bus, values }) {
        this.objectUnderTest.getBus(bus).send(values);
    }
    handleOutputInstruction() {
        const log = this.currentOutputList
            .map((output) => {
            if (isOutputRam(output)) {
                throw new Error("Unsupported method, outputting RAM from Chip");
            }
            else {
                const { format, spacing, variable } = output;
                return formatBoolean(this.objectUnderTest.getPin(variable).lastOutput, format, spacing);
            }
        })
            .join("|");
        this.addToLog(`|${log}|`);
    }
}

exports.BinaryBus = BinaryBus;
exports.BinaryPin = BinaryPin;
exports.BinaryTree = BinaryTree;
exports.BinaryTreeNumber = BinaryTreeNumber;
exports.BinaryTreeString = BinaryTreeStrings;
exports.Chip = Chip;
exports.CircularQueue = CircularQueue;
exports.Clock = Clock;
exports.DictionaryEncoder = DictionaryEncoder;
exports.GameOfLife = GameOfLife;
exports.Graph = Graph;
exports.HackCpu = HackCpu;
exports.HackCpuTestRunner = HackCpuTestRunner;
exports.HackVm = HackVm;
exports.HackVmTestRunner = HackVmTestRunner;
exports.LinkedItem = LinkedItem;
exports.LinkedList = LinkedList;
exports.NandTestRunner = NandTestRunner;
exports.PositiveNumberBase = PositiveNumberBase;
exports.PriorityQueue = PriorityQueue;
exports.Queue = Queue;
exports.RAMSimulator = RAMSimulator;
exports.RunLengthEncoder = RunLengthEncoder;
exports.SimpleStringGraph = SimpleGraph;
exports.Stack = Stack;
exports.TwosComplement = TwosComplement;
exports.TwosComplementHex = TwosComplementHex;
exports.binaryInteger = binaryInteger;
exports.binarySearch = binarySearch;
exports.breadthFirstSearch = breadthFirstSearch;
exports.bubbleSort = bubbleSort;
exports.chipFactory = chipFactory;
exports.denaryInteger = denaryInteger;
exports.depthFirstSearch = depthFirstSearch;
exports.dijstraks = dijstraks;
exports.extractPageRank = extractPageRank;
exports.getPathTo = getPathTo;
exports.hexadecimalInteger = hexadecimalInteger;
exports.initialisePageRank = initialisePageRank;
exports.insertionSort = insertionSort;
exports.iteratePageRank = iteratePageRank;
exports.linearSearch = linearSearch;
exports.mergeSort = mergeSort;
exports.quickSort = quickSort;
exports.roundTo2Dp = roundTo2Dp;
exports.signed16bitBinary = signed16bitBinary;
exports.signed16bitHex = signed16bitHex;
exports.signed8bitBinary = signed8bitBinary;
exports.signed8bitHex = signed8bitHex;
exports.traverseInOrder = traverseInOrder;
exports.traversePostOrder = traversePostOrder;
exports.traversePreOrder = traversePreOrder;
exports.walkPath = walkPath;
