import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {PreferenceComponent} from "./home/preference.component";
import {SettingService} from "./services/account/setting.service";
import {SharedModule} from "./shared.module";

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [PreferenceComponent],
    entryComponents: [PreferenceComponent],
    declarations: [PreferenceComponent],
    providers: [SettingService]
})

export class SettingsModule {
}