import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {ISearchService} from "../search.service";

@Injectable()
export class EbaySearchService implements ISearchService {
    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    loadItem(containers: ViewContainerRef[], count: number, rowCount: number): void {
    }

    getResults(query: string): Observable<any> {
        return this.http.get("http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=ShareSho-7fbb-407c-8989-2000fa0722c4&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID=EBAY-IN&keywords=harry%20potter%20phoenix")
            .map(response => response.json());
    }

    saveResults(items: any[]): void {
        console.log(items);
    }
}