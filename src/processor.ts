import { SubstrateBatchProcessor as SubstrateProcessor } from '@subsquid/substrate-processor'
import { TypeormDatabase as Database } from '@subsquid/typeorm-store'
import logger from './mappings/utils/logger'
import { Asset, NewNonFungible, NonFungible, NonFungibleAccount, NonFungibleCall, Unique } from './processable'

import { CHAIN, getNodeUrl, UNIQUES_ENABLED, STARTING_BLOCK } from './environment'
import { mainFrame } from './mappings'
import { SelectedFields, fieldSelection } from './mappings/utils/types'

const database = new Database({ supportHotBlocks: false })
const processor = new SubstrateProcessor<SelectedFields>()

// In case you need custom types
// processor.setTypesBundle(CHAIN)

// Set the starting block
processor.setBlockRange({ from: STARTING_BLOCK })

// Get this from the environment based on the chain from .env
const chain = getNodeUrl()

processor.setRpcEndpoint({
  url: chain,
  rateLimit: 10,
})

/**
 * Uniques nft pallet
 */
if (UNIQUES_ENABLED) {
  processor.addEvent({ name: [Unique.createCollection], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.clearAttribute], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.setAttribute], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.burn], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.forceCreateClass], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.clearClassMetadata], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.setClassMetadata], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.setCollectionMaxSupply], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.clearCollectionMetadata], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.setCollectionMetadata], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.destroyCollection], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.createItem], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.sold], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.clearPrice], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.setPrice], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.clearMetadata], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.setMetadata], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.changeIssuer], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.changeTeam], call: true, extrinsic: true })
  processor.addEvent({ name: [Unique.transfer], call: true, extrinsic: true })
}

/**
 * NonFungibles nft pallet
 */
processor.addEvent({ name: [NonFungible.createCollection], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.clearAttribute], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.setAttribute], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.burn], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.forceCreateCollection], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.clearCollectionMetadata], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.setCollectionMetadata], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.setCollectionMaxSupply], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.clearCollectionMetadata], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.setCollectionMetadata], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.destroyCollection], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.createItem], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.sold], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.clearPrice], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.setPrice], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.clearMetadata], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.setMetadata], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.changeIssuer], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.changeTeam], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungible.transfer], call: true, extrinsic: true })
processor.addEvent({ name: [NewNonFungible.createSwap], call: true, extrinsic: true })
processor.addEvent({ name: [NewNonFungible.cancelSwap], call: true, extrinsic: true })
processor.addEvent({ name: [NewNonFungible.claimSwap], call: true, extrinsic: true })
// IMPORTANT: THIS IS CALL NOT EVENT!
processor.addCall({ name: [NonFungibleCall.updateMintSettings], extrinsic: true })

/**
 * NFTAA Events
 */
processor.addEvent({ name: [NonFungibleAccount.created], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungibleAccount.transferred], call: true, extrinsic: true })
processor.addEvent({ name: [NonFungibleAccount.executed], call: true, extrinsic: true })

processor.setFields(fieldSelection)

/**
 * Assets pallet
 */
// processor.addEvent({ name: [Asset.create], call: true, extrinsic: true })
// processor.addEvent({ name: [Asset.forceCreate], call: true, extrinsic: true })
processor.addEvent({ name: [Asset.setMetadata], call: true, extrinsic: true })
// processor.addEvent({ name: [Asset.clearMetadata], call: true, extrinsic: true })

logger.info(`PROCESSING ~~ ${CHAIN.toUpperCase()} ~~ EVENTS`)

// const handler = async <T extends FieldSelection = SelectedFields>(ctx: DataHandlerContext<Store, T>) => {}

// mainFrame function is called when the processor is ready to process the data
processor.run(database, mainFrame)
