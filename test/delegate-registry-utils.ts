// import { newMockEvent } from "matchstick-as";
// import { Address, Bytes, ethereum } from "@graphprotocol/graph-ts";
// import {
//   ClearAllDelegates,
//   ClearDelegate,
//   SetDelegate,
// } from "../generated/DelegateRegistry/DelegateRegistry";
//
// export function createClearAllDelegatesEvent(
//   delegator: Address,
//   id: Bytes
// ): ClearAllDelegates {
//   let clearAllDelegatesEvent = changetype<ClearAllDelegates>(newMockEvent());
//
//   clearAllDelegatesEvent.parameters = new Array();
//
//   clearAllDelegatesEvent.parameters.push(
//     new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
//   );
//   clearAllDelegatesEvent.parameters.push(
//     new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
//   );
//
//   return clearAllDelegatesEvent;
// }
//
// export function createClearDelegateEvent(
//   delegator: Address,
//   id: Bytes,
//   delegate: Address
// ): ClearDelegate {
//   let clearDelegateEvent = changetype<ClearDelegate>(newMockEvent());
//
//   clearDelegateEvent.parameters = new Array();
//
//   clearDelegateEvent.parameters.push(
//     new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
//   );
//   clearDelegateEvent.parameters.push(
//     new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
//   );
//   clearDelegateEvent.parameters.push(
//     new ethereum.EventParam("delegate", ethereum.Value.fromAddress(delegate))
//   );
//
//   return clearDelegateEvent;
// }
//
// export function createSetDelegateEvent(
//   delegator: Address,
//   id: Bytes,
//   delegate: Address
// ): SetDelegate {
//   let setDelegateEvent = changetype<SetDelegate>(newMockEvent());
//
//   setDelegateEvent.parameters = new Array();
//
//   setDelegateEvent.parameters.push(
//     new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
//   );
//   setDelegateEvent.parameters.push(
//     new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
//   );
//   setDelegateEvent.parameters.push(
//     new ethereum.EventParam("delegate", ethereum.Value.fromAddress(delegate))
//   );
//
//   return setDelegateEvent;
// }
