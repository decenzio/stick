import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v1 from '../v1'

export const updateMintSettings =  {
    name: 'Nfts.update_mint_settings',
    /**
     * Update mint settings.
     * 
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
     * of the `collection`.
     * 
     * - `collection`: The identifier of the collection to change.
     * - `mint_settings`: The new mint settings.
     * 
     * Emits `CollectionMintSettingsUpdated` event when successful.
     */
    v1: new CallType(
        'Nfts.update_mint_settings',
        sts.struct({
            collection: sts.number(),
            mintSettings: v1.MintSettings,
        })
    ),
}
