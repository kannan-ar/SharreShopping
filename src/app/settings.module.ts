import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import {InfiniteScrollModule} from "angular2-infinite-scroll";

import {PreferenceComponent} from "./home/preference.component";
import {PreferenceListComponent} from "./home/preference-list.component";

import {PreferenceService} from "./services/preference.service";

import {SharedModule} from "./shared.module";

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, TagInputModule, InfiniteScrollModule, SharedModule],
    exports: [PreferenceComponent, PreferenceListComponent],
    entryComponents: [PreferenceComponent, PreferenceListComponent],
    declarations: [PreferenceComponent, PreferenceListComponent],
    providers: [PreferenceService]
})

export class SettingsModule {
}