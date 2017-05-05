import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";
import Masonry from "masonry-layout";

export interface IOfferService {
    loadItem(container: ViewContainerRef, grid: any, items: any[]): void;
    getOffers(): Observable<any>;
    incrementCount(): void;
    resetCount(): void;
    resetIndex(): void;
}

@Injectable()
export class OfferService {
    constructor(
        @Inject('OfferServices') private services, private rowSeparator: RowSeparator) {
        this.rowSeparator.init();
    }

    loadOffers(container: ViewContainerRef, grid: Masonry): void {
        const serviceCount: number = this.services.length;
        const rowCount: number = 10; //this.rowSeparator.rowCount;
        let index: number = 0;
        let tempCount = rowCount;

        this.services.forEach(item => {
            let service: IOfferService = item as IOfferService;
            service.resetCount();
        });
        
        while (tempCount > 0) {
            this.services[index].incrementCount();
            tempCount -= 1;
            index += 1;

            if (index == serviceCount) {
                index = 0;
            }
        }

        index = 0;
        
        while (index < serviceCount) {
            let service: IOfferService = this.services[index];

            service.getOffers().subscribe(items => {
                service.loadItem(container, grid, items);
            });

            index += 1;
        }
    }

    resetIndex(): void {
        this.services.forEach(item => {
            let service: IOfferService = item as IOfferService;
            service.resetIndex();
        });
    }
}