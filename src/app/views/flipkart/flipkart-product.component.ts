import {Component, OnInit} from "@angular/core";

import {FlipkartProduct} from "../../models/flipkart/flipkart-product";
import {FacebookPost} from "../../models/facebook-post";

import {WishlistService} from "../../services/wishlist.service";
import {FacebookService} from "../../services/facebook.service";

@Component({
    selector: '[flipkartProduct]',
    template: `
    <div class="text-center product-item">
        <div class="title float-right"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        <div><s>{{item.sellingCurrency}}&nbsp;{{item.sellingAmount}}</s>&nbsp;{{item.mrpCurrency}}&nbsp;{{item.mrpAmount}}</div>
        <div>You saved {{item.discountPercentage}}%</div>
        <div class="clearfix">
            <div class="float-left">
                <img src="/images/flipkart-color.png" />
            </div>
            <div class="float-right">
               <a (click)="addWishlist()" role="button"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></a>
               <span *ngIf="canPostFacebook"><a (click)="postInFacebook()" role="button"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a></span>
            </div>
        </div>
    </div>
    `,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class FlipkartProductComponent {
    item: FlipkartProduct;
    canPostFacebook: boolean = false;

    constructor(
        private wishlistService: WishlistService,
        private facebookService: FacebookService) {
    }

    ngOnInit() {
        this.canPostFacebook = this.facebookService.hasFacebookAuth();
    }

    addWishlist(): void {
        this.wishlistService.addWishlist("flipkart", this.item.productId);
    }

    postInFacebook() {
        this.facebookService.postProduct(
            new FacebookPost(this.item.productUrl, this.item.title, this.item.imageUrl));
    }
}