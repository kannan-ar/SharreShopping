import {Component, EventEmitter, Output} from "@angular/core";

import {FlipkartProduct} from "../../models/flipkart/flipkart-product";
import {WishlistService} from "../../services/wishlist.service";

@Component({
    selector: '[flipkartWishlist]',
    template: `
    <div class="text-center product-item">
        <div class="title pull-right"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        <div><s>{{item.sellingCurrency}}&nbsp;{{item.sellingAmount}}</s>&nbsp;{{item.mrpCurrency}}&nbsp;{{item.mrpAmount}}</div>
        <div>You saved {{item.discountPercentage}}%</div>
        <div class="clearfix">
            <div class="pull-left">
                <img src="/images/flipkart-color.png" />
            </div>
            <div class="pull-right">
                <a (click)="removeWishlist()" role="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
            </div>
        </div>
    </div>
    `,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class FlipkartWishlistComponent {
    item: FlipkartProduct;
    @Output() onItemRemoved = new EventEmitter();

    constructor(private wishlistService: WishlistService) {
    }

    removeWishlist(): void {
        this.wishlistService.removeWishlist("flipkart", this.item.productId);
        this.onItemRemoved.emit();
    }
}