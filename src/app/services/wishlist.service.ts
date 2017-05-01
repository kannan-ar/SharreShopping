import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { AccountService } from "./account/account.service";
import {RowSeparator} from "./row-separator";

export interface IWishlistService {
    loadAll(containers: ViewContainerRef[], rowCount: number): void;
}

@Injectable()
export class WishlistService {

    private servicePoints: IWishlistService[];

    constructor(
        @Inject('WishlistServices') private services,
        private http: Http,
        private rowSeparator: RowSeparator
    ) {
        this.servicePoints = new Array<IWishlistService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }

    addWishlist(provider: string, id: string): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.post("/api/wishlist/add/" + provider + "/" + id, "", {
            headers: headers
        }).subscribe();
    }

    loadAll(containers: ViewContainerRef[]): void {
        this.rowSeparator.init();

        this.servicePoints.forEach(service => {
            service.loadAll(containers, this.rowSeparator.rowCount);
        });
    }
}