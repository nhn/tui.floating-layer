/* eslint max-nested-callbacks: 0 */
var View = tui.component.FloatingLayer.View;

describe('View class', function() {
    beforeEach(function() {
        fixture.set(
            '<div id="container"></div>' +
            '<div id="container2" style="position:absolute;left:10px;' +
            'top:10px;width:250px;height:200px;"></div>' +
            '<div id="container3"></div>' +
            '<div id="container4"></div>'
        );
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('can add children views.', function() {
        var v = new View();
        var s = new View();
        var s2 = new View();

        v.addChild(s);
        v.addChild(s2);

        expect(v.children[0]).toBe(s);
        expect(v.children[1]).toBe(s2);
        expect(s.parent).toBe(v);
        expect(v.children.length).toBe(2);
    });

    it('no duplicate childs.', function() {
        var v = new View();
        var s = new View();

        v.addChild(s);
        v.addChild(s);

        expect(v.children.length).toBe(1);
    });

    it('can invoke specific function before add child view.', function() {
        var before = jasmine.createSpy('before');
        var v = new View();
        var s = new View();

        v.addChild(s, before);

        expect(before).toHaveBeenCalledWith(v);
    });


    describe('can remove', function() {
        var v, s;
        beforeEach(function() {
            v = new View();
            s = new View();

            v.addChild(s);
        });

        it('specific children view by children view itself.', function() {
            v.removeChild(s);
            expect(v.children.length).toBe(0);
        });

        it('specific children view by children view id.', function() {
            v.removeChild(s.id);
            expect(v.children.length).toBe(0);
        });

        it('with before function invoke.', function() {
            var before = jasmine.createSpy('before');
            v.removeChild(s, before);
            expect(before).toHaveBeenCalledWith(v);
        });

        it('only exist child.', function() {
            v.removeChild('no');
            expect(v.children[0]).toBe(s);
        });
    });

    it('should render children views recursively.', function() {
        var a = new View(),
            b = new View(),
            c = new View();

        a.addChild(b);
        b.addChild(c);

        spyOn(c, 'render');

        a.render();

        expect(c.render).toHaveBeenCalled();
    });

    describe('should destroy', function() {
        var v, v2, v3, v4, isDestroyed;

        beforeEach(function() {
            isDestroyed = jasmine.objectContaining({
                id: null,
                children: null,
                container: null,
                parent: null
            });

            v = new View();
            v2 = new View();
            v3 = new View();
            v4 = new View();

            v.addChild(v2);
            v.addChild(v3);
            v2.addChild(v4);
        });

        it('only children.', function() {
            v.destroy(true);

            expect(v).not.toEqual(isDestroyed);
            expect(v2).toEqual(isDestroyed);
            expect(v3).toEqual(isDestroyed);
            expect(v4).toEqual(isDestroyed);
        });

        it('with children.', function() {
            v.destroy();

            expect(v).toEqual(isDestroyed);
            expect(v2).toEqual(isDestroyed);
            expect(v3).toEqual(isDestroyed);
            expect(v4).toEqual(isDestroyed);
        });
    });

    describe('recursive()', function() {
        it('can invoke function each child views recursivly.', function() {
            var v = new View();
            var v2 = new View();
            var v3 = new View();

            v.addChild(v2);
            v2.addChild(v3);

            spyOn(v3, 'recursive');

            v.recursive(function() {});

            expect(v3.recursive).toHaveBeenCalled();
        });

        it('set skipThis true then skip invoke function with root view.', function() {
            var v = new View();
            var v2 = new View();
            var v3 = new View();
            var spy = jasmine.createSpy('recursive');

            v.addChild(v2);
            v2.addChild(v3);

            v.recursive(spy, true);

            expect(spy.calls.argsFor(0)[0]).not.toBe(v);
            expect(spy.calls.argsFor(0)[0]).toBe(v2);
            expect(spy.calls.count()).toBe(2);
        });
    });

    describe('should resize to parent from children', function() {
        it('properly.', function() {
            var v = new View();
            var v2 = new View(document.getElementById('container3'));

            v._onResize = jasmine.createSpy('viewOnResize');
            v.addChild(v2);
            v2.resize(v2);

            expect(v._onResize).toHaveBeenCalledWith(v2);
        });

        it('with arguments.', function() {
            var v = new View();
            var v2 = new View(document.getElementById('container3'));
            var v3 = new View(document.getElementById('container4'));

            v._onResize = jasmine.createSpy('viewOnResize');

            // view <- view2 <- view3
            v.addChild(v2);
            v2.addChild(v3);

            v3.resize(v3);
            expect(v._onResize).toHaveBeenCalledWith(v3);
        });
    });

    it('should calculate container\'s size and position in viewport.', function() {
        var container, v;

        document.body.style.width = '100px';
        container = document.querySelector('#container');
        container.style.width = '50%';
        container.style.height = '50px';

        v = new View(container);
        expect(v.getBound().width).toBe(50);
        expect(v.getBound().height).toBe(50);
    });

    it('should caching container\'s bound before update.', function() {
        var v;

        v = new View(document.getElementById('container2'));
        expect(v.boundCache).toBe(null);

        v.getBound();
        expect(v.boundCache).not.toBe(null);
    });
});
