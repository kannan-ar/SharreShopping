import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Subject} from "rxjs/Subject";
import Masonry from "masonry-layout";

import {SearchService} from "./search.service";
import {Environment} from "../environment";

@Injectable()
export class PreferenceService {
    private itemPreferenceName: string = 'item_preference';
    private blockPreferenceName: string = 'block_preference';

    private getCount(itemCount: number): number {
        let count: number = Math.floor(Environment.getRowCount() / itemCount);

        if (count <= 0) {
            count = 1;
        }

        return count;
    }

    hasPreferences(): boolean {
        return window.localStorage.getItem(this.itemPreferenceName) != null ||
            window.localStorage.getItem(this.blockPreferenceName) != null;
    }

    blockPreferences(): void {
        window.localStorage.setItem(this.blockPreferenceName, "1");
    }

    getPreferences(): string[] {
        return JSON.parse(window.localStorage.getItem(this.itemPreferenceName));
    }

    savePreferences(items: string[]): void {
        if (items.length > 0) {
            window.localStorage.setItem(this.itemPreferenceName, JSON.stringify(items));
        }
    }

    loadPreferences(searchService: SearchService, gridSelector: string, grid: Masonry, container: ViewContainerRef): Subject<boolean> {
        let items: any[] = JSON.parse(window.localStorage.getItem(this.itemPreferenceName));
        let response: Subject<boolean> = new Subject<boolean>();

        if (items != null && items.length > 0) {
            items.forEach(item => {
                searchService.search(item.value, gridSelector, grid, container, this.getCount(items.length)).subscribe(r => {
                    response.next(r);
                });
            });
        }

        return response;
    }

    loadScrollItems(searchService: SearchService, gridSelector: string, grid: Masonry, container: ViewContainerRef) {
        if (searchService.hasData()) {
            searchService.loadScrollItems(gridSelector, grid, container, Environment.getRowCount());
        }
    }
}