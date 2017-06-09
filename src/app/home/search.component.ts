import {Component, Output, ViewContainerRef, ViewChild, EventEmitter, OnInit} from "@angular/core";
import { FormControl } from "@angular/forms";
import {Observable} from "rxjs/Rx";
import Masonry from "masonry-layout";

import {SearchService} from "../services/search.service";
import {Environment} from "../environment";

@Component({
    selector: 'search',
    template: `
        <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
            <div class="col-xs-10 col-sm-10 col-md-10">
                <form>
                    <div class="form-group">
                        <input id="search" name="search" [formControl]="search" type="text" class="form-control input-lg" (keypress)="onKeyword($event)" placeholder="Search with any keywords" />
                    </div>
                </form>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
        </div>
        <div [hidden]="!hasItems" class="row" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <div class="search-grid">
                <ng-template #searchContainer></ng-template>
            </div>
        </div>
    `
})

export class SearchComponent {
    @ViewChild('searchContainer', { read: ViewContainerRef }) searchContainer: ViewContainerRef;
    grid: Masonry;
    @Output() onItemsLoad = new EventEmitter<boolean>();
    search = new FormControl();
    hasItems: boolean;
    gridSelector: string = '.search-grid';

    constructor(private searchService: SearchService) {
        this.search.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(term => {
                if (term === "") {
                    this.renderSearchResults(false);
                }
            });
    }

    ngOnInit() {
        this.initGrid();
    }

    initGrid() {
        this.grid = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
    }

    renderSearchResults(hasData: boolean) {
        this.searchService.removeComponents(this.searchContainer);
        this.hasItems = hasData;
        this.onItemsLoad.emit(hasData);

        if (!hasData && this.grid != null) {
            this.initGrid();
        }
    }

    beginSearch(term: string) {
        this.renderSearchResults(true);
        this.searchService.search(term, this.gridSelector, this.grid, this.searchContainer, Environment.getRowCount());
    }

    onKeyword(event) {
        if (event.keyCode == 13) {
            this.beginSearch(event.target.value);
        }
    }

    onScroll() {
        if (this.searchService.hasData()) {
            this.searchService.loadScrollItems(this.gridSelector, this.grid, this.searchContainer, Environment.getRowCount());
        }
    }
}