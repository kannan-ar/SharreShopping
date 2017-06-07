import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { FlipkartDealOfDayComponent } from "../../views/flipkart/flipkart-deal-of-day.component";
import { IDealOfDayService } from "../deal-of-day.service";
import { FlipkartDealOfDay } from "../../models/flipkart/flipkart-deal-of-day";

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

    getDeals(container: ViewContainerRef): Subject<boolean> {
        let response: Subject<boolean> = new Subject<boolean>();

        this.http.get(this.url + "/" + this.currentIndex + "/" + this.count)
            .map(response => response.json())
            .subscribe(items => {
                this.loadItem(container, items);
                response.next(items.length > 0);
            });

        return response;
    }

    incrementCount() {
        this.count += 1;
    }

    resetCount(): void {
        this.count = 0;
    }

    resetIndex(): void {
        this.currentIndex = 0;
    }
}
