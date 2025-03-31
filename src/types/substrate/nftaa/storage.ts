import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1 from '../v1'

export const nftAccounts =  {
    v1: new StorageType('Nftaa.NftAccounts', 'Optional', [sts.tuple(() => [sts.number(), sts.number()])], v1.AccountId32) as NftAccountsV1,
}

export interface NftAccountsV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [number, number]): Promise<(v1.AccountId32 | undefined)>
    getMany(block: Block, keys: [number, number][]): Promise<(v1.AccountId32 | undefined)[]>
    getKeys(block: Block): Promise<[number, number][]>
    getKeys(block: Block, key: [number, number]): Promise<[number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key: [number, number]): AsyncIterable<[number, number][]>
    getPairs(block: Block): Promise<[k: [number, number], v: (v1.AccountId32 | undefined)][]>
    getPairs(block: Block, key: [number, number]): Promise<[k: [number, number], v: (v1.AccountId32 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, number], v: (v1.AccountId32 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [number, number]): AsyncIterable<[k: [number, number], v: (v1.AccountId32 | undefined)][]>
}
