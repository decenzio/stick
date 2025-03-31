import { nftaa as events } from '../../../types/substrate/events'
import { addressOf } from '../../utils/helper'
import { Event } from '../../utils/types'
import { CreateNftaaEvent, ProxyExecutedNftaaEvent, TransferNftaaEvent } from '../types'

export function getCreateNftaaEvent(ctx: Event): CreateNftaaEvent {
  const event = events.nftaaCreated

  if (event.v1.is(ctx)) {
    const { collection: classId, item: itemId, nftAccount } = event.v1.decode(ctx)
    return { collection: classId.toString(), item: itemId.toString(), nft_account: addressOf(nftAccount) }
  }

  const { collection: classId, item: itemId, nftAccount } = event.v1.decode(ctx)
  return { collection: classId.toString(), item: itemId.toString(), nft_account: addressOf(nftAccount) }
}

export function getTransferNftaaEvent(ctx: Event): TransferNftaaEvent {
  const event = events.nftaaTransferred

  if (event.v1.is(ctx)) {
    const { collection: classId, item: itemId, from, to } = event.v1.decode(ctx)
    return { collection: classId.toString(), item: itemId.toString(), from: addressOf(from), to: addressOf(to) }
  }

  const { collection: classId, item: itemId, from, to } = event.v1.decode(ctx)
  return { collection: classId.toString(), item: itemId.toString(), from: addressOf(from), to: addressOf(to) }
}

export function getProxyNftaaEvent(ctx: Event): ProxyExecutedNftaaEvent {
  const event = events.proxyExecuted

  if (event.v1.is(ctx)) {
    const { collection: classId, item: itemId, result } = event.v1.decode(ctx)
    return { collection: classId.toString(), item: itemId.toString(), result }
  }

  const { collection: classId, item: itemId, result } = event.v1.decode(ctx)
  return { collection: classId.toString(), item: itemId.toString(), result }
}
