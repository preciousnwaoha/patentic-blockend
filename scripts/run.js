const main = async () => {
  const patenticContractFactory = await hre.ethers.getContractFactory("Patentic");
  // const patenticContract = await patenticContractFactory.deploy({
  //   value: hre.ethers.utils.parseEther("0.1"),
  // });
  const patenticContract = await patenticContractFactory.deploy();

  await patenticContract.deployed();
  console.log("Contract addy:", patenticContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    patenticContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two patentics now
   */
  const patentTxn = await patenticContract.createPatent("Eagles fly", "song", "Everyday i sing to the eagles is don't see");
  await patentTxn.wait();

  let patents1 = await patenticContract.getPatentsOnAddress();
  console.log(patents1)

  const patentTxn2 = await patenticContract.createPatent("Hupay", "Intel", "Payment platform for non-anonymous crypto transactions");
  await patentTxn2.wait();

  const patentTxn3 = await patenticContract.createPatent("Eagles fly", "song", "Everyday i sing to the eagles is don't see");
  await patentTxn3.wait();
  
  patents1 = await patenticContract.getPatentsOnAddress();
  console.log(patents1)
  let patents3 = await patenticContract.getPatentsOnAddress();
  console.log(patents3)

  contractBalance = await hre.ethers.provider.getBalance(patenticContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allPatents = await patenticContract.getAllPatents();
  console.log("allPatents: ", allPatents);

  const msgTxn = await patenticContract.addMessage("0xbDA5747bFD65F08deb54cb465eB87D40e51B197E", "Hello, i need you patent", "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E/1660005000234");
  await msgTxn.wait();

  let msgs = await patenticContract.getMessagesOnAddress();
  console.log(msgs)
  
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
  
  // 0x5FbDB2315678afecb367f032d93F642f64180aa3