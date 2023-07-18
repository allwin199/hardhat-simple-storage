const {ethers} = require("hardhat");

async function main() {

    console.log("Deploying Contract............");

    const simpleStorage = await ethers.deployContract("SimpleStorage");
    await simpleStorage.waitForDeployment();
    
    console.log(`Deployed contract to: ${simpleStorage.target}`);

};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
