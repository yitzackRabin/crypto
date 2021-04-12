const SHA256 = require("crypto-js/sha256");
class BlockCrypto {
  constructor(index, current_time, info, nextHash = " ") {
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();
     }

  computeHash() {
    return SHA256(
      this.index +
        this.nextHash +
        this.current_time +
        JSON.stringify(this.info)
          ).toString();
  }
}

class Blockchain {
  constructor() {
    this.block1chain = [this.initGenesisBlock()];
    this.difficulty = 4;
  }
  initGenesisBlock() {
    return new BlockCrypto(0, "06/04/2021", "Initial Block in our network", "0");
  }

  obtainLatestBlock() {
    return this.block1chain[this.block1chain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.nextHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.computeHash();
        this.block1chain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.block1chain.length; i++) {
      const currentBlock = this.block1chain[i];
      const nextHash = this.block1chain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.nextHash !== nextHash.hash) return false;
    }
    return true;
  }
}

let thecoin = new Blockchain();

console.log("thecoin mining progressing....");
thecoin.addNewBlock(
  new BlockCrypto(1, "06/04/2021", {
    sender: "Rabin Yitzack",
    recipient: "Loyd Eve",
    quantity: 20
  })
);

thecoin.addNewBlock(
  new BlockCrypto(2, "07/04/2022", {
    sender: "Anita Vyona",
    recipient: "Felix Mush",
    quantity: 349
  })
);

console.log(JSON.stringify(thecoin, null, 4));



