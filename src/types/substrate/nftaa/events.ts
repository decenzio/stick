import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1 from '../v1'

export const nftaaCreated =  {
    name: 'Nftaa.NFTAACreated',
    /**
     * An NFT was converted to an account
     */
    v1: new EventType(
        'Nftaa.NFTAACreated',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            nftAccount: v1.AccountId32,
        })
    ),
}

export const nftaaTransferred =  {
    name: 'Nftaa.NFTAATransferred',
    /**
     * An NFTAA's ownership was transferred
     */
    v1: new EventType(
        'Nftaa.NFTAATransferred',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            from: v1.AccountId32,
            to: v1.AccountId32,
        })
    ),
}

export const proxyExecuted =  {
    name: 'Nftaa.ProxyExecuted',
    /**
     * A proxy call was executed through an NFTAA
     */
    v1: new EventType(
        'Nftaa.ProxyExecuted',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            result: sts.result(() => sts.unit(), () => v1.DispatchError),
        })
    ),
}
