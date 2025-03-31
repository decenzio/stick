import { warn } from 'node:console'
import { create, getOptional } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { NFTAATransfer as NT, NFTAAEntity as NA } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getTransferNftaaEvent } from './getters'

const OPERATION = Action.NFTAA_TRANSFER

/**
 * Handle the nftaa transfer event (Nftaa.NFTAATransferred)
 * Creates a new nftaa token
 * @param context - the context for the event
 **/
export async function handleNftaaTransfer(context: Context): Promise<void> {
  pending(OPERATION, context.block.height.toString())
  const event = unwrap(context, getTransferNftaaEvent)
  debug(OPERATION, event)
  const id = createTokenId(event.collection, event.item)

  const nftaa = await getOptional<NA>(context.store, NA, event.item)

  if (!nftaa) {
    warn(OPERATION, `nftaa ${event.item} not found`)
    return
  }

  const final = create(NT, id, {})

  final.id = id
  final.hash = md5(id)
  final.nftaa = nftaa
  final.blockNumber = BigInt(event.blockNumber)
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp
  final.from = event.from
  final.to = event.to

  success(OPERATION, `${final.id}`)
  await context.store.save(final)
}
