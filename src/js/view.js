/**
 * @fileoverview The base class of views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
import * as core from './core';
import * as dom from 'tui-dom';
import snippet from 'tui-code-snippet';

/**
 * Property for represent all view instance element
 * @type {string}
 * @ignore
 */
const VIEW_PROP = 'feView';

/**
 * Basic view class
 * @class View
 * @mixes snippet.CustomEvents
 * @ignore
 */
class View {
    /**
     * @param {HTMLElement} container - base container element
     */
    constructor(container) {
        container = container || this.createFallbackElement();

        /**
         * Unique ID for each view instance
         * @type {string}
         */
        this.id = String(View.id);

        /**
         * Base container element for each view instance
         * @type {HTMLElement}
         */
        this.container = container;

        /**
         * Sub views
         * @type {View[]}
         */
        this.children = [];

        /**
         * Parent view
         * @type {View}
         */
        this.parent = null;

        /**
         * Cache for container bound
         */
        this.boundCache = null;

        View.id += 1;
        dom.setData(container, VIEW_PROP, this.id);
    }

    /**
     * Invoke before destroying
     */
    beforeDestroy() {}

    /**
     * Clear instance properties for destroying
     */
    clearProperties() {
        this.beforeDestroy();

        dom.removeElement(this.container);

        this.id = null;
        this.parent = null;
        this.children = null;
        this.container = null;
        this.boundCache = null;
    }

    /**
     * Destroy view instance
     * @param {boolean} [onlyChildren=false] - set true then destroy only
     *  children
     */
    destroy(onlyChildren = false) {
        this.children.forEach(childView => {
            childView.destroy();
        });

        if (onlyChildren) {
            return;
        }

        this.clearProperties();
    }

    /**
     * Get container's size and position. return bounds from
     *  getBoundingClientRect()
     *
     * It return cached bounds until View.boundCache exists for performance iss
     * ue. if you want re-calculate conatiner's bound then use bound setter or
     * just clear boundCache
     * property.
     * @returns {object} size and position
     */
    getBound() {
        let bound = this.boundCache;

        if (!bound) {
            bound = this.boundCache =
                Object.assign({}, dom.getRect(this.container));
        }

        return bound;
    }

    /**
     * Set container's size and position
     * @param {object} options - options
     * @param {number} [options.top] - top pixel
     * @param {number} [options.right] - right pixel
     * @param {number} [options.bottom] - bottom pixel
     * @param {number} [options.left] - left pixel
     * @param {number} [options.width] - width pixel
     * @param {number} [options.height] - height pixel
     */
    setBound({top, right, bottom, left, width, height} = {}) {
        dom.setBound(
            this.container,
            {top, right, bottom, left, width, height}
        );

        this.boundCache = null;
    }

    /**
     * Create fallback element when invoke constructor without container
     * @returns {HTMLElement} fallback division element
     */
    createFallbackElement() {
        const el = document.createElement('div');

        document.body.appendChild(el);

        return el;
    }

    /**
     * Add child view
     * @param {View} view - child view to add
     * @param {function} [before] - function that invoke before add
     */
    addChild(view, before = core.noop) {
        const {children} = this;

        if (snippet.filter(children, child => view === child).length) {
            return;
        }

        before.call(view, this);

        // add parent view
        view.parent = this;

        children.push(view);
    }

    /**
     * Remove child views
     * @param {string|View} id - child view id or instance itself
     * @param {function} [before] - function that invoke before remove
     */
    removeChild(id, before) {
        const {children} = this;
        const _id = snippet.isString(id) ? id : id.id;
        let index = -1;

        snippet.forEach(children, (child, childIndex) => {
            if (index === -1 && _id === child.id) {
                index = childIndex;
            }
        });

        before = before || core.noop;

        if (index < 0) {
            return;
        }

        const view = children[index];

        before.call(view, this);

        children.splice(index, 1);
    }

    /**
     * Render view recursively
     */
    render() {
        this.children.forEach(childView => {
            childView.render();
        });
    }

    /**
     * Invoke function recursively.
     * @param {function} iteratee - function to invoke child view recursively
     * @param {boolean} [skipThis=false] - set true then skip invoke with
     *  this(root) view.
     */
    recursive(iteratee = core.noop, skipThis = false) {
        if (!skipThis) {
            iteratee(this);
        }

        this.children.forEach(childView => {
            childView.recursive(iteratee);
        });
    }

    /**
     * Resize view recursively to parent.
     * @param {...*} [args] - arguments for supplied to each parent view.
     */
    resize(...args) {
        let {parent} = this;

        while (parent) {
            if (snippet.isFunction(parent._onResize)) {
                parent._onResize(...args);
            }

            parent = parent.parent;
        }
    }
}

/**
 * @static
 */
View.id = 0;

snippet.CustomEvents.mixin(View);

export default View;

