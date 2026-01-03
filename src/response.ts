import { EncurtaNetError } from "./error"

export class EncurtaNetResponse {
    constructor(private readonly responseContent: any, private readonly isTextFormat: boolean) {}

    get data() {
        return this.responseContent
    }

    get shortenedUrl(): string {
        if (this.isTextFormat) {
            throw new EncurtaNetError("It is not possible to get this data because you passed 'isTextFormat' as true")
        }
        
        return this.responseContent.shortenedUrl
    }

    get status(): string {
        if (this.isTextFormat) {
            throw new EncurtaNetError("It is not possible to get this data because you passed 'isTextFormat' as true")
        }

        return this.responseContent.status
    }

    get message(): string {
        if (this.isTextFormat) {
            throw new EncurtaNetError("It is not possible to get this data because you passed 'isTextFormat' as true")
        }

        if ("message" in this.responseContent) {
            return this.responseContent.message
        }

        return ""
    }
}