import MerkleTree from "./MerkleTree";
import { generateSha256 } from "./generateHash";

describe("Merkle Tree", () => {
  test("Using SHA-256", () => {
    // "4"
    // 2bf175f9655e7bb7357b9f0a7c6051465a5ae701104ffe741b98e852c0e4d460
    // "5"
    // d10a4bc9e0c1fa4e8f3d7ce2512b8756e47ca5fa451f373c39a1431bb88db49f
    // "6"
    // 92e9e7e5922d26e17e48f0869ab25cc99499fdab722c065de8e0965c96c68e86

    // "45"
    // d1bdbaf9286be903d00c44f5f16aa173bdce5a5e6e162df7c787c211af09b8ab
    // "66"
    // cd261a095ff368bff59eb35d598bd370167326a912d1e9d262ff5f3e33e8cbe6

    // "4566"
    // c2dc2f55af0fd5270c4b57a6f663b35af9bfcf6339b00603f022ed4ad8e1454e
    const tree = new MerkleTree(generateSha256)
      .addTransaction("4")
      .addTransaction("5")
      .addTransaction("6");
    const rootHash: string = tree.calculateRootHash();

    const h4 = tree.hashTree.find((t) => t.id === "0");
    const h5 = tree.hashTree.find((t) => t.id === "1");
    const h6 = tree.hashTree.find((t) => t.id === "2");
    const h45 = tree.hashTree.find((t) => t.id === "0-1");
    const h66 = tree.hashTree.find((t) => t.id === "2-2");
    const h4566 = tree.hashTree.find((t) => t.id === "0-1-2-2");
    expect(h4).toBeDefined();
    expect(h4!.hash).toBe(
      "2bf175f9655e7bb7357b9f0a7c6051465a5ae701104ffe741b98e852c0e4d460"
    );
    expect(h5).toBeDefined();
    expect(h5!.hash).toBe(
      "d10a4bc9e0c1fa4e8f3d7ce2512b8756e47ca5fa451f373c39a1431bb88db49f"
    );
    expect(h6).toBeDefined();
    expect(h6!.hash).toBe(
      "92e9e7e5922d26e17e48f0869ab25cc99499fdab722c065de8e0965c96c68e86"
    );
    expect(h45).toBeDefined();
    expect(h45!.hash).toBe(
      "d1bdbaf9286be903d00c44f5f16aa173bdce5a5e6e162df7c787c211af09b8ab"
    );
    expect(h66).toBeDefined();
    expect(h66!.hash).toBe(
      "cd261a095ff368bff59eb35d598bd370167326a912d1e9d262ff5f3e33e8cbe6"
    );
    expect(h4566).toBeDefined();
    expect(h4566!.hash).toBe(
      "c2dc2f55af0fd5270c4b57a6f663b35af9bfcf6339b00603f022ed4ad8e1454e"
    );

    expect(rootHash).toBe(
      "c2dc2f55af0fd5270c4b57a6f663b35af9bfcf6339b00603f022ed4ad8e1454e"
    );
  });
});
