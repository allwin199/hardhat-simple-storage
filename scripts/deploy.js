const { ethers, run } = require("hardhat");
require("dotenv").config();

async function main() {
    console.log("Deploying Contract............");
    /////////////////////////////
    const simpleStorage = await ethers.deployContract("SimpleStorage");
    await simpleStorage.waitForDeployment();

    console.log(`Deployed contract to: ${simpleStorage.target}`);

    // //////////////  Verification   ///////////////////
    // if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    //     console.log(`Waiting for Block Confirmations......`);
    //     await verify(simpleStorage.target, []);
    // }

    const currentValue = await simpleStorage.showFavouriteNumber();
    console.log(`Current Value ${currentValue}`);
    const transactionResponse = await simpleStorage.store("22");
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.showFavouriteNumber();
    console.log(`Updated Value ${updatedValue}`);
}

async function verify(_contractAddress, _args) {
    console.log("Verifying Contract............");
    /////////////////////////////
    try {
        await run("verify:verify", {
            address: _contractAddress,
            constructorArguments: _args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified");
        } else {
            console.log(error);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
