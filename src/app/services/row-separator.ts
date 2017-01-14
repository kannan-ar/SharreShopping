import { Injectable, ViewContainerRef, ComponentFactoryResolver, Renderer } from "@angular/core";

import {RowSeparatorComponent} from "../views/row-separator.component";
import {Environment} from "../environment";

@Injectable()
export class RowSeparator {
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    rowCount: number;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    init() {
        this.isXs = false;
        this.isSm = false;
        this.isMd = false;
        this.isLg = false;
        this.rowCount = 0;

        if (Environment.isLg()) {
            this.isLg = true;
            this.rowCount = 6;
        }
        else if (Environment.isMd()) {
            this.isMd = true;
            this.rowCount = 4;
        }
        else if (Environment.isSm()) {
            this.isSm = true;
            this.rowCount = 3;
        }
        else if (Environment.isXs()) {
            this.isXs = true;
            this.rowCount = 1;
        }

    }

    add(container: ViewContainerRef): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RowSeparatorComponent);
        let rowSeparator = container.createComponent(componentFactory);
        rowSeparator.instance.isSmBlock = this.isSm;
        rowSeparator.instance.isMdBlock = this.isMd;
        rowSeparator.instance.isLgBlock = this.isLg;
    }
}