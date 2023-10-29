import {promiseDelay} from "../TimeHelper";
import {Duration} from "../duration/Duration";

export enum ETimeUnit {
    mls,
    sec,
    min,
}

export class TimeUnit {
    static readonly mls = new TimeUnit(ETimeUnit.mls);
    static readonly sec = new TimeUnit(ETimeUnit.sec);
    static readonly min = new TimeUnit(ETimeUnit.min);

    private constructor(private timeUnit: ETimeUnit) {

    }

    duration(duration: number): Duration {
        return new Duration({
            duration,
            timeUnit: this,
        });
    }

    toMillis(duration: number): number {
        switch (this.timeUnit) {
            case ETimeUnit.mls:
                return duration;
            case ETimeUnit.sec:
                return duration * 1000;
            case ETimeUnit.min:
                return duration * 60 * 1000;
        }
    }

    toSeconds(duration: number): number {
        return this.toMillis(duration) / 1000;
    }

    toMinutes(duration: number): number {
        return this.toSeconds(duration) / 60;
    }

    async await(duration: number) {
        await promiseDelay(duration, this);
    }
}

//TODO: pass with unit tests [#3];

export interface IDuration { duration: number, timeUnit: TimeUnit }
export type PromiseOptions = { duration: IDuration, interval: IDuration };

export const promise = Object.assign((awaitChecker: () => boolean, options: PromiseOptions) => {
    const interval = options.interval;
    const duration = options.duration;
    const time = Date.now();
    const promiseAwaitDuration = duration.timeUnit.toMillis(duration.duration);
    const timeout = interval.timeUnit.toMillis(interval.duration);
    return new Promise<void>((resolve, reject) => {
        const intervalId = setInterval(() => {
            if (awaitChecker()) {
                clearInterval(intervalId);
                resolve();
                return;
            }
            if (Date.now() - time > promiseAwaitDuration) {
                clearInterval(intervalId);
                reject(new Error("Wait time expired"));
            }
        }, timeout);
    });
}, {
    in: (duration: Duration) => {
        return {
            tobe: (awaitChecker: () => boolean, interval: Duration) => {
                return promise(awaitChecker, {
                    duration,
                    interval,
                });
            },
        };
    },
});
