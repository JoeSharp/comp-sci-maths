import Tree from "./Tree";

test("Tree", () => {
    const movies = new Tree('movies');

    movies.addChildValue('Star Wars')
        .addChildValue('Lord of the Rings')
        .addChildValue('Terminator');
});