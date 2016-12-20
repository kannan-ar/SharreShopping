import {Injectable, ViewContainerRef, ComponentFactoryResolver} from "@angular/core";

import {FlipkartDealOfDayService} from "./flipkart/flipkart-deal-of-day.service";
import {FlipkartDealOfDayComponent} from "../views/flipkart/flipkart-deal-of-day.component";

@Injectable()
export class DealOfDayService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private flipkartService: FlipkartDealOfDayService) {
    }

    getDeal(container: ViewContainerRef): void {
         const flipkartComponent = this.componentFactoryResolver.resolveComponentFactory(FlipkartDealOfDayComponent);
        var a = container.createComponent(flipkartComponent);
        a.instance.text = 'One';
    }
}