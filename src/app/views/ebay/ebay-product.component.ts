import {Component, OnInit} from "@angular/core";

import {EbayProduct} from "../../models/ebay/ebay-product";
import {FacebookPost} from "../../models/facebook-post";

import {WishlistService} from "../../services/wishlist.service";
import {FacebookService} from "../../services/facebook.service";

@Component({
    selector: '[ebaySearch]',
    template: `
    <div class="text-center product-item">
        <div class="title float-right"><a href="{{item.viewItemURL}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.galleryURL" [url]="item.viewItemURL"></img-holder>
        <div>{{item.currencyId}}&nbsp;{{item.currentPrice}}</div>
        <p class="description"><a href="{{item.viewItemURL}}" target="_blank">{{item.subtitle}}</a></p>
        <div class="clearfix">
            <div class="float-left">
                <img src="/images/ebay-color.png" />
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

export class EbayProductComponent {
    item: EbayProduct;
    canPostFacebook: boolean = false;

    constructor(
        private wishlistService: WishlistService,
        private facebookService: FacebookService) {
    }

    ngOnInit() {
        this.canPostFacebook = this.facebookService.hasFacebookAuth();
    }

    addWishlist(): void {
        this.wishlistService.addWishlist("ebay", this.item.itemId);
    }

    postInFacebook() {
        this.facebookService.postProduct(
            new FacebookPost(this.item.viewItemURL, this.item.title, this.item.galleryURL));
    }
}