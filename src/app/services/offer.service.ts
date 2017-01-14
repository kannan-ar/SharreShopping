import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface IOfferService {
    loadItem(container: ViewContainerRef, items: any[]): void;
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

    loadOffers(container: ViewContainerRef): void {
        const serviceCount: number = this.services.length;
        let rowCount: number = this.rowSeparator.rowCount;
        let index: number = 0;
        let arr: Observable<any>[] = [];

        this.services.forEach(item => {
            let service: IOfferService = item as IOfferService;
            service.resetCount();
        });

        while (rowCount > 0) {
            this.services[index].incrementCount();
            rowCount -= 1;
            index += 1;

            if (index == serviceCount) {
                index = 0;
            }
        }
        
        this.services.forEach(item => {
            let service: IOfferService = item as IOfferService;
            arr.push(service.getOffers());
        });

        index = 0;

        Observable.forkJoin(arr).subscribe(results => {
            while (index < serviceCount) {
                this.services[index].loadItem(container, results[index]);
                index += 1;
            }
        },
            (err) => { console.error(err); },
            () => {
                this.rowSeparator.add(container);
            });
    }
}