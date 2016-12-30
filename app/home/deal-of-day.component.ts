import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";

import {DealOfDayService} from "../services/deal-of-day.service";

@Component({
    selector: 'deal-of-day',
    template: `
    <div #deal class="row"></div>
    `
})

export class DealOfDayComponent {
    itemCount: number = 4;

    @ViewChild('deal', {read: ViewContainerRef}) deal: ViewContainerRef;
    
    constructor(
        private dealOfDayService: DealOfDayService) {
    }

    ngOnInit() {
      this.dealOfDayService.loadDeal(this.itemCount, this.deal);
    }
}