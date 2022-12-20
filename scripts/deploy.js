const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const patenticContractFactory = await hre.ethers.getContractFactory("Patentic");
    // const waveContract = await waveContractFactory.deploy({
    //   value: hre.ethers.utils.parseEther("0.001"),
    // });
    const patenticContract = await patenticContractFactory.deploy();
  
    await patenticContract.deployed();
  
    console.log("Patentic address: ", patenticContract.address);
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