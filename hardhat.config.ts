import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();
const GOERLI_RPC_URL = process.env.ALCHEMY_GOERLI_RPC_URL;
const GOERLI_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";
const DELEGATE_REGISTRY_ADDRESS = process.env.GOERLI_CONTRACT_ADDRESS || "";

const config: HardhatUserConfig = {
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  solidity: "0.8.17",
};

export default config;

// define task with a name as 1st argument and handler function as the 2nd argument
task("createWallet", "print out address, public and private key").setAction(
  async (_taskArgs, hre) => {
    const wallet = hre.ethers.Wallet.createRandom();
    console.log({
      address: wallet.address,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
    });
  }
);

task("getBalance")
  .addParam("address")
  .setAction(async (taskArgs, hre) => {
    const provider = hre.ethers.getDefaultProvider("goerli");
    let balance = await provider.getBalance(taskArgs.address);
    console.log("$ETH", hre.ethers.utils.formatEther(balance));
  });

/**
 * Usage
 * npx hardhat --network networkName setDelegate --id spaceName --delegate address
 * networkName should be defined in the hardhat config above
 */
task("setDelegate", "Set a delegate for a given project ID")
  .addParam("id", "The ID of the project to set the delegate for")
  .addParam("delegate", "The address of the delegate to set")
  .setAction(async (taskArgs, hre) => {
    const { id, delegate } = taskArgs;
    const formattedProjectId = hre.ethers.utils.formatBytes32String(id);
    const [delegator] = await hre.ethers.getSigners();
    console.log("Delegator", delegator.address);
    console.log(`Setting delegate ${delegate} for project ${id}...`);

    // Get the contract instance
    const DelegateRegistry = await hre.ethers.getContractFactory(
      "DelegateRegistry"
    );
    const delegateRegistry = await DelegateRegistry.attach(
      DELEGATE_REGISTRY_ADDRESS
    );
    // Connect Delegator Wallet
    delegateRegistry.connect(delegator);

    // Set the delegate
    const tx = await delegateRegistry.setDelegate(formattedProjectId, delegate);
    await tx.wait();

    console.log(`Delegate set.`);
  });

/**
 * Usage
 * npx hardhat --network networkName clearDelegate --id spaceName --delegate address
 * networkName should be defined in the hardhat config above
 */
task("clearDelegate", "Clear a delegate for a given project ID")
  .addParam("id", "The ID of the project to remove the delegate for")
  .addParam("delegate", "The address of the delegate to remove")
  .setAction(async (taskArgs, hre) => {
    const { id, delegate } = taskArgs;
    const formattedProjectId = hre.ethers.utils.formatBytes32String(id);
    console.log("formattedProjectId", formattedProjectId);

    const [delegator] = await hre.ethers.getSigners();
    console.log("Delegator", delegator.address);
    console.log(`Removing delegate ${delegate} for project ${id}...`);

    // Get the contract instance
    const DelegateRegistry = await hre.ethers.getContractFactory(
      "DelegateRegistry"
    );
    const delegateRegistry = await DelegateRegistry.attach(
      DELEGATE_REGISTRY_ADDRESS
    );
    // Connect Delegator Wallet
    delegateRegistry.connect(delegator);

    // Set the delegate
    const tx = await delegateRegistry.clearDelegate(
      formattedProjectId,
      delegate
    );
    await tx.wait();

    console.log(`Delegate removed.`);
  });

/**
 * Usage
 * npx hardhat --network networkName clearAllDelegates --id spaceName
 * networkName should be defined in the hardhat config above
 */
task("clearAllDelegates", "Clear all delegate for a given project ID")
  .addParam("id", "The ID of the project to remove the delegates for")
  .setAction(async (taskArgs, hre) => {
    const { id } = taskArgs;
    const formattedProjectId = hre.ethers.utils.formatBytes32String(id);
    const [delegator] = await hre.ethers.getSigners();
    console.log("Delegator", delegator.address);
    console.log(`Removing all delegates for project ${id}...`);

    // Get the contract instance
    const DelegateRegistry = await hre.ethers.getContractFactory(
      "DelegateRegistry"
    );
    const delegateRegistry = await DelegateRegistry.attach(
      DELEGATE_REGISTRY_ADDRESS
    );
    // Connect Delegator Wallet
    delegateRegistry.connect(delegator);

    // Set the delegate
    const tx = await delegateRegistry.clearAllDelegates(formattedProjectId);
    await tx.wait();

    console.log(`Delegates removed.`);
  });
