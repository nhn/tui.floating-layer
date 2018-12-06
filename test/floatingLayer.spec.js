
import FloatingLayer from '../src/js/floatingLayer';
import snippet from 'tui-code-snippet';

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

    describe('use "usageStatistics" option', () => {
        let layer;

        beforeEach(() => {
            spyOn(snippet, 'sendHostname');
        });

        afterEach(() => {
            layer.destroy();
        });

        it('when the value set to true by default, the host name is send.', () => {
            layer = new FloatingLayer(container);

            expect(snippet.sendHostname).toHaveBeenCalled();
        });

        it('when the value set to false, the host name is not send to server.', () => {
            layer = new FloatingLayer(container, {
                usageStatistics: false
            });

            expect(snippet.sendHostname).not.toHaveBeenCalled();
        });
    });
});
