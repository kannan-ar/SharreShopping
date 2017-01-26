import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonpModule} from "@angular/http";

import {SharedModule} from "./shared.module";
import {RowSeparator} from "./services/row-separator";
import {SearchService} from "./services/search.service";
import {SearchComponent} from "./home/search.component";

import {FlipkartSearchService} from "./services/flipkart/flipkart-search.service";
import {FlipkartSearchComponent} from "./views/flipkart/flipkart-search.component";

import {EbaySearchService} from "./services/ebay/ebay-search.service";
import {EbaySearchComponent} from "./views/ebay/ebay-search.component";

@NgModule({
    imports: [CommonModule, JsonpModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, SharedModule],
    exports: [SearchComponent, FlipkartSearchComponent, EbaySearchComponent],
    entryComponents: [SearchComponent, FlipkartSearchComponent, EbaySearchComponent],
    declarations: [SearchComponent, FlipkartSearchComponent, EbaySearchComponent],
    providers: [
        RowSeparator,
        SearchService,
        { provide: 'SearchServices', useClass: FlipkartSearchService, multi: true },
        { provide: 'SearchServices', useClass: EbaySearchService, multi: true }
    ]
})

export class SearchModule {
}