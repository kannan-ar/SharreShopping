export class EbaySearch {
    constructor(
        public condition: string,
        public galleryURL: string,
        public itemId: string,
        public location: string,
        public paymentMethod: string,
        public categoryName: string,
        public currencyId: string,
        public currentPrice: number,
        public sellingState: string,
        public title: string,
        public subtitle: string,
        public viewItemURL: string
    ) { }
}