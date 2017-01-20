import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface ISearchService {
    loadItem(containers: ViewContainerRef[], items: any[]): void;
    getResults(query: string): Observable<any>;
    incrementCount(): void;
    resetCount(): void;
    resetIndex(): void;
}

@Injectable()
export class SearchService {
    constructor( @Inject('SearchServices') private services, private rowSeparator: RowSeparator) {
    }

    getResults(query: string): Observable<any> {
        const serviceCount: number = this.services.length;
        const rowCount: number = this.rowSeparator.rowCount;
        let index: number = 0;
        let arr: Observable<any>[] = [];
        let tempCount = rowCount;
        let serviceArray: Observable<any>[] = [];

        this.services.forEach(item => {
            let service: ISearchService = item as ISearchService;
            service.resetCount();
        });

        while (tempCount > 0) {
            this.services[index].incrementCount();
            tempCount -= 1;
            index += 1;

            if (index == serviceCount) {
                index = 0;
            }
        }

        this.services.forEach(item => {
            let service: ISearchService = item as ISearchService;
            serviceArray.push(service.getResults(query));
        });

        return Observable.forkJoin(serviceArray);
    }

    loadSearch(containers: ViewContainerRef[], results: any[]): void {

        const serviceCount: number = this.services.length;
        let index: number = 0;

        while (index < serviceCount) {
            let service: ISearchService = this.services[index];
            service.loadItem(containers, results[index]);
            index += 1;
        }
    }
}