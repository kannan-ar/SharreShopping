import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";
import Masonry from "masonry-layout";

export interface ISearchService {
    search(query: string, gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): Subject<boolean>;
    loadScrollItems(gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void;
    removeData(): void;
    hasData(): boolean;
}

@Injectable()
export class SearchService {

    private servicePoints: ISearchService[];

    constructor( @Inject('SearchServices') private services) {
        this.servicePoints = new Array<ISearchService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }

    loadScrollItems(gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number) {
        this.servicePoints.forEach(service => {
            service.loadScrollItems(gridSelector, grid, container, count);
        });
    }

    search(query: string, gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): Subject<boolean> {
        let response: Subject<boolean> = new Subject<boolean>();

        this.servicePoints.forEach(service => {
            service.search(query, gridSelector, grid, container, count).subscribe(r => {
                response.next(r);
            });
        });

        return response;
    }

    removeComponents(container: ViewContainerRef): void {
        container.clear();

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