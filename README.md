# Official Airstack Frames SDK

The Airstack Frames SDK empowers developers to seamlessly integrate onchain data, including token balances, token mints, Farcaster followers and followings, POAPs, and more, into their Frames using just a few lines of code.

Additionally, developers can leverage the SDK to create an allow list feature, enabling checks for token ownership, token mints, following status, and more.

Designed with TypeScript, the SDK offers full type support for those building Frames with TypeScript.

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
import { getFarcasterUserDetails } from "@airstack/frames";

const { userDetails, error } = await getFarcasterUserDetails({
  fid: "2",
});
console.log(userDetails);
```

#### Response Sample

```json
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
```

# `getFarcasterFollowers`

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
