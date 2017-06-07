import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ng2-tag-input';

import {PreferenceComponent} from "./home/preference.component";
import {SettingService} from "./services/account/setting.service";
import {SharedModule} from "./shared.module";

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, TagInputModule, SharedModule],
    exports: [PreferenceComponent],
    entryComponents: [PreferenceComponent],
    declarations: [PreferenceComponent],
    providers: [SettingService]
})

export class SettingsModule {
}