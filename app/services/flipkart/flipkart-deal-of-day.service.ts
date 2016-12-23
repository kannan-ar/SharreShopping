import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";

import { FlipkartDealOfDayComponent } from "../../views/flipkart/flipkart-deal-of-day.component";
import { IDealOfDayService } from "../deal-of-day.service";

@Injectable()
export class FlipkartDealOfDayService implements IDealOfDayService {
    url: string = "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json";

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
        let headers: Headers = new Headers();

        headers.append("Fk-Affiliate-Id", "sharresho");
        headers.append("Fk-Affiliate-Token", "6b86ac4333934f06ba0d17458382ba99");

        let options = new RequestOptions({ headers: headers });
      
        this.http.get(this.url, options)
            .map(response => response.json())
            .subscribe(items => console.log(items));
    }
}
