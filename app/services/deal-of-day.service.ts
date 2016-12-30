import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Observable";

export interface IDealOfDayService {
    data: Observable<any>;
    
    loadItem(container: ViewContainerRef, items: any[]): void;
    getDeals(itemCount: number): void;
}

@Injectable()
export class DealOfDayService {
    loadedItemCount: number;

    constructor(
        @Inject('DealOfDayServices') private services) {
    }

    loadDeal(itemCount: number, container: ViewContainerRef): void {
        
        let self = this;
        let countPerService: number = itemCount / this.services.length;

        this.services.forEach(item => {
            let service: IDealOfDayService = item as IDealOfDayService;
            service.getDeals(countPerService);
            service.data.subscribe(items => {
                service.loadItem(container, items);
            });
        });
    }
}

