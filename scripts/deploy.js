const hre = require("hardhat");

const main = async () => {
  const profileContractFactory = await hre.ethers.getContractFactory(
    "Profiles"
  );
  const profileContract = await profileContractFactory.deploy();
  await profileContract.deployed();
  console.log("Contract deployed to:", profileContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
