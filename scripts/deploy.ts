// @ts-ignore
import { ethers } from "hardhat";

//npx hardhat run scripts/deploy.ts
async function main() {

  const DelegatesRegistry = await ethers.getContractFactory("DelegateRegistry");
  const delegateRegistry = await DelegatesRegistry.deploy();

  await delegateRegistry.deployed();

  console.log(`Deployed DelegatesRegistry to ${delegateRegistry.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
