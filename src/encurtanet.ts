import axios from "axios"

import { EncurtaNetResponse } from "./response"
import { ShortenParams } from "./interfaces"
import { EncurtaNetError } from "./error"
import { AdsType } from "./enums"

export const baseUrl = "https://encurta.net/api/"

export type ShortenOptions = {
    url: string
    alias?: string
    isTextFormat?: boolean
    adsType?: AdsType
}

export class EncurtaNet {
    constructor(private readonly apiToken: string) {}

    async shorten({
        url,
        alias,
        isTextFormat,
        adsType
    }: ShortenOptions): Promise<EncurtaNetResponse> {

        const params: ShortenParams = {
            api: this.apiToken,
            url: url,
            alias: alias,
        }

        if (isTextFormat) {
            params.format = "text"
        }
            
        params.type = adsType ?? AdsType.InterstitialsAds

        const response = await axios.get(baseUrl, { params })
        const dataResponse = response.data

        if (response.status !== 200) {
            throw new EncurtaNetError(
                `[Request Error] Status code: ${response.status}`)
        }

        if (dataResponse === "" || dataResponse.status === "error") {
            let message = dataResponse.message

            if (Array.isArray(message)) {
                message = message.join("")
            }
            
            throw new EncurtaNetError(message)
        }

        return new EncurtaNetResponse(dataResponse, isTextFormat ?? false)
    }
}
