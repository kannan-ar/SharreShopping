import {Injectable, ViewContainerRef, Inject} from "@angular/core";

export interface IDealOfDayService {
    getItem(container: ViewContainerRef): void;
    getDeals(): void;
}

@Injectable()
export class DealOfDayService {

    constructor(
        @Inject('DealOfDayServices')  private services) {
    }

    getDeal(): void {
         this.services.forEach(item =>{
             let service: IDealOfDayService = item as IDealOfDayService;
             service.getDeals();
         });
    }

    loadItem(container: ViewContainerRef): void {
        let service: IDealOfDayService = this.services[0] as IDealOfDayService;
         service.getItem(container);
    }
}

