import { NonFungible } from '../../../processable'
import { nfts as events } from '../../../types/substrate/events'
import { nfts as calls } from '../../../types/substrate/calls'
import { addressOf, unHex } from '../../utils/helper'
import { Event, Call, Optional } from '../../utils/types'
import {
  BurnTokenEvent,
  BuyTokenEvent,
  ChangeCollectionOwnerEvent,
  ChangeCollectionTeam,
  ClaimSwapEvent,
  CreateCollectionEvent,
  CreateSwapEvent,
  CreateTokenEvent,
  DestroyCollectionEvent,
  ForceCreateCollectionEvent,
  ListTokenEvent,
  LockCollectionEvent,
  SetAttribute,
  SetMetadata,
  TransferTokenEvent,
  UpdateMintSettings,
} from '../types'
import { Surcharge } from '../../../model'

export function getCreateCollectionEvent(ctx: Event): CreateCollectionEvent {
  const event = events.created

  if (event.v1.is(ctx)) {
    const { collection: classId, creator, owner } = event.v1.decode(ctx)
    return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
  }

  const { collection: classId, creator, owner } = event.v1.decode(ctx)
  return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Event): ForceCreateCollectionEvent {
  const event = events.forceCreated

  if (event.v1.is(ctx)) {
    const { collection: classId, owner } = event.v1.decode(ctx)
    return { id: classId.toString(), owner: addressOf(owner) }
  }

  const { collection: classId, owner } = event.v1.decode(ctx)
  return { id: classId.toString(), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Event): CreateTokenEvent {
  const event = events.issued

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }

  const { collection: classId, item: instanceId, owner } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Event): TransferTokenEvent {
  const event = events.transferred

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId, from, to } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }

  const { collection: classId, item: instanceId, from, to } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
}

export function getBurnTokenEvent(ctx: Event): BurnTokenEvent {
  const event = events.burned

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }

  const { collection: classId, item: instanceId, owner } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Event): DestroyCollectionEvent {
  const event = events.destroyed

  if (event.v1.is(ctx)) {
    const { collection: classId } = event.v1.decode(ctx)
    return { id: classId.toString() }
  }

  const { collection: classId } = event.v1.decode(ctx)
  return { id: classId.toString() }
}

export function getListTokenEvent(ctx: Event): ListTokenEvent {
  const event = events.itemPriceSet

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId, price } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), price }
  }

  const { collection: classId, item: instanceId, price } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Event): ListTokenEvent {
  const event = events.itemPriceRemoved

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
  }

  const { collection: classId, item: instanceId } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
}

export function getPriceTokenEvent(ctx: Event): ListTokenEvent {
  if (ctx.name === NonFungible.setPrice) {
    return getListTokenEvent(ctx)
  }

  return getUnListTokenEvent(ctx)
}

export function getBuyTokenEvent(ctx: Event): BuyTokenEvent {
  const event = events.itemBought

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId, price, seller, buyer } = event.v1.decode(ctx)
    return {
      collectionId: classId.toString(),
      caller: addressOf(buyer),
      sn: instanceId.toString(),
      price: BigInt(price ?? 0),
      currentOwner: addressOf(seller),
    }
  }

  const { collection: classId, item: instanceId, price, seller, buyer } = event.v1.decode(ctx)
  return {
    collectionId: classId.toString(),
    caller: addressOf(buyer),
    sn: instanceId.toString(),
    price: BigInt(price ?? 0),
    currentOwner: addressOf(seller),
  }
}

export function getLockCollectionEvent(ctx: Event): LockCollectionEvent {
  const event = events.collectionMaxSupplySet
  if (event.v1.is(ctx)) {
    const { collection: classId, maxSupply: max } = event.v1.decode(ctx)
    return { id: classId.toString(), max }
  }

  const { collection: classId, maxSupply: max } = event.v1.decode(ctx)
  return { id: classId.toString(), max }
}

export function getChangeCollectionOwnerEvent(ctx: Event): ChangeCollectionOwnerEvent {
  const event = events.ownerChanged

  if (event.v1.is(ctx)) {
    const { collection: classId, newOwner } = event.v1.decode(ctx)
    return { id: classId.toString(), owner: addressOf(newOwner) }
  }

  const { collection: classId, newOwner } = event.v1.decode(ctx)
  return { id: classId.toString(), owner: addressOf(newOwner) }
}

export function getClearCollectionMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataCleared

  if (event.v1.is(ctx)) {
    const { collection: classId } = event.v1.decode(ctx)
    return { collectionId: classId.toString() }
  }

  const { collection: classId } = event.v1.decode(ctx)
  return { collectionId: classId.toString() }
}

export function getCreateCollectionMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v1.is(ctx)) {
    const { collection: classId, data } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), metadata: unHex(data) }
  }

  const { collection: classId, data } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), metadata: unHex(data) }
}

export function getClearClassMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v1.is(ctx)) {
    const { collection: classId, data } = event.v1.decode(ctx)
    return { collectionId: classId.toString() }
  }

  const { collection: classId } = event.v1.decode(ctx)
  return { collectionId: classId.toString() }
}

export function getCreateClassMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v1.is(ctx)) {
    const { collection: classId, data } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), metadata: unHex(data) }
  }

  const { collection: classId, data } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), metadata: unHex(data) }
}

export function getCreateMetadataEvent(ctx: Event): SetMetadata {
  const event = events.itemMetadataSet

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId, data } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: unHex(data) }
  }

  const { collection: classId, item: instanceId, data } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: unHex(data) }
}

export function getClearMetadataEvent(ctx: Event): SetMetadata {
  const event = events.itemMetadataCleared

  if (event.v1.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString() }
  }

  const { collection: classId, item: instanceId } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Event): SetMetadata {
  switch (ctx.name) {
    case NonFungible.setCollectionMetadata:
      return getCreateCollectionMetadataEvent(ctx)
    case NonFungible.clearCollectionMetadata:
      return getClearCollectionMetadataEvent(ctx)
    case NonFungible.setMetadata:
      return getCreateMetadataEvent(ctx)
    case NonFungible.clearMetadata:
      return getClearMetadataEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

function getSetAttributeEvent(ctx: Event): SetAttribute {
  const event = events.attributeSet
  if (event.v1.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key, value } = event.v1.decode(ctx)
    return {
      collectionId: classId.toString(),
      sn: instanceId?.toString(),
      trait: unHex(key),
      value,
    }
  }

  const { collection: classId, maybeItem: instanceId, key, value } = event.v1.decode(ctx)
  return {
    collectionId: classId.toString(),
    sn: instanceId?.toString(),
    trait: unHex(key),
    value,
  }
}

function getClearAttributeEvent(ctx: Event): SetAttribute {
  const event = events.attributeCleared

  if (event.v1.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key } = event.v1.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: unHex(key) }
  }

  const { collection: classId, maybeItem: instanceId, key } = event.v1.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: unHex(key) }
}

export function getAttributeEvent(ctx: Event): SetAttribute {
  switch (ctx.name) {
    case NonFungible.setAttribute:
      return getSetAttributeEvent(ctx)
    case NonFungible.clearAttribute:
      return getClearAttributeEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

export function getChangeTeamEvent(ctx: Event): ChangeCollectionTeam {
  const event = events.teamChanged

  if (event.v1.is(ctx)) {
    const { collection: classId, issuer, admin, freezer } = event.v1.decode(ctx)
    return {
      id: classId.toString(),
      issuer: issuer ? addressOf(issuer) : '',
      admin: admin ? addressOf(admin) : '',
      freezer: freezer ? addressOf(freezer) : '',
    }
  }

  const { collection: classId, issuer, admin, freezer } = event.v1.decode(ctx)
  return {
    id: classId.toString(),
    issuer: issuer ? addressOf(issuer) : '',
    admin: admin ? addressOf(admin) : '',
    freezer: freezer ? addressOf(freezer) : '',
  }
}

export function getTipSentEvent(ctx: Event) {
  const event = events.tipSent

  if (event.v1.is(ctx)) {
    const { collection, item, receiver, amount } = event.v1.decode(ctx)
    return {
      collection: collection.toString(),
      item: item.toString(),
      receiver: receiver ? addressOf(receiver) : '',
      amount,
    }
  }

  const { collection, item, receiver, amount } = event.v1.decode(ctx)
  return {
    collection: collection.toString(),
    item: item.toString(),
    receiver: receiver ? addressOf(receiver) : '',
    amount,
  }
}

export function getUpdateMintCall(ctx: Call): UpdateMintSettings {
  const call = calls.updateMintSettings

  if (call.v1.is(ctx)) {
    const {
      collection: classId,
      mintSettings: { mintType, startBlock, endBlock, price },
    } = call.v1.decode(ctx)
    return { id: classId.toString(), type: mintType, startBlock, endBlock, price }
  }

  const {
    collection: classId,
    mintSettings: { mintType, startBlock, endBlock, price },
  } = call.v1.decode(ctx)
  return { id: classId.toString(), type: mintType, startBlock, endBlock, price }
}

export function getSwapCreatedEvent(ctx: Event): CreateSwapEvent {
  const event = events.swapCreated

  if (event.v1.is(ctx)) {
    const { offeredCollection, offeredItem, desiredCollection, desiredItem, price, deadline } = event.v1.decode(ctx)

    return {
      collectionId: offeredCollection.toString(),
      sn: offeredItem.toString(),
      consideration: {
        collectionId: desiredCollection.toString(),
        sn: desiredItem?.toString(),
      },
      price: price?.amount,
      surcharge: price?.direction.__kind as Optional<Surcharge>,
      deadline,
    }
  }

  const { offeredCollection, offeredItem, desiredCollection, desiredItem, price, deadline } = event.v1.decode(ctx)
  return {
    collectionId: offeredCollection.toString(),
    sn: offeredItem.toString(),
    consideration: {
      collectionId: desiredCollection.toString(),
      sn: desiredItem?.toString(),
    },
    price: price?.amount,
    surcharge: price?.direction.__kind as Optional<Surcharge>,
    deadline,
  }
}

export function getSwapCancelledEvent(ctx: Event): CreateSwapEvent {
  const event = events.swapCancelled

  if (event.v1.is(ctx)) {
    const { offeredCollection, offeredItem, desiredCollection, desiredItem, price, deadline } = event.v1.decode(ctx)

    return {
      collectionId: offeredCollection.toString(),
      sn: offeredItem.toString(),
      consideration: {
        collectionId: desiredCollection.toString(),
        sn: desiredItem?.toString(),
      },
      price: price?.amount,
      surcharge: price?.direction.__kind as Optional<Surcharge>,
      deadline,
    }
  }

  const { offeredCollection, offeredItem, desiredCollection, desiredItem, price, deadline } = event.v1.decode(ctx)
  return {
    collectionId: offeredCollection.toString(),
    sn: offeredItem.toString(),
    consideration: {
      collectionId: desiredCollection.toString(),
      sn: desiredItem?.toString(),
    },
    price: price?.amount,
    surcharge: price?.direction.__kind as Optional<Surcharge>,
    deadline,
  }
}

export function getSwapClaimedEvent(ctx: Event): ClaimSwapEvent {
  const event = events.swapClaimed

  if (event.v1.is(ctx)) {
    const {
      sentCollection,
      sentItem,
      sentItemOwner,
      receivedCollection,
      receivedItem,
      receivedItemOwner,
      price,
      deadline,
    } = event.v1.decode(ctx)

    return {
      collectionId: receivedCollection.toString(),
      sn: receivedItem.toString(),
      currentOwner: receivedItemOwner ? addressOf(receivedItemOwner) : '',
      sent: {
        collectionId: sentCollection.toString(),
        sn: sentItem.toString(),
        owner: sentItemOwner ? addressOf(sentItemOwner) : '',
      },
      price: price?.amount,
      surcharge: price?.direction.__kind as Optional<Surcharge>,
      deadline,
    }
  }

  const {
    sentCollection,
    sentItem,
    sentItemOwner,
    receivedCollection,
    receivedItem,
    receivedItemOwner,
    price,
    deadline,
  } = event.v1.decode(ctx)

  return {
    collectionId: receivedCollection.toString(),
    sn: receivedItem.toString(),
    currentOwner: receivedItemOwner ? addressOf(receivedItemOwner) : '',
    sent: {
      collectionId: sentCollection.toString(),
      sn: sentItem.toString(),
      owner: sentItemOwner ? addressOf(sentItemOwner) : '',
    },
    price: price?.amount,
    surcharge: price?.direction.__kind as Optional<Surcharge>,
    deadline,
  }
}
