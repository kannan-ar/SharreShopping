import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonpModule, RequestOptions, JSONPBackend} from "@angular/http";

import {SharedModule} from "./shared.module";
import {SearchService} from "./services/search.service";
import {SearchComponent} from "./home/search.component";

import {FlipkartSearchService} from "./services/flipkart/flipkart-search.service";
import {EbaySearchService} from "./services/ebay/ebay-search.service";
import {AmazonSearchService} from "./services/amazon/amazon-search.service";

import {FlipkartWishlistService} from "./services/flipkart/flipkart-wishlist.service";
import {AmazonWishlistService} from "./services/amazon/amazon-wishlist.service";

import {FlipkartProductComponent} from "./views/flipkart/flipkart-product.component";
import {EbayProductComponent} from "./views/ebay/ebay-product.component";
import {AmazonProductComponent} from "./views/amazon/amazon-product.component";

import {FlipkartWishlistComponent} from "./views/flipkart/flipkart-wishlist.component";
import {AmazonWishlistComponent} from "./views/amazon/amazon-wishlist.component";

import {WishlistService} from "./services/wishlist.service";

@NgModule({
    imports: [CommonModule, JsonpModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, SharedModule],
    exports: [SearchComponent, FlipkartProductComponent, EbayProductComponent, AmazonProductComponent,
        FlipkartWishlistComponent, AmazonWishlistComponent],
    entryComponents: [SearchComponent, FlipkartProductComponent, EbayProductComponent, AmazonProductComponent,
        FlipkartWishlistComponent, AmazonWishlistComponent],
    declarations: [SearchComponent, FlipkartProductComponent, EbayProductComponent, AmazonProductComponent,
        FlipkartWishlistComponent, AmazonWishlistComponent],
    providers: [
        SearchService,
        WishlistService,
        { provide: 'SearchServices', useClass: FlipkartSearchService, multi: true },
        { provide: 'SearchServices', useClass: EbaySearchService, multi: true },
        { provide: 'SearchServices', useClass: AmazonSearchService, multi: true },
        { provide: 'WishlistServices', useClass: FlipkartWishlistService, multi: true },
        { provide: 'WishlistServices', useClass: AmazonWishlistService, multi: true }
    ]
})

export class ProductModule {
}