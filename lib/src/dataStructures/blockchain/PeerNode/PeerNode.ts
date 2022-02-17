import { generateKeyPair } from 'crypto';

class PeerNode {
    publicKey: string | undefined;
    privateKey: string | undefined;
    keysReady: boolean;

    constructor(keysCallback: (err: Error | null) => void) {
        this.publicKey = undefined;
        this.privateKey = undefined;
        this.keysReady = false;

        generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
        }, (err, publicKey, privateKey) => {
            this.publicKey = publicKey;
            this.privateKey = privateKey;
            this.keysReady = err === null;
            keysCallback(err);
        })
    }
}

export default PeerNode;