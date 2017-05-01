import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Observable} from "rxjs/Rx";

import {RowSeparator} from "./row-separator";

export interface ISearchService {
    search(query: string, rowCount: number, containers: ViewContainerRef[]): void;
    loadScrollItems(containers: ViewContainerRef[]): void;
    removeData(): void;
    hasData(): boolean;
}

@Injectable()
export class SearchService {

    private servicePoints: ISearchService[];

    constructor( @Inject('SearchServices') private services, private rowSeparator: RowSeparator) {
        this.servicePoints = new Array<ISearchService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }
   
    loadScrollItems(containers: ViewContainerRef[]) {
        this.servicePoints.forEach(service => {
            service.loadScrollItems(containers);
        });
    }

    search(query: string, containers: ViewContainerRef[]): void {
        this.rowSeparator.init();

        this.servicePoints.forEach(service => {
            service.search(query, this.rowSeparator.rowCount, containers);
        });
    }
    
    removeComponents(containers: ViewContainerRef[]): void {
        containers.forEach(container => {
            container.clear();
        });

        this.servicePoints.forEach(service => {
            service.removeData();
        });
    }
   
    hasData(): boolean {
        let result: boolean = false;

        this.servicePoints.forEach(service => {
            result = result || service.hasData();
        });

        return result;
    }
}