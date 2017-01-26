import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface ISearchService {
    //loadItem(containers: ViewContainerRef[], count: number, rowCount: number): void;
    loadItem(container: ViewContainerRef): boolean;
    getResults(query: string): Observable<any>;
    saveResults(items: any[]): void;
}

@Injectable()
export class SearchService {

    servicePoints: ISearchService[];

    constructor( @Inject('SearchServices') private services, private rowSeparator: RowSeparator) {
        this.servicePoints = new Array<ISearchService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }

    getItemsArrary(countRequired: number): number[] {
        const serviceCount: number = this.servicePoints.length;
        const array: number[] = [serviceCount];
        const perCount: number = countRequired / serviceCount;
        let mod = countRequired % serviceCount;
        let index = 0;

        while (index < serviceCount) {

            array[index] = perCount;

            if (mod > 0) {
                array[index] = array[index] + 1;
                mod -= 1;
            }

            index += 1;
        }

        return array;
    }

    loadItems(containers: ViewContainerRef[], count: number) {
        this.rowSeparator.init();

        const rowCount: number = this.rowSeparator.rowCount;
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

                if (rowIndex == rowCount) {
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
        /*this.rowSeparator.init();
        const rowCount: number = this.rowSeparator.rowCount;
        const itemsCount: number[] = this.getItemsArrary(50);
        let index: number = 0;

        itemsCount.forEach(count => {
            let service: ISearchService = this.servicePoints[index];
            service.loadItem(containers, count, rowCount);
            index += 1;
        });*/
    }

    removeComponents(containers: ViewContainerRef[]): void {
        containers.forEach(container => {
            container.clear();
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
}