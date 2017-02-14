import { Http, Jsonp } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Observable} from "rxjs/Rx";
import { Observer } from "rxjs/Observer";

import {ISearchService} from "../search.service";
import {AmazonSearch} from "../../models/amazon/amazon-search";
import {AmazonSearchComponent} from "../../views/amazon/amazon-search.component";

@Injectable()
export class AmazonSearchService implements ISearchService {
    url: string = "/api/search/amazonsignedurl?query=";
    currentIndex: number;
    results: AmazonSearch[];
    private componentFactory: ComponentFactory<AmazonSearch>;

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonSearchComponent);
    }

    transformResults(xml: string): AmazonSearch[] {
        let items: AmazonSearch[] = new Array<AmazonSearch>();

        return items;
    }

    loadItem(container: ViewContainerRef): boolean {
        return true;
    }

    getResults(query: string): Observable<any> {
        let observer: Observer<any>;
        let observable: Observable<any> = new Observable(o => observer = o);
        
        this.http.get(this.url + query)
            .map(response => response.text())
            .subscribe(url => {
                this.jsonp.get(url)
                    .map(response => this.transformResults(response.text()))
                    .subscribe(txt => {
                        let items: AmazonSearch[] = [];
                        observer.next(items);
                    });
            });

        return observable;
    }

    saveResults(items: any[]): void {
        this.results = new Array<AmazonSearch>();
        this.currentIndex = 0;
    }

    removeData(): void {
        this.results = new Array<AmazonSearch>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}