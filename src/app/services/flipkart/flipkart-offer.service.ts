import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {IOfferService} from "../offer.service";
import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";
import {FlipkartOfferComponent} from "../../views/flipkart/flipkart-offer.component";
import {RowSeparator} from "../row-separator";
import Masonry from "masonry-layout";

@Injectable()
export class FlipkartOfferService implements IOfferService {
    url: string = "/api/offer/flipkart";
    currentIndex: number;
    count: number;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.currentIndex = 0;
    }

    loadItem(container: ViewContainerRef, grid: Masonry, items: any[]): void {

        items.forEach(item => {
            const offer: FlipkartOffer = item as FlipkartOffer;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartOfferComponent);
            
            let flipkartComponent: ComponentRef<FlipkartOfferComponent> = container.createComponent(componentFactory);
            flipkartComponent.instance.item = offer;
            grid.appended(flipkartComponent.location.nativeElement);
            grid.layout();
        });

        this.currentIndex += this.count;
    }

    getOffers(): Observable<any> {
        return this.http.get(this.url + "/" + this.currentIndex + "/" + this.count)
            .map(response => response.json());
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