import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";

import {DealOfDayService} from "../services/deal-of-day.service";

@Component({
    selector: 'deal-of-day',
    template: `
       <div [hidden]="!hasItems" class="row">
            <div class="col-sm-12">
                <div class="deal-of-day-header">
                    <h5>Deal of the day</h5>
                </div>
            </div>
        </div>
        <div class="row top5" [hidden]="!listProgress">
            <div class="col-sm-12">
                <progress></progress>
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
    private listProgress: boolean;
    @ViewChild('deal', { read: ViewContainerRef }) deal: ViewContainerRef;

    constructor(
        private dealOfDayService: DealOfDayService) {
        this.hasItems = false;
        this.listProgress = false;
    }

    ngOnInit() {
        this.dealOfDayService.resetIndex();
        this.listProgress = true;
        this.hasItems = true;

        this.dealOfDayService.loadDeal(this.deal).subscribe((data) => {
            this.listProgress = false;
            this.hasItems = this.hasItems && data;
        }, () => {
            this.listProgress = false;
            this.hasItems = false;
            });
    }
}