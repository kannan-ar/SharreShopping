import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface ISearchService {
    loadItem(containers: ViewContainerRef[], count: number, rowCount: number): void;
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

    getResults(query: string): Observable<any> {
        /*const serviceCount: number = this.servicePoints.length;
        const rowCount: number = this.rowSeparator.rowCount;
        let index: number = 0;
        let tempCount = rowCount;

        this.servicePoints.forEach(service => {
            service.resetCount();
        });

        while (tempCount > 0) {
            this.servicePoints[index].incrementCount();
            tempCount -= 1;
            index += 1;

            if (index == serviceCount) {
                index = 0;
            }
        }
        */

        let serviceArray: Observable<any>[] = [];

        this.servicePoints.forEach(service => {
            serviceArray.push(service.getResults(query));
        });

        return Observable.forkJoin(serviceArray);
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

    loadInitialResults(containers: ViewContainerRef[]): void {
        this.rowSeparator.init();
        const rowCount: number = this.rowSeparator.rowCount;
        const itemsCount: number[] = this.getItemsArrary(50);
        let index: number = 0;

        itemsCount.forEach(count => {
            let service: ISearchService = this.servicePoints[index];
            service.loadItem(containers, count, rowCount);
            index += 1;
        });
        
        /*

        while (index < serviceCount) {
            let service: ISearchService = this.servicePoints[index];
            service.loadItem(containers, results[index]);
            index += 1;
        }*/
    }

    removeComponents(containers: ViewContainerRef[]): void {
        containers.forEach(container => {
           /* const count: number = container.length;
            let index: number = 0;

            while (index < count) {
                container.get(index).destroy();
                index += 1;
            }*/
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