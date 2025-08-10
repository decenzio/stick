import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity, NFTEntity } from '../../model'
import { unwrap } from '../utils/extract'
import { Action, Context, isNFT } from '../utils/types'
import { addressOf, isAddress, unHex } from '../utils/helper'
import { getAttributeEvent } from './getters'
import { attributeFrom, tokenIdOf } from './types'
import { debug, pending, warn } from '../utils/logger'

/**
 * Handle the attribute set event (Nfts.AttributeSet, Nfts.AttributeCleared)
 * Sets the attribute of the collection or NFT
 * Logs NONE event
 * @param context - the context for the event
 **/
export async function handleAttributeSet(context: Context): Promise<void> {
  pending(Action.SET_ATTRIBUTE, context.block.height.toString())
  const event = unwrap(context, getAttributeEvent)

  const final = isNFT(event)
    ? await get(context.store, NFTEntity, tokenIdOf(event as any))
    : await get(context.store, CollectionEntity, event.collectionId)
  if (!final.attributes) {
    final.attributes = []
  }

  if ('royalty' in final && event.trait === 'royalty') {
    const value = unHex(event.value)
    final.royalty = final.royalty || Number.parseFloat(value || '0')
  }

  if ('baseUri' in final && event.trait === 'baseUri') {
    const value = unHex(event.value)
    final.baseUri = final.baseUri || value
  }

  if ('recipient' in final && event.trait === 'recipient') {
    try {
      final.recipient = final.recipient || addressOf(event.value as string)
    } catch (error) {
      const human = unHex(event.value)
      final.recipient = isAddress(human) ? human : ''
      if (final.recipient === '') {
        console.log(error)
      }
    }
  }

  if (event.trait === 'nftaa_address') {
    warn(Action.SET_ATTRIBUTE, `nftaa_address - ${JSON.stringify(event)}`)
    try {
      const address = addressOf(event.value as string)
      const addressAttribute = final.attributes.find((attr) => attr.trait === 'nftaa_address')
      if (addressAttribute) {
        addressAttribute.value = address
      } else {
        final.attributes.push(attributeFrom({ trait_type: 'nftaa_address', value: address }))
      }
      await context.store.save(final)
      return
    } catch (error) {
      console.error(`Invalid address for nftaa_address: ${event.value}`, error)
      return
    }
  }

  if (event.value === null) {
    final.attributes = final.attributes?.filter((attr) => attr.trait !== event.trait)
  } else {
    const attribute = final.attributes?.find((attr) => attr.trait === event.trait)
    if (attribute) {
      attribute.value = unHex(event.value) ?? String(event.value)
    } else if (event.trait !== 'royalty' && event.trait !== 'recipient') {
      const newAttribute = attributeFrom({ trait_type: event.trait, value: unHex(event.value) ?? String(event.value) })
      final.attributes?.push(newAttribute)
    }
  }

  await context.store.save(final)
}
