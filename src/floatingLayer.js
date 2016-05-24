/**
 * @fileoverview Module for managing non zero z-index division on viewport
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
import View from './view';

const VIEW_PROP = '_floatingLayer';
const DEFAULT_ZINDEX = 999;

/**
 * Create layer for floating ui
 * @params {...string} [cssClass] - css classes
 * @returns {HTMLElement} layer
 */
export function createLayer(...cssClass) {
    const layer = document.createElement('div');

    dom.css(layer, {
        display: 'none',
        position: 'absolute'
    });

    if (cssClass.length) {
        dom.addClass(layer, ...cssClass);
    }

    return layer;
}

/**
 * Class for managing floating layers
 * @extends View
 */
export default class FloatingLayer extends View {
    /**
     * Constructor
     * @param {HTMLElement} [container] - base container element
     * @param {object} [options] - options for FloatingLayer
     *   @param {boolean} [options.modaless=false] - set true for create floating
     *    layer without dimmed layer
     * @example
     * var layer = new tui.component.FloatingLayer(document.querySelector('#fl'));
     */
    constructor(container, {modaless = false} = {}) {
        super(createLayer('floating-layer'));

        /**
         * @type {object}
         */
        this.options = Object.assign({}, {modaless});

        /**
         * @type {HTMLElement}
         */
        this.parent = container;

        /**
         * @type {number}
         */
        this.zIndex = DEFAULT_ZINDEX;

        /**
         * @type {HTMLElement}
         */
        this.dimm = null;

        /**
         * @type {object}
         */
        this.siblings = null;

        this.initialize(container);
    }

    /**
     * Initialize floating layer instance
     * @param {HTMLElement} container - element to base of several floating
     *  layers not floating layer itself
     */
    initialize(container) {
        let siblings = container[VIEW_PROP];

        if (!siblings) {
            siblings = container[VIEW_PROP] = new Set();
        }

        siblings.add(this);

        this.siblings = siblings;

        this.zIndex = this.getLargestZIndex() + 1;

        if (!this.options.modaless) {
            let dimm = this.dimm = createLayer('floating-layer-dimm');

            dom.css(dimm, 'position', 'fixed');
            dom.setBound(dimm, {top: 0, right: 0, bottom: 0, left: 0});

            container.appendChild(dimm);
        }

        container.appendChild(this.container);
    }

    /**
     * Destroy floating layer. no layer after destroying then
     */
    beforeDestroy() {
        const siblings = this.siblings;
        const parent = this.parent;

        siblings.delete(this);

        if (!siblings.size) {
            delete parent[VIEW_PROP];
            dom.css(parent, 'position', '');
        }

        dom.removeElement(this.container);
        dom.removeElement(this.dimm);

        this.options = this.siblings = this.zIndex = null;
    }

    /**
     * Destructor
     * @override
     * @api
     */
    destroy() {
        View.prototype.destroy.call(this);
    }

    /**
     * Set layer content
     * @param {string} html - html string
     */
    setContent(html) {
        this.container.innerHTML = html;
    }

    /**
     * Get largest z-index value in this container
     * @returns {number}
     */
    getLargestZIndex() {
        const indexes = [...this.siblings].map(fl => fl.zIndex);

        indexes.push(DEFAULT_ZINDEX);

        return Math.max(...indexes);
    }

    /**
     * Set focus to layer
     * @api
     */
    focus() {
        const largestZIndex = this.getLargestZIndex();
        const newZIndex = (largestZIndex + 2);

        dom.css(this.container, 'zIndex', newZIndex);

        this.zIndex = newZIndex;

        if (!this.options.modaless) {
            dom.css(this.dimm, 'zIndex', (this.zIndex - 1));
        }
    }

    /**
     * Show layer
     * @api
     */
    show() {
        this.focus();
        dom.css(this.container, 'display', 'block');

        if (!this.options.modaless) {
            dom.css(this.dimm, 'display', 'block');
        }
    }

    /**
     * Hide layer
     * @api
     */
    hide() {
        dom.css(this.container, 'display', 'none');

        if (!this.options.modaless) {
            dom.css(this.dimm, 'display', 'none');
        }
    }
}
