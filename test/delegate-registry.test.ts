// import {
//   afterAll,
//   assert,
//   beforeAll,
//   clearStore,
//   describe,
//   test,
// } from "matchstick-as/assembly/index";
// import { Address, Bytes } from "@graphprotocol/graph-ts";
// import { handleClearAllDelegates } from "../src/delegate-registry";
// import { createClearAllDelegatesEvent } from "./delegate-registry-utils";
//
// // Tests structure (matchstick-as >=0.5.0)
// // https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0
//
// describe("Describe entity assertions", () => {
//   beforeAll(() => {
//     let delegator = Address.fromString(
//       "0x0000000000000000000000000000000000000001"
//     );
//     let id = Bytes.fromI32(1234567890);
//     let newClearAllDelegatesEvent = createClearAllDelegatesEvent(delegator, id);
//     handleClearAllDelegates(newClearAllDelegatesEvent);
//   });
//
//   afterAll(() => {
//     clearStore();
//   });
//
//   // For more test scenarios, see:
//   // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test
//
//   test("ClearAllDelegates created and stored", () => {
//     assert.entityCount("ClearAllDelegates", 1);
//
//     // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
//     assert.fieldEquals(
//       "ClearAllDelegates",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
//       "delegator",
//       "0x0000000000000000000000000000000000000001"
//     );
//
//     // More assert options:
//     // https://thegraph.com/docs/en/developer/matchstick/#asserts
//   });
// });
