function myFilter(collection, filter, map, cb) {
    var calledback = false,
        results = [],
        i = 0,
        countdown = 0;
    function done(err, result) {
        if (!calledback) {
            calledback = true;
            cb(err, result);
        }
    }
    collection.forEach((elem) => {
        (function (i) {
            function next(err, passes) {
                if (err) return done(err);
                if (passes) {
                    countdown++;
                    function mapDone(err, result) {
                        if (err) return done(err);
                        results[i] = result;
                        if (--countdown === 0) {
                            done(null, results);
                        }
                    }
                    map(elem, mapDone);
                }
            }
            filter(elem, next);
        } (i));
        i++;
    });
}

module.exports = myFilter;