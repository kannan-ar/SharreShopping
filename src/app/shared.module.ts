import {NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";

import {ImageHolderComponent} from "./shared/image-holder.component";
import {ProgressComponent} from "./shared/progress.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ImageHolderComponent, ProgressComponent],
    exports: [ImageHolderComponent, ProgressComponent]
})

export class SharedModule {
}