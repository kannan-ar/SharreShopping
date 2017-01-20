import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "./shared.module";
import {RowSeparator} from "./services/row-separator";
import {SearchService} from "./services/search.service";
import {SearchComponent} from "./home/search.component";
import {FlipkartSearchService} from "./services/flipkart/flipkart-search.service";
import {FlipkartSearchComponent} from "./views/flipkart/flipkart-search.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InfiniteScrollModule, SharedModule],
    exports: [SearchComponent, FlipkartSearchComponent],
    entryComponents: [SearchComponent, FlipkartSearchComponent],
    declarations: [SearchComponent, FlipkartSearchComponent],
    providers: [
        RowSeparator,
        SearchService,
        { provide: 'SearchServices', useClass: FlipkartSearchService, multi: true }
    ]
})

export class SearchModule {
}