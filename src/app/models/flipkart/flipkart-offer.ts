import {FlipkartImage} from "./flipkart-image";

export class FlipkartOffer {
        constructor(
                public availability: string,
                public description: string,
                public imageUrls: FlipkartImage[],
                public title: string,
                public url: string,
                public start: string,
                public end: string,
                public category: string
        ){}
}