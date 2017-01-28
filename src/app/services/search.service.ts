import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface ISearchService {
    loadItem(container: ViewContainerRef): boolean;
    getResults(query: string): Observable<any>;
    saveResults(items: any[]): void;
    removeData(): void;
    hasData(): boolean;
}

@Injectable()
export class SearchService {

    private servicePoints: ISearchService[];
    private rowCount: number;

    constructor( @Inject('SearchServices') private services, private rowSeparator: RowSeparator) {
        this.servicePoints = new Array<ISearchService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }
    
    loadItems(containers: ViewContainerRef[], count: number) {
        this.rowSeparator.init();

        this.rowCount = this.rowSeparator.rowCount;
        let index: number = 0;
        let rowIndex: number = 0;

        while (index < count) {
            let isAnyLoaded: boolean = false;

            this.servicePoints.forEach(service => {

                let isLoaded = service.loadItem(containers[rowIndex]);
                isAnyLoaded = isAnyLoaded || isLoaded;

                if (isLoaded) {
                    ++rowIndex;
                    ++index;
                }

                if (rowIndex == this.rowCount) {
                    rowIndex = 0;
                }
            });

            if (!isAnyLoaded) {
                break;
            }
        }
    }

    getResults(query: string): Observable<any> {
        let serviceArray: Observable<any>[] = [];
        
        this.servicePoints.forEach(service => {
            serviceArray.push(service.getResults(query));
        });

        return Observable.forkJoin(serviceArray);
    }

    loadInitialResults(containers: ViewContainerRef[]): void {
        this.loadItems(containers, 50);
    }

    loadOnScroll(containers: ViewContainerRef[]): void {
        this.loadItems(containers, this.rowCount);
    }

    removeComponents(containers: ViewContainerRef[]): void {
        containers.forEach(container => {
            container.clear();
        });

        this.servicePoints.forEach(service => {
            service.removeData();
        });
    }

    saveResults(results: any[]): void {
        const serviceCount: number = this.servicePoints.length;
        let index: number = 0;

        while (index < serviceCount) {
            let service: ISearchService = this.servicePoints[index];
            service.saveResults(results[index]);
            index += 1;
        }
    }

    hasData(): boolean {
        let result: boolean = false;

        this.servicePoints.forEach(service => {
            result = result || service.hasData();
        });

        return result;
    }
}