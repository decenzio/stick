import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity, NFTEntity } from '../../model'
import { unwrap } from '../utils/extract'
import { addressOf, unHex } from '../utils/helper'
import { Action, Context } from '../utils/types'
import { getAttributeEvent } from './getters'
import { attributeFrom, tokenIdOf } from './types'
import { warn } from '../utils/logger'

/**
 * Handle the attribute set event (Uniques.AttributeSet, Uniques.AttributeCleared)
 * Sets the attribute of the collection or NFT
 * Logs NONE event
 * @param context - the context for the event
 **/
export async function handleAttributeSet(context: Context): Promise<void> {
  const event = unwrap(context, getAttributeEvent)

  const final =
    event.sn !== undefined
      ? await get(context.store, NFTEntity, tokenIdOf(event as any))
      : await get(context.store, CollectionEntity, event.collectionId)

  if (!final.attributes) {
    final.attributes = []
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
    } else {
      const newAttribute = attributeFrom({ trait_type: event.trait, value: unHex(event.value) ?? String(event.value) })
      final.attributes?.push(newAttribute)
    }
  }

  await context.store.save(final)
}
