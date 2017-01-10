import {FlipkartImage} from "./flipkart-image";

export class FlipkartDealOfDay {
    constructor(
        public availability: string,
        public description: string,
        public imageUrls: FlipkartImage[],
        public title: string,
        public url: string
    ) { }
}