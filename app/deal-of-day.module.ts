import {NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";

import {DealOfDayComponent} from "./home/deal-of-day.component";
import {FlipkartDealOfDayComponent} from "./views/flipkart/flipkart-deal-of-day.component";
import {ImageHolderComponent} from "./shared/image-holder.component";
import {DealOfDayService} from "./services/deal-of-day.service";
import {FlipkartDealOfDayService} from "./services/flipkart/flipkart-deal-of-day.service"

@NgModule({
    imports: [CommonModule],
    exports: [
        FlipkartDealOfDayComponent,
        DealOfDayComponent
    ],
    entryComponents: [
        DealOfDayComponent,
        FlipkartDealOfDayComponent
    ],
    declarations: [
        DealOfDayComponent,
        FlipkartDealOfDayComponent,
        ImageHolderComponent
    ],
    providers: [
        DealOfDayService,
        {provide: 'DealOfDayServices', useClass: FlipkartDealOfDayService, multi: true}]
})

export class DealOfDayModule {
}

