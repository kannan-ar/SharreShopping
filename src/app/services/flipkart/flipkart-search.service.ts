import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import { Observable } from "rxjs/Observable";
import Masonry from "masonry-layout";

import {ISearchService} from "../search.service";
import {FlipkartProduct} from "../../models/flipkart/flipkart-product";
import {FlipkartProductComponent} from "../../views/flipkart/flipkart-product.component";

@Injectable()
export class FlipkartSearchService implements ISearchService {
    url: string = "/api/search/flipkart?query=";
    currentIndex: number;
    results: FlipkartProduct[];
    private componentFactory: ComponentFactory<FlipkartProductComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartProductComponent);
    }

    loadItem(grid: Masonry, container: ViewContainerRef): void {
        const model: FlipkartProduct = this.results[this.currentIndex++];
        let flipkartComponent = container.createComponent(this.componentFactory);
        flipkartComponent.instance.item = model;

        grid.appended(flipkartComponent.location.nativeElement);
        grid.layout();
    }

    loadScrollItems(grid: Masonry, container: ViewContainerRef, count: number): void {
        this.loadItems(count, grid, container);
    }

    loadItems(count: number, grid: Masonry, container: ViewContainerRef): void {
        let index = 0;

        while (index < count && this.currentIndex < this.results.length) {
            this.loadItem(grid, container);
            ++index;
        }
    }

    search(query: string, grid: Masonry, container: ViewContainerRef, count: number): void {

        this.http.get(this.url + query)
            .map(response => response.json())
            .subscribe(results => {
                this.currentIndex = 0;
                this.results = results;
                this.loadItems(count, grid, container);
            });
    }
   
    removeData(): void {
        this.results = new Array<FlipkartProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}