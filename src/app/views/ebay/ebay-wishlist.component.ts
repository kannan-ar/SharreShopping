﻿import {Component} from "@angular/core";

import {EbayProduct} from "../../models/ebay/ebay-product";
import {WishlistService} from "../../services/wishlist.service";

@Component({
    selector: '[ebaySearch]',
    template: `
    <div class="text-center product-item">
        <div class="title pull-right"><a href="{{item.viewItemURL}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.galleryURL" [url]="item.viewItemURL"></img-holder>
        <div>{{item.currencyId}}&nbsp;{{item.currentPrice}}</div>
        <p class="description"><a href="{{item.viewItemURL}}" target="_blank">{{item.subtitle}}</a></p>
        <div class="text-right"><a (click)="removeWishlist()" role="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div>
    </div>
    `,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class EbayWishlistComponent {
    item: EbayProduct;

    constructor(private wishlistService: WishlistService) {
    }

    removeWishlist(): void {
        this.wishlistService.removeWishlist("eay", this.item.itemId);
    }
}