import {Component} from "@angular/core";

import {AmazonProduct} from "../../models/amazon/amazon-product";
import {WishlistService} from "../../services/wishlist.service";

@Component({
    selector: '[amazonSearch]',
    template: `<div class="text-center product-item">
                    <div class="title pull-right"><a href="{{item.url}}" target="_blank">{{item.title}}</a></div>
                    <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
                    <div>{{item.formattedPrice}}</div>
                    <div class="text-right"><a (click)="addWishlist()" role="button"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></a></div>
               </div>`,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class AmazonProductComponent {
    item: AmazonProduct;

    constructor(private wishlistService: WishlistService) {
    }

    addWishlist(): void {
        this.wishlistService.addWishlist("amazon", this.item.asin);
    }
}