import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "angular2-infinite-scroll";

import {OfferService} from "./services/offer.service"
import {FlipkartOfferService} from "./services/flipkart/flipkart-offer.service";
import {OfferComponent} from "./home/offer.component";
import {FlipkartOfferComponent} from "./views/flipkart/flipkart-offer.component";
import {SharedModule} from "./shared.module";
import {RowSeparator} from "./services/row-separator";
import {RowSeparatorComponent} from "./views/row-separator.component";

@NgModule({
    imports: [CommonModule, InfiniteScrollModule, SharedModule],
    exports: [
        OfferComponent,
        FlipkartOfferComponent],
    entryComponents: [
        OfferComponent,
        FlipkartOfferComponent,
        RowSeparatorComponent],
    declarations: [
        OfferComponent,
        FlipkartOfferComponent,
        RowSeparatorComponent],
    providers: [
        RowSeparator,
        OfferService,
        { provide: "OfferServices", useClass: FlipkartOfferService, multi: true }
    ]
})

export class OfferModule {
}