import {Component, EventEmitter, Output} from "@angular/core";
import Masonry from "masonry-layout";

import {AmazonProduct} from "../../models/amazon/amazon-product";
import {WishlistService} from "../../services/wishlist.service";

@Component({
    selector: '[amazonWishlist]',
    template: `<div class="text-center product-item">
                    <div class="title float-right"><a href="{{item.url}}" target="_blank">{{item.title}}</a></div>
                    <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
                    <div>{{item.formattedPrice}}</div>
                    <div class="clearfix">
                        <div class="float-left">
                            <img src="/images/amazon-color.png" />
                        </div>
                        <div class="float-right">
                            <a (click)="removeWishlist()" role="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                        </div>
                    </div>
               </div>`,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class AmazonWishlistComponent {
    item: AmazonProduct;
    @Output() onItemRemoved = new EventEmitter();

    constructor(private wishlistService: WishlistService) {
    }

    removeWishlist(): void {
        this.wishlistService.removeWishlist("amazon", this.item.asin);
        this.onItemRemoved.emit();
    }
}