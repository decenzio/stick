export type BaseNftaaEvent = {
  collection: string
  item: string
}

export type CreateNftaaEvent = BaseNftaaEvent & {
  nft_account: string
}

export type TransferNftaaEvent = BaseNftaaEvent & {
  from: string
  to: string
}

export type ProxyExecutedNftaaEvent = BaseNftaaEvent & {
  result: any
}
