import {Http} from "@angular/http";
import {Injectable, ComponentFactoryResolver, ViewContainerRef} from "@angular/core";

import {FlipkartDealOfDayComponent} from "../../views/flipkart/flipkart-deal-of-day.component";

@Injectable()
export class FlipkartDealOfDayService {

    constructor(
         private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    getDeals(container: ViewContainerRef): void {
        const flipkartComponent = this.componentFactoryResolver.resolveComponentFactory(FlipkartDealOfDayComponent);
        var a = container.createComponent(flipkartComponent);
        a.instance.text = 'One';
    }
}