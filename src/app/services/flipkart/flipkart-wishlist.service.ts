import { Http, Headers } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

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

    loadItem(id: string, container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/flipkart/" + id, {
            headers: headers
        }).map(response => response.json())
            .subscribe(product => {
                let flipkartComponent = container.createComponent(this.componentFactory);
                flipkartComponent.instance.item = product;

                grid.appended(flipkartComponent.location.nativeElement);
                imagesLoaded(gridSelector, function () {
                    grid.layout();
                });
            });
    }

    loadWishlist(ids: string[], container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        ids.forEach(id => {
            this.loadItem(id, container, gridSelector, grid);
        });
    }

    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/flipkart", {
            headers: headers
        }).map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, container, gridSelector, grid);
           });
    }
}