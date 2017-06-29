import {Component, OnInit} from "@angular/core";

import {AmazonProduct} from "../../models/amazon/amazon-product";
import {FacebookPost} from "../../models/facebook-post";

import {WishlistService} from "../../services/wishlist.service";
import {FacebookService} from "../../services/facebook.service";

@Component({
    selector: '[amazonSearch]',
    template: `<div class="text-center product-item">
                    <div class="title pull-right"><a href="{{item.url}}" target="_blank">{{item.title}}</a></div>
                    <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
                    <div>{{item.formattedPrice}}</div>
                    <div class="clearfix">
                        <div class="pull-left">
                            <img src="/images/amazon-color.png" />
                        </div>
                        <div class="pull-right">
                            <a (click)="addWishlist()" role="button"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></a>
                            <span *ngIf="canPostFacebook"><a (click)="postInFacebook()" role="button"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a></span>
                        </div>
                    </div>
               </div>`,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class AmazonProductComponent {
    item: AmazonProduct;
    canPostFacebook: boolean = false;

    constructor(
        private wishlistService: WishlistService,
        private facebookService: FacebookService) {
    }

    ngOnInit() {
        this.canPostFacebook = this.facebookService.hasFacebookAuth();
    }

    addWishlist(): void {
        this.wishlistService.addWishlist("amazon", this.item.asin);
    }

    postInFacebook() {
        this.facebookService.postProduct(
            new FacebookPost(this.item.url, this.item.description, this.item.imageUrl));
    }
}