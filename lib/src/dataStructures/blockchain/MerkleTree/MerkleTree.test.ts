import MerkleTree from "./MerkleTree"
import { generateSha256 } from "./generateHash";

describe("Merkle Tree", () => {
    test('Using SHA-256', () => {
        // 4
        // 4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a
        // 5
        // ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d
        // 6
        // e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683

        // 45
        // 67d62ee831ff99506ce1cd9435351408c3a845fca2dc0f34d085cdb51a37ec40
        // 66
        // fffb4e1fe8e65e5cb2b79bc4c9fb36a73ecf24bf7ddcc83c3c16a2ab7e4a4eb6

        // 4566
        // 2b5ad3840b128467887e99c725f65ac3748b8d9606d661ac165e140d403380b2
        const tree = new MerkleTree(generateSha256)
            .addTransaction("4")
            .addTransaction("5")
            .addTransaction("6")
        const rootHash: string = tree.calculateRootHash()

        const h4 = tree.hashTree.find(t => t.id === '0')
        const h5 = tree.hashTree.find(t => t.id === '1')
        const h6 = tree.hashTree.find(t => t.id === '2')
        const h45 = tree.hashTree.find(t => t.id === '0-1')
        const h66 = tree.hashTree.find(t => t.id === '2-2')
        const h4566 = tree.hashTree.find(t => t.id === '0-1-2-2');
        expect(h4).toBeDefined();
        expect(h4!.hash).toBe('4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a');
        expect(h5).toBeDefined();
        expect(h5!.hash).toBe('ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d');
        expect(h6).toBeDefined();
        expect(h6!.hash).toBe('e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683');
        expect(h45).toBeDefined();
        expect(h45!.hash).toBe('67d62ee831ff99506ce1cd9435351408c3a845fca2dc0f34d085cdb51a37ec40');
        expect(h66).toBeDefined();
        expect(h66!.hash).toBe('fffb4e1fe8e65e5cb2b79bc4c9fb36a73ecf24bf7ddcc83c3c16a2ab7e4a4eb6');
        expect(h4566).toBeDefined();
        expect(h4566!.hash).toBe('2b5ad3840b128467887e99c725f65ac3748b8d9606d661ac165e140d403380b2');

        expect(rootHash).toBe("2b5ad3840b128467887e99c725f65ac3748b8d9606d661ac165e140d403380b2");
    });
})