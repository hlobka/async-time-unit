import {IDuration, TimeUnit} from "../unit/TimeUnit";
import {promiseDelay} from "../TimeHelper";

export class Duration implements IDuration {
    static mls(duration: number): Duration {
        return TimeUnit.mls.duration(duration);
    }

    static sec(duration: number): Duration {
        return TimeUnit.sec.duration(duration);
    }

    static min(duration: number): Duration {
        return TimeUnit.min.duration(duration);
    }

    readonly duration: number;
    readonly timeUnit: TimeUnit;

    constructor(duration: IDuration) {
        this.duration = duration.duration;
        this.timeUnit = duration.timeUnit;
    }

    toMillis(): number {
        return this.timeUnit.toMillis(this.duration)
    }

    toSeconds(): number {
        return this.timeUnit.toSeconds(this.duration)
    }

    toMinutes(): number {
        return this.timeUnit.toMinutes(this.duration)
    }

    async await() {
        await promiseDelay(this.duration, this.timeUnit);
    }
}
