import { HttpClient } from "@angular/common/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Subject} from "rxjs";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

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
        private httpClient: HttpClient,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartProductComponent);
    }

    loadItem(gridSelector: string, grid: Masonry, container: ViewContainerRef): void {
        const model: FlipkartProduct = this.results[this.currentIndex++];
        let flipkartComponent = container.createComponent(this.componentFactory);
        flipkartComponent.instance.item = model;
        
        grid.appended(flipkartComponent.location.nativeElement);
        imagesLoaded(gridSelector, function () {
            grid.layout();
        });
    }

    loadScrollItems(gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void {
        this.loadItems(gridSelector, count, grid, container);
    }

    loadItems(gridSelector: string, count: number, grid: Masonry, container: ViewContainerRef): void {
        let index = 0;

        while (index < count && this.results != null && this.currentIndex < this.results.length) {
            this.loadItem(gridSelector, grid, container);
            ++index;
        }
    }

    search(query: string, gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): Subject<boolean> {
        let response: Subject<boolean> = new Subject<boolean>();

        this.httpClient.get<FlipkartProduct[]>(this.url + query)
            .subscribe(results => {
                this.currentIndex = 0;
                this.results = results;
                this.loadItems(gridSelector, count, grid, container);
                response.next(this.results != null && results.length > 0);
            });

        return response;
    }
   
    removeData(): void {
        this.results = new Array<FlipkartProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}