import $ from "jquery";

export class Environment {
    static isLg(): boolean {
        return $("#device-lg").is(":visible");
    }

    static isMd(): boolean {
        return $("#device-md").is(":visible");
    }

    static isSm(): boolean {
        return $("#device-sm").is(":visible");
    }

    static isXs(): boolean {
        return $("#device-xs").is(":visible");
    }
}