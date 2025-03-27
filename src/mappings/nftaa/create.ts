import { warn } from 'node:console'
import { create, getOptional } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { CollectionEntity as CE, NFTAAEntity as NA } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { versionOf } from '../utils/helper'
import { getCreateNftaa } from './getters'

const OPERATION = Action.NFTAA_CREATE

/**
 * Handle the nftaa create event (Nftaa.NFTAACreated)
 * Creates a new nftaa token
 * @param context - the context for the event
 **/
export async function handleNftaaCreate(context: Context): Promise<void> {
  pending(OPERATION, context.block.height.toString())
  const event = unwrap(context, getCreateNftaa)
  debug(OPERATION, event)
  const id = createTokenId(event.collection, event.item)
  const collection = await getOptional<CE>(context.store, CE, event.collection)

  if (!collection) {
    warn(OPERATION, `collection ${event.collection} not found`)
    return
  }

  const final = create(NA, id, {})

  final.id = id
  final.hash = md5(id)
  final.blockNumber = BigInt(event.blockNumber)
  final.collection = collection
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp
  final.version = versionOf(context)

  success(OPERATION, `${final.id}`)
  await context.store.save(final)
}
