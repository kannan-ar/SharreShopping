import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, Renderer } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import {IOfferService} from "../offer.service";
import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";
import {FlipkartOfferComponent} from "../../views/flipkart/flipkart-offer.component";
import {RowSeparator} from "../row-separator";

@Injectable()
export class FlipkartOfferService implements IOfferService {
    url: string = "/api/offer/flipkart";
    currentIndex: number;

    data: Observable<any>;
    private observer: Observer<any>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.currentIndex = 0;
        this.data = new Observable(o => this.observer = o);
    }

    loadItem(container: ViewContainerRef, rowSeparator: RowSeparator, renderer: Renderer, items: any[]): void {
        items.forEach(item => {
            const offer: FlipkartOffer = item as FlipkartOffer;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartOfferComponent);
            
            let flipkartComponent = container.createComponent(componentFactory);
            flipkartComponent.instance.item = offer;
            rowSeparator.check(container, renderer);
        });
    }

    getOffers(itemCount: number): void {
        var self = this;
        self.currentIndex += itemCount;
        
        this.http.get(this.url + "/" + self.currentIndex + "/" + itemCount)
            .map(response => response.json())
            .subscribe(items => {
                self.observer.next(items);
            }, error => console.error(error));
    }
}