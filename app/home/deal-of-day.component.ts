import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";

import {DealOfDayService} from "../services/deal-of-day.service";

@Component({
    selector: 'deal-of-day',
    template: `
    <div #deal></div>
    `
})

export class DealOfDayComponent {

    @ViewChild('deal', {read: ViewContainerRef}) deal: ViewContainerRef;
    
    constructor(
        private dealOfDayService: DealOfDayService) {
    }

    ngOnInit() {
      // this.dealOfDayService.loadItem(this.deal);
      this.dealOfDayService.getDeal();
    }
}