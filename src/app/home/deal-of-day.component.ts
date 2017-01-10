import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";

import {DealOfDayService} from "../services/deal-of-day.service";

@Component({
    selector: 'deal-of-day',
    template: `
       <div class="row">
            <div class="col-sm-12">
                <div class="deal-of-day-header">
                    <h4>Deal of the day</h4>
                </div>
            </div>
        </div>
        <div class="row top5">
            <template #deal></template>
        </div>
    `,
    styles:[`
        .deal-of-day-header {
            background-color: #14819C;
            padding: 1px 10px 1px 20px;
        }

        .deal-of-day-header h4 {
            margin-top: 5px;
            margin-bottom: 5px;
        }
    `]
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