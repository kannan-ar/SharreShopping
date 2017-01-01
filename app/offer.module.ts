import {NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";

import {OfferService} from "./services/offer.service"
import {FlipkartOfferService} from "./services/flipkart/flipkart-offer.service";
import {ImageHolderComponent} from "./shared/image-holder.component";
import {OfferComponent} from "./home/offer.component";
import {FlipkartOfferComponent} from "./views/flipkart/flipkart-offer.component";

@NgModule({
        imports: [CommonModule],
        exports: [
                OfferComponent,
                FlipkartOfferComponent],
        entryComponents: [
                OfferComponent,
                FlipkartOfferComponent],
        declarations: [
                OfferComponent,
                FlipkartOfferComponent,
                ImageHolderComponent],
        providers: [
                OfferService,
                {provide: "OfferServices", useClass: FlipkartOfferService, multi: true}
        ]
})

export class OfferModule {
}