import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";

import { FlipkartDealOfDayComponent } from "../../views/flipkart/flipkart-deal-of-day.component";
import { IDealOfDayService } from "../deal-of-day.service";

@Injectable()
export class FlipkartDealOfDayService implements IDealOfDayService {
    url: string = "/api/dealofday/flipkart";

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
        this.http.get(this.url)
            .map(response => response.json())
            .subscribe(items => console.log(items));
    }
}
