# MultiDelegation

# Graph

Copy the contents of `goerli-subgraph.yaml` or `mumbai-subgraph.yaml` to `subgraph.yaml`
Run ` npm run codegen`

Make sure the remaining scripts in the `package.json` are using the intended subgraph.


# Hardhat & Contracts

Create an .env file from .env.example

```shell
  cp .env.example .env
```

## Configure Alchemy RPC
Create a user in Alchemy, create an app, and then get your API KEY.
Add it to `ALCHEMY_GOERLI_RPC_URL`, to get a URL like `https://eth-goerli.g.alchemy.com/v2/your-api-key`.
Notice that this url might change, so make sure to look into alchemy and get the right HTTP url for your RPC

## Create Wallet
Use `npx hardhat createWallet` to get a testing address

Update `WALLET_ADDRES`, `WALLET_PUBLIC_KEY`, and `WALLET_PRIVATE_KEY` in your env file with the generated Wallet values

## Get GETH 

The easiest way is to use https://goerlifaucet.com/ to send some GETH to an address you already have (It needs to have some mainnet ETH in it), 
and then send that GETH to the generated wallet.

## Test Balance

```shell
npx hardhat getBalance --address YOUR_WALLET_ADDRES    
```

You should see your balance in ETH

## Deploy

To deploy to a local network use 

```shell
npx hardhat run scripts/deploy.ts    
```

To deploy to Goerli use

```shell
npx hardhat --network goerli run scripts/deploy.ts    
```

Use the contract address to update your .env `GOERLI_CONTRACT_ADDRESS` variable

## Play

You can use the following commands to interact with your deployed version of the DelegatesRegistry contract
```shell
npx hardhat --network networkName setDelegate --id spaceName --delegate address
npx hardhat --network networkName clearDelegate --id spaceName --delegate address
npx hardhat --network networkName clearAllDelegates --id spaceName
```

If you are using your local hardhat network, omit the `--network` param
Make sure you have the proper contract address in your env file.
