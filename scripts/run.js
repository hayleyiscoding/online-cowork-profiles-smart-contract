// import hardhat
const hre = require("hardhat");

const main = async () => {
  console.log(hre.ethers.getContractFactory);
  // Inside our main function, we can use hardhat to deploy the contract locally by adding the code below:
  const rsvpContractFactory = await hre.ethers.getContractFactory("Profiles");
  const rsvpContract = await rsvpContractFactory.deploy();
  await rsvp.deployed();
  console.log("Contract deployed to:", rsvpContract.address);

  //Hardhat allows us to access different test wallets inside our script so we can simulate different wallets interacting with our contract. To get our deployer wallet address and a couple others for testing, we use the getSigners method.
  const [deployer, address1, address2] = await hre.ethers.getSigners();

  // The first thing we want to test is creating a new event. Before we can call this method, we need to define the event data we are going to use. You can use an IPFS CID we already created. Extras: A timestamp is a sequence of characters or encoded information identifying when a certain event occurred, usually giving date and time of day, sometimes accurate to a small fraction of a second. More info @ unixtimestamp

  let profileDataCID =
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

  // Next we can create a new event with our mock data. Once the transaction is done, txn.wait will return data about the transaction including an array of the emitted events which we can log to our console. We can save the eventID created so we can use it to RSVP. You can log the entire wait object if you want to see everything that is returned.
  let txn = await rsvpContract.createNewProfile(profileDataCID);

  let wait = await txn.wait();
  console.log(
    "NEW PROFILE CREATED:",
    wait.events[0].event,
    wait.profiles[0].args
  );

  let profileID = wait.profiles[0].args.profileID;
  console.log("PROFILE ID:", profileID);
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
