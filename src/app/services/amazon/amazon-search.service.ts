import { Http, Jsonp } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Observable} from "rxjs/Rx";
import { Observer } from "rxjs/Observer";
import Masonry from "masonry-layout";

import {ISearchService} from "../search.service";
import {AmazonProduct} from "../../models/amazon/amazon-product";
import {AmazonProductComponent} from "../../views/amazon/amazon-product.component";

@Injectable()
export class AmazonSearchService implements ISearchService {
    private url: string = "/api/search/amazon?query=";
    private currentIndex: number;
    private results: AmazonProduct[];
    private componentFactory: ComponentFactory<AmazonProductComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonProductComponent);
    }

    transformResults(xml: string): AmazonProduct[] {
        let items: AmazonProduct[] = new Array<AmazonProduct>();
        return items;
    }

    loadItem(grid: Masonry, container: ViewContainerRef): void {
        const model: AmazonProduct = this.results[this.currentIndex++];
        let amazonComponent = container.createComponent(this.componentFactory);
        amazonComponent.instance.item = model;

        grid.appended(amazonComponent.location.nativeElement);
        grid.layout();
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

    loadScrollItems(grid: Masonry, container: ViewContainerRef, count: number): void {
        this.loadItems(count, grid, container);
    }

    removeData(): void {
        this.results = new Array<AmazonProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}