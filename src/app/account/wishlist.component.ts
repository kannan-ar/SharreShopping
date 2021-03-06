﻿import {Component, ViewContainerRef, ViewChild, OnInit} from "@angular/core"
import Masonry from "masonry-layout";

import {WishlistService} from "../services/wishlist.service";

@Component({
    selector: 'wishlist',
    template: `
        <div class="row">
            <div class="col-sm-12">
                <div class="wishlist-header">
                    <h5>Wishlist Items</h5>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="wishlist-grid">
                <ng-template #container></ng-template>
            </div>
        </div>
    `,
    styles: [`
        .wishlist-header {
            background-color: #14819C;
            padding: 1px 10px 1px 20px;
        }

        .wishlist-header h4 {
            margin-top: 5px;
            margin-bottom: 5px;
        }
    `]
})

export class WishlistComponent {
    gridSelector: string = ".wishlist-grid";
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private wishlistService: WishlistService) {
    }
    
    ngOnInit() {
        var grid = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        this.wishlistService.loadAll(this.container, this.gridSelector, grid);
    }
}