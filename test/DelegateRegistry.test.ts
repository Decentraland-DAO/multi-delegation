import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { DelegateRegistry } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as assert from "assert";
import "@nomicfoundation/hardhat-chai-matchers";
import { expect } from "chai";

describe("DelegateRegistry", () => {
  let owner, delegator1, delegator2, delegate1, delegate2: SignerWithAddress;
  let delegateRegistry, delegator1Registry, delegator2Registry;
  let delegate1Address, delegate2Address, delegator1Address, delegator2Address;

  beforeEach(async () => {
    const DelegateRegistry = await ethers.getContractFactory(
      "DelegateRegistry"
    );
    [
      owner,
      delegator1,
      delegator2,
      delegate1,
      delegate2
    ] = await ethers.getSigners();
    delegate1Address = delegate1.address;
    delegate2Address = delegate2.address;
    delegator1Address = delegator1.address;
    delegator2Address = delegator2.address;
    delegateRegistry = await DelegateRegistry.deploy();
    delegator1Registry = delegateRegistry.connect(delegator1);
    delegator2Registry = delegateRegistry.connect(delegator2);
  });

  describe("for an empty project id", () => {
    const INVALID_PROJECT_ID = "";

    it("should throw when setting a delegate", async () => {
      try {
        await delegator1Registry.setDelegate(
          INVALID_PROJECT_ID,
          delegate1Address
        );
        assert.fail("Expected an exception to be thrown");
      } catch (error) {
        expect(error)
          .to.be.an("Error")
          .with.property("reason", "invalid arrayify value");
      }
    });

    it("should throw when clearing a delegate", async () => {
      try {
        await delegator1Registry.clearDelegate(
          INVALID_PROJECT_ID,
          delegate1Address
        );
        assert.fail("Expected an exception to be thrown");
      } catch (error) {
        expect(error)
          .to.be.an("Error")
          .with.property("reason", "invalid arrayify value");
      }
    });

    it("should throw when clearing all delegates", async () => {
      try {
        await delegator1Registry.clearAllDelegates(INVALID_PROJECT_ID);
        assert.fail("Expected an exception to be thrown");
      } catch (error) {
        expect(error)
          .to.be.an("Error")
          .with.property("reason", "invalid arrayify value");
      }
    });
  });

  describe("for a valid project id", () => {
    const PROJECT_ID_1 = ethers.utils.formatBytes32String("test_project1");
    const PROJECT_ID_2 = ethers.utils.formatBytes32String("test_project2");

    describe("for an invalid delegate address", () => {
      const INVALID_ADDRESS = "0x1";
      it("should revert when setting a delegate", async () => {
        try {
          await delegator2Registry.setDelegate(PROJECT_ID_1, INVALID_ADDRESS);
          assert.fail("Expected an exception to be thrown");
        } catch (error) {
          expect(error)
            .to.be.an("Error")
            .with.property("reason", "invalid address");
        }
      });
      it("should revert when clearing an invalid delegate", async () => {
        try {
          await delegator2Registry.clearDelegate(PROJECT_ID_1, INVALID_ADDRESS);
          assert.fail("Expected an exception to be thrown");
        } catch (error) {
          expect(error)
            .to.be.an("Error")
            .with.property("reason", "invalid address");
        }
      });
    });

    describe("for address zero", () => {
      it("should revert when setting a delegate", async () => {
        await expect(
          delegator2Registry.setDelegate(
            PROJECT_ID_1,
            ethers.constants.AddressZero
          )
        ).to.be.revertedWith("Can't delegate to 0x0");
      });
      it("should revert when clearing an invalid delegate", async () => {
        await expect(
          delegator2Registry.clearDelegate(
            PROJECT_ID_1,
            ethers.constants.AddressZero
          )
        ).to.be.revertedWith("Delegate not found");
      });
    });

    describe("for a valid address", () => {
      it("should not allow delegating to self", async function() {
        await expect(
          delegator2Registry.setDelegate(PROJECT_ID_1, delegator2Address)
        ).to.be.revertedWith("Can't delegate to self");
      });

      it("should emit a SetDelegate event when setting a delegate", async function() {
        await expect(
          delegator2Registry.setDelegate(PROJECT_ID_1, delegate1Address)
        )
          .to.emit(delegator2Registry, "SetDelegate")
          .withArgs(delegator2Address, PROJECT_ID_1, delegate1Address);
      });

      it("should emit a ClearDelegate event when clearing a delegate", async function() {
        await delegator2Registry.setDelegate(PROJECT_ID_1, delegate1Address);
        await expect(
          delegator2Registry.clearDelegate(PROJECT_ID_1, delegate1Address)
        )
          .to.emit(delegator2Registry, "ClearDelegate")
          .withArgs(delegator2Address, PROJECT_ID_1, delegate1Address);
      });

      it("should emit a ClearAllDelegates event when clearing all delegates", async () => {
        await expect(await delegator2Registry.clearAllDelegates(PROJECT_ID_1))
          .to.emit(delegator2Registry, "ClearAllDelegates")
          .withArgs(delegator2Address, PROJECT_ID_1);
      });

      it("should be able to delegate for an empty space string formatted to bytes32", async () => {
        const EMPTY_SPACE_ID = ethers.utils.formatBytes32String("");

        await expect(
          delegator1Registry.setDelegate(EMPTY_SPACE_ID, delegate1Address)
        )
          .to.emit(delegator1Registry, "SetDelegate")
          .withArgs(delegator1Address, EMPTY_SPACE_ID, delegate1Address);

        expect(
          await delegator1Registry.getTotalDelegates(
            delegator1Address,
            EMPTY_SPACE_ID
          )
        ).to.equal(1);
      });
    });

    describe("when there is no delegate set for an address", () => {
      it("should set a delegate", async () => {
        let totalDelegates = await delegator2Registry.getTotalDelegates(
          delegator1Address,
          PROJECT_ID_1
        );
        expect(totalDelegates).to.equal(0);

        await delegator1Registry.setDelegate(PROJECT_ID_1, delegate1Address);

        totalDelegates = await delegator2Registry.getTotalDelegates(
          delegator1Address,
          PROJECT_ID_1
        );
        expect(totalDelegates).to.equal(1);
      });

      it("should be able to call clear on an empty delegation", async () => {
        await expect(await delegator2Registry.clearAllDelegates(PROJECT_ID_1))
          .not.to.throw;
      });

      it("should allow setting multiple delegates for the same id", async function() {
        await delegator2Registry.setDelegate(PROJECT_ID_1, delegate1Address);
        await delegator2Registry.setDelegate(PROJECT_ID_1, delegate2Address);
        await delegator1Registry.setDelegate(PROJECT_ID_1, delegate2Address);
        await delegator1Registry.setDelegate(PROJECT_ID_2, delegate1Address);

        expect(
          await delegator2Registry.getTotalDelegates(
            delegator2Address,
            PROJECT_ID_1
          )
        ).to.equal(2);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_1
          )
        ).to.equal(1);
        expect(
          await delegator1Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_2
          )
        ).to.equal(1);
      });
    });

    describe("when there is a delegate set for an address", () => {
      beforeEach(async () => {
        await delegator1Registry.setDelegate(PROJECT_ID_1, delegate1Address);
      });

      it("should be able to remove the delegate", async () => {
        let totalDelegates = await delegator2Registry.getTotalDelegates(
          delegator1Address,
          PROJECT_ID_1
        );
        expect(totalDelegates).to.equal(1);

        await delegator1Registry.clearDelegate(PROJECT_ID_1, delegate1Address);

        totalDelegates = await delegator2Registry.getTotalDelegates(
          delegator1Address,
          PROJECT_ID_1
        );
        expect(totalDelegates).to.equal(0);
      });

      it("should not be able to add the same delegate twice for that address", async () => {
        await expect(
          delegator1Registry.setDelegate(PROJECT_ID_1, delegate1Address)
        ).to.be.revertedWith("Already delegated to this address");
      });

      it("should be able to add the same delegate twice with a different project id for the same address", async () => {
        await delegator1Registry.setDelegate(PROJECT_ID_2, delegate1Address);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_1
          )
        ).to.equal(1);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_2
          )
        ).to.equal(1);
      });

      it("should be able to add a different delegate for that address", async () => {
        let totalDelegates = await delegator2Registry.getTotalDelegates(
          delegator1Address,
          PROJECT_ID_1
        );
        expect(totalDelegates).to.equal(1);

        await delegator1Registry.setDelegate(PROJECT_ID_1, delegate2Address);

        totalDelegates = await delegator2Registry.getTotalDelegates(
          delegator1Address,
          PROJECT_ID_1
        );
        expect(totalDelegates).to.equal(2);
      });

      it("should be able to set the same delegate for a different address", async () => {
        delegator2Registry.setDelegate(PROJECT_ID_1, delegate1Address);

        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_1
          )
        ).to.equal(1);
      });
    });

    describe("when there are multiple delegations for different addresses", () => {
      beforeEach(async () => {
        await delegator2Registry.setDelegate(PROJECT_ID_1, delegate1Address);
        await delegator2Registry.setDelegate(PROJECT_ID_1, delegate2Address);
        await delegator1Registry.setDelegate(PROJECT_ID_1, delegate2Address);
        await delegator1Registry.setDelegate(PROJECT_ID_2, delegate1Address);
      });

      it("should clear a delegate without affecting other delegations", async () => {
        await delegator2Registry.clearDelegate(PROJECT_ID_1, delegate2Address);

        expect(
          await delegator2Registry.getTotalDelegates(
            delegator2Address,
            PROJECT_ID_1
          )
        ).to.equal(1);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_1
          )
        ).to.equal(1);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_2
          )
        ).to.equal(1);
      });

      it("should clear all delegates without affecting other delegations", async () => {
        await delegator1Registry.clearAllDelegates(PROJECT_ID_1);

        expect(
          await delegator2Registry.getTotalDelegates(
            delegator2Address,
            PROJECT_ID_1
          )
        ).to.equal(2);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_1
          )
        ).to.equal(0);
        expect(
          await delegator2Registry.getTotalDelegates(
            delegator1Address,
            PROJECT_ID_2
          )
        ).to.equal(1);
      });
    });
  });
});
