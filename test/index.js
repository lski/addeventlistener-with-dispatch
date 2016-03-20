(function(window) {

    /**
     * States whether log outputs to the console or not
     */
    var outputResults = true;
    var imageToLoad = "assests/test.png";
    var altImgToLoad = "assests/test-2.png";

    describe('attach event', function() {

        var eventNo = 0;
        var names = [];

        var s1 = it(++eventNo + ': method exists', function() {

            expect(Element.prototype.addEventListener).not.toBe(null);
        });

        var s2 = it(++eventNo + ': should catch event', function(done) {

            var el = document.getElementById('test-s2');
            var loaded = false;

            el.addEventListener('load', function(evt) {

                _log(s2.getFullName(), 'image loaded', evt, this, evt);
                loaded = true;
            });

            el.src = imageToLoad;

            setTimeout(function() {
                expect(loaded).toBe(true);
                done();
            }, 1500);
        });

        var s3 = it(++eventNo + ': should catch event & supply element as this', function(done) {

            var el = document.getElementById('test-s3');
            var loaded = false;

            el.addEventListener('load', function(evt) {

                _log(s3.getFullName(), 'image loaded', evt, this);
                expect(this).toEqual(jasmine.any(Element));
                expect(this.tagName).toMatch(/img/i);
                loaded = true;
            });

            el.src = imageToLoad;

            setTimeout(function() {
                expect(loaded).toBe(true);
                done();
            }, 2000);
        });

        var s4 = it(++eventNo + ': should remove add and remove a listener', function(done) {

            var el = document.getElementById('test-s4');
            var loaded = false;
            var handler = function(evt) {

                _log(s4.getFullName(), 'image loaded', evt, this);
                loaded = true;
            };

            el.addEventListener('load', handler);
            el.removeEventListener('load', handler);

            el.src = imageToLoad;

            setTimeout(function() {
                expect(loaded).toBe(false);
                done();
            }, 1000);
        });

        var s5 = it(++eventNo + ': should fire/trigger an event', function(done) {

            var el = document.getElementById('test-s5');
            var run = false;

            el.addEventListener('click', function(evt) {

                _log(s5.getFullName(), 'click run', evt, this);
                run = true;
            });

            var evt = _createEvent('click');
            el.dispatchEvent(evt);

            setTimeout(function() {
                expect(run).toBe(true);
                done();
            }, 2500);
        });

        var s6 = it(++eventNo + ': should fire/trigger an custom event', function(done) {

            var el = document.getElementById('test-s6');
            var run = false;

            el.addEventListener('custom-click', function(evt) {

                _log(s6.getFullName(), 'click run', evt, this);
                run = true;
            });

            var evt = _createEvent('custom-click');
            el.dispatchEvent(evt);

            setTimeout(function() {
                expect(run).toBe(true);
                done();
            }, 1500);
        });


        var s7 = it(++eventNo + ': should bubble', function(done) {

            var el = document.getElementById('test-s7');
            var but = el.getElementsByTagName('button')[0];
            var loaded = false;

            el.addEventListener('click', function(evt) {

                _log(s7.getFullName(), 'bubble caught', evt, this);
                loaded = true;
            });

            var evt = _createEvent('click');
            but.dispatchEvent(evt);

            setTimeout(function() {
                expect(loaded).toBe(true);
                done();
            }, 2000);
        });

        var s8 = it(++eventNo + ': DOMContentLoaded should NOT fire set AFTER DOM loaded', function(done) {

            var fired = false;

            document.addEventListener('DOMContentLoaded', function(evt) {

                fired = true;

                var el = document.getElementById('test-s8');
                expect(el).toEqual(jasmine.any(Element));

                _log(s8.getFullName(), 'After DOM loaded', evt, this);
            });

            setTimeout(function() {
                expect(fired).toBe(false);
                done();
            }, 2000);
        });

        var s9 = it(++eventNo + ': DOMContentLoaded should fire set PRIOR to DOM loading', function(done) {

            // Use a timeout to ensure that the dom completed loading (as this script is the last element to load)
            setTimeout(function() {

                _log(s9.getFullName(), "Pre DOM Loaded", window.domContentLoadedPretest);
                expect(window.domContentLoadedPretest).toBe(true);
                done();

            }, 1000);

        });

        if (!Element.prototype.attachEvent) {

            _log('Can not run the native attachEvent test, as attachEvent does not exist in this environment');
        }
        else {

            var s10 = it(++eventNo + ': dispatch should also be caught natively with attachEvent', function(done) {

                var el = document.getElementById('test-s10');
                var loaded = false;

                el.attachEvent('onclick', function(evt) {

                    _log(s10.getFullName(), 'native attachEvent caught', evt, this);
                    loaded = true;
                });

                var evt = _createEvent('click');
                el.dispatchEvent(evt);

                setTimeout(function() {
                    expect(loaded).toBe(true);
                    done();
                }, 2000);
            });
        }

    });

    /**
     * Although this test suite is designed to be tested in environments where addEventListener doesnt exist, we create a cross browser event object to ensure
     * that the polyfilled functions are not effected by the polyfill when run in a browser with addEventListener
     */
    function _createEvent(name) {


        if (typeof window.CustomEvent === "function") {

            try {
                return new CustomEvent(name, { "bubbles": true, "cancelable": true });
            }
            catch (e) { /*Allow to fall through*/ }
        }

        if (document.createEvent) {

            var evt = document.createEvent('Event');
            evt.initEvent(name, true, true);
            return evt;
        }

        var evt = document.createEventObject();
        evt.eventName = evt.type = name;
        return evt;
    }

    function _log() {

        if (outputResults && typeof console !== "undefined") {
            var i = -1,
                l = arguments.length,
                args = [],
                fn = 'console.log(args)';
            while (++i < l) {
                args.push('args[' + i + ']');
            };
            fn = new Function('args', fn.replace(/args/, args.join(',')));
            fn(arguments);
        }
    };

})(this);
