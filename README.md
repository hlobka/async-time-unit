# async-time-unit
async-time-unit - is a simple lib with async time units and duration accessibility.

## Installation:
As a dependency in your npm package:
- `npm install @hlobka/async-time-unit`

Examples:
- Awaiter in 10 seconds:
  - `await promiseDelay(10, TimeUnit.sec);`
  - `await TimeUnit.sec.await(10)`
  - `await Duration.sec(10).await();`
- Awaiter till something happened:
  - Await in 1 minute till element appears with interval to check in 100 mls:
    - `await promise.in(Duration.min(1)).tobe(() => document.getElementById("id") != null, Duration.mls(100))`
