import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, Renderer } from "@angular/core";
import { Observable } from "rxjs/Observable";
//import { Observer } from "rxjs/Observer";

import {IOfferService} from "../offer.service";
import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";
import {FlipkartOfferComponent} from "../../views/flipkart/flipkart-offer.component";
import {RowSeparator} from "../row-separator";

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

    loadItem(containers: ViewContainerRef[], items: any[]): void {

        let index = 0;

        items.forEach(item => {
            const offer: FlipkartOffer = item as FlipkartOffer;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartOfferComponent);
            
            let flipkartComponent = containers[index].createComponent(componentFactory);
            flipkartComponent.instance.item = offer;
            
            index += 1;

            if (index == containers.length) {
                index = 0;
            }
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
}