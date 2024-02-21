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
      - [Code Sample](#code-sample)
      - [Response Sample](#response-sample)
    - [`getFarcasterFollowers`](#getfarcasterfollowers)
      - [Code Sample](#code-sample-1)
      - [Response Sample](#response-sample-1)
    - [`getFarcasterFollowings`](#getfarcasterfollowings)
      - [Code Sample](#code-sample-2)
      - [Response Sample](#response-sample-2)
    - [`getFarcasterUserPoaps`](#getfarcasteruserpoaps)
      - [Code Sample](#code-sample-3)
      - [Response Sample](#response-sample-3)
    - [`getFarcasterUserERC20Balances`](#getfarcasterusererc20balances)
      - [Code Sample](#code-sample-4)
      - [Response Sample](#response-sample-4)
    - [`getFarcasterUserNFTBalances`](#getfarcasterusernftbalances)
      - [Code Sample](#code-sample-5)
      - [Response Sample](#response-sample-5)
    - [`getFarcasterUserERC20Mints`](#getfarcasterusererc20mints)
      - [Code Sample](#code-sample-6)
      - [Response Sample](#response-sample-6)
    - [`getFarcasterUserNFTMints`](#getfarcasterusernftmints)
      - [Code Sample](#code-sample-7)
      - [Response Sample](#response-sample-7)
    - [`getFarcasterUserTokenSentFrom`](#getfarcasterusertokensentfrom)
      - [Code Sample](#code-sample-8)
      - [Response Sample](#response-sample-8)
    - [`getFarcasterUserTokenReceivedBy`](#getfarcasterusertokenreceivedby)
      - [Code Sample](#code-sample-9)
      - [Response Sample](#response-sample-9)
    - [`searchFarcasterUsers`](#searchfarcasterusers)
      - [Code Sample](#code-sample-10)
      - [Response Sample](#response-sample-10)
    - [`checkPoapAttendedByFarcasterUser`](#checkpoapattendedbyfarcasteruser)
      - [Code Sample](#code-sample-11)
      - [Response Sample](#response-sample-11)
    - [`checkTokenHoldByFarcasterUser`](#checktokenholdbyfarcasteruser)
      - [Code Sample](#code-sample-12)
    - [`checkTokenMintedByFarcasterUser`](#checktokenmintedbyfarcasteruser)
      - [Code Sample](#code-sample-13)
      - [Response Sample](#response-sample-12)
    - [`checkIsFollowingFarcasterUser`](#checkisfollowingfarcasteruser)
      - [Code Sample](#code-sample-14)
      - [Response Sample](#response-sample-13)
    - [`checkIsFollowedByFarcasterUser`](#checkisfollowedbyfarcasteruser)
      - [Code Sample](#code-sample-15)
      - [Response Sample](#response-sample-14)

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

```ts
import { getFarcasterFollowers } from "@airstack/frames";

const { followers, error, hasNextPage, getNextPage } =
  await getFarcasterFollowers({
    fid: "2",
    limit: 100,
  });
console.log(followers);
if (hasNextPage) await getNextPage();
```

#### Response Sample

```json
[
  {
    "profileName": "",
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
  }
]
```

### `getFarcasterFollowings`

#### Code Sample

```ts
import { getFarcasterFollowings } from "@airstack/frames";

const { followings, error, hasNextPage, getNextPage } =
  await getFarcasterFollowings({
    fid: "2",
    limit: 100,
  });
console.log(followings);
if (hasNextPage) await getNextPage();
```

#### Response Sample

```json
[
  {
    "profileName": "",
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
  }
]
```

### `getFarcasterUserPoaps`

#### Code Sample

```ts
import { getFarcasterUserPoaps } from "@airstack/frames";

const { poaps, error, hasNextPage, getNextPage } = await getFarcasterUserPoaps({
  fid: "2",
  startDate: "",
  endDate: "",
  limit: 100,
});
console.log(poaps);
if (hasNextPage) await getNextPage();
```

#### Response Sample

```json
[
  {
    "eventName": "",
    "eventId": "",
    "eventUrl": "",
    "city": "",
    "isVirtual": "",
    "startDate": "",
    "endDate": ""
  }
]
```

### `getFarcasterUserERC20Balances`

#### Code Sample

```ts
import { getFarcasterUserERC20Balances } from "@airstack/frames";

const { erc20Balances, error, hasNextPage, getNextPage } =
  await getFarcasterUserERC20Balances({
    fid: "2",
    chain: ["ethereum", "polygon", "base", "zora"],
    limit: 100,
  });
console.log(erc20Balances);
if (hasNextPage) await getNextPage();
```

#### Response Sample

```json
[
  {
    "blockchain": "ethereum",
    "tokenAddress": "",
    "amount": 0,
    "amountInWei": 0,
    "blockTimestamp": "",
    "blockNumber": ""
  }
]
```

### `getFarcasterUserNFTBalances`

#### Code Sample

```ts
import { getFarcasterUserNFTBalances } from "@airstack/frames";

const {
	nftBalances,
	error,
	hasNextPage,
	getNextPage
} = await getFarcasterUserNFTBalances({
	fid: "2",
	chain: ["ethereum", "polygon", "base", "zora"],
	tokenType: ["ERC721", "ERC1155"]
	limit: 100
});
console.log(nftBalances);
if (hasNextPage) await getNextPage();
```

#### Response Sample

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

### `getFarcasterUserERC20Mints`

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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

#### Code Sample

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

#### Response Sample

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
