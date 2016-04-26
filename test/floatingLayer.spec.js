var FloatingLayer = tui.component.FloatingLayer;

describe('FloatingLayer', function() {
    var container;

    beforeEach(function() {
        fixture.set('<div id="target"></div>');
        container = document.querySelector('#target');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('should be modaless floating layer.', function() {
        var modaless = new FloatingLayer(container, {modaless: true});

        expect(modaless.options.modaless).toBe(true);
        expect(document.querySelector('.floating-layer-dimm')).toBeFalsy();
    });

    it('should be modal floating layer.', function() {
        var modal = new FloatingLayer(container);

        expect(modal.options.modaless).toBe(false);
        expect(document.querySelector('.floating-layer-dimm')).toBeTruthy();
    });

    it('should remove property when no layer after destroying layer.', function() {
        var f1 = new FloatingLayer(container),
            f2 = new FloatingLayer(container);

        f1.destroy();
        f2.destroy();

        expect(container._floatingLayer).toBeUndefined();
    });

    it('should remove layer and dimm after destroying layer.', function() {
        var f1 = new FloatingLayer(container);

        f1.destroy();

        expect(container.querySelectorAll('div').length).toBe(0);
    });
});
