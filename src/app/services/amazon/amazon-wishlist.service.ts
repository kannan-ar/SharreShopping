import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef } from "@angular/core";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import {IWishlistService} from "../wishlist.service";
import {AccountService} from "../account/account.service";
import {AmazonProduct} from "../../models/amazon/amazon-product";
import {AmazonWishlist} from "../../models/amazon/amazon-wishlist";
import {AmazonWishlistComponent} from "../../views/amazon/amazon-wishlist.component";

@Injectable()
export class AmazonWishlistService implements IWishlistService {
    private componentFactory: ComponentFactory<AmazonWishlistComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonWishlistComponent);
    }

    private onComponentRemoved(component: ComponentRef<AmazonWishlistComponent>, grid: Masonry) {
        component.destroy();
        grid.layout();
    }

    loadWishlist(results: AmazonWishlist, container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        let index: number = 0;
        let items: AmazonProduct[] = results.items;

        while (index < items.length) {
            const model: AmazonProduct = items[index];
            let amazonComponent = container.createComponent(this.componentFactory);
            amazonComponent.instance.item = model;
            amazonComponent.instance.onItemRemoved.subscribe(e => {
                this.onComponentRemoved(amazonComponent, grid);
            });

            grid.appended(amazonComponent.location.nativeElement);
            imagesLoaded(gridSelector, function () {
                grid.layout();
            });

            ++index;
        }
    }

    getPendingWishlist(ids: string[], container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = JSON.stringify(ids);

        this.http.post("/api/wishlist/amazon", body, {
            headers: headers
        }).map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, container, gridSelector, grid);
                if (results.ids.length > 0) {
                    this.getPendingWishlist(results.Ids, container, gridSelector, grid);
                }
            });
    }

    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        this.http.get("/api/wishlist/amazon").map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, container, gridSelector, grid);

                if (results.ids.length > 0) {
                    this.getPendingWishlist(results.ids, container, gridSelector, grid);
                }
            });
    }
}