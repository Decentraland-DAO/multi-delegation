import { store, ethereum } from '@graphprotocol/graph-ts'
import { SetDelegate, ClearDelegate, ClearAllDelegates } from '../generated/DelegateRegistry/DelegateRegistry'
import { Block, Delegation } from '../generated/schema'

export function handleBlock(block: ethereum.Block): void {
  const id = block.hash.toHex()
  const blockEntity = new Block(id)
  blockEntity.number = block.number
  blockEntity.timestamp = block.timestamp
  blockEntity.save()
}

export function handleSetDelegate(event: SetDelegate): void {
  const delegator = event.params.delegator
  const space = event.params.id
  const delegate = event.params.delegate
  const id = delegator.toHex()
    .concat('-')
    .concat(space.toString())
    .concat('-')
    .concat(delegate.toHex())
  const delegation = new Delegation(id)
  delegation.delegator = delegator
  delegation.space = space.toString()
  delegation.delegate = delegate
  delegation.timestamp = event.block.timestamp.toI32()
  delegation.save()
}

export function handleClearDelegate(event: ClearDelegate): void {
  const delegator = event.params.delegator
  const space = event.params.id
  const delegate = event.params.delegate
  const id = delegator.toHex()
    .concat('-')
    .concat(space.toString())
    .concat('-')
    .concat(delegate.toHex())
  store.remove('Delegation', id);
}

export function handleClearAllDelegates(event: ClearAllDelegates): void {
  const delegator = event.params.delegator
  const space = event.params.id
  const id = delegator.toHex()
    .concat('-')
    .concat(space.toString())
  store.remove('Delegation', id);
}