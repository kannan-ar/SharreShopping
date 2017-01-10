import {NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";

import {DealOfDayComponent} from "./home/deal-of-day.component";
import {FlipkartDealOfDayComponent} from "./views/flipkart/flipkart-deal-of-day.component";
import {DealOfDayService} from "./services/deal-of-day.service";
import {FlipkartDealOfDayService} from "./services/flipkart/flipkart-deal-of-day.service";
import {SharedModule} from "./shared.module";

@NgModule({
    imports: [CommonModule, SharedModule],
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
        FlipkartDealOfDayComponent
    ],
    providers: [
        DealOfDayService,
        { provide: 'DealOfDayServices', useClass: FlipkartDealOfDayService, multi: true }]
})

export class DealOfDayModule {
}

