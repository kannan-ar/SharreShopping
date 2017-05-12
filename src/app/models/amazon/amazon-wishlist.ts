import {AmazonProduct} from "./amazon-product";

export class AmazonWishlist {
    constructor(
        public items: AmazonProduct[],
        public ids: string[]
    ) {
    }
}