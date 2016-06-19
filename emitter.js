var EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    constructor(action) {
        super();
        this.action = action;
    }
    toString() {
        return `I am extends EventEmitter -> ${this.action}`;
    }
};

const myEmitter = new MyEmitter('run');

myEmitter.on('event', (err, result) => {
    if (err) throw err;
    console.log(result);
});

myEmitter.emit('event', null, myEmitter.toString());


class Ticker extends EventEmitter {
    constructor(step) {
        super();
        this.step = step;
    }
    tick() {
        setInterval(() => {
            this.emit('tick');
        }, this.step);
    }
}

var ticker = new Ticker(1000);
ticker.tick();
ticker.on('tick', () => {
    console.log('tick');
});