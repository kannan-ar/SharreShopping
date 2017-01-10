import { Injectable, ViewContainerRef, Inject, Renderer } from "@angular/core";

@Injectable()
export class RowSeparator {
    count: number;
  
    init(): void {
        this.count = 0;
    }

    check(container: ViewContainerRef, renderer: Renderer): void {
        this.count += 1;

        if (this.count == 3) {
            let div = renderer.createElement(container.element.nativeElement, "div");
            renderer.setElementClass(div, "clearfix", true);
            renderer.setElementClass(div, "visible-md-block", true);
        }
        else if (this.count == 4) {
            let div = renderer.createElement(container.element.nativeElement, "div");
            renderer.setElementClass(div, "clearfix", true);
            renderer.setElementClass(div, "visible-sm-block", true);
        }
        else if (this.count > 4) {
            this.count = 0;
        }
    }
}