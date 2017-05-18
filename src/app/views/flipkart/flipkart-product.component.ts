import {Component} from "@angular/core";

import {FlipkartProduct} from "../../models/flipkart/flipkart-product";
import {WishlistService} from "../../services/wishlist.service";
import {FacebookService} from "../../services/facebook.service";

@Component({
    selector: '[flipkartProduct]',
    template: `
    <div class="text-center product-item">
        <div class="title pull-right"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        <div><s>{{item.sellingCurrency}}&nbsp;{{item.sellingAmount}}</s>&nbsp;{{item.mrpCurrency}}&nbsp;{{item.mrpAmount}}</div>
        <div>You saved {{item.discountPercentage}}%</div>
         <div class="text-right">
            <a (click)="addWishlist()" role="button"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></a>
            <a (click)="postInFacebook()" role="button"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a>
        </div>
    </div>
    `,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class FlipkartProductComponent {
    item: FlipkartProduct;

    constructor(
        private wishlistService: WishlistService,
        private facebookService: FacebookService) {
    }

    addWishlist(): void {
        this.wishlistService.addWishlist("flipkart", this.item.productId);
    }

    postInFacebook() {
        //this.facebookService.postProduct(this.item.title);
    }
}