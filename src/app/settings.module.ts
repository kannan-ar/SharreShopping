import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { TagInputModule } from 'ngx-chips';

import {PreferenceComponent} from "./home/preference.component";
import {PreferenceListComponent} from "./home/preference-list.component";

import {PreferenceService} from "./services/preference.service";

import {SharedModule} from "./shared.module";

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, InfiniteScrollModule, TagInputModule, SharedModule],
    exports: [PreferenceComponent, PreferenceListComponent],
    entryComponents: [PreferenceComponent, PreferenceListComponent],
    declarations: [PreferenceComponent, PreferenceListComponent],
    providers: [PreferenceService]
})

export class SettingsModule {
}