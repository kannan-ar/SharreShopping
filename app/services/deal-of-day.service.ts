import {Injectable, ViewContainerRef, Inject} from "@angular/core";

@Injectable()
export class DealOfDayService {

    constructor(
        @Inject('DealOfDayServices')  private services) {
    }

    getDeal(container: ViewContainerRef): void {
        this.services[0].getDeals(container);
    }
}
