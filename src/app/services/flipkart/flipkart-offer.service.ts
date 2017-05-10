import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import {IOfferService} from "../offer.service";
import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";
import {FlipkartOfferComponent} from "../../views/flipkart/flipkart-offer.component";

@Injectable()
export class FlipkartOfferService implements IOfferService {
    url: string = "/api/offer/flipkart";
    currentIndex: number;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.currentIndex = 0;
    }

    resetIndex(): void {
        this.currentIndex = 0;
    }

    loadItem(container: ViewContainerRef, gridSelector: string, grid: Masonry, items: any[]): void {

        items.forEach(item => {
            const offer: FlipkartOffer = item as FlipkartOffer;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartOfferComponent);
            
            let flipkartComponent: ComponentRef<FlipkartOfferComponent> = container.createComponent(componentFactory);
            flipkartComponent.instance.item = offer;
            grid.appended(flipkartComponent.location.nativeElement);
            imagesLoaded(gridSelector, function () {
                grid.layout();
            });
        });
    }

    getOffers(container: ViewContainerRef, gridSelector: string, grid: Masonry, count: number): void {
        this.http.get(this.url + "/" + this.currentIndex + "/" + count)
            .map(response => response.json())
            .subscribe(items => {
                this.loadItem(container, gridSelector, grid, items);
            });

        this.currentIndex += count;
    }
}