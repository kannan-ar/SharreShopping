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

    static getRowCount(): number {
        let count: number = 6;

        if (Environment.isLg()) {
            count = 6;
        }
        else if (Environment.isMd()) {
            count = 4;
        }
        else if (Environment.isSm()) {
            count = 3;
        }
        else if (Environment.isXs()) {
            count = 1;
        }

        return count;
    }
}