var timeoutA = setTimeout(() => {
    console.log('timeout A');
}, 2000);

var timeoutB = setTimeout(() => {
    console.log('timeout B');
    clearTimeout(timeoutA);
}, 1000);