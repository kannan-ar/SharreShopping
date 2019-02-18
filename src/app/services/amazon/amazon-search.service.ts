import { HttpClient } from "@angular/common/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Subject} from "rxjs";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

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
        private httpClient: HttpClient,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonProductComponent);
    }

    loadItem(gridSelector: string, grid: Masonry, container: ViewContainerRef): void {
        const model: AmazonProduct = this.results[this.currentIndex++];
        let amazonComponent = container.createComponent(this.componentFactory);
        amazonComponent.instance.item = model;

        grid.appended(amazonComponent.location.nativeElement);
        imagesLoaded(gridSelector, function () {
            grid.layout();
        });
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

        this.httpClient.get<AmazonProduct[]>(this.url + query)
            .subscribe(results => {
                this.currentIndex = 0;
                this.results = results;
                this.loadItems(gridSelector, count, grid, container);
                response.next(results.length > 0);
            }, (error) => { });

        return response;
    }

    loadScrollItems(gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void {
        this.loadItems(gridSelector, count, grid, container);
    }

    removeData(): void {
        this.results = new Array<AmazonProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}