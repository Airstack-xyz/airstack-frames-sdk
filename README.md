<div align="center">
  <h1 align="center">Official Airstack Frames SDK</h1>
  <img src="./assets/image.png" alt="code snippets" height=350/>
  <h3>Powered By</h3>
  <a align="center" href="https://airstack.xyz" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/logo-dark.png">
    <img alt="Airstack logo" src="./assets/logo-light.png" width="auto" height="80">
  </picture>
  </a>
</div>

The Airstack Frames SDK empowers developers to seamlessly integrate Farcaster data, including Farcaster user details, Farcaster followers and followings, Farcaster casts, Farcaster channels and more, into their Frames using just a few lines of code.

Additionally, developers can leverage the SDK to create an allow list feature, enabling checks for channel followings, user following status, and more.

Designed with TypeScript, the SDK offers full type support for those building Frames with TypeScript.

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Install](#install)
- [Set Environment Variables](#set-environment-variables)
- [Get Started](#get-started)
- [Functions](#functions)
  - [`validateFramesMessage`](#validateframesmessage)
  - [`generateCaptchaChallenge`](#generatecaptchachallenge)
  - [`validateCaptchaChallenge`](#validatecaptchachallenge)
  - [`getFarcasterUserDetails`](#getfarcasteruserdetails)
  - [`getFarcasterFollowers`](#getfarcasterfollowers)
  - [`getFarcasterFollowings`](#getfarcasterfollowings)
  - [`getFarcasterUserCasts`](#getfarcasterusercasts)
  - [`getFarcasterUserReplies`](#getfarcasteruserreplies)
  - [`getFarcasterUserRecasts`](#getfarcasteruserrecasts)
  - [`getFarcasterUserQuotedRecasts`](#getfarcasteruserquotedrecasts)
  - [`getFarcasterUserLikes`](#getfarcasteruserlikes)
  - [`getFarcasterChannelDetails`](#getfarcasterchanneldetails)
  - [`getFarcasterChannelParticipants`](#getfarcasterchannelparticipants)
  - [`getFarcasterChannelsByParticipant`](#getfarcasterchannelsbyparticipant)
  - [`getFarcasterChannelsByHost`](#getfarcasterchannelsbyhost)
  - [`searchFarcasterChannels`](#searchfarcasterchannels)
  - [`searchFarcasterUsers`](#searchfarcasterusers)
  - [`checkChannelActionsByFarcasterUser`](#checkchannelactionsbyfarcasteruser)
  - [`checkCastReactionsByFarcasterUser`](#checkcastreactionsbyfarcasteruser)
  - [`checkIsFollowingFarcasterUser`](#checkisfollowingfarcasteruser)
  - [`checkIsFollowedByFarcasterUser`](#checkisfollowedbyfarcasteruser)
  - [`createAllowList`](#createallowlist)
  - [`fetchQuery`](#fetchquery)
  - [`fetchQueryWithPagination`](#fetchquerywithpagination)
- [Frog Middlewares](#frog-middlewares)
  - [Farcaster Data Middleware](#farcaster-data-middleware)
  - [Allow List Middleware](#allow-list-middleware)
- [Frames.js Middlewares](#framesjs-middlewares)
  - [Farcaster Data Middleware](#farcaster-data-middleware-1)
  - [Allow List Middleware](#allow-list-middleware-1)
- [Enum](#enum)
  - [`FarcasterReactionCriteria`](#farcasterreactioncriteria)
  - [`FarcasterChannelActionType`](#farcasterchannelactiontype)
  - [`FrameRatio`](#frameratio)
  - [`Features`](#features)
  - [`AllowListCriteriaEnum`](#allowlistcriteriaenum)
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

### `validateFramesMessage`

Validate frames signature packet with Farcaster Hub for your Farcaster Frames

**Input**

| Field  | Type                         | Required | Description             |
| ------ | ---------------------------- | -------- | ----------------------- |
| `body` | `ValidateFramesMessageInput` | true     | Frame Signature Packet. |

**Code Sample**

```ts
import {
  validateFramesMessage,
  ValidateFramesMessageInput,
  ValidateFramesMessageOutput,
} from "@airstack/frames";

const body: ValidateFramesMessageInput = {
  untrustedData: {
    fid: 289309,
    url: "https://sample.frames",
    messageHash: "0xabc",
    timestamp: 1709198011100,
    network: 1,
    buttonIndex: 1,
    castId: {
      fid: 289309,
      hash: "0x0000000000000000000000000000000000000001",
    },
  },
  trustedData: {
    messageBytes:
      "0a61080d109dd41118d0c9c72f20018201510a3168747470733a2f2f70656c6963616e2d666f6e642d64697374696e63746c792e6e67726f6b2d667265652e6170702f6f6710011a1a089dd4111214000000000000000000000000000000000000000112146357261fa893e4be85f78178babaca876f9a1fac18012240d1ed649964018377641a78638f0c19d3c346c1eb1a47e856c0fcd87d3fc72ff98172f939fc18ffdd16af746144279e6debb3f4913f491c69d22f6703e554510a280132200295183aaa021cad737db7ddbc075964496ece1c0bcc1009bdae6d1799c83cd4",
  },
};
const res: ValidateFramesMessageOutput = await validateFramesMessage(body);
```

**Response Sample**

```json
{
  "isValid": true,
  "message": {
    "data": {
      "type": 13,
      "fid": 289309,
      "timestamp": 99738832,
      "network": 1,
      "castAddBody": null,
      "castRemoveBody": null,
      "reactionBody": null,
      "verificationAddAddressBody": null,
      "verificationRemoveBody": null,
      "userDataBody": null,
      "linkBody": null,
      "usernameProofBody": null,
      "frameActionBody": {
        "url": [
          104, 116, 116, 112, 115, 58, 47, 47, 112, 101, 108, 105, 99, 97, 110,
          45, 102, 111, 110, 100, 45, 100, 105, 115, 116, 105, 110, 99, 116,
          108, 121, 46, 110, 103, 114, 111, 107, 45, 102, 114, 101, 101, 46, 97,
          112, 112, 47, 111, 103
        ],
        "buttonIndex": 1,
        "castId": {
          "fid": 289309,
          "hash": [
            211, 29, 52, 211, 77, 52, 211, 77, 52, 211, 77, 52, 211, 77, 52,
            211, 77, 52, 211, 77, 52, 211, 77, 52, 211, 77, 52, 211, 77, 52, 211
          ]
        },
        "inputText": [],
        "state": [],
        "transactionId": []
      }
    },
    "hash": [
      211, 30, 183, 231, 189, 186, 213, 246, 188, 247, 119, 184, 109, 239, 57,
      127, 191, 53, 239, 198, 218, 109, 167, 26, 243, 190, 159, 245, 173, 95,
      105
    ],
    "hashScheme": 1,
    "signature": [
      209, 237, 100, 153, 100, 1, 131, 119, 100, 26, 120, 99, 143, 12, 25, 211,
      195, 70, 193, 235, 26, 71, 232, 86, 192, 252, 216, 125, 63, 199, 47, 249,
      129, 114, 249, 57, 252, 24, 255, 221, 22, 175, 116, 97, 68, 39, 158, 109,
      235, 179, 244, 145, 63, 73, 28, 105, 210, 47, 103, 3, 229, 84, 81, 10
    ],
    "signatureScheme": 1,
    "signer": [
      211, 29, 54, 247, 157, 124, 221, 166, 154, 211, 109, 92, 105, 222, 247,
      237, 214, 251, 117, 214, 220, 211, 190, 125, 235, 142, 61, 233, 231, 30,
      213, 205, 27, 113, 205, 116, 211, 214, 221, 105, 238, 157, 215, 191, 125,
      115, 205, 220, 119
    ],
    "dataBytes": null
  }
}
```

### `generateCaptchaChallenge`

Generate Captcha challenge for Farcaster Frames.

**Input**

| Field                        | Type                        | Required | Description                                                     |
| ---------------------------- | --------------------------- | -------- | --------------------------------------------------------------- |
| `input.options.ratio`        | [`FrameRatio`](#frameratio) | false    | Ratio of the Frame. Defaults to 1.91:1.                         |
| `input.options.includeImage` | `boolean`                   | false    | Whether to include the image in the response. Defaults to true. |

**Code Samples**

```ts
import {
  FrameRatio,
  generateCaptchaChallenge,
  GenerateCaptchaChallengeInput,
  GenerateCaptchaChallengeOutput,
} from "@airstack/frames";

const input: GenerateCaptchaChallengeInput = {
  options: { ratio: FrameRatio._1_91__1, includeImage: true },
};

const res: GenerateCaptchaChallengeOutput = await generateCaptchaChallenge(
  input
);

console.log(res);
```

**Response Samples**

```json
{
  "image": "data:image/jpeg;base64,...",
  "data": { "numA": 24, "numB": 3 },
  "state": {
    "captchaId": "4ba21c21-ff68-4f0f-8a6f-8ee153f8b0e8",
    "valueHash": "ea3fb4d8a0e59f0ab083d8f45257cffd8e760fc0b77194fec2938254180b67ab"
  }
}
```

### `validateCaptchaChallenge`

Validate Captcha challenges that were generated for Farcaster Frames.

**Input**

| Field                        | Type                        | Required | Description                                                                                                                |
| ---------------------------- | --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `input.inputText`            | `string`                    | true     | User input on answer to the captcha for verification.                                                                      |
| `input.state`                | `Object`                    | true     | State of the Frame, containing all the captcha info generated from [`generateCaptchaChallenge`](#generatecaptchachallenge) |
| `input.options.ratio`        | [`FrameRatio`](#frameratio) | false    | Ratio of the Frame. Defaults to 1.91:1.                                                                                    |
| `input.options.includeImage` | `boolean`                   | false    | Whether to include the image in the response. Defaults to true.                                                            |

**Code Samples**

```ts
import {
  FrameRatio,
  validateCaptchaChallenge,
  ValidateCaptchaChallengeInput,
  ValidateCaptchaChallengeOutput,
} from "@airstack/frames";

const input: ValidateCaptchaChallengeInput = {
  inputText,
  state,
};

const res: ValidateCaptchaChallengeOutput = await validateCaptchaChallenge(
  input
);

console.log(res);
```

**Response Samples**

```json
{
  "image": "data:image/jpeg;base64,...",
  "isValidated": true
}
```

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
  "custodyAddress": "0x66bd69c7064d35d146ca78e6b186e57679fba249",
  "connectedAddresses": [
    {
      "address": "0xeaf55242a90bb3289db8184772b0b98562053559",
      "blockchain": "ethereum",
      "chainId": "1",
      "timestamp": "2023-05-31T13:58:49Z"
    }
  ],
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
    "custodyAddress": "0x42fae5a53f0194f6f9587926e206a852c5c726bf",
    "connectedAddresses": [
      {
        "address": "0x42fae5a53f0194f6f9587926e206a852c5c726bf",
        "blockchain": "ethereum",
        "chainId": "1",
        "timestamp": "2023-05-31T13:58:49Z"
      }
    ],
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
    "custodyAddress": "0xda52abca28fadeab9771ba45a2ff346c4db97d7f",
    "connectedAddresses": [
      {
        "address": "0xda52abca28fadeab9771ba45a2ff346c4db97d7f",
        "blockchain": "ethereum",
        "chainId": "1",
        "timestamp": "2023-05-31T13:58:49Z"
      }
    ],
    "userAssociatedAddresses": ["0xda52abca28fadeab9771ba45a2ff346c4db97d7f"],
    "followerCount": 58,
    "followingCount": 0
  }
]
```

### `getFarcasterUserCasts`

Fetch all casts of a Farcaster user. You can also filter it further by fetching only the casts that have embeds, frames, or mentions in the casts.

**Input**

| Field         | Type      | Required | Description                                                                                           |
| ------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`         | `number`  | true     | FID of a Farcaster user                                                                               |
| `hasEmbeds`   | `boolean` | false    | Fetch casts with or without embeds. By default, it will fetch all.                                    |
| `hasFrames`   | `boolean` | false    | Fetch casts with or without frames. By default, it will fetch all.                                    |
| `hasMentions` | `boolean` | false    | Fetch casts with or without mentions. By default, it will fetch all.                                  |
| `limit`       | `number`  | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterUserCasts,
  FarcasterUserCastsInput,
  FarcasterUserCastsOutput,
} from "@airstack/frames";

const input: FarcasterUserCastsInput = {
  fid: 602,
  hasEmbeds: true,
  hasFrames: true,
  hasMentions: true,
  limit: 100,
};
const { data, error }: FarcasterUserCastsOutput = await getFarcasterUserCasts(
  input
);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "castHash": "0xcee805b0b5a762892512d38d30b72dd692772480",
    "castedAtTimestamp": "2024-04-06T06:24:32Z",
    "castUrl": "https://warpcast.com/betashop.eth/0xcee805b0",
    "embeds": [{ "url": "https://share.airstack.xyz/s/gf" }],
    "text": "hihi follow my trade on @base! cc @betashop.eth @airstack",
    "numberOfRecasts": 17,
    "numberOfLikes": 92,
    "numberOfReplies": 14,
    "channel": "airstaack",
    "mentions": [
      { "fid": "12142", "position": 24 },
      { "fid": "602", "position": 29 },
      { "fid": "20909", "position": 30 }
    ],
    "frame": {
      "frameHash": "0xbbd09a3a2c6b96eff53d9ad622b5637374bd2ec7b9c706fd8c908a6bc1a6bdc0",
      "frameUrl": "https://share.airstack.xyz/s/gf"
    }
  }
]
```

### `getFarcasterUserReplies`

Fetch all replies of a Farcaster user in descending timestamp order.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  FarcasterUserRepliesInput,
  FarcasterUserRepliesOutput,
  getFarcasterUserReplies,
} from "@airstack/frames";

const input: FarcasterUserRepliesInput = {
  fid: 1,
  limit: 200,
};
const { data, error }: FarcasterUserRepliesOutput =
  await getFarcasterUserReplies(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "castHash": "0xc63982f4e05a8c055d85631a91472d501e420250",
    "castedAtTimestamp": "2022-12-20T20:29:00Z",
    "castUrl": "https://warpcast.com/farcaster/0xc63982f4",
    "embeds": [],
    "text": "another testy test",
    "numberOfRecasts": 41,
    "numberOfLikes": 131,
    "numberOfReplies": 12,
    "channel": "fc-dev",
    "mentions": [],
    "frame": null
  }
]
```

### `getFarcasterUserRecasts`

Fetch all recasts of a Farcaster user in descending timestamp order.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  FarcasterUserRecastsInput,
  FarcasterUserRecastsOutput,
  getFarcasterUserRecasts,
} from "@airstack/frames";

const input: FarcasterUserRecastsInput = {
  fid: 602,
  limit: 200,
};
const { data, error }: FarcasterUserRecastsOutput =
  await getFarcasterUserRecasts(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "castHash": "0xfb5d70a65059fcee6a8bcf8c35731b449ecf328c",
    "castedAtTimestamp": "2024-03-22T22:00:08Z",
    "castUrl": "https://warpcast.com/betashop.eth/0xfb5d70a6",
    "embeds": [],
    "text": "🚀 launch: Airstack Farcaster Frame Validator 1.0.1\n",
    "numberOfRecasts": 26,
    "numberOfLikes": 75,
    "numberOfReplies": 9,
    "channel": "fc-devs",
    "mentions": [],
    "frame": null
  }
]
```

### `getFarcasterUserQuotedRecasts`

Fetch all quoted recasts of a Farcaster user in descending timestamp order.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  FarcasterUserQuotedRecastsInput,
  FarcasterUserQuotedRecastsOutput,
  getFarcasterUserQuotedRecasts,
} from "@airstack/frames";

const input: FarcasterUserQuotedRecastsInput = {
  fid: 602,
  limit: 200,
};
const { data, error }: FarcasterUserQuotedRecastsOutput =
  await getFarcasterUserQuotedRecasts(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "castHash": "0x5b08dd51fe7ba6c5645dfda9e1c2dffb99ae38fd",
    "castedAtTimestamp": "2024-05-08T15:37:20Z",
    "castUrl": "https://warpcast.com/betashop.eth/0x5b08dd51",
    "embeds": [],
    "text": "build great frames = get free analytics and rewards from Airstack",
    "numberOfRecasts": 6,
    "numberOfLikes": 39,
    "numberOfReplies": 3,
    "channel": "airstack",
    "mentions": [],
    "frame": null
  }
]
```

### `getFarcasterUserLikes`

Fetch all casts liked by a Farcaster user in descending timestamp order.

**Input**

| Field   | Type     | Required | Description                                                                                           |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `fid`   | `number` | true     | FID of a Farcaster user                                                                               |
| `limit` | `number` | false    | Number of results per pages. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  FarcasterUserLikesInput,
  FarcasterUserLikesOutput,
  getFarcasterUserLikes,
} from "@airstack/frames";

const input: FarcasterUserLikesInput = {
  fid: 602,
  limit: 200,
};
const { data, error }: FarcasterUserLikesOutput = await getFarcasterUserLikes(
  input
);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "castHash": "0xf94e79d8b812a3a9a127444515b17d83ee31d09a",
    "castedAtTimestamp": "2024-05-07T20:52:29Z",
    "castUrl": "https://warpcast.com/0xhuangkuan/0xf94e79d8",
    "embeds": [],
    "text": "I like the strategy",
    "numberOfRecasts": 0,
    "numberOfLikes": 1,
    "numberOfReplies": 0,
    "channel": "fc-devs",
    "mentions": [],
    "frame": null
  }
]
```

### `getFarcasterChannelDetails`

Fetch all details of a given Farcaster channel, including name, description, warpcast URL, image URL, creation time, hosts, etc.

**Input**

| Field     | Type     | Required | Description                                                   |
| --------- | -------- | -------- | ------------------------------------------------------------- |
| `channel` | `string` | true     | Farcaster channel ID, e.g. /airstack channel ID is "airstack" |

**Code Sample**

```ts
import {
  getFarcasterChannelDetails,
  FarcasterChannelDetailsInput,
  FarcasterChannelDetailsOutput,
} from "@airstack/frames";

const input: FarcasterChannelDetailsInput = {
  channel: "farcaster",
};
const { data, error }: FarcasterChannelDetailsOutput =
  await getFarcasterChannelDetails(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
{
  "name": "Farcaster",
  "description": "Discussions about Farcaster on Farcaster (meta!)",
  "imageUrl": "https://ipfs.decentralized-content.com/ipfs/bafkreialf5usxssf2eu3e5ct37zzdd553d7lg7oywvdszmrg5p2zpkta7u",
  "createdAtTimestamp": "2023-08-02T22:33:26Z",
  "hosts": [
    {
      "profileName": "v",
      "fnames": ["v", "varunsrin.eth"],
      "fid": "2",
      "profileImage": {
        "extraSmall": "https://assets.airstack.xyz/image/social/XCPJH5EP49qftYc7+wAFfv5jzo3ddBWc9FMEERWezG8=/extra_small.png",
        "small": "https://assets.airstack.xyz/image/social/XCPJH5EP49qftYc7+wAFfv5jzo3ddBWc9FMEERWezG8=/small.png",
        "medium": "https://assets.airstack.xyz/image/social/XCPJH5EP49qftYc7+wAFfv5jzo3ddBWc9FMEERWezG8=/medium.png",
        "large": "https://assets.airstack.xyz/image/social/XCPJH5EP49qftYc7+wAFfv5jzo3ddBWc9FMEERWezG8=/large.png",
        "original": "https://assets.airstack.xyz/image/social/XCPJH5EP49qftYc7+wAFfv5jzo3ddBWc9FMEERWezG8=/original_image.png"
      },
      "userAssociatedAddresses": [
        "0x4114e33eb831858649ea3702e1c9a2db3f626446",
        "0x91031dcfdea024b4d51e775486111d2b2a715871",
        "0x182327170fc284caaa5b1bc3e3878233f529d741",
        "0xf86a7a5b7c703b1fd8d93c500ac4cc75b67477f0"
      ],
      "followerCount": 142424,
      "followingCount": 1127
    }
  ],
  "warpcastUrl": "https://warpcast.com/~/channel/farcaster"
}
```

### `getFarcasterChannelParticipants`

Fetch the list of all participants of a Farcaster channel that has either casted or replied to a cast in the specified channel. You can also use the `lastActionTimestamp` to only fetch users that have last participated during the specified time range.

**Input**

| Field                        | Type                         | Required | Description                                                                                                            |
| ---------------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `channel`                    | `string`                     | true     | Farcaster channel ID, e.g. /airstack channel ID is "airstack"                                                          |
| `actionType`                 | `FarcasterChannelActionType` | false    | Farcaster channel action type, either cast or reply. Defaults to include both type.                                    |
| `lastActionTimestamp.before` | `string`                     | false    | get participants that participate before the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".       |
| `lastActionTimestamp.after`  | `string`                     | false    | get participants that participate after the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".        |
| `limit`                      | `number`                     | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterChannelParticipants,
  FarcasterChannelParticipantsInput,
  FarcasterChannelParticipantsOutput,
  FarcasterChannelActionType,
} from "@airstack/frames";

const input: FarcasterChannelParticipantsInput = {
  channel: "farcaster",
  actionType: [
    FarcasterChannelActionType.Cast,
    FarcasterChannelActionType.Reply,
  ],
  lastActionTimestamp: {
    after: "2024-02-01T00:00:00Z",
    before: "2024-02-28T00:00:00Z",
  },
  limit: 100,
};
const { data, error }: FarcasterChannelParticipantsOutput =
  await getFarcasterChannelParticipants(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "profileName": "dawufi",
    "fnames": ["dawufi"],
    "fid": "6806",
    "profileImage": {
      "extraSmall": "https://assets.airstack.xyz/image/social/94uonfbLlRHZf6qh2LpPC6Fg4DNg3uCUrXkwlo+jA/I=/extra_small.gif",
      "small": "https://assets.airstack.xyz/image/social/94uonfbLlRHZf6qh2LpPC6Fg4DNg3uCUrXkwlo+jA/I=/small.gif",
      "medium": "https://assets.airstack.xyz/image/social/94uonfbLlRHZf6qh2LpPC6Fg4DNg3uCUrXkwlo+jA/I=/medium.gif",
      "large": "https://assets.airstack.xyz/image/social/94uonfbLlRHZf6qh2LpPC6Fg4DNg3uCUrXkwlo+jA/I=/large.gif",
      "original": "https://assets.airstack.xyz/image/social/94uonfbLlRHZf6qh2LpPC6Fg4DNg3uCUrXkwlo+jA/I=/original_image.gif"
    },
    "custodyAddress": "0xe1b1e3bbf4f29bd7253d6fc1e2ddc9cacb0a546a",
    "connectedAddresses": [
      {
        "address": "0x0964256674e42d61f0ff84097e28f65311786ccb",
        "blockchain": "ethereum",
        "chainId": "1",
        "timestamp": "2023-05-31T13:58:49Z"
      }
    ],
    "userAssociatedAddresses": [
      "0xe1b1e3bbf4f29bd7253d6fc1e2ddc9cacb0a546a",
      "0x0964256674e42d61f0ff84097e28f65311786ccb"
    ],
    "followerCount": 14813,
    "followingCount": 1551
  }
]
```

### `getFarcasterChannelsByParticipant`

Fetch all the channels where a Farcaster user has participated in, either by casting or replying to a cast. You can also use the `lastActionTimestamp` to only fetch channels where users have last participated during the specified time range.

**Input**

| Field                        | Type                         | Required | Description                                                                                                            |
| ---------------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `fid`                        | `number`                     | true     | Farcaster channel participant's FID                                                                                    |
| `actionType`                 | `FarcasterChannelActionType` | false    | Farcaster channel action type, either cast or reply. Defaults to include both type.                                    |
| `lastActionTimestamp.before` | `string`                     | false    | get participants that participate before the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".       |
| `lastActionTimestamp.after`  | `string`                     | false    | get participants that participate after the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".        |
| `limit`                      | `number`                     | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterChannelsByParticipant,
  FarcasterChannelActionType,
  FarcasterChannelsByParticipantInput,
  FarcasterChannelsByParticipantOutput,
} from "@airstack/frames";

const input: FarcasterChannelsByParticipantInput = {
  fid: 602,
  actionType: [
    FarcasterChannelActionType.Cast,
    FarcasterChannelActionType.Reply,
  ],
  lastActionTimestamp: {
    after: "2024-02-01T00:00:00Z",
    before: "2024-02-28T00:00:00Z",
  },
  limit: 100,
};
const { data, error }: FarcasterChannelsByParticipantOutput =
  await getFarcasterChannelsByParticipant(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "name": "Based Management",
    "description": "Things worth doing onchain.",
    "imageUrl": "https://i.imgur.com/f0BFBfH.png",
    "createdAtTimestamp": "2023-11-06T19:23:10Z",
    "hosts": [
      {
        "profileName": "lght.eth",
        "fnames": ["0xlght", "lght.eth"],
        "fid": "13121",
        "profileImage": {
          "extraSmall": "https://assets.airstack.xyz/image/social/sxSmw/OjqyuT+uMDpHiSTmqOH5F76hwnx6Q35elGlUkt5nWRe8xrgnJemShOmjeN/extra_small.jpg",
          "small": "https://assets.airstack.xyz/image/social/sxSmw/OjqyuT+uMDpHiSTmqOH5F76hwnx6Q35elGlUkt5nWRe8xrgnJemShOmjeN/small.jpg",
          "medium": "https://assets.airstack.xyz/image/social/sxSmw/OjqyuT+uMDpHiSTmqOH5F76hwnx6Q35elGlUkt5nWRe8xrgnJemShOmjeN/medium.jpg",
          "large": "https://assets.airstack.xyz/image/social/sxSmw/OjqyuT+uMDpHiSTmqOH5F76hwnx6Q35elGlUkt5nWRe8xrgnJemShOmjeN/large.jpg",
          "original": "https://assets.airstack.xyz/image/social/sxSmw/OjqyuT+uMDpHiSTmqOH5F76hwnx6Q35elGlUkt5nWRe8xrgnJemShOmjeN/original_image.jpg"
        },
        "custodyAddress": "0x53667ed77b56d5a94d6df994ab4fd142b7585e68",
        "connectedAddresses": [
          {
            "address": "0x547a2e8d97dc99be21e509fa93c4fa5dd76b8ed0",
            "blockchain": "ethereum",
            "chainId": "1",
            "timestamp": "2023-05-31T13:58:49Z"
          }
        ],
        "userAssociatedAddresses": [
          "0x53667ed77b56d5a94d6df994ab4fd142b7585e68",
          "0x547a2e8d97dc99be21e509fa93c4fa5dd76b8ed0"
        ],
        "followerCount": 16127,
        "followingCount": 345
      }
    ],
    "warpcastUrl": "https://warpcast.com/~/channel/based-management"
  }
]
```

### `getFarcasterChannelsByHost`

Fetch all the channels where a Farcaster user is the host. You can also use the `createdAtTimestamp` to only fetch channels that are created in the specified timestamp.

**Input**

| Field                       | Type     | Required | Description                                                                                                            |
| --------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `fid`                       | `number` | true     | Farcaster channel host's FID                                                                                           |
| `createdAtTimestamp.before` | `string` | false    | get participants that participate before the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".       |
| `createdAtTimestamp.after`  | `string` | false    | get participants that participate after the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".        |
| `limit`                     | `number` | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  getFarcasterChannelsByHost,
  FarcasterChannelsByHostInput,
  FarcasterChannelsByHostOutput,
} from "@airstack/frames";

const input: FarcasterChannelsByHostInput = {
  fid: 602,
  createdAtTimestamp: {
    after: "2024-02-01T00:00:00Z",
    before: "2024-02-28T00:00:00Z",
  },
  limit: 1,
};
const { data, error }: FarcasterChannelsByHostOutput =
  await getFarcasterChannelsByHost(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "name": "airstack",
    "description": "a place for updates about new airstack functionality, user requests, questions, and more!",
    "imageUrl": "https://i.imgur.com/13jY9D4.png",
    "createdAtTimestamp": "2023-12-21T17:30:38Z",
    "warpcastUrl": "https://warpcast.com/~/channel/airstack"
  }
]
```

### `searchFarcasterChannels`

Fetch all the Farcaster channels that contain the specified input words in their names. You can also use the `createdAtTimestamp` to only fetch channels that are created in the specified timestamp.

**Input**

| Field                       | Type     | Required | Description                                                                                                            |
| --------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `channel`                   | `string` | true     | Farcaster channel's name                                                                                               |
| `createdAtTimestamp.before` | `string` | false    | get participants that participate before the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".       |
| `createdAtTimestamp.after`  | `string` | false    | get participants that participate after the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z".        |
| `limit`                     | `number` | false    | Number of results per pages. Defaults to 200. Maximum value is 200. For more results, use [paginations](#paginations). |

**Code Sample**

```ts
import {
  searchFarcasterChannels,
  SearchFarcasterChannelsInput,
  SearchFarcasterChannelsOutput,
} from "@airstack/frames";

const input: SearchFarcasterChannelsInput = {
  channel: "airstack",
  createdAtTimestamp: {
    after: "2024-02-01T00:00:00Z",
    before: "2024-02-28T00:00:00Z",
  },
  limit: 2,
};
const { data, error }: SearchFarcasterChannelsOutput =
  await searchFarcasterChannels(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "name": "airstack",
    "description": "a place for updates about new airstack functionality, user requests, questions, and more!",
    "imageUrl": "https://i.imgur.com/13jY9D4.png",
    "createdAtTimestamp": "2023-12-21T17:30:38Z",
    "hosts": [
      {
        "profileName": "betashop.eth",
        "fnames": ["betashop", "betashop.eth", "jasongoldberg.eth"],
        "fid": "602",
        "profileImage": {
          "extraSmall": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/extra_small.png",
          "small": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/small.png",
          "medium": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/medium.png",
          "large": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/large.png",
          "original": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/original_image.png"
        },
        "custodyAddress": "0x66bd69c7064d35d146ca78e6b186e57679fba249",
        "connectedAddresses": [
          {
            "address": "0xeaf55242a90bb3289db8184772b0b98562053559",
            "blockchain": "ethereum",
            "chainId": "1",
            "timestamp": "2023-05-31T13:58:49Z"
          }
        ],
        "userAssociatedAddresses": [
          "0x66bd69c7064d35d146ca78e6b186e57679fba249",
          "0xeaf55242a90bb3289db8184772b0b98562053559"
        ],
        "followerCount": 59421,
        "followingCount": 2290
      }
    ],
    "warpcastUrl": "https://warpcast.com/~/channel/airstack"
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
    "custodyAddress": "0xbce5a0d16dc2031dc53da79c34ddb366e76dc482",
    "connectedAddresses": [
      {
        "address": "0x5a492d1e15f2ae4b418e424ba9a1d112d6e9706a",
        "blockchain": "ethereum",
        "chainId": "1",
        "timestamp": "2023-05-31T13:58:49Z"
      }
    ],
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

### `checkChannelActionsByFarcasterUser`

Check If a Farcaster user of a given FID has taken any channel action (cast, reply, or follow) on a specific channel.

**Input**

| Field            | Type                                                          | Required | Description                                                                       |
| ---------------- | ------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| `fid`            | `string`                                                      | true     | FID of a Farcaster user.                                                          |
| `channelActions` | [`FarcasterChannelActionType[]`](#farcasterchannelactiontype) | true     | List of channel actions to check if the user has taken any of the listed actions. |
| `channelId`      | `boolean`                                                     | true     | The Farcaster Channel ID.                                                         |

**Code Sample**

```ts
import {
  checkChannelActionsByFarcasterUser,
  CheckChannelActionsByFarcasterUserInput,
  CheckChannelActionsByFarcasterUserOutput,
  FarcasterChannelActionType,
} from "@airstack/frames";

const input: CheckChannelActionsByFarcasterUserInput = {
  fid: 602,
  channelActions: [
    FarcasterChannelActionType.Follow,
    FarcasterChannelActionType.Cast,
    FarcasterChannelActionType.Reply,
  ],
  channelId: "fc-devs",
};
const { data, error }: CheckChannelActionsByFarcasterUserOutput =
  await checkChannelActionsByFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  { "channelAction": "follow", "isActionTaken": true },
  { "channelAction": "cast", "isActionTaken": true },
  { "channelAction": "reply", "isActionTaken": false }
]
```

### `checkCastReactionsByFarcasterUser`

Check If a Farcaster user of a given FID has reacted to a list of casts.

**Input**

| Field        | Type                                                      | Required | Description                                                                     |
| ------------ | --------------------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `fid`        | `string`                                                  | true     | FID of a Farcaster user.                                                        |
| `criteria`   | [`FarcasterReactionCriteria`](#farcasterreactioncriteria) | true     | Either liked, replied, or recasted                                              |
| `castHashes` | `string[]`                                                | true     | List of cast hashes to check if the user has reacted to any of the listed casts |

**Code Sample**

```ts
import {
  checkCastReactionsByFarcasterUser,
  CheckCastReactionsByFarcasterUserInput,
  CheckCastReactionsByFarcasterUserOutput,
  FarcasterReactionCriteria,
} from "@airstack/frames";

const input: CheckCastReactionsByFarcasterUserInput = {
  fid: 602,
  criteria: FarcasterReactionCriteria.Liked,
  castHashes: [
    "0xa9c8d1fe4bd5fb496240526dd82e12d9c4237fdf",
    "0xdde4cf7ea740497d430b59a0f82b405eac10095e",
  ],
};
const { data, error }: CheckCastReactionsByFarcasterUserOutput =
  await checkCastReactionsByFarcasterUser(input);

if (error) throw new Error(error);

console.log(data);
```

**Response Sample**

```json
[
  {
    "castHash": "0xa9c8d1fe4bd5fb496240526dd82e12d9c4237fdf",
    "isReacted": true
  },
  {
    "castHash": "0xdde4cf7ea740497d430b59a0f82b405eac10095e",
    "isReacted": false
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

### `createAllowList`

Check If a Farcaster user is allowed to access a Frame or not.

**Input**

| Field               | Type       | Required | Description                                                                            |
| ------------------- | ---------- | -------- | -------------------------------------------------------------------------------------- |
| `fid`               | `string`   | true     | FID of a Farcaster user to check.                                                      |
| `allowListCriteria` | `object`   | true     | Criteria to check if the user is allowed                                               |
| `isAllowedFunction` | `function` | false    | Custom function to determine if the user is allowed. It will use AND logic by default. |

**Code Sample**

```ts
import {
  createAllowList,
  CreateAllowListInput,
  CreateAllowListOutput,
} from "@airstack/frames";

const allowListCriteria = {
  numberOfFollowersOnFarcaster: 100,
  isFollowingOnFarcaster: [2602],
};
const input: CreateAllowListInput = {
  fid: 602,
  allowListCriteria,
  isAllowedFunction: function (data) {
    console.log(data);
    return true;
  },
};
const { isAllowed, error }: CreateAllowListOutput = await createAllowList(
  input
);

if (error) throw new Error(error);

console.log(isAllowed);
```

**Response Sample**

```json
{
  "isAllowed": true,
  "error": null
}
```

### `fetchQuery`

Call any Airstack GraphQL API queries without any paginations. If you are looking for paginated solution, check [`fetchQueryWithPagination`](#fetchquerywithpagination).

**Input**

| Parameters  | Type     | Required | Description                                                                                       |
| ----------- | -------- | -------- | ------------------------------------------------------------------------------------------------- |
| `query`     | `string` | true     | A string that represents the Airstack GraphQL query to be executed.                               |
| `variables` | `Object` | false    | An object that contains variables used in the query. Only required if the query has any variables |

**Code Samples**

```ts
import { fetchQuery } from "@airstack/frames";

const { data, error } = await fetchQuery(
  /* GraphQL */ `
    query MyQuery($fid: String) {
      Socials(
        input: {
          filter: { userId: { _eq: $fid }, dappName: { _eq: farcaster } }
          blockchain: ethereum
        }
      ) {
        Social {
          profileName
        }
      }
    }
  `,
  {
    fid: "602",
  }
);

if (error) throw new Error(error);

console.log(data);
```

**Response Samples**

```json
{
  "Socials": {
    "Social": [
      {
        "profileName": "betashop.eth"
      }
    ]
  }
}
```

### `fetchQueryWithPagination`

Call any Airstack GraphQL API queries with paginations. If you are looking for non-paginated solution, check [`fetchQueryWithPagination`](#fetchquerywithpagination).

**Input**

| Parameters  | Type     | Required | Description                                                                                       |
| ----------- | -------- | -------- | ------------------------------------------------------------------------------------------------- |
| `query`     | `string` | true     | A string that represents the Airstack GraphQL query to be executed.                               |
| `variables` | `Object` | false    | An object that contains variables used in the query. Only required if the query has any variables |

**Code Samples**

```ts
import { fetchQueryWithPagination } from "@airstack/frames";

const { data, error } = await fetchQueryWithPagination(
  /* GraphQL */ `
    query MyQuery($caster: Identity) {
      FarcasterCasts(
        input: {
          filter: { castedBy: { _eq: $caster } }
          blockchain: ALL
          limit: 200
        }
      ) {
        Cast {
          hash
          text
        }
      }
    }
  `,
  {
    caster: "betashop.eth",
  }
);

if (error) throw new Error(error);

console.log(data);
```

**Response Samples**

```json
{
  "data": {
    "FarcasterCasts": {
      "Cast": [
        {
          "hash": "0xe1e306a22b54e07dddcc2623582d95e5d588c7b6",
          "text": "Hello World!"
        }
      ]
    }
  }
}
```

## Frog Middlewares

### Farcaster Data Middleware

The Farcaster Data middleware injects Farcaster data of the user that interacted with the Frames, including Farcaster user details, followers, followings, casts.

For more details, check out the tutorial on Onchain Data Frog middleware [here](https://docs.airstack.xyz/airstack-docs-and-faqs/frames/airstack-frog-recipes-and-middleware/airstack-frog-middleware).

**Input**

| Parameters | Type                | Required | Description                                                                                                                                                 |
| ---------- | ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`   | `string`            | false    | Configure API key, if no API key has been provided with `init` function.                                                                                    |
| `features` | `Object`            | true     | An object that contains variables used for fetching Farcaster data of the user.                                                                             |
| `env`      | `prod` &#124; `dev` | false    | Configure whether the environment is dev (using `untrustedData`) or prod (validate `trustedData` with `validateFramesMessage` API). By default, it is prod. |

**Code Samples**

```ts
import { farcasterDataFrogMiddleware } from "@airstack/frames";

const farcasterDataMiddleware = farcasterDataFrogMiddleware({
  features: {
    userDetails: {},
  },
});

app.frame("/", farcasterDataMiddleware, async function (c) {
  const { status } = c;
  if (status === "response") console.log(c.var);
  c.res({});
});
```

**Response Samples**

```json
{
  "userDetails": {
    "profileName": "betashop.eth",
    "fnames": ["betashop", "betashop.eth", "jasongoldberg.eth"],
    "profileImage": {
      "extraSmall": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/extra_small.jpg",
      "small": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/small.jpg",
      "medium": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/medium.jpg",
      "large": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/large.jpg",
      "original": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/original_image.jpg"
    },
    "userAssociatedAddresses": [
      "0x66bd69c7064d35d146ca78e6b186e57679fba249",
      "0xeaf55242a90bb3289db8184772b0b98562053559"
    ],
    "followerCount": 65820,
    "followingCount": 2303
  }
}
```

### Allow List Middleware

The Allow List middleware injects allow list logic to check if a user is allowed to access a frame or not, based on various criterias, such as Farcaster follower counts and following certain Farcaster users.

For more details, check out the tutorial on Allow List Frog middleware [here](https://docs.airstack.xyz/airstack-docs-and-faqs/frames/airstack-frog-recipes-and-middleware/airstack-frog-middleware#allow-list-middleware).

**Input**

| Parameters          | Type                | Required | Description                                                                                                                                                 |
| ------------------- | ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`            | `string`            | false    | Configure API key, if no API key has been provided with `init` function.                                                                                    |
| `allowListCriteria` | `object`            | true     | Criteria to check if the user is allowed                                                                                                                    |
| `isAllowedFunction` | `function`          | false    | Custom function to determine if the user is allowed. It will use AND logic by default.                                                                      |
| `env`               | `prod` &#124; `dev` | false    | Configure whether the environment is dev (using `untrustedData`) or prod (validate `trustedData` with `validateFramesMessage` API). By default, it is prod. |

**Code Samples**

```ts
import { allowListFrogMiddleware as allowList } from "@airstack/frames";

const allowListMiddleware = allowList({
  allowListCriteria: {
    numberOfFollowersOnFarcaster: 100,
    isFollowingOnFarcaster: [2602],
  },
});

app.frame("/", allowListMiddleware, async function (c) {
  const { status } = c;
  if (status === "response") console.log(c.var);
  c.res({});
});
```

**Response Samples**

```json
{
  "isAllowed": true
}
```

## Frames.js Middlewares

### Farcaster Data Middleware

The Farcaster Data middleware injects onchain data of the user that interacts with the Frame, including Farcaster user details, followings, followers, Farcaster channels, etc.

For more details, check out the tutorial on Farcaster Data Frames.js middleware [here](https://docs.airstack.xyz/airstack-docs-and-faqs/frames/airstack-framesjs-middleware/onchain-data).

**Input**

| Parameters | Type                    | Required | Description                                                                                                                            |
| ---------- | ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`   | `string`                | false    | Configure API key, if no API key has been provided with `init` function.                                                               |
| `features` | [`Features`](#features) | true     | Select Features to be included in the Frames.js context. For more details, what features are available, check out the `Features` enum. |

**Code Sample**

```ts
import { createFrames, Button } from "frames.js/next";
import {
  farcasterDataFramesjsMiddleware as farcasterData,
  Features,
} from "@airstack/frames";

const frames = createFrames();

const handleRequest = frames(
  async (ctx) => {
    console.log(ctx.userDetails);
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Say GM
        </div>
      ),
      buttons: [],
    };
  },
  {
    middleware: [
      farcasterData({
        apiKey: process.env.AIRSTACK_API_KEY as string,
        features: [Features.USER_DETAILS],
      }),
    ],
  }
);
```

**Response Sample**

```json
{
  "profileName": "betashop.eth",
  "fnames": ["betashop", "betashop.eth", "jasongoldberg.eth"],
  "profileImage": {
    "extraSmall": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/extra_small.jpg",
    "small": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/small.jpg",
    "medium": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/medium.jpg",
    "large": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/large.jpg",
    "original": "https://assets.airstack.xyz/image/social/TQjjhuaajVkwqgzZVvgFQYU1qxNfVHQgSmZjTcXRrzQ=/original_image.jpg"
  },
  "userAssociatedAddresses": [
    "0x66bd69c7064d35d146ca78e6b186e57679fba249",
    "0xeaf55242a90bb3289db8184772b0b98562053559"
  ],
  "followerCount": 65820,
  "followingCount": 2303
}
```

### Allow List Middleware

The Allow List middleware injects allow list logic to check if a user is allowed to access a frame or not, based on various criterias, such as Farcaster follower counts and following certain Farcaster users.

For more details, check out the tutorial on Allow List Frames.js middleware [here](https://docs.airstack.xyz/airstack-docs-and-faqs/frames/airstack-framesjs-middleware/allow-list).

**Input**

| Parameters | Type                                              | Required | Description                                                                                                 |
| ---------- | ------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `apiKey`   | `string`                                          | false    | Configure API key, if no API key has been provided with `init` function.                                    |
| `criteria` | [`AllowListCriteriaEnum`](#allowlistcriteriaenum) | true     | Define the logical criteria that you would like to evaluate the user, based on their existing onchain data. |

**Code Sample**

```ts
import { createFrames, Button } from "frames.js/next";
import {
  AllowListCriteriaEnum as AllowListCriteria,
  allowListFramesjsMiddleware as allowList,
} from "@airstack/frames";

const frames = createFrames();

const handleRequest = frames(
  async (ctx) => {
    console.log(ctx.isAllowed);
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Say GM
        </div>
      ),
      buttons: [],
    };
  },
  {
    middleware: [
      allowList({
        apiKey: process.env.AIRSTACK_API_KEY as string,
        criteria: {
          and: [
            [AllowListCriteria.NUMBER_OF_FARCASTER_FOLLOWERS, { _gte: 30000 }],
            {
              or: [
                [AllowListCriteria.FARCASTER_FOLLOWED_BY, { fid: 1 }],
                [AllowListCriteria.FARCASTER_FOLLOWING, { fid: 2602 }],
              ],
            },
          ],
        },
      }),
    ],
  }
);
```

**Response Sample**

```json
{
  "isAllowed": true
}
```

## Enum

The SDK offered several enums for some defined input values.

### `FarcasterReactionCriteria`

```ts
export enum FarcasterReactionCriteria {
  Liked = "liked",
  Recasted = "recasted",
  Replied = "replied",
}
```

### `FarcasterChannelActionType`

```ts
export enum FarcasterChannelActionType {
  Cast = "cast",
  Follow = "follow",
  Reply = "reply",
}
```

### `FrameRatio`

```ts
export enum FrameRatio {
  /**
   * Set Frame Ratio to 1:1
   */
  _1__1 = "1:1",
  /**
   * Set Frame Ratio to 1.91:1
   */
  _1_91__1 = "1.91:1",
}
```

### `Features`

```ts
export enum Features {
  /**
   * Fetches Farcaster user details, e.g. profile name, fid, number of followers/followings, etc.
   */
  USER_DETAILS = "user_details",
  /**
   * Fetches Farcaster followings of a Farcaster user.
   */
  FARCASTER_FOLLOWINGS = "farcaster_followings",
  /**
   * Fetches Farcaster followers of a Farcaster user.
   */
  FARCASTER_FOLLOWERS = "farcaster_followers",
  /**
   * Fetches Farcaster channels of a Farcaster user.
   */
  FARCASTER_CHANNELS = "farcaster_channels",
  /**
   * Fetches Farcaster casts of a Farcaster user.
   */
  FARCASTER_CASTS = "farcaster_casts",
}
```

### `AllowListCriteriaEnum`

```ts
export enum AllowListCriteriaEnum {
  /**
   * Check if the user has certain number of farcaster followers
   */
  NUMBER_OF_FARCASTER_FOLLOWERS = "number_of_farcaster_followers",
  /**
   * Check if the user is followed by certain users on farcaster
   */
  FARCASTER_FOLLOWED_BY = "farcaster_followed_by",
  /**
   * Check if the user is following certain users on farcaster
   */
  FARCASTER_FOLLOWING = "farcaster_following",
  /**
   * Check if the user is following the caster
   */
  FARCASTER_FOLLOWING_CASTER = "farcaster_following_caster",
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
