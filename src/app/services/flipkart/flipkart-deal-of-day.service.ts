import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { FlipkartDealOfDayComponent } from "../../views/flipkart/flipkart-deal-of-day.component";
import { IDealOfDayService } from "../deal-of-day.service";
import { FlipkartDealOfDay } from "../../models/flipkart/flipkart-deal-of-day";
import {RowSeparator} from "../row-separator";

@Injectable()
export class FlipkartDealOfDayService implements IDealOfDayService {
    url: string = "/api/dealofday/flipkart";
    currentIndex: number;
    count: number;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.currentIndex = 0;
    }

    loadItem(container: ViewContainerRef, items: any[]): void {
        items.forEach(item => {
            const deal: FlipkartDealOfDay = item as FlipkartDealOfDay;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartDealOfDayComponent);

            let flipkartComponent = container.createComponent(componentFactory);
            flipkartComponent.instance.item = deal;
        });

        this.currentIndex += this.count;
    }

    getDeals(): Observable<any> {
        console.log(this.currentIndex);
        console.log(this.count);
        return this.http.get(this.url + "/" + this.currentIndex + "/" + this.count)
            .map(response => response.json());
    }

    incrementCount() {
        this.count += 1;
    }

    resetCount(): void {
        this.count = 0;
    }
}
