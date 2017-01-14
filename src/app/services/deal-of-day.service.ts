import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Observable";

import {RowSeparator} from "./row-separator";

export interface IDealOfDayService {
    loadItem(container: ViewContainerRef, items: any[]): void;
    getDeals(): Observable<any>;
    incrementCount(): void;
    resetCount(): void;
}

@Injectable()
export class DealOfDayService {

    constructor(
        @Inject('DealOfDayServices') private services, private rowSeparator: RowSeparator) {
        this.rowSeparator.init();
    }

    loadDeal(container: ViewContainerRef): void {
        const serviceCount: number = this.services.length;
        let rowCount: number = this.rowSeparator.rowCount;
        let index: number = 0;
        let arr: Observable<any>[] = [];

        this.services.forEach(item => {
            let service: IDealOfDayService = item as IDealOfDayService;
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
            let service: IDealOfDayService = item as IDealOfDayService;
            service.getDeals().subscribe(items => {
                service.loadItem(container, items);
            });
        });
    }
}

