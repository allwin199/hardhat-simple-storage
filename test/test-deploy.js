const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
    let simpleStorage;

    beforeEach(async function () {
        simpleStorage = await ethers.deployContract("SimpleStorage");
        await simpleStorage.waitForDeployment();
    });

    it("Should start with a favourite number of 0", async function () {
        const favNumber = await simpleStorage.showFavouriteNumber();
        const expectedFavNumber = "0";
        // expect(favNumber.toString()).to.equal(expectedFavNumber);
        assert.equal(favNumber.toString(), expectedFavNumber);
    });

    it("Should update when we call store", async function () {
        const newFavNumber = "22";
        const txResponse = await simpleStorage.store(newFavNumber);
        await txResponse.wait(1);
        const updatedFavNumber = await simpleStorage.showFavouriteNumber();
        assert.equal(updatedFavNumber.toString(), newFavNumber);
    });
});
