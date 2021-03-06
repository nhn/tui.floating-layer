/**
 * @fileoverview Module for managing non zero z-index division on viewport
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
import * as dom from 'tui-dom';
import View from './view';
import snippet from 'tui-code-snippet';

const VIEW_PROP__FLOATING_LAYER = '_floatingLayer';
const DEFAULT_ZINDEX = 999;

/**
 * Send information to google analytics
 * @ignore
 */
export function sendHostNameToGA() {
    snippet.sendHostname('floating-layer', 'UA-129987462-1');
}

/**
 * Create layer for floating ui
 * @param {...string} [cssClass] - css classes
 * @returns {HTMLElement} layer
 * @ignore
 */
function createLayer(...cssClass) {
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
 * @classdesc Class for managing floating layers
 * @class FloatingLayer
 * @param {HTMLElement} [container] - base container element
 * @param {object} [object] - options for FloatingLayer
 *     @param {boolean} [options.modaless=false] - set true for create floating
 *         layer without dimmed layer
 *     @param {boolean} [options.usageStatistics=true] Send the hostname to google analytics.
 *         If you do not want to send the hostname, this option set to false.
 * @example <caption>CommonJS entry</caption>
 * var FloatingLayer = require('tui-floating-layer');
 * var instance = new FloatingLayer(document.querySelector'#f1');
 * @example <caption>global namespace</caption>
 * var layer = new tui.FloatingLayer(document.querySelector('#fl'));
 */
export default snippet.defineClass(View, /** @lends FloatingLayer.prototype */ {
    init(container, {
        modaless = false,
        usageStatistics = true
    } = {}) {
        View.call(this, createLayer('floating-layer'));

        /**
         * @type {object}
         * @private
         */
        this.options = Object.assign({}, {
            modaless,
            usageStatistics
        });

        /**
         * @type {HTMLElement}
         * @private
         */
        this.parent = container;

        /**
         * @type {number}
         * @private
         */
        this.zIndex = DEFAULT_ZINDEX;

        /**
         * @type {HTMLElement}
         * @private
         */
        this.dimm = null;

        /**
         * @type {object}
         * @private
         */
        this.siblings = null;

        this.initialize();

        if (this.options.usageStatistics) {
            sendHostNameToGA();
        }
    },

    /**
     * Initialize floating layer instance layers not floating layer itself
     * @private
     */
    initialize() {
        const {parent} = this;

        if (!parent[VIEW_PROP__FLOATING_LAYER]) {
            parent[VIEW_PROP__FLOATING_LAYER] = {length: 0};
        }

        const key = dom.getData(this.container, 'fe-view');

        this.siblings = parent[VIEW_PROP__FLOATING_LAYER];

        if (!this.siblings[key]) {
            this.siblings[key] = this;
            this.siblings.length += 1;
        }

        this.zIndex = this.getLargestZIndex() + 1;

        if (!this.options.modaless) {
            this.dimm = createLayer('floating-layer-dimm');

            dom.css(this.dimm, 'position', 'fixed');
            dom.setBound(this.dimm, {top: 0, right: 0, bottom: 0, left: 0});

            this.parent.appendChild(this.dimm);
        }

        this.parent.appendChild(this.container);
    },

    /**
     * Destroy floating layer. no layer after destroying then
     * @private
     */
    beforeDestroy() {
        const {siblings, parent} = this;
        const key = dom.getData(this.container, 'fe-view');

        delete siblings[key];
        this.siblings.length -= 1;

        if (!siblings.length) {
            delete parent[VIEW_PROP__FLOATING_LAYER];
            dom.css(parent, 'position', '');
        }

        dom.removeElement(this.container);
        dom.removeElement(this.dimm);

        this.options = this.siblings = this.zIndex = null;
    },

    /**
     * Destructor
     */
    destroy() {
        View.prototype.destroy.call(this);
    },

    /**
     * Set layer content
     * @param {string} html - html string
     * @private
     */
    setContent(html) {
        this.container.innerHTML = html;
    },

    /**
     * Get largest z-index value in this container
     * @returns {number}
     * @private
     */
    getLargestZIndex() {
        const indexes = [...this.siblings].map(fl => fl.zIndex);

        indexes.push(DEFAULT_ZINDEX);

        return Math.max(...indexes);
    },

    /**
     * Set focus to layer
     */
    focus() {
        const largestZIndex = this.getLargestZIndex();
        const newZIndex = (largestZIndex + 2);

        dom.css(this.container, 'zIndex', newZIndex);

        this.zIndex = newZIndex;

        if (!this.options.modaless) {
            dom.css(this.dimm, 'zIndex', (this.zIndex - 1));
        }
    },

    /**
     * Show layer
     */
    show() {
        this.focus();
        dom.css(this.container, 'display', 'block');

        if (!this.options.modaless) {
            dom.css(this.dimm, 'display', 'block');
        }
    },

    /**
     * Hide layer
     */
    hide() {
        dom.css(this.container, 'display', 'none');

        if (!this.options.modaless) {
            dom.css(this.dimm, 'display', 'none');
        }
    }
});
