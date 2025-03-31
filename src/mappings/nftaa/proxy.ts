import { warn } from 'node:console'
import { create, getOptional } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { NFTAAEntity as NA, NFTAAProxyExecution as NP } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getProxyNftaaEvent } from './getters'

const OPERATION = Action.NFTAA_PROXY

/**
 * Handle the nftaa proxy event (Nftaa.ProxyExecuted)
 * Creates a new nftaa token
 * @param context - the context for the event
 **/
export async function handleNftaaProxyExecuted(context: Context): Promise<void> {
  pending(OPERATION, context.block.height.toString())
  const event = unwrap(context, getProxyNftaaEvent)
  debug(OPERATION, event)
  const id = createTokenId(event.collection, event.item)

  const nftaa = await getOptional<NA>(context.store, NA, event.item)

  if (!nftaa) {
    warn(OPERATION, `nftaa ${event.item} not found`)
    return
  }

  const final = create(NP, id, {})

  final.id = id
  final.hash = md5(id)
  final.nftaa = nftaa
  final.blockNumber = BigInt(event.blockNumber)
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp

  success(OPERATION, `${final.id}`)
  await context.store.save(final)
}
