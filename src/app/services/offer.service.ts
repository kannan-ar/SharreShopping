import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Observable";

import {RowSeparator} from "./row-separator";

export interface IOfferService {
    data: Observable<any>;

    loadItem(container: ViewContainerRef, rowSeparator: RowSeparator, items: any[]): void;
    getOffers(itemCount: number): void;
}

@Injectable()
export class OfferService {
    constructor(
        @Inject('OfferServices') private services, private rowSeparator: RowSeparator) {
        this.rowSeparator.init();
    }

    loadOffers(itemCount: number, container: ViewContainerRef): void {
        let self = this;
        let countPerService: number = itemCount / this.services.length;

        this.services.forEach(item => {
            let service: IOfferService = item as IOfferService;
            service.getOffers(countPerService);
            service.data.subscribe(items => {
                service.loadItem(container, this.rowSeparator, items);
            });
        });
    }
}