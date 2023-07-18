import { expect, assert } from "chai";
import { ethers } from "hardhat";
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types";

describe("SimpleStorage", function () {
    let SimpleStorageFactory: SimpleStorage__factory;
    let simpleStorage : SimpleStorage;

    beforeEach(async function () {
        // SimpleStorage__factory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory;
        // await simpleStorage.waitForDeployment();
        SimpleStorageFactory = ((await ethers.getContractFactory(
            "SimpleStorage"
          )) as unknown) as SimpleStorage__factory
          simpleStorage = await SimpleStorageFactory.deploy()
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

    it("Should add new person and favNumber to mapping", async function () {
        const newPerson = "Tommy";
        const newFavNumber = "22";
        const txResponse = await simpleStorage.addPerson(
            newPerson,
            newFavNumber,
        );
        await txResponse.wait(1);
        const updatedPerson = await simpleStorage.favOfPeople(newPerson);
        assert.equal(updatedPerson.toString(), newFavNumber);
    });
});
