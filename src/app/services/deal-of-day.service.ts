import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Subject} from "rxjs";

import {Environment} from "../environment";

export interface IDealOfDayService {
    getDeals(container: ViewContainerRef): Subject<boolean>;
    incrementCount(): void;
    resetCount(): void;
    resetIndex(): void;
}

@Injectable()
export class DealOfDayService {

    constructor(
        @Inject('DealOfDayServices') private services) {
    }

    loadDeal(container: ViewContainerRef): Subject<boolean> {
        const serviceCount: number = this.services.length;
        let rowCount: number = Environment.getRowCount();
        let index: number = 0;
        let response: Subject<boolean> = new Subject<boolean>();

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
            service.getDeals(container).subscribe((data) => {
                response.next(data);
            });
        });

        return response;
    }

    resetIndex(): void {
        this.services.forEach(item => {
            let service: IDealOfDayService = item as IDealOfDayService;
            service.resetIndex();
        });
    }
}

