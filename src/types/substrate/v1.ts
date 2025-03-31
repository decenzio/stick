import {sts, Result, Option, Bytes, BitSequence} from './support'

export type AccountId32 = Bytes

export interface ItemMetadata {
    deposit: ItemMetadataDeposit
    data: Bytes
}

export interface ItemMetadataDeposit {
    account?: (AccountId32 | undefined)
    amount: bigint
}

export const ItemMetadata: sts.Type<ItemMetadata> = sts.struct(() => {
    return  {
        deposit: ItemMetadataDeposit,
        data: sts.bytes(),
    }
})

export const ItemMetadataDeposit: sts.Type<ItemMetadataDeposit> = sts.struct(() => {
    return  {
        account: sts.option(() => AccountId32),
        amount: sts.bigint(),
    }
})

export interface CollectionDetails {
    owner: AccountId32
    ownerDeposit: bigint
    items: number
    itemMetadatas: number
    itemConfigs: number
    attributes: number
}

export const CollectionDetails: sts.Type<CollectionDetails> = sts.struct(() => {
    return  {
        owner: AccountId32,
        ownerDeposit: sts.bigint(),
        items: sts.number(),
        itemMetadatas: sts.number(),
        itemConfigs: sts.number(),
        attributes: sts.number(),
    }
})

export const MintSettings: sts.Type<MintSettings> = sts.struct(() => {
    return  {
        mintType: MintType,
        price: sts.option(() => sts.bigint()),
        startBlock: sts.option(() => sts.number()),
        endBlock: sts.option(() => sts.number()),
        defaultItemSettings: sts.bigint(),
    }
})

export const MintType: sts.Type<MintType> = sts.closedEnum(() => {
    return  {
        HolderOf: sts.number(),
        Issuer: sts.unit(),
        Public: sts.unit(),
    }
})

export type MintType = MintType_HolderOf | MintType_Issuer | MintType_Public

export interface MintType_HolderOf {
    __kind: 'HolderOf'
    value: number
}

export interface MintType_Issuer {
    __kind: 'Issuer'
}

export interface MintType_Public {
    __kind: 'Public'
}

export interface MintSettings {
    mintType: MintType
    price?: (bigint | undefined)
    startBlock?: (number | undefined)
    endBlock?: (number | undefined)
    defaultItemSettings: bigint
}

export const DispatchError: sts.Type<DispatchError> = sts.closedEnum(() => {
    return  {
        Arithmetic: ArithmeticError,
        BadOrigin: sts.unit(),
        CannotLookup: sts.unit(),
        ConsumerRemaining: sts.unit(),
        Corruption: sts.unit(),
        Exhausted: sts.unit(),
        Module: ModuleError,
        NoProviders: sts.unit(),
        Other: sts.unit(),
        RootNotAllowed: sts.unit(),
        Token: TokenError,
        TooManyConsumers: sts.unit(),
        Transactional: TransactionalError,
        Trie: TrieError,
        Unavailable: sts.unit(),
    }
})

export const TrieError: sts.Type<TrieError> = sts.closedEnum(() => {
    return  {
        DecodeError: sts.unit(),
        DecoderError: sts.unit(),
        DuplicateKey: sts.unit(),
        ExtraneousHashReference: sts.unit(),
        ExtraneousNode: sts.unit(),
        ExtraneousValue: sts.unit(),
        IncompleteDatabase: sts.unit(),
        IncompleteProof: sts.unit(),
        InvalidChildReference: sts.unit(),
        InvalidHash: sts.unit(),
        InvalidStateRoot: sts.unit(),
        RootMismatch: sts.unit(),
        ValueAtIncompleteKey: sts.unit(),
        ValueMismatch: sts.unit(),
    }
})

export type TrieError = TrieError_DecodeError | TrieError_DecoderError | TrieError_DuplicateKey | TrieError_ExtraneousHashReference | TrieError_ExtraneousNode | TrieError_ExtraneousValue | TrieError_IncompleteDatabase | TrieError_IncompleteProof | TrieError_InvalidChildReference | TrieError_InvalidHash | TrieError_InvalidStateRoot | TrieError_RootMismatch | TrieError_ValueAtIncompleteKey | TrieError_ValueMismatch

export interface TrieError_DecodeError {
    __kind: 'DecodeError'
}

export interface TrieError_DecoderError {
    __kind: 'DecoderError'
}

export interface TrieError_DuplicateKey {
    __kind: 'DuplicateKey'
}

export interface TrieError_ExtraneousHashReference {
    __kind: 'ExtraneousHashReference'
}

export interface TrieError_ExtraneousNode {
    __kind: 'ExtraneousNode'
}

export interface TrieError_ExtraneousValue {
    __kind: 'ExtraneousValue'
}

export interface TrieError_IncompleteDatabase {
    __kind: 'IncompleteDatabase'
}

export interface TrieError_IncompleteProof {
    __kind: 'IncompleteProof'
}

export interface TrieError_InvalidChildReference {
    __kind: 'InvalidChildReference'
}

export interface TrieError_InvalidHash {
    __kind: 'InvalidHash'
}

export interface TrieError_InvalidStateRoot {
    __kind: 'InvalidStateRoot'
}

export interface TrieError_RootMismatch {
    __kind: 'RootMismatch'
}

export interface TrieError_ValueAtIncompleteKey {
    __kind: 'ValueAtIncompleteKey'
}

export interface TrieError_ValueMismatch {
    __kind: 'ValueMismatch'
}

export const TransactionalError: sts.Type<TransactionalError> = sts.closedEnum(() => {
    return  {
        LimitReached: sts.unit(),
        NoLayer: sts.unit(),
    }
})

export type TransactionalError = TransactionalError_LimitReached | TransactionalError_NoLayer

export interface TransactionalError_LimitReached {
    __kind: 'LimitReached'
}

export interface TransactionalError_NoLayer {
    __kind: 'NoLayer'
}

export const TokenError: sts.Type<TokenError> = sts.closedEnum(() => {
    return  {
        BelowMinimum: sts.unit(),
        Blocked: sts.unit(),
        CannotCreate: sts.unit(),
        CannotCreateHold: sts.unit(),
        Frozen: sts.unit(),
        FundsUnavailable: sts.unit(),
        NotExpendable: sts.unit(),
        OnlyProvider: sts.unit(),
        UnknownAsset: sts.unit(),
        Unsupported: sts.unit(),
    }
})

export type TokenError = TokenError_BelowMinimum | TokenError_Blocked | TokenError_CannotCreate | TokenError_CannotCreateHold | TokenError_Frozen | TokenError_FundsUnavailable | TokenError_NotExpendable | TokenError_OnlyProvider | TokenError_UnknownAsset | TokenError_Unsupported

export interface TokenError_BelowMinimum {
    __kind: 'BelowMinimum'
}

export interface TokenError_Blocked {
    __kind: 'Blocked'
}

export interface TokenError_CannotCreate {
    __kind: 'CannotCreate'
}

export interface TokenError_CannotCreateHold {
    __kind: 'CannotCreateHold'
}

export interface TokenError_Frozen {
    __kind: 'Frozen'
}

export interface TokenError_FundsUnavailable {
    __kind: 'FundsUnavailable'
}

export interface TokenError_NotExpendable {
    __kind: 'NotExpendable'
}

export interface TokenError_OnlyProvider {
    __kind: 'OnlyProvider'
}

export interface TokenError_UnknownAsset {
    __kind: 'UnknownAsset'
}

export interface TokenError_Unsupported {
    __kind: 'Unsupported'
}

export const ModuleError: sts.Type<ModuleError> = sts.struct(() => {
    return  {
        index: sts.number(),
        error: sts.bytes(),
    }
})

export interface ModuleError {
    index: number
    error: Bytes
}

export const ArithmeticError: sts.Type<ArithmeticError> = sts.closedEnum(() => {
    return  {
        DivisionByZero: sts.unit(),
        Overflow: sts.unit(),
        Underflow: sts.unit(),
    }
})

export type ArithmeticError = ArithmeticError_DivisionByZero | ArithmeticError_Overflow | ArithmeticError_Underflow

export interface ArithmeticError_DivisionByZero {
    __kind: 'DivisionByZero'
}

export interface ArithmeticError_Overflow {
    __kind: 'Overflow'
}

export interface ArithmeticError_Underflow {
    __kind: 'Underflow'
}

export type DispatchError = DispatchError_Arithmetic | DispatchError_BadOrigin | DispatchError_CannotLookup | DispatchError_ConsumerRemaining | DispatchError_Corruption | DispatchError_Exhausted | DispatchError_Module | DispatchError_NoProviders | DispatchError_Other | DispatchError_RootNotAllowed | DispatchError_Token | DispatchError_TooManyConsumers | DispatchError_Transactional | DispatchError_Trie | DispatchError_Unavailable

export interface DispatchError_Arithmetic {
    __kind: 'Arithmetic'
    value: ArithmeticError
}

export interface DispatchError_BadOrigin {
    __kind: 'BadOrigin'
}

export interface DispatchError_CannotLookup {
    __kind: 'CannotLookup'
}

export interface DispatchError_ConsumerRemaining {
    __kind: 'ConsumerRemaining'
}

export interface DispatchError_Corruption {
    __kind: 'Corruption'
}

export interface DispatchError_Exhausted {
    __kind: 'Exhausted'
}

export interface DispatchError_Module {
    __kind: 'Module'
    value: ModuleError
}

export interface DispatchError_NoProviders {
    __kind: 'NoProviders'
}

export interface DispatchError_Other {
    __kind: 'Other'
}

export interface DispatchError_RootNotAllowed {
    __kind: 'RootNotAllowed'
}

export interface DispatchError_Token {
    __kind: 'Token'
    value: TokenError
}

export interface DispatchError_TooManyConsumers {
    __kind: 'TooManyConsumers'
}

export interface DispatchError_Transactional {
    __kind: 'Transactional'
    value: TransactionalError
}

export interface DispatchError_Trie {
    __kind: 'Trie'
    value: TrieError
}

export interface DispatchError_Unavailable {
    __kind: 'Unavailable'
}

export const PalletAttributes: sts.Type<PalletAttributes> = sts.closedEnum(() => {
    return  {
        TransferDisabled: sts.unit(),
        UsedToClaim: sts.number(),
    }
})

export type PalletAttributes = PalletAttributes_TransferDisabled | PalletAttributes_UsedToClaim

export interface PalletAttributes_TransferDisabled {
    __kind: 'TransferDisabled'
}

export interface PalletAttributes_UsedToClaim {
    __kind: 'UsedToClaim'
    value: number
}

export const PriceWithDirection: sts.Type<PriceWithDirection> = sts.struct(() => {
    return  {
        amount: sts.bigint(),
        direction: PriceDirection,
    }
})

export const PriceDirection: sts.Type<PriceDirection> = sts.closedEnum(() => {
    return  {
        Receive: sts.unit(),
        Send: sts.unit(),
    }
})

export type PriceDirection = PriceDirection_Receive | PriceDirection_Send

export interface PriceDirection_Receive {
    __kind: 'Receive'
}

export interface PriceDirection_Send {
    __kind: 'Send'
}

export interface PriceWithDirection {
    amount: bigint
    direction: PriceDirection
}

export const AttributeNamespace: sts.Type<AttributeNamespace> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        CollectionOwner: sts.unit(),
        ItemOwner: sts.unit(),
        Pallet: sts.unit(),
    }
})

export type AttributeNamespace = AttributeNamespace_Account | AttributeNamespace_CollectionOwner | AttributeNamespace_ItemOwner | AttributeNamespace_Pallet

export interface AttributeNamespace_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface AttributeNamespace_CollectionOwner {
    __kind: 'CollectionOwner'
}

export interface AttributeNamespace_ItemOwner {
    __kind: 'ItemOwner'
}

export interface AttributeNamespace_Pallet {
    __kind: 'Pallet'
}

export const AccountId32 = sts.bytes()
