import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1 from '../v1'

export const collection =  {
    /**
     *  Details of a collection.
     */
    v1: new StorageType('Nfts.Collection', 'Optional', [sts.number()], v1.CollectionDetails) as CollectionV1,
}

/**
 *  Details of a collection.
 */
export interface CollectionV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v1.CollectionDetails | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v1.CollectionDetails | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v1.CollectionDetails | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v1.CollectionDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v1.CollectionDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v1.CollectionDetails | undefined)][]>
}

export const itemMetadataOf =  {
    /**
     *  Metadata of an item.
     */
    v1: new StorageType('Nfts.ItemMetadataOf', 'Optional', [sts.number(), sts.number()], v1.ItemMetadata) as ItemMetadataOfV1,
}

/**
 *  Metadata of an item.
 */
export interface ItemMetadataOfV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: number): Promise<(v1.ItemMetadata | undefined)>
    getMany(block: Block, keys: [number, number][]): Promise<(v1.ItemMetadata | undefined)[]>
    getKeys(block: Block): Promise<[number, number][]>
    getKeys(block: Block, key1: number): Promise<[number, number][]>
    getKeys(block: Block, key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(block: Block): Promise<[k: [number, number], v: (v1.ItemMetadata | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, number], v: (v1.ItemMetadata | undefined)][]>
    getPairs(block: Block, key1: number, key2: number): Promise<[k: [number, number], v: (v1.ItemMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, number], v: (v1.ItemMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, number], v: (v1.ItemMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[k: [number, number], v: (v1.ItemMetadata | undefined)][]>
}
