import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import Masonry from "masonry-layout";

export interface ISearchService {
    search(query: string, gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void;
    loadScrollItems(gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void;
    removeData(): void;
    hasData(): boolean;
}

@Injectable()
export class SearchService {

    private servicePoints: ISearchService[];

    constructor(@Inject('SearchServices') private services) {
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

    search(query: string, gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void {
        this.servicePoints.forEach(service => {
            service.search(query, gridSelector, grid, container, count);
        });
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