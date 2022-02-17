import PeerNode from "."

describe('Peer Node', () => {
    test('Keys Generated', done => {
        const me = new PeerNode((err) => {
            expect(err).toBeNull();
            expect(me.keysReady).toBeTruthy();
            expect(me.privateKey).toBeDefined();
            expect(me.publicKey).toBeDefined();
            done(err);
        });
    })
})