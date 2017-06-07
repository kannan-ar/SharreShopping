import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";

import {DealOfDayService} from "../services/deal-of-day.service";

@Component({
    selector: 'deal-of-day',
    template: `
       <div [hidden]="!hasItems" class="row">
            <div class="col-sm-12">
                <div class="deal-of-day-header">
                    <h4>Deal of the day</h4>
                </div>
            </div>
        </div>
        <div [hidden]="!hasItems" class="row top5">
            <ng-template #deal></ng-template>
        </div>
    `,
    styles: [`
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
    private hasItems: boolean;
    @ViewChild('deal', { read: ViewContainerRef }) deal: ViewContainerRef;

    constructor(
        private dealOfDayService: DealOfDayService) {
        this.hasItems = false;
    }

    ngOnInit() {
        this.dealOfDayService.resetIndex();
        this.dealOfDayService.loadDeal(this.deal).subscribe((data) => {
            this.hasItems = this.hasItems || data;
        });
    }
}