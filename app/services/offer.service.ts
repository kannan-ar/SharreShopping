import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Observable";

export interface IOfferService {
    data: Observable<any>;
    
    loadItem(container: ViewContainerRef, items: any[]): void;
    getOffers(itemCount: number): void;
}

@Injectable()
export class OfferService {
    constructor(
        @Inject('OfferServices') private services) {
    }

    loadOffers(itemCount: number, container: ViewContainerRef): void {
        let self = this;
        let countPerService: number = itemCount / this.services.length;

        this.services.forEach(item => {
            let service: IOfferService = item as IOfferService;
            service.getOffers(countPerService);
            service.data.subscribe(items => {
                service.loadItem(container, items);
            });
        });
    }
}