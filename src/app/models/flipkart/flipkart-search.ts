export class FlipkartSearch {
    constructor(
        public productId: string,
        public productUrl: string,
        public title: string,
        public imageUrl: string,
        public sellingAmount: number,
        public sellingCurrency: string,
        public mrpAmount: number,
        public mrpCurrency: string,
        public discountPercentage: number,
        public inStock: boolean,
        public isAvailable: boolean
    ) {
    }
}