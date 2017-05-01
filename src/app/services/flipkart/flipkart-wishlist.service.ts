import { Http, Headers } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";

import {AccountService} from "../account/account.service";
import {IWishlistService} from "../wishlist.service";
import {FlipkartWishlistComponent} from "../../views/flipkart/flipkart-wishlist.component";

@Injectable()
export class FlipkartWishlistService implements IWishlistService {

    private componentFactory: ComponentFactory<FlipkartWishlistComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartWishlistComponent);
    }

    loadItem(id: string, container: ViewContainerRef): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/flipkart/" + id, {
            headers: headers
        }).map(response => response.json())
            .subscribe(product => {
                let flipkartComponent = container.createComponent(this.componentFactory);
                flipkartComponent.instance.item = product;
            });
    }

    loadWishlist(ids: string[], container: ViewContainerRef, rowCount: number): void {
        ids.forEach(id => {
            this.loadItem(id, container);
        });
    }

    loadAll(container: ViewContainerRef, rowCount: number): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/flipkart", {
            headers: headers
        }).map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, container, rowCount);
           });
    }
}