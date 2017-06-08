﻿import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";
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
                    <h4 class="pull-left">Preferences</h4>
                    <h4 class="pull-right align-middle">
                        <label class="switch">
                          <input type="checkbox" checked (change)="changeVisibility($event)">
                          <div class="slider"></div>
                        </label>
                    </h4>
                </div>
            </div>
        </div>
        <div [@preferenceState]="visibility" [hidden]="!hasItems" class="row top5 offer-list" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <div class="preference-grid">
                <ng-template #container></ng-template>
            </div>
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
        `],
    animations: [
        trigger('preferenceState', [
            state('true', style({
                opacity: 1,
                visibility: 'visible'
            })),
            state('false', style({
                opacity: 0,
                visibility: 'hidden'
            })),
            transition('true => false', animate('100ms ease-in')),
            transition('false => true', animate('100ms ease-out'))
        ])
    ]
})

export class PreferenceListComponent {
    private gridSelector: string = '.preference-grid';
    private grid: Masonry;
    private hasItems: boolean;
    private visibility: string;

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(
        private preferenceService: PreferenceService,
        private searchService: SearchService) {
        this.visibility = "true";
        this.hasItems = true;
    }

    ngOnInit() {
        var msnry = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        this.grid = msnry;
        this.preferenceService.loadPreferences(this.searchService, this.gridSelector, this.grid, this.container);
    }

    onScroll() {
    }

    changeVisibility(e) {
        this.visibility = e.target.checked ? "true" : "false";
    }
}