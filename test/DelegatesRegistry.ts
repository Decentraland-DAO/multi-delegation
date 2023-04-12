import { expect } from "chai";
import { ethers } from "hardhat";

import { DelegateRegistry } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

const TEST_PROJECT_ID_1 = "test_project1";
const TEST_PROJECT_ID_2 = "test_project2";

describe("DelegateRegistry", function () {

  let delegateRegistry: DelegateRegistry;
  let owner : SignerWithAddress;
  let delegator : SignerWithAddress;
  let delegate1 : SignerWithAddress;
  let delegate2 : SignerWithAddress;
  let id1 : string;
  let id2 : string;

  beforeEach(async function () {
    // Deploy the contract and get some test accounts
    const DelegateRegistry = await ethers.getContractFactory("DelegateRegistry");
    delegateRegistry = await DelegateRegistry.deploy();
    [owner, delegator, delegate1, delegate2] = await ethers.getSigners();
    id1 = ethers.utils.formatBytes32String(TEST_PROJECT_ID_1);
    id2 = ethers.utils.formatBytes32String(TEST_PROJECT_ID_2);
    console.log('id1', id1)

    delegateRegistry.connect(delegator)
  });

  afterEach(async () => {
    // delegateRegistry
  })

  it("should set a delegate", async function () {
    let totalDelegates = await delegateRegistry.getTotalDelegates(delegator.address, id1);
    expect(totalDelegates).to.equal(0);

    await delegateRegistry.setDelegate(id1, delegate1.address);
    totalDelegates = await delegateRegistry.getTotalDelegates(delegator.address, id1);
    expect(totalDelegates).to.equal(1);
  });

  it("should clear a delegate", async function () {
    await delegateRegistry.setDelegate(id1, delegate1.address);
    await delegateRegistry.clearDelegate(id1, delegate1.address);
    const totalDelegates = await delegateRegistry.getTotalDelegates(delegator.address, id1);
    expect(totalDelegates).to.equal(0);
    // const actualDelegate = await delegateRegistry.delegation(delegator.address, id1, 0)
    // expect(actualDelegate).to.equal(ethers.constants.AddressZero);
  });
});

  // it("should not allow delegating to self", async function () {
  //   // await expect(delegateRegistry.setDelegate(id1, owner.address)).to.be.revertedWith(
  //   //   "Can't delegate to self"
  //   // );
  // });
  //
  // it("should not allow delegating to address zero", async function () {
  //   // await expect(delegateRegistry.setDelegate(id1, ethers.constants.AddressZero)).to.be.revertedWith(
  //   //   "Can't delegate to 0x0"
  //   // );
  // });
  //
  // it("should emit events when setting a delegate", async function () {
  //   // await expect(delegateRegistry.setDelegate(id1, delegate1.address))
  //   //   .to.emit(delegateRegistry, "SetDelegate")
  //   //   .withArgs(owner.address, id1, delegate1.address);
  // });
  //
  // it("should emit events when clearing a delegate", async function () {
  //   // await delegateRegistry.setDelegate(id1, delegate1.address);
  //   // await expect(delegateRegistry.clearDelegate(id1))
  //   //   .to.emit(delegateRegistry, "ClearDelegate")
  //   //   .withArgs(owner.address, id1, delegate1.address);
  // });
  //
  // it("should allow setting multiple delegates for the same id", async function () {
  //   // await delegateRegistry.setDelegate(id1, delegate1.address);
  //   // await delegateRegistry.setDelegate(id1, delegate2.address);
  //   // const actualDelegate1 = await delegateRegistry.delegation(owner.address, id1);
  //   // expect(actualDelegate1).to.equal(delegate2.address);
  //   // await delegateRegistry.clearDelegate(id1);
  //   // const actualDelegate2 = await delegateRegistry.delegation(owner.address, id1);
  //   // expect(actualDelegate2).to.equal(ethers.constants.AddressZero);
  // });
  //
  // it("should clear all delegates for a particular id", async function () {
  //   // await delegateRegistry.setDelegate(id1, delegate1.address);
  //   // await delegateRegistry.setDelegate(id2, delegate2.address);
  //   // await delegateRegistry.clearDelegatesById(id1);
  //   // const actualDelegate1 = await delegateRegistry.delegation(owner.address, id1);
  //   // const actualDelegate2 = await delegateRegistry.delegation(owner.address, id2);
  //   // expect(actualDelegate1).to.equal(ethers.constants.AddressZero);
  //   // expect(actualDelegate2).to.equal(delegate2.address);
  // });
