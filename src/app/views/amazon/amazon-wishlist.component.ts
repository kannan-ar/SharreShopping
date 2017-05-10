import {Component} from "@angular/core";

import {AmazonProduct} from "../../models/amazon/amazon-product";
import {WishlistService} from "../../services/wishlist.service";

@Component({
    selector: '[amazonSearch]',
    template: `<div class="text-center product-item">
                    <div class="title pull-right"><a href="{{item.url}}" target="_blank">{{item.title}}</a></div>
                    <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
                    <div>{{item.formattedPrice}}</div>
                    <div class="text-right"><a (click)="removeWishlist()" role="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div>
               </div>`,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class AmazonWishlistComponent {
    item: AmazonProduct;

    constructor(private wishlistService: WishlistService) {
    }

    removeWishlist(): void {
        this.wishlistService.removeWishlist("amazon", this.item.asin);
    }
}