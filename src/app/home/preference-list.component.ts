import {Component, ViewChild, ViewContainerRef, OnInit, Input} from "@angular/core";
import { trigger, state, style, animate, transition } from '@angular/animations';
import Masonry from "masonry-layout";

import {PreferenceService} from "../services/preference.service";
import {SearchService} from "../services/search.service";

@Component({
    selector: 'preference-list',
    template: `
        <div [hidden]="!hasItems" class="row top5">
            <div class="col-sm-12">
                <div class="preference-header clearfix">
                    <h5 class="float-left">Preferences</h5>
                    <h5 class="float-right align-middle">
                        <label class="switch">
                          <input type="checkbox" checked (change)="changeVisibility($event)">
                          <div class="slider"></div>
                        </label>
                    </h5>
                </div>
            </div>
        </div>
        <div class="row top5" [hidden]="!listProgress">
            <div class="col-sm-12">
                <progress></progress>
            </div>
        </div>
        <div [@preferenceState]="visibility" [hidden]="!hasItems" class="row top5 preference-grid" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <ng-template #preferenceContainer></ng-template>
        </div>
    `,
    styles: [`
            .preference-header {
                background-color: #14819C;
                padding: 1px 10px 1px 20px;
            }

            .preference-header h4 {
                margin-top: 5px;
                margin-bottom: 5px;
            }

            .preference-list .col-lg-12 {
                padding-left:0;
                padding-right:0;
            }

            progress {
                width: 100%;
            }
        `],
    animations: [
        trigger('preferenceState', [
            state('true', style({
                overflow: 'hidden',
                maxHeight: '*'
            })),
            state('false', style({
                overflow: 'hidden',
                maxHeight: '0'
            })),
            transition('true => false', animate('0.8s ease-out')),
            transition('false => true', animate('0.8s ease-in'))
        ])
    ]
})

export class PreferenceListComponent {
    private gridSelector: string = '.preference-grid';
    private grid: Masonry;
    private hasItems: boolean;
    private visibility: string;
    private listProgress: boolean;

    @Input() dataChanged: boolean;

    @ViewChild('preferenceContainer', { read: ViewContainerRef }) preferenceContainer: ViewContainerRef;

    constructor(
        private preferenceService: PreferenceService,
        private searchService: SearchService) {
        this.visibility = "true";
        this.hasItems = true;
        this.listProgress = false;
    }

    ngOnInit() {
        var msnry = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        this.grid = msnry;
        this.loadPreferences();
    }

    ngOnChanges() {
        if (this.dataChanged) {
            let hasData: boolean = false;
            this.hasItems = true;
            this.listProgress = true;

            this.loadPreferences();
        }
    }

    private loadPreferences(): void {
        this.preferenceService.getPreferences().subscribe(items => {
            if (items != null && items.length > 0) {
                this.listProgress = true;
                this.preferenceService.loadPreferences(items, this.searchService, this.gridSelector, this.grid, this.preferenceContainer)
                    .subscribe(r => {
                        this.listProgress = false;
                    });
            }
            else {
                this.hasItems = false;
            }
        });
    }

    onScroll() {
        this.preferenceService.loadScrollItems(this.searchService, this.gridSelector, this.grid, this.preferenceContainer);
    }

    changeVisibility(e) {
        this.visibility = e.target.checked ? "true" : "false";
    }
}