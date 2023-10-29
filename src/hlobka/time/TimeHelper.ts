import {TimeUnit} from "./unit/TimeUnit";

export function promiseDelay(delay: number, timeUnit: TimeUnit = TimeUnit.mls) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, timeUnit.toMillis(delay));
    });
}
