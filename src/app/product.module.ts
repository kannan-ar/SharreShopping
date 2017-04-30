import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonpModule, RequestOptions, JSONPBackend} from "@angular/http";

import {SharedModule} from "./shared.module";
import {RowSeparator} from "./services/row-separator";
import {SearchService} from "./services/search.service";
import {SearchComponent} from "./home/search.component";

import {FlipkartSearchService} from "./services/flipkart/flipkart-search.service";
import {FlipkartProductComponent} from "./views/flipkart/flipkart-product.component";

import {EbaySearchService} from "./services/ebay/ebay-search.service";
import {EbayProductComponent} from "./views/ebay/ebay-product.component";

import {AmazonSearchService} from "./services/amazon/amazon-search.service";
import {AmazonProductComponent} from "./views/amazon/amazon-product.component";

import {WishlistService} from "./services/wishlist.service";

@NgModule({
    imports: [CommonModule, JsonpModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, SharedModule],
    exports: [SearchComponent, FlipkartProductComponent, EbayProductComponent, AmazonProductComponent],
    entryComponents: [SearchComponent, FlipkartProductComponent, EbayProductComponent, AmazonProductComponent],
    declarations: [SearchComponent, FlipkartProductComponent, EbayProductComponent, AmazonProductComponent],
    providers: [
        RowSeparator,
        SearchService,
        WishlistService,
        { provide: 'SearchServices', useClass: FlipkartSearchService, multi: true },
        { provide: 'SearchServices', useClass: EbaySearchService, multi: true },
        { provide: 'SearchServices', useClass: AmazonSearchService, multi: true }
    ]
})

export class ProductModule {
}