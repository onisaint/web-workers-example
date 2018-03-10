const CALC_FIB_SYNC = 'calculateFibbonaciSync',
    CALC_FIB_ASYNC = 'calculateFibbonaciAsync';

let isCalled = false;

self.addEventListener('message', (e) => {
    switch (e.data) {
        case CALC_FIB_SYNC: {
            const result = calculateFibbonaciSequence(100 ** 2);
            self.postMessage({
                result,
                type: CALC_FIB_SYNC
            });
            break;
        }
        case CALC_FIB_ASYNC: {
            self.postMessage({
                result: FibAsyncPipe.next().value,
                type: CALC_FIB_ASYNC
            });
            break;
        }
        default: break;
    }
})

// workers
function* calculateFibbonaciGenerator() {
    let [a, b] = [0, 1];

    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const FibAsyncPipe = calculateFibbonaciGenerator();

function calculateFibbonaciSequence(n) {
    const fibSeries = [];
    let [a, b] = [0, 1];

    let i = 0;
    while (i++ != n) {
        fibSeries.push(a);
        [a, b] = [b, a + b];
    }

    return fibSeries;
}