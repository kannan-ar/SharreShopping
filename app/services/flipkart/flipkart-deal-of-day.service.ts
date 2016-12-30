import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import { FlipkartDealOfDayComponent } from "../../views/flipkart/flipkart-deal-of-day.component";
import { IDealOfDayService } from "../deal-of-day.service";
import { FlipkartDealOfDay } from "../../models/flipkart/flipkart-deal-of-day";

@Injectable()
export class FlipkartDealOfDayService implements IDealOfDayService {
    url: string = "/api/dealofday/flipkart";
    currentIndex: number;

    data: Observable<any>;
    private observer: Observer<any>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.currentIndex = 0;
        this.data = new Observable(o => this.observer = o);
    }

    loadItem(container: ViewContainerRef, items: any[]): void {
        items.forEach(item => {
            const deal: FlipkartDealOfDay = item as FlipkartDealOfDay;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartDealOfDayComponent);
            let flipkartComponent = container.createComponent(componentFactory);
            flipkartComponent.instance.item = deal;
        });

    }

    getDeals(itemCount: number): void {
        var self = this;

        this.http.get(this.url + "/" + this.currentIndex + "/" + itemCount)
            .map(response => response.json())
            .subscribe(items => {
                self.currentIndex += itemCount;
                self.observer.next(items);
            }, error => console.error(error));
    }
}
