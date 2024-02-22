<div align="center">
  <h1 align="center">Official Airstack Frames SDK</h1>
  <img src="./assets/image.png" alt="code snippets" height=350/>
  <h3>Powered By</h3>
  <a align="center" href="https://airstack.xyz" target="_blank"><img src="./assets/logo.png" alt="Airstack Logo" height=80/></a>
</div>

The Airstack Frames SDK empowers developers to seamlessly integrate onchain data, including token balances, token mints, Farcaster followers and followings, POAPs, and more, into their Frames using just a few lines of code.

Additionally, developers can leverage the SDK to create an allow list feature, enabling checks for token ownership, token mints, following status, and more.

Designed with TypeScript, the SDK offers full type support for those building Frames with TypeScript.

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Install](#install)
- [Set Environment Variables](#set-environment-variables)
- [Get Started](#get-started)
- [Functions](#functions)
  - [`getFarcasterUserDetails`](#getfarcasteruserdetails)
  - [`getFarcasterFollowers`](#getfarcasterfollowers)
  - [`getFarcasterFollowings`](#getfarcasterfollowings)
  - [`getFarcasterUserPoaps`](#getfarcasteruserpoaps)
  - [`getFarcasterUserERC20Balances`](#getfarcasterusererc20balances)
  - [`getFarcasterUserNFTBalances`](#getfarcasterusernftbalances)
  - [`getFarcasterUserERC20Mints`](#getfarcasterusererc20mints)
  - [`getFarcasterUserNFTMints`](#getfarcasterusernftmints)
  - [`getFarcasterUserTokenSentFrom`](#getfarcasterusertokensentfrom)
  - [`getFarcasterUserTokenReceivedBy`](#getfarcasterusertokenreceivedby)
  - [`searchFarcasterUsers`](#searchfarcasterusers)
  - [`checkPoapAttendedByFarcasterUser`](#checkpoapattendedbyfarcasteruser)
  - [`checkTokenHoldByFarcasterUser`](#checktokenholdbyfarcasteruser)
  - [`checkTokenMintedByFarcasterUser`](#checktokenmintedbyfarcasteruser)
  - [`checkIsFollowingFarcasterUser`](#checkisfollowingfarcasteruser)
  - [`checkIsFollowedByFarcasterUser`](#checkisfollowedbyfarcasteruser)
- [Enum](#enum)
  - [`TokenBlockchain`](#tokenblockchain)
  - [`TokenType`](#tokentype)
  - [`NFTType`](#nfttype)
- [Paginations](#paginations)

## Install

To install the Frames SDK, use the command below:

```bash
npm install @airstack/frames
```

## Set Environment Variables

Create a `.env.local` file and add your [Airstack API key](https://app.airstack.xyz/profile-settings/api-keys) as an environment variable:

```
AIRSTACK_API_KEY="YOUR_AIRSTACK_API_KEY"
```

## Get Started

To use any of the functions offered by the SDK, you'll need to call the `init` function before calling the functions and input your [Airstack API key](https://app.airstack.xyz/profile-settings/api-keys).

```ts
import { init } from "@airstack/frames";

init(process.AIRSTACK_API_KEY);
```

## Functions

### `getFarcasterUserDetails`

Fetch Farcaster user details, including profile name, fnames, profile images (resized), user-associated addresses (connected addresses), follower count and following count.

**Input**

| Field | Type     | Required | Description             |
| ----- | -------- | -------- | ----------------------- |
| `fid` | `number` | true     | FID of a Farcaster user |

**Code Sample**

```ts
import {
  getFarcasterUserDetails,
  FarcasterUserDetailsInput,
  FarcasterUserDetailsOutput,
} from "@airstack/frames";

const input: FarcasterUserDetailsInput = {
  fid: 602,
};
const { data, error }: FarcasterUserDetailsOutput =
  await getFarcasterUserDetails(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
{
  "profileName": "betashop.eth",
  "fnames": ["betashop", "betashop.eth", "jasongoldberg.eth"],
  "profileImage": {
    "extraSmall": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/extra_small.png",
    "small": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/small.png",
    "medium": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/medium.png",
    "large": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/large.png",
    "original": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/original_image.png"
  },
  "userAssociatedAddresses": [
    "0x66bd69c7064d35d146ca78e6b186e57679fba249",
    "0xeaf55242a90bb3289db8184772b0b98562053559"
  ],
  "followerCount": 56141,
  "followingCount": 2270
}
```

### `getFarcasterFollowers`

Fetch all Farcaster followers of a given FID.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterFollowers,
  FarcasterFollowersInput,
  FarcasterFollowersOutput,
} from "@airstack/frames";

const input: FarcasterFollowersInput = {
  fid: 602,
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterFollowersOutput = await getFarcasterFollowers(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "profileName": "allison985",
    "fnames": ["allison985"],
    "fid": "220757",
    "profileImage": {
      "extraSmall": "https://assets.airstack.xyz/image/social/RS9r7sdCb5orXeB0+tLLRPxtnJo80la3zRRVAYc9gPR+ne8TitCLgEJ41Gp1LV6g/extra_small.jpg",
      "small": "https://assets.airstack.xyz/image/social/RS9r7sdCb5orXeB0+tLLRPxtnJo80la3zRRVAYc9gPR+ne8TitCLgEJ41Gp1LV6g/small.jpg",
      "medium": "https://assets.airstack.xyz/image/social/RS9r7sdCb5orXeB0+tLLRPxtnJo80la3zRRVAYc9gPR+ne8TitCLgEJ41Gp1LV6g/medium.jpg",
      "large": "https://assets.airstack.xyz/image/social/RS9r7sdCb5orXeB0+tLLRPxtnJo80la3zRRVAYc9gPR+ne8TitCLgEJ41Gp1LV6g/large.jpg",
      "original": "https://assets.airstack.xyz/image/social/RS9r7sdCb5orXeB0+tLLRPxtnJo80la3zRRVAYc9gPR+ne8TitCLgEJ41Gp1LV6g/original_image.jpg"
    },
    "userAssociatedAddresses": ["0x42fae5a53f0194f6f9587926e206a852c5c726bf"],
    "followerCount": 1,
    "followingCount": 74
  }
]
```

### `getFarcasterFollowings`

Fetch all Farcaster followings of a given FID.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterFollowings,
  FarcasterFollowingsInput,
  FarcasterFollowingsOutput,
} from "@airstack/frames";

const input: FarcasterFollowingsInput = {
  fid: 602,
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterFollowingsOutput = await getFarcasterFollowings(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "profileName": "jayhuq",
    "fnames": ["jayhuq"],
    "fid": "1775",
    "profileImage": {
      "extraSmall": "https://assets.airstack.xyz/image/social/HmDDiN8HQWR/6f6nrPI8+P6fwctlKaEu/dM8+QnZz/Y=/extra_small.png",
      "small": "https://assets.airstack.xyz/image/social/HmDDiN8HQWR/6f6nrPI8+P6fwctlKaEu/dM8+QnZz/Y=/small.png",
      "medium": "https://assets.airstack.xyz/image/social/HmDDiN8HQWR/6f6nrPI8+P6fwctlKaEu/dM8+QnZz/Y=/medium.png",
      "large": "https://assets.airstack.xyz/image/social/HmDDiN8HQWR/6f6nrPI8+P6fwctlKaEu/dM8+QnZz/Y=/large.png",
      "original": "https://assets.airstack.xyz/image/social/HmDDiN8HQWR/6f6nrPI8+P6fwctlKaEu/dM8+QnZz/Y=/original_image.png"
    },
    "userAssociatedAddresses": ["0xda52abca28fadeab9771ba45a2ff346c4db97d7f"],
    "followerCount": 58,
    "followingCount": 0
  }
]
```

### `getFarcasterUserPoaps`

Fetch all POAPs owned by a Farcaster user of a given FID.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterUserPoaps,
  FarcasterUserPoapsInput,
  FarcasterUserPoapsOutput,
} from "@airstack/frames";

const input: FarcasterUserPoapsInput = {
  fid: 602,
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserPoapsOutput = await getFarcasterUserPoaps(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "eventName": "ETHGlobal New York 2023 Speaker",
    "eventId": "151055",
    "eventURL": "https://ethglobal.com/events/newyork2023",
    "isVirtualEvent": false,
    "startDate": "2023-09-22T00:00:00Z",
    "endDate": "2023-09-25T00:00:00Z",
    "city": "New York City"
  }
]
```

### `getFarcasterUserERC20Balances`

Fetch ERC20 tokens owned by a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Input**

| Field    | Type                                    | Required | Description                                                                                                                                              |
| -------- | --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fid`    | `number`                                | true     | FID of a Farcaster user                                                                                                                                  |
| `chains` | [`TokenBlockchain[]`](#tokenblockchain) | false    | List of blockchains to fetch user's ERC20 balance. Currently, supports Ethereum, Polygon, Base, and Zora. Defaults to include all supported blockchains. |
| `limit`  | `number`                                | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations).                                                    |

**Code Sample**

```ts
import {
  getFarcasterUserERC20Balances,
  FarcasterUserERC20BalancesInput,
  FarcasterUserERC20BalancesOutput,
  TokenBlockchain,
} from "@airstack/frames";

const input: FarcasterUserERC20BalancesInput = {
  fid: 602,
  chains: [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ],
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserERC20BalancesOutput = await getFarcasterUserERC20Balances(
  input
);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "blockchain": "ethereum",
    "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "amount": 125,
    "amountInWei": "125000000",
    "name": "USD Coin",
    "symbol": "USDC"
  }
]
```

### `getFarcasterUserNFTBalances`

Fetch ERC721 and ERC1155 NFT collections owned by a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Input**

| Field    | Type                                    | Required | Description                                                                                                                                            |
| -------- | --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fid`    | `number`                                | true     | FID of a Farcaster user                                                                                                                                |
| `chains` | [`TokenBlockchain[]`](#tokenblockchain) | false    | List of blockchains to fetch user's NFT balance. Currently, supports Ethereum, Polygon, Base, and Zora. Defaults to include all supported blockchains. |
| `limit`  | `number`                                | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations).                                                  |

**Code Sample**

```ts
import {
  getFarcasterUserNFTBalances,
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutput,
  TokenBlockchain,
  NFTType,
} from "@airstack/frames";

const variables: FarcasterUserNFTBalancesInput = {
  fid: 602,
  tokenType: [NFTType.ERC721, NFTType.ERC1155],
  chains: [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ],
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserNFTBalancesOutput = await getFarcasterUserNFTBalances(
  variables
);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "blockchain": "zora",
    "tokenAddress": "0xe03ef4b9db1a47464de84fb476f9baf493b3e886",
    "tokenId": "110",
    "amount": 1,
    "amountInWei": "1",
    "name": "Farcaster OG",
    "symbol": "$FCOG",
    "image": {
      "extraSmall": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/extra_small.png",
      "small": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/small.png",
      "medium": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/medium.png",
      "large": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/large.png",
      "original": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/original_image.png"
    },
    "metaData": {
      "name": "Farcaster OG 43",
      "description": "Celebrating Farcaster at permissionless.",
      "image": "ipfs://bafybeihbx6nx4h2wblf6nlsy6nkotzqynzsrgimgqzwqgw6gf7d27ewfqu",
      "imageData": "",
      "externalUrl": "",
      "animationUrl": "",
      "youtubeUrl": "",
      "backgroundColor": "",
      "attributes": null
    },
    "tokenType": "ERC721"
  }
]
```

### `getFarcasterUserERC20Mints`

Fetch ERC20 tokens minted by a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Input**

| Field    | Type                                    | Required | Description                                                                                                                                            |
| -------- | --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fid`    | `number`                                | true     | FID of a Farcaster user                                                                                                                                |
| `chains` | [`TokenBlockchain[]`](#tokenblockchain) | false    | List of blockchains to fetch user's ERC20 mints. Currently, supports Ethereum, Polygon, Base, and Zora. Defaults to include all supported blockchains. |
| `limit`  | `number`                                | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations).                                                  |

**Code Sample**

```ts
import {
  getFarcasterUserERC20Mints,
  FarcasterUserERC20MintsInput,
  FarcasterUserERC20MintsOutput,
  TokenBlockchain,
} from "@airstack/frames";

const input: FarcasterUserERC20MintsInput = {
  fid: 602,
  chains: [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ],
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserERC20MintsOutput = await getFarcasterUserERC20Mints(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "blockchain": "polygon",
    "tokenAddress": "0x058d96baa6f9d16853970b333ed993acc0c35add",
    "amount": 50,
    "amountInWei": "50000000000000000000",
    "name": "Staked SPORK",
    "symbol": "sSPORK",
    "blockTimestamp": "2024-01-03T18:43:02Z",
    "blockNumber": 51901326
  }
]
```

### `getFarcasterUserNFTMints`

Fetch ERC721 and ERC1155 NFT collections minted by a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Input**

| Field    | Type                                    | Required | Description                                                                                                                                          |
| -------- | --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fid`    | `number`                                | true     | FID of a Farcaster user                                                                                                                              |
| `chains` | [`TokenBlockchain[]`](#tokenblockchain) | false    | List of blockchains to fetch user's NFT mints. Currently, supports Ethereum, Polygon, Base, and Zora. Defaults to include all supported blockchains. |
| `limit`  | `number`                                | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations).                                                |

**Code Sample**

```ts
import {
  getFarcasterUserNFTMints,
  FarcasterUserNFTMintsInput,
  FarcasterUserNFTMintsOutput,
  TokenBlockchain,
  NFTType,
} from "@airstack/frames";

const input: FarcasterUserNFTMintsInput = {
  fid: 602,
  chains: [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ],
  tokenType: [NFTType.ERC721, NFTType.ERC1155],
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserNFTMintsOutput = await getFarcasterUserNFTMints(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "blockchain": "base",
    "tokenAddress": "0x7d5861cfe1c74aaa0999b7e2651bf2ebd2a62d89",
    "tokenId": "94613",
    "tokenType": "ERC721",
    "amount": 1,
    "amountInWei": "1",
    "name": "Base Day One",
    "symbol": "$BASEDAYONE",
    "blockTimestamp": "2023-08-11T08:23:43Z",
    "blockNumber": 2476438,
    "image": {
      "extraSmall": "https://assets.airstack.xyz/image/nft/8453/VsImj/jHMngFqJSF7KWaDce4NeMMkjjE6vKrM78PzD+4gKMh74NjmrMUXl9+slIronvYbTNTE8aDkB1TuYwHPA==/extra_small.gif",
      "small": "https://assets.airstack.xyz/image/nft/8453/VsImj/jHMngFqJSF7KWaDce4NeMMkjjE6vKrM78PzD+4gKMh74NjmrMUXl9+slIronvYbTNTE8aDkB1TuYwHPA==/small.gif",
      "medium": "https://assets.airstack.xyz/image/nft/8453/VsImj/jHMngFqJSF7KWaDce4NeMMkjjE6vKrM78PzD+4gKMh74NjmrMUXl9+slIronvYbTNTE8aDkB1TuYwHPA==/medium.gif",
      "large": "https://assets.airstack.xyz/image/nft/8453/VsImj/jHMngFqJSF7KWaDce4NeMMkjjE6vKrM78PzD+4gKMh74NjmrMUXl9+slIronvYbTNTE8aDkB1TuYwHPA==/large.gif",
      "original": "https://assets.airstack.xyz/image/nft/8453/VsImj/jHMngFqJSF7KWaDce4NeMMkjjE6vKrM78PzD+4gKMh74NjmrMUXl9+slIronvYbTNTE8aDkB1TuYwHPA==/original_image.gif"
    },
    "metaData": {
      "name": "Base Day One 94613",
      "description": "Base Day One commemorates the first day of Base. Watch it evolve as more people come onchain and collectively create our story. All proceeds will support the next generation of builders on Base; this does not confer any other rights. GET ONCHAIN at onchainsummer.xyz and mint to join us.",
      "image": "ipfs://bafybeidkxtd2qck3omiccqhi2iebklr5yfsm33vivmgyfarlh62l462zka",
      "imageData": "",
      "externalUrl": "",
      "animationUrl": "",
      "youtubeUrl": "",
      "backgroundColor": "",
      "attributes": null
    }
  }
]
```

### `getFarcasterUserTokenSentFrom`

Fetch all token transfers sent from a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Input**

| Field       | Type                                    | Required | Description                                                                                                                                                |
| ----------- | --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fid`       | `number`                                | true     | FID of a Farcaster user                                                                                                                                    |
| `chains`    | [`TokenBlockchain[]`](#tokenblockchain) | false    | List of blockchains to fetch user's token transfers. Currently, supports Ethereum, Polygon, Base, and Zora. Defaults to include all supported blockchains. |
| `tokenType` | [`TokenType[]`](#tokentype)             | false    | Fetch only token transfers that transfered tokens within this input. Defaults to include all ERC20/721/1155 tokens.                                        |
| `limit`     | `number`                                | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations).                                     |

**Code Sample**

```ts
import {
  getFarcasterUserTokenSentFrom,
  FarcasterUserTokenSentFromInput,
  FarcasterUserTokenSentFromOutput,
  TokenBlockchain,
  TokenType,
} from "@airstack/frames";

const input: FarcasterUserTokenSentFromInput = {
  fid: 602,
  chains: [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ],
  tokenType: [TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155],
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserTokenSentFromOutput = await getFarcasterUserTokenSentFrom(
  input
);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "blockchain": "base",
    "tokenAddress": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    "amount": 100,
    "amountInWei": "100000000",
    "name": "USD Coin",
    "symbol": "USDC",
    "blockTimestamp": "2023-12-18T15:15:35Z",
    "blockNumber": 8061594,
    "tokenType": "ERC20",
    "txHash": "0xf30a550eece968e1abdcae4de3bdb5f7b84f3d0b2335150149a7398b351567f5",
    "receiver": {
      "addresses": ["0x3a23f943181408eac424116af7b7790c94cb97a5"],
      "socials": null
    }
  }
]
```

### `getFarcasterUserTokenReceivedBy`

Fetch all token transfers received by a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Input**

| Field       | Type                                    | Required | Description                                                                                                                                                |
| ----------- | --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fid`       | `number`                                | true     | FID of a Farcaster user                                                                                                                                    |
| `chains`    | [`TokenBlockchain[]`](#tokenblockchain) | false    | List of blockchains to fetch user's token transfers. Currently, supports Ethereum, Polygon, Base, and Zora. Defaults to include all supported blockchains. |
| `tokenType` | [`TokenType[]`](#tokentype)             | false    | Fetch only token transfers that transfered tokens within this input. Defaults to include all ERC20/721/1155 tokens.                                        |
| `limit`     | `number`                                | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations).                                     |

**Code Sample**

```ts
import {
  getFarcasterUserTokenReceivedBy,
  FarcasterUserTokenReceivedByInput,
  FarcasterUserTokenReceivedByOutput,
  TokenBlockchain,
  TokenType,
} from "@airstack/frames";

const input: FarcasterUserTokenReceivedByInput = {
  fid: 602,
  chains: [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Polygon,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
  ],
  tokenType: [TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155],
  limit: 100,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: FarcasterUserTokenReceivedByOutput = await getFarcasterUserTokenReceivedBy(
  input
);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "blockchain": "zora",
    "tokenAddress": "0xe03ef4b9db1a47464de84fb476f9baf493b3e886",
    "amount": 1,
    "amountInWei": "1",
    "name": "Farcaster OG",
    "symbol": "$FCOG",
    "blockTimestamp": "2023-10-11T21:02:39Z",
    "blockNumber": 5182160,
    "tokenType": "ERC721",
    "txHash": "0x116d7d7d2f6e8adb7b6991348ff1869742dae538f0b68f36624ed2496bc2091e",
    "sender": {
      "addresses": ["0x3a23f943181408eac424116af7b7790c94cb97a5"],
      "socials": null
    },
    "metaData": {
      "name": "Farcaster OG 43",
      "description": "Celebrating Farcaster at permissionless.",
      "image": "ipfs://bafybeihbx6nx4h2wblf6nlsy6nkotzqynzsrgimgqzwqgw6gf7d27ewfqu",
      "imageData": "",
      "externalUrl": "",
      "animationUrl": "",
      "youtubeUrl": "",
      "backgroundColor": "",
      "attributes": null
    },
    "image": {
      "extraSmall": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/extra_small.png",
      "small": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/small.png",
      "medium": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/medium.png",
      "large": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/large.png",
      "original": "https://assets.airstack.xyz/image/nft/7777777/PtYr9f5cHxXadiklS+Xzp805o/lFKCmd1jvpLmU58tO5UgOEdm56cjqIt1Gf/UK052NE4yYf2xmpwwrzjcDl+w==/original_image.png"
    },
    "tokenId": "110"
  }
]
```

### `searchFarcasterUsers`

Search Farcaster users that contain a given string input, e.g. all Farcaster users that contain "a" in their profile name.

**Input**

| Field         | Type     | Required | Description                                                                                                                   |
| ------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `profileName` | `string` | true     | string to match with the profile name. Only profile name that contains this inputted string will be returned in the response. |
| `limit`       | `number` | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations).        |

**Code Sample**

```ts
import {
  searchFarcasteUsers,
  SearchFarcasterUsersInput,
  SearchFarcastersOutput,
} from "@airstack/frames";

const input: SearchFarcasterUsersInput = {
  profileName: "a",
  limit: 10,
};
const {
  data,
  error,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
}: SearchFarcastersOutput = await searchFarcasterUsers(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "profileName": "zachterrell",
    "fnames": ["zachterrell.eth", "zachterrell"],
    "userAssociatedAddresses": [
      "0xbce5a0d16dc2031dc53da79c34ddb366e76dc482",
      "0x5a492d1e15f2ae4b418e424ba9a1d112d6e9706a"
    ],
    "followerCount": 112210,
    "followingCount": 430,
    "fid": "457",
    "profileImage": {
      "extraSmall": "https://assets.airstack.xyz/image/social/u/+rRF4VjBM2b96BzHIZBcRKdFQ3MzIbCkEp6TV3KlQ=/extra_small.jpg",
      "small": "https://assets.airstack.xyz/image/social/u/+rRF4VjBM2b96BzHIZBcRKdFQ3MzIbCkEp6TV3KlQ=/small.jpg",
      "medium": "https://assets.airstack.xyz/image/social/u/+rRF4VjBM2b96BzHIZBcRKdFQ3MzIbCkEp6TV3KlQ=/medium.jpg",
      "large": "https://assets.airstack.xyz/image/social/u/+rRF4VjBM2b96BzHIZBcRKdFQ3MzIbCkEp6TV3KlQ=/large.jpg",
      "original": "https://assets.airstack.xyz/image/social/u/+rRF4VjBM2b96BzHIZBcRKdFQ3MzIbCkEp6TV3KlQ=/original_image.jpg"
    }
  }
]
```

### `checkPoapAttendedByFarcasterUser`

Check If a Farcaster user of a given FID has attended a list of POAP events.

**Input**

| Field     | Type       | Required | Description                                                         |
| --------- | ---------- | -------- | ------------------------------------------------------------------- |
| `fid`     | `string`   | true     | FID of a Farcaster user.                                            |
| `eventId` | `number[]` | true     | List of POAP event IDs to check if the Farcaster user has attended. |

**Code Sample**

```ts
import {
  checkPoapAttendedByFarcasterUser,
  CheckPoapAttendedByFarcasterUserInput,
  CheckPoapAttendedByFarcasterUserOutput,
} from "@airstack/frames";

const input: CheckPoapAttendedByFarcasterUserInput = {
  fid: 15971,
  eventId: [160005, 159993, 13242],
};
const { data, error }: CheckPoapAttendedByFarcasterUserOutput =
  await checkPoapAttendedByFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  { "eventId": 160005, "isAttended": true },
  { "eventId": 159993, "isAttended": true },
  { "eventId": 13242, "isAttended": false }
]
```

### `checkTokenHoldByFarcasterUser`

Check If a Farcaster user of a given FID holds a list of ERC20/721/1155 tokens across Ethereum, Polygon, Base, and Zora.

| Field   | Type                                                 | Required | Description                                                     |
| ------- | ---------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `fid`   | `string`                                             | true     | FID of a Farcaster user.                                        |
| `token` | `{ chain: TokenBlockchain; tokenAddress: string }[]` | true     | List of tokens to check if the Farcaster user hold any of them. |

**Code Sample**

```ts
import {
  checkTokenHoldByFarcasterUser,
  CheckTokenHoldByFarcasterUserInput,
  CheckTokenHoldByFarcasterUserOutput,
  TokenBlockchain,
} from "@airstack/frames";

const input: CheckTokenHoldByFarcasterUserInput = {
  fid: 15971,
  token: [
    {
      chain: TokenBlockchain.Base,
      tokenAddress: "0x4c17ff12d9a925a0dec822a8cbf06f46c6268553",
    },
    {
      chain: TokenBlockchain.Ethereum,
      tokenAddress: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    },
    {
      chain: TokenBlockchain.Zora,
      tokenAddress: "0xa15bb830acd9ab46164e6840e3ef2dbbf9c5e2b3",
    },
  ],
};
const { data, error }: CheckTokenHoldByFarcasterUserOutput =
  await checkTokenHoldByFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "chain": "base",
    "tokenAddress": "0x4c17ff12d9a925a0dec822a8cbf06f46c6268553",
    "isHold": false
  },
  {
    "chain": "ethereum",
    "tokenAddress": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    "isHold": true
  },
  {
    "chain": "zora",
    "tokenAddress": "0xa15bb830acd9ab46164e6840e3ef2dbbf9c5e2b3",
    "isHold": true
  }
]
```

### `checkTokenMintedByFarcasterUser`

Check If a Farcaster user of a given FID minted a list of ERC20/721/1155 tokens across Ethereum, Polygon, Base, and Zora.

| Field   | Type                                                 | Required | Description                                                       |
| ------- | ---------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `fid`   | `string`                                             | true     | FID of a Farcaster user.                                          |
| `token` | `{ chain: TokenBlockchain; tokenAddress: string }[]` | true     | List of tokens to check if the Farcaster user minted any of them. |

**Code Sample**

```ts
import {
  checkTokenMintedByFarcasterUser,
  CheckTokenMintedByFarcasterUserInput,
  CheckTokenMintedByFarcasterUserOutput,
  TokenBlockchain,
} from "@airstack/frames";

const input: CheckTokenMintedByFarcasterUserInput = {
  fid: 15971,
  token: [
    {
      chain: TokenBlockchain.Base,
      tokenAddress: "0x57965af45c3b33571aa5419cc5e9012d8dcab181",
    },
    {
      chain: TokenBlockchain.Ethereum,
      tokenAddress: "0xad08067c7d3d3dbc14a9df8d671ff2565fc5a1ae",
    },
    {
      chain: TokenBlockchain.Zora,
      tokenAddress: "0xa15bb830acd9ab46164e6840e3ef2dbbf9c5e2b3",
    },
  ],
};
const { data, error }: CheckTokenMintedByFarcasterUserOutput =
  await checkTokenMintedByFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "chain": "base",
    "tokenAddress": "0x57965af45c3b33571aa5419cc5e9012d8dcab181",
    "isMinted": true
  },
  {
    "chain": "ethereum",
    "tokenAddress": "0xad08067c7d3d3dbc14a9df8d671ff2565fc5a1ae",
    "isMinted": true
  },
  {
    "chain": "zora",
    "tokenAddress": "0xa15bb830acd9ab46164e6840e3ef2dbbf9c5e2b3",
    "isMinted": false
  }
]
```

### `checkIsFollowingFarcasterUser`

Check If a Farcaster user of a given FID is following an array of Farcaster users with certain FIDs.

| Field         | Type       | Required | Description                                                                                              |
| ------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `fid`         | `string`   | true     | FID of a Farcaster user.                                                                                 |
| `isFollowing` | `number[]` | true     | List of FIDs to check if the given user is following these list of Farcaster user with the provided FIDs |

**Code Sample**

```ts
import {
  checkIsFollowingFarcasterUser,
  CheckIsFollowingFarcasterUserInput,
  CheckIsFollowingFarcasterUserOutput,
} from "@airstack/frames";

const input: CheckIsFollowingFarcasterUserInput = {
  fid: 602,
  isFollowing: [2602, 15971, 13242],
};
const { data, error }: CheckIsFollowingFarcasterUserOutput =
  await checkIsFollowingFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  { "fid": 2602, "isFollowing": true },
  { "fid": 15971, "isFollowing": true },
  { "fid": 13242, "isFollowing": false }
]
```

### `checkIsFollowedByFarcasterUser`

Check If a Farcaster user of a given FID is followed by an array of Farcaster users with certain FIDs.

| Field         | Type       | Required | Description                                                                                                |
| ------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `fid`         | `string`   | true     | FID of a Farcaster user.                                                                                   |
| `isFollowing` | `number[]` | true     | List of FIDs to check if the given user is followed by these list of Farcaster user with the provided FIDs |

**Code Sample**

```ts
import {
  checkIsFollowedByFarcasterUser,
  CheckIsFollowedByFarcasterUserInput,
  CheckIsFollowedByFarcasterUserOutput,
} from "@airstack/frames";

const input: CheckIsFollowedByFarcasterUserInput = {
  fid: 602,
  isFollowedBy: [2602, 15971, 13242],
};
const { data, error }: CheckIsFollowedByFarcasterUserOutput =
  await checkIsFollowedByFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  { "fid": 2602, "isFollowedBy": true },
  { "fid": 15971, "isFollowedBy": true },
  { "fid": 13242, "isFollowedBy": false }
]
```

## Enum

The SDK offered several enums for some defined input values, such as blockchains and token types.

### `TokenBlockchain`

```ts
export enum TokenBlockchain {
  Base = "base",
  Ethereum = "ethereum",
  Polygon = "polygon",
  Zora = "zora",
}
```

### `TokenType`

```ts
export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}
```

### `NFTType`

```ts
export enum NFTType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}
```

## Paginations

Some functions provide pagination fields that you can use to paginate through the results.

| Field         | Type                                                          | Description                                    |
| ------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| `hasNextPage` | `boolean`                                                     | Indicate if there is any next page or not.     |
| `hasPrevPage` | `boolean`                                                     | Indicate if there is any previous page or not. |
| `getNextPage` | `getNextPage: () => Promise<IteratePaginationResponse<Data>>` | Fetch result for the next page, if any.        |
| `getPrevPage` | `getNextPage: () => Promise<IteratePaginationResponse<Data>>` | Fetch result for the previous page, if any.    |

If you are trying to fetch results from the next page, simply add the code below:

```ts
const { hasNextPage, getNextPage }: SearchFarcastersOutput =
  await searchFarcasterUsers(input);

if (hasNextPage) {
  const { data, error } = await getNextPage();
}
```

Similarly, for fetching results from the previous page, simply add the code below:

```ts
const { hasPrevPage, getPrevPage }: SearchFarcastersOutput =
  await searchFarcasterUsers(input);

if (hasPrevPage) {
  const { data, error } = await getPrevPage();
}
```
