import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface IOfferService {
    loadItem(containers: ViewContainerRef[], items: any[]): void;
    getOffers(): Observable<any>;
    incrementCount(): void;
    resetCount(): void;
}

@Injectable()
export class OfferService {
    constructor(
        @Inject('OfferServices') private services, private rowSeparator: RowSeparator) {
        this.rowSeparator.init();
    }

    loadOffers(containers: ViewContainerRef[]): void {
        const serviceCount: number = this.services.length;
        const rowCount: number = this.rowSeparator.rowCount;
        let index: number = 0;
        let arr: Observable<any>[] = [];
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
                service.loadItem(containers, items);
            });

            index += 1;
        }
    }
}