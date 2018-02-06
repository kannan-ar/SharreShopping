import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import {Subject} from "rxjs/Subject";
import {AsyncSubject} from "rxjs/AsyncSubject";
import {Observable} from "rxjs/Rx";
import Masonry from "masonry-layout";

import {SearchService} from "./search.service";
import {Environment} from "../environment";
import {AccountService} from "../services/account/account.service";

@Injectable()
export class PreferenceService {
    private itemPreferenceName: string = 'item_preference';
    private blockPreferenceName: string = 'block_preference';

    constructor(
        private httpClient: HttpClient,
        private accountService: AccountService) { }

    private getCount(itemCount: number): number {
        let count: number = Math.floor(Environment.getRowCount() / itemCount);

        if (count <= 0) {
            count = 1;
        }

        return count;
    }

    blockPreferences(): void {
        window.localStorage.setItem(this.blockPreferenceName, "1");
    }

    getPreferences(): Subject<string[]> {
        let result: Subject<string[]> = new Subject<string[]>();

        if (this.accountService.isLogged()) {
            this.httpClient.get<string[]>("/api/preference/get")
                .subscribe(data => {
                    result.next(data);
                });
        }
        else {
            setTimeout(() => { result.next(JSON.parse(window.localStorage.getItem(this.itemPreferenceName))) }, 0);
        }

        return result;
    }

    savePreferences(items: string[]): Subject<boolean> {
        let response: Subject<boolean> = new Subject<boolean>();

        if (items != null && items.length > 0) {
            if (this.accountService.isLogged()) {
                this.saveAccountPreference(items).subscribe(r => {
                    response.next(true);
                });
            }
            else {
                window.localStorage.setItem(this.itemPreferenceName, JSON.stringify(items));
                setTimeout(() => { response.next(true) }, 0);
            }
        }
        else {
            response.next(true);
        }

        return response;
    }

    loadPreferences(items: any[], searchService: SearchService, gridSelector: string, grid: Masonry, container: ViewContainerRef): Subject<boolean> {
        let response: Subject<boolean> = new Subject<boolean>();

        if (items != null && items.length > 0) {
            items.forEach(item => {
                searchService.search(item, gridSelector, grid, container, this.getCount(items.length)).subscribe(r => {
                    response.next(r);
                });
            });
        }

        return response;
    }

    loadScrollItems(searchService: SearchService, gridSelector: string, grid: Masonry, container: ViewContainerRef) {
        if (searchService.hasData()) {
            searchService.loadScrollItems(gridSelector, grid, container, Environment.getRowCount());
        }
    }

    saveAccountPreference(items: string[]): Observable<Response> {
        let headers = new HttpHeaders().append("Content-Type", "application/json")

        let body = JSON.stringify(items);
        return this.httpClient.post<Response>("/api/preference/save", body, {
            headers: headers
        });
    }

    getAccountPreference(): Observable<Response> {
        return ;
    }
}