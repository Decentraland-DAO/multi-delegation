// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ClearAllDelegates extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClearAllDelegates entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ClearAllDelegates must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ClearAllDelegates", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ClearAllDelegates | null {
    return changetype<ClearAllDelegates | null>(
      store.get("ClearAllDelegates", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get delegator(): Bytes {
    let value = this.get("delegator");
    return value!.toBytes();
  }

  set delegator(value: Bytes) {
    this.set("delegator", Value.fromBytes(value));
  }

  get DelegateRegistry_id(): Bytes {
    let value = this.get("DelegateRegistry_id");
    return value!.toBytes();
  }

  set DelegateRegistry_id(value: Bytes) {
    this.set("DelegateRegistry_id", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class ClearDelegate extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClearDelegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ClearDelegate must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ClearDelegate", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ClearDelegate | null {
    return changetype<ClearDelegate | null>(
      store.get("ClearDelegate", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get delegator(): Bytes {
    let value = this.get("delegator");
    return value!.toBytes();
  }

  set delegator(value: Bytes) {
    this.set("delegator", Value.fromBytes(value));
  }

  get DelegateRegistry_id(): Bytes {
    let value = this.get("DelegateRegistry_id");
    return value!.toBytes();
  }

  set DelegateRegistry_id(value: Bytes) {
    this.set("DelegateRegistry_id", Value.fromBytes(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    return value!.toBytes();
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class SetDelegate extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetDelegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type SetDelegate must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SetDelegate", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): SetDelegate | null {
    return changetype<SetDelegate | null>(
      store.get("SetDelegate", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get delegator(): Bytes {
    let value = this.get("delegator");
    return value!.toBytes();
  }

  set delegator(value: Bytes) {
    this.set("delegator", Value.fromBytes(value));
  }

  get DelegateRegistry_id(): Bytes {
    let value = this.get("DelegateRegistry_id");
    return value!.toBytes();
  }

  set DelegateRegistry_id(value: Bytes) {
    this.set("DelegateRegistry_id", Value.fromBytes(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    return value!.toBytes();
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}
