import {Component} from "@angular/core";

import {FlipkartProduct} from "../../models/flipkart/flipkart-product";
import {WishlistService} from "../../services/wishlist.service";

@Component({
    selector: '[flipkartProduct]',
    template: `
    <div class="text-center product-item">
        <div class="title pull-right"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        <div><s>{{item.sellingCurrency}}&nbsp;{{item.sellingAmount}}</s>&nbsp;{{item.mrpCurrency}}&nbsp;{{item.mrpAmount}}</div>
        <div>You saved {{item.discountPercentage}}%</div>
         <div class="text-right"><a (click)="addWishlist()" role="button"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></a></div>
    </div>
    `,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class FlipkartProductComponent {
    item: FlipkartProduct;

    constructor(private wishlistService: WishlistService) {
    }

    addWishlist(): void {
        this.wishlistService.addWishlist("flipkart", this.item.productId);
    }
}