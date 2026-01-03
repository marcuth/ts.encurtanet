# Install

```
npm i encurtanet
```

# Simple use example

```js
import { EncurtaNet, AdsType } from "encurtanet"

(async () => {
    const shortener = new EncurtaNet("YOUR API TOKEN HERE")

    const urlInfo = await shortener.shorten({
        url: "https://marcuth.github.io/", // Your url
        alias: "url-alias", // Alias of the url
        isTextFormat: false, // If response is text format
        adsType: AdsType.NoAds // Ads type
    })

    const shortenedUrl = urlInfo.shortedUrl

    console.log(shortenedUrl)
})()

```