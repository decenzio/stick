import { CHAIN } from '../../../environment'
import { Context } from '../../utils/types'
import { CreateNftaaEvent, ProxyExecutedNftaaEvent, TransferNftaaEvent } from '../types'

// eslint-disable-next-line unicorn/prefer-module
const proc = require(`./${CHAIN}`)

export function getCreateNftaa(_ctx: Context): CreateNftaaEvent {
  const ctx = _ctx.event
  return proc.getCreateNftaaEvent(ctx)
}

export function getTransferNftaaEvent(_ctx: Context): TransferNftaaEvent {
  const ctx = _ctx.event
  return proc.getTransferNftaaEvent(ctx)
}

export function getProxyNftaaEvent(_ctx: Context): ProxyExecutedNftaaEvent {
  const ctx = _ctx.event
  return proc.getProxyNftaaEvent(ctx)
}
