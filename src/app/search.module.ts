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
import {FlipkartSearchComponent} from "./views/flipkart/flipkart-search.component";

import {EbaySearchService} from "./services/ebay/ebay-search.service";
import {EbaySearchComponent} from "./views/ebay/ebay-search.component";

import {AmazonSearchService} from "./services/amazon/amazon-search.service";
import {AmazonSearchComponent} from "./views/amazon/amazon-search.component";

import {WishlistService} from "./services/wishlist.service";

@NgModule({
    imports: [CommonModule, JsonpModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, SharedModule],
    exports: [SearchComponent, FlipkartSearchComponent, EbaySearchComponent, AmazonSearchComponent],
    entryComponents: [SearchComponent, FlipkartSearchComponent, EbaySearchComponent, AmazonSearchComponent],
    declarations: [SearchComponent, FlipkartSearchComponent, EbaySearchComponent, AmazonSearchComponent],
    providers: [
        RowSeparator,
        SearchService,
        WishlistService,
        { provide: 'SearchServices', useClass: FlipkartSearchService, multi: true },
        { provide: 'SearchServices', useClass: EbaySearchService, multi: true },
        { provide: 'SearchServices', useClass: AmazonSearchService, multi: true }
    ]
})

export class SearchModule {
}