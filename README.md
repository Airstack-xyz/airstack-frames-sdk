# Official Airstack Frames SDK

The Airstack Frames SDK empowers developers to seamlessly integrate onchain data, including token balances, token mints, Farcaster followers and followings, POAPs, and more, into their Frames using just a few lines of code.

Additionally, developers can leverage the SDK to create an allow list feature, enabling checks for token ownership, token mints, following status, and more.

Designed with TypeScript, the SDK offers full type support for those building Frames with TypeScript.

## Table Of Contents

- [Official Airstack Frames SDK](#official-airstack-frames-sdk)
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

```ts
import { init } from "@airstack/frames";

init(process.AIRSTACK_API_KEY);
```

## Functions

### `getFarcasterUserDetails`

Fetch Farcaster user details, including profile name, fnames, profile images (resized), user-associated addresses (connected addresses), follower count and following count.

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

**Code Sample**

```ts
import { getFarcasterUserERC20Mints } from "@airstack/frames";

const { erc20Mints, error, hasNextPage, getNextPage } =
  await getFarcasterUserERC20Mints({
    fid: "2",
    chain: ["ethereum", "polygon", "base", "zora"],
    limit: 100,
  });
console.log(erc20Balances);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "blockchain": "ethereum",
    "tokenAddress": "",
    "amount": 0,
    "amountInWei": 0,
    "txHash": "",
    "blockTimestamp": "",
    "blockNumber": ""
  }
]
```

### `getFarcasterUserNFTMints`

Fetch ERC721 and ERC1155 NFT collections minted by a Farcaster user of a given FID across Ethereum, Polygon, Base, and Zora.

**Code Sample**

```ts
import { getFarcasterUserNFTMints } from "@airstack/frames";

const { nftMints, error, hasNextPage, getNextPage } =
  await getFarcasterUserNFTMints({
    fid: "2",
    chain: ["ethereum", "polygon", "base", "zora"],
    limit: 100,
  });
console.log(nftBalances);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "blockchain": "ethereum",
    "tokenAddress": "",
    "tokenId": "",
    "tokenType": "ERC721",
    "metaData": {},
    "images": {
      "medium": ""
    },
    "amount": 0,
    "amountInWei": 0,
    "txHash": "",
    "blockTimestamp": "",
    "blockNumber": ""
  }
]
```

### `getFarcasterUserTokenSentFrom`

**Code Sample**

```ts
import { getFarcasterUserTokenSentFrom } from "@airstack/frames";

const { tokenSent, error, hasNextPage, getNextPage } =
  await getFarcasterUserTokenSentFrom({
    fid: "2",
    chain: ["ethereum", "polygon", "base", "zora"],
    tokenType: ["ERC20", "ERC721", "ERC1155"],
    limit: 100,
  });
console.log(tokenSent);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "tokenAddress": "",
    "tokenId": "",
    "tokenType": "ERC721",
    "metaData": {},
    "images": {
      "medium": ""
    },
    "amount": 0,
    "amountInWei": 0,
    "receiver": {
      "addresses": [""],
      "domains": [],
      "farcaster": [],
      "xmtp": true
    },
    "txHash": "",
    "blockTimestamp": "",
    "blockNumber": ""
  }
]
```

### `getFarcasterUserTokenReceivedBy`

**Code Sample**

```ts
import { getFarcasterUserTokenReceivedBy } from "@airstack/frames";

const { tokenReceived, error, hasNextPage, getNextPage } =
  await getFarcasterUserTokenReceivedBy({
    fid: "2",
    chain: ["ethereum", "polygon", "base", "zora"],
    tokenType: ["ERC20", "ERC721", "ERC1155"],
    limit: 100,
  });
console.log(tokenReceived);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "tokenAddress": "",
    "tokenId": "",
    "tokenType": "ERC721",
    "metaData": {},
    "images": {
      "medium": ""
    },
    "amount": 0,
    "amountInWei": 0,
    "sender": {
      "addresses": [""],
      "domains": [],
      "farcaster": [],
      "xmtp": true
    },
    "txHash": "",
    "blockTimestamp": "",
    "blockNumber": ""
  }
]
```

### `searchFarcasterUsers`

**Code Sample**

```ts
import { searchFarcasteUsers } from "@airstack/frames";

const { farcasterUsers, error, hasNextPage, getNextPage } =
  await searchFarcasteUsers({
    profileName: "a", // All user that contains 'a' in their profile name
    limit: 100,
  });
console.log(farcasterUsers);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
	// User Search #1
	{
		"profileName": "".
		"fid": "",
		"fnames": [],
		"profileImage": {
			"extraSmall": "",
			"small": "",
			"original": "",
			"medium": "",
			"large": ""
		},
	  "userAssociatedAddresses": [],
		"followerCounts": 0,
		"followingCounts": 0
	},
	// User Search #2 and so on
]
```

### `checkPoapAttendedByFarcasterUser`

**Code Sample**

```ts
import { checkPoapAttendedByFarcasterUser } from "@airstack/frames";

const { isPoapAttended, error } = await checkPoapAttendedByFarcasterUser({
  fid: "2",
  eventId: ["1", "2", "3"],
  limit: 100,
});
console.log(isPoapAttended);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[true, false, true]

// Revised (below)
[
	{
		"eventId": "1",
		"isAttended": true
	},
	{
		"eventId": "2",
		"isAttended": false
	},
	{
		"eventId": "3",
		"isAttended": true
	}
]
```

### `checkTokenHoldByFarcasterUser`

**Code Sample**

```ts
import { checkTokenHoldByFarcasterUser } from "@airstack/frames";

const { isTokenHold, error } = await checkTokenHoldByFarcasterUser({
  fid: "2",
  token: [
    {
      tokenAddress: "0x...",
      chain: "ethereum",
    },
  ],
  limit: 100,
});
console.log(isTokenHold);
if (hasNextPage) await getNextPage();
```

### `checkTokenMintedByFarcasterUser`

**Code Sample**

```ts
import { checkTokenMintedByFarcasterUser } from "@airstack/frames";

const { isTokenMinted, error } = await checkTokenMintedByFarcasterUser({
  fid: "2",
  token: [
    {
      tokenAddress: "0x...",
      chain: "ethereum",
    },
  ],
  limit: 100,
});
console.log(isTokenMinted);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "tokenAdress": "0x...",
    "chain": "ethereum",
    "isMinted": true
  }
]
```

### `checkIsFollowingFarcasterUser`

**Code Sample**

```ts
import { checkIsFollowingFarcasterUser } from "@airstack/frames";

const { isFollowing, error } = await checkIsFollowingFarcasterUser({
  fid: "2",
  isFollowing: [
    // provide fids
    "1",
    "10",
    "100",
  ],
  limit: 100,
});
console.log(isFollowing);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "fid": "1",
    "isFollowing": true
  },
  {
    "fid": "10",
    "isFollowing": false
  },
  {
    "fid": "100",
    "isFollowing": true
  }
]
```

### `checkIsFollowedByFarcasterUser`

**Code Sample**

```ts
import { checkIsFollowedByFarcasterUser } from "@airstack/frames";

const { isFollowedBy, error } = await checkIsFollowedByFarcasterUser({
  fid: "2",
  isFollowedBy: [
    // provide fids
    "1",
    "10",
    "100",
  ],
  limit: 100,
});
console.log(isFollowedBy);
if (hasNextPage) await getNextPage();
```

**Response Sample**

```json
[
  {
    "fid": "1",
    "isFollowed": true
  },
  {
    "fid": "10",
    "isFollowed": false
  },
  {
    "fid": "100",
    "isFollowed": true
  }
]
```
