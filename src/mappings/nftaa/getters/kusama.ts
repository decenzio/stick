import { NonFungible } from '../../../processable'
import { nftaa as events } from '../../../types/kusama/events'
import { addressOf, unHex } from '../../utils/helper'
import { Event, Call, Optional } from '../../utils/types'
import { CreateNftaaEvent, ProxyExecutedNftaaEvent, TransferNftaaEvent } from '../types'
import { Surcharge } from '../../../model'

export function getCreateNftaaEvent(ctx: Event): CreateNftaaEvent {
  const event = events.nftaaCreated

  if (event.v700.is(ctx)) {
    const { collection: classId, item: itemId, nft_account } = event.v700.decode(ctx)
    return { collection: classId.toString(), item: itemId.toString(), nft_account: addressOf(nft_account) }
  }

  const { collection: classId, item: itemId, nft_account } = event.v700.decode(ctx)
  return { collection: classId.toString(), item: itemId.toString(), nft_account: addressOf(nft_account) }
}

export function getTransferNftaaEvent(ctx: Event): TransferNftaaEvent {
  const event = events.nftaaTransferred

  if (event.v700.is(ctx)) {
    const { collection: classId, item: itemId, from, to } = event.v700.decode(ctx)
    return { collection: classId.toString(), item: itemId.toString(), from: addressOf(from), to: addressOf(to) }
  }

  const { collection: classId, item: itemId, from, to } = event.v700.decode(ctx)
  return { collection: classId.toString(), item: itemId.toString(), from: addressOf(from), to: addressOf(to) }
}

export function getProxyNftaaEvent(ctx: Event): ProxyExecutedNftaaEvent {
  const event = events.nftaaProxyExecuted

  if (event.v700.is(ctx)) {
    const { collection: classId, item: itemId, result } = event.v700.decode(ctx)
    return { collection: classId.toString(), item: itemId.toString(), result }
  }

  const { collection: classId, item: itemId, result } = event.v700.decode(ctx)
  return { collection: classId.toString(), item: itemId.toString(), result }
}
