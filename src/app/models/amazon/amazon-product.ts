export class AmazonProduct {
    constructor(
        public asin: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public url: string,
        public formattedPrice: string) {
    }
}