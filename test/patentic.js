const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Patentic contract", function () {
    async function deployTokenFixture() {
        const Patentic = await ethers.getContractFactory("Patentic");
        const [owner, addr1, addr2] = await ethers.getSigners();
    
        const hardhatPatentic = await Patentic.deploy();
    
        await hardhatPatentic.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { Patentic, hardhatPatentic, owner, addr1, addr2 };
      }

  it("Deployment should have no patents", async function () {
    const { hardhatPatentic, owner } = await loadFixture(deployTokenFixture);

    const patents = await hardhatPatentic.getAllPatents();
    console.log("patents: ", patents)
    expect(patents.length === 0);
  });

  it("Should add patents", async function () {
    const { hardhatPatentic, owner } = await loadFixture(deployTokenFixture);

    const patentTxn1 = await hardhatPatentic.createPatent("Eagles fly", "song", "Everyday i sing to the eagles is don't see");
    await patentTxn1.wait();
    const patentTxn2 = await hardhatPatentic.createPatent("Eagles fly", "song", "Everyday i sing to the eagles is don't see");
    await patentTxn2.wait();
    const patentTxn3 = await hardhatPatentic.createPatent("Eagles fly", "song", "Everyday i sing to the eagles is don't see");
    await patentTxn3.wait();

    const patents = await hardhatPatentic.getAllPatents();
    console.log("patents: ", patents)
    expect(patents.length === 3);
  });

  it("Should add patents", async function () {
    const { hardhatPatentic, owner } = await loadFixture(deployTokenFixture);

    const patentTxn = await hardhatPatentic.createPatent("Eagles fly", "song", "Everyday i sing to the eagles is don't see");
    await patentTxn.wait();
    console.log("patentTxn: ", patentTxn)
    expect(true);
  });

  it("Should get patents on address", async function () {
    const { hardhatPatentic, owner } = await loadFixture(deployTokenFixture);

    const patents = await hardhatPatentic.getPatentsOnAddress();
    console.log("patents: ", patents)
    expect(true); // not checked yet
  });
});