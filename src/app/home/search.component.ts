import {Component, Output, ViewContainerRef, ViewChild, EventEmitter, OnInit} from "@angular/core";
import { FormControl } from "@angular/forms";
import {Observable} from "rxjs/Rx";

import {SearchService} from "../services/search.service";

@Component({
    selector: 'search',
    template: `
        <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
            <div class="col-xs-10 col-sm-10 col-md-10">
                <form>
                    <div class="form-group">
                        <input id="search" name="search" [formControl]="search" type="text" class="form-control input-lg" placeholder="Search with any keywords" />
                    </div>
                </form>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
        </div>
        <div class="row" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <div class="row">
                    <template #row1></template>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs-up">
                <div class="row">
                    <template #row2></template>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs-up">
                <div class="row">
                    <template #row3></template>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 hidden-xs-up hidden-sm-up">
                <div class="row">
                    <template #row4></template>
                </div>
            </div>
            <div class="col-lg-2 hidden-xs-up hidden-sm-up hidden-md-up">
                <div class="row">
                    <template #row5></template>
                </div>
            </div>
            <div class="col-lg-2 hidden-xs-up hidden-sm-up hidden-md-up">
                <div class="row">
                    <template #row6></template>
                </div>
            </div>
        </div>
    `
})

export class SearchComponent {
    @ViewChild('row1', { read: ViewContainerRef }) row1: ViewContainerRef;
    @ViewChild('row2', { read: ViewContainerRef }) row2: ViewContainerRef;
    @ViewChild('row3', { read: ViewContainerRef }) row3: ViewContainerRef;
    @ViewChild('row4', { read: ViewContainerRef }) row4: ViewContainerRef;
    @ViewChild('row5', { read: ViewContainerRef }) row5: ViewContainerRef;
    @ViewChild('row6', { read: ViewContainerRef }) row6: ViewContainerRef;

    containers: ViewContainerRef[];

    @Output() onItemsLoad = new EventEmitter<boolean>();
    search = new FormControl();
    hasItems: boolean;

    initContainers() {
        this.containers = new Array<ViewContainerRef>();

        this.containers.push(this.row1);
        this.containers.push(this.row2);
        this.containers.push(this.row3);
        this.containers.push(this.row4);
        this.containers.push(this.row5);
        this.containers.push(this.row6);
    }

    constructor(private searchService: SearchService) {
        this.search.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => {
                if (term === "") {
                    this.renderSearchResults(false);
                    return Observable.of();
                }
                else {
                    return this.searchService.getResults(term);
                }
            })
            .subscribe(results => {
                this.renderSearchResults(true);
                //this.searchService.loadSearch(this.containers, results);
                this.searchService.saveResults(results);
                this.searchService.loadInitialResults(this.containers);
            });
    }

    ngOnInit() {
        this.initContainers();
    }

    renderSearchResults(hasData: boolean) {
        if (!hasData) {
            this.searchService.removeComponents(this.containers);
        }

        this.onItemsLoad.emit(hasData);
    }

    onScroll() {
    }
}