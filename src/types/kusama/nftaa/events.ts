import { sts, EventType } from '../support'
import * as v1 from '../v1'
import * as v700 from '../v700'

export const nftaaCreated = {
  name: 'Nftaa.NFTAACreated',
  /**
   *  An NFT was converted to an account. \[collection, item, nft_account\]
   */
  v1: new EventType('Nftaa.NFTAACreated', sts.tuple([sts.number(), sts.number(), v1.AccountId])),
  /**
   * An NFT was converted to an account.
   */
  v700: new EventType(
    'Nftaa.NFTAACreated',
    sts.struct({
      collection: sts.number(),
      item: sts.number(),
      nftAccount: v700.AccountId32,
    })
  ),
}

export const nftaaTransferred = {
  name: 'Nftaa.NFTAATransferred',
  /**
   *  An NFTAA's ownership was transferred. \[collection, item, from, to\]
   */
  v1: new EventType('Nftaa.NFTAATransferred', sts.tuple([sts.number(), sts.number(), v1.AccountId, v1.AccountId])),
  /**
   * An NFTAA's ownership was transferred.
   */
  v700: new EventType(
    'Nftaa.NFTAATransferred',
    sts.struct({
      collection: sts.number(),
      item: sts.number(),
      from: v700.AccountId32,
      to: v700.AccountId32,
    })
  ),
}

export const nftaaProxyExecuted = {
  name: 'Nftaa.ProxyExecuted',
  /**
   * A proxy call was executed through an NFTAA. \[collection, item, result\]
   */
  v1: new EventType('Nftaa.ProxyExecuted', sts.tuple([sts.number(), sts.number(), sts.result()])),
  /**
   * A proxy call was executed through an NFTAA.
   */
  v700: new EventType(
    'Nftaa.ProxyExecuted',
    sts.struct({
      collection: sts.number(),
      item: sts.number(),
      result: sts.result(),
    })
  ),
}
