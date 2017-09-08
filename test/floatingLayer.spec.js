
import FloatingLayer from '../src/js/floatingLayer';

describe('FloatingLayer', () => {
    let container;

    beforeEach(() => {
        fixture.set('<div id="target"></div>');
        container = document.querySelector('#target');
    });

    afterEach(() => {
        fixture.cleanup();
    });

    it('should be modaless floating layer.', () => {
        const modaless = new FloatingLayer(container, {modaless: true});

        expect(modaless.options.modaless).toBe(true);
        expect(document.querySelector('.floating-layer-dimm')).toBeFalsy();
    });

    it('should be modal floating layer.', () => {
        const modal = new FloatingLayer(container);

        expect(modal.options.modaless).toBe(false);
        expect(document.querySelector('.floating-layer-dimm')).toBeTruthy();
    });

    it('should remove property when no layer after destroying layer.', () => {
        const f1 = new FloatingLayer(container);
        const f2 = new FloatingLayer(container);

        f1.destroy();
        f2.destroy();

        expect(container._floatingLayer).toBeUndefined();
    });

    it('should remove layer and dimm after destroying layer.', () => {
        const f1 = new FloatingLayer(container);

        f1.destroy();

        expect(container.querySelectorAll('div').length).toBe(0);
    });
});
