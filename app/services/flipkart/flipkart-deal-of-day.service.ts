import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";

import { FlipkartDealOfDayComponent } from "../../views/flipkart/flipkart-deal-of-day.component";
import { IDealOfDayService } from "../deal-of-day.service";
import {FlipkartDealOfDay} from "../../models/flipkart/dealofday/flipkart-deal-of-day";

@Injectable()
export class FlipkartDealOfDayService implements IDealOfDayService {
    url: string = "/api/dealofday/flipkart";
    deals: FlipkartDealOfDay[];

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    getItem(container: ViewContainerRef): void {
        const flipkartComponent = this.componentFactoryResolver.resolveComponentFactory(FlipkartDealOfDayComponent);
        let a = container.createComponent(flipkartComponent);
        a.instance.text = 'One';
    }

    getDeals(): void {
        var self = this;

        this.http.get(this.url + "/1/10")
            .map(response => response.json())
            .subscribe(items => this.deals = <FlipkartDealOfDay[]>items, error => console.error(error), function(){
                console.log(self.deals);
            });
    }
}
