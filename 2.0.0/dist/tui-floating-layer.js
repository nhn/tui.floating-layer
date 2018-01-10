/*!
 * tui-floating-layer.js
 * @version 2.0.0
 * @author NHNEnt FE Development Team <dl_javascript@nhnent.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tui-dom"), require("tui-code-snippet"));
	else if(typeof define === 'function' && define.amd)
		define(["tui-dom", "tui-code-snippet"], factory);
	else if(typeof exports === 'object')
		exports["FloatingLayer"] = factory(require("tui-dom"), require("tui-code-snippet"));
	else
		root["tui"] = root["tui"] || {}, root["tui"]["FloatingLayer"] = factory((root["tui"] && root["tui"]["dom"]), (root["tui"] && root["tui"]["util"]));
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _floatingLayer = __webpack_require__(5);

	var _floatingLayer2 = _interopRequireDefault(_floatingLayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = _floatingLayer2['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * @fileoverview Module for managing non zero z-index division on viewport
	                                                                                                                                                                                                                                                                   * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
	                                                                                                                                                                                                                                                                   */


	exports.createLayer = createLayer;

	var _tuiDom = __webpack_require__(6);

	var dom = _interopRequireWildcard(_tuiDom);

	var _view = __webpack_require__(7);

	var _view2 = _interopRequireDefault(_view);

	var _tuiCodeSnippet = __webpack_require__(9);

	var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var VIEW_PROP__FLOATING_LAYER = '_floatingLayer';
	var DEFAULT_ZINDEX = 999;

	/**
	 * Create layer for floating ui
	 * @param {...string} [cssClass] - css classes
	 * @returns {HTMLElement} layer
	 * @ignore
	 */
	function createLayer() {
	    var layer = document.createElement('div');

	    dom.css(layer, {
	        display: 'none',
	        position: 'absolute'
	    });

	    for (var _len = arguments.length, cssClass = Array(_len), _key = 0; _key < _len; _key++) {
	        cssClass[_key] = arguments[_key];
	    }

	    if (cssClass.length) {
	        dom.addClass.apply(dom, [layer].concat(cssClass));
	    }

	    return layer;
	}

	exports['default'] = _tuiCodeSnippet2['default'].defineClass(_view2['default'], {
	    /**
	     * @classdesc Class for managing floating layers
	     * @class FloatingLayer
	     * @extends View
	     * @constructs FloatingLayer
	     * @param {HTMLElement} [container] - base container element
	     * @param {object} [object] - options for FloatingLayer
	     *   @param {boolean} [options.modaless=false] - set true for create floating
	     *    layer without dimmed layer
	     * @example <caption>CommonJS entry</caption>
	     * var FloatingLayer = require('tui-floating-layer');
	     * var instance = new FloatingLayer(document.querySelector'#f1');
	     * @example <caption>global namespace</caption>
	     * var layer = new tui.FloatingLayer(document.querySelector('#fl'));
	     */
	    init: function init(container) {
	        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	            _ref$modaless = _ref.modaless,
	            modaless = _ref$modaless === undefined ? false : _ref$modaless;

	        _view2['default'].call(this, createLayer('floating-layer')); // this.container = div#floatingLayer

	        /**
	         * @type {object}
	         * @name options
	         * @memberof FloatingLayer
	         */
	        this.options = _extends({}, { modaless: modaless });

	        /**
	         * @type {HTMLElement}
	         * @name parent
	         * @override View
	         * @memberof FloatingLayer#
	         */
	        this.parent = container;

	        /**
	         * @type {number}
	         * @name zIndex
	         * @memberof FloatingLayer#
	         */
	        this.zIndex = DEFAULT_ZINDEX;

	        /**
	         * @type {HTMLElement}
	         * @name dimm
	         * @memberof FloatingLayer#
	         */
	        this.dimm = null;

	        /**
	         * @type {object}
	         * @name siblings
	         * @memberof FloatingLayer#
	         */
	        this.siblings = null;

	        this.initialize();
	    },


	    /**
	     * Initialize floating layer instance
	     *  layers not floating layer itself
	     * @memberof FloatingLayer.prototype
	     */
	    initialize: function initialize() {
	        var parent = this.parent;


	        if (!parent[VIEW_PROP__FLOATING_LAYER]) {
	            parent[VIEW_PROP__FLOATING_LAYER] = { length: 0 };
	        }

	        var key = dom.getData(this.container, 'fe-view');

	        this.siblings = parent[VIEW_PROP__FLOATING_LAYER];

	        if (!this.siblings[key]) {
	            this.siblings[key] = this;
	            this.siblings.length += 1;
	        }

	        this.zIndex = this.getLargestZIndex() + 1;

	        if (!this.options.modaless) {
	            this.dimm = createLayer('floating-layer-dimm');

	            dom.css(this.dimm, 'position', 'fixed');
	            dom.setBound(this.dimm, { top: 0, right: 0, bottom: 0, left: 0 });

	            this.parent.appendChild(this.dimm);
	        }

	        this.parent.appendChild(this.container);
	    },


	    /**
	     * Destroy floating layer. no layer after destroying then
	     * @memberof FloatingLayer.prototype
	     */
	    beforeDestroy: function beforeDestroy() {
	        var siblings = this.siblings,
	            parent = this.parent;

	        var key = dom.getData(this.container, 'fe-view');

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
	     * @override
	     * @memberof FloatingLayer.prototype
	     */
	    destroy: function destroy() {
	        _view2['default'].prototype.destroy.call(this);
	    },


	    /**
	     * Set layer content
	     * @param {string} html - html string
	     * @memberof FloatingLayer.prototype
	     */
	    setContent: function setContent(html) {
	        this.container.innerHTML = html;
	    },


	    /**
	     * Get largest z-index value in this container
	     * @returns {number}
	     * @memberof FloatingLayer.prototype
	     */
	    getLargestZIndex: function getLargestZIndex() {
	        var indexes = [].concat(this.siblings).map(function (fl) {
	            return fl.zIndex;
	        });

	        indexes.push(DEFAULT_ZINDEX);

	        return Math.max.apply(Math, indexes);
	    },


	    /**
	     * Set focus to layer
	     * @memberof FloatingLayer.prototype
	     */
	    focus: function focus() {
	        var largestZIndex = this.getLargestZIndex();
	        var newZIndex = largestZIndex + 2;

	        dom.css(this.container, 'zIndex', newZIndex);

	        this.zIndex = newZIndex;

	        if (!this.options.modaless) {
	            dom.css(this.dimm, 'zIndex', this.zIndex - 1);
	        }
	    },


	    /**
	     * Show layer
	     * @memberof FloatingLayer.prototype
	     */
	    show: function show() {
	        this.focus();
	        dom.css(this.container, 'display', 'block');

	        if (!this.options.modaless) {
	            dom.css(this.dimm, 'display', 'block');
	        }
	    },


	    /**
	     * Hide layer
	     * @memberof FloatingLayer.prototype
	     */
	    hide: function hide() {
	        dom.css(this.container, 'display', 'none');

	        if (!this.options.modaless) {
	            dom.css(this.dimm, 'display', 'none');
	        }
	    }
	});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _core = __webpack_require__(8);

	var core = _interopRequireWildcard(_core);

	var _tuiDom = __webpack_require__(6);

	var dom = _interopRequireWildcard(_tuiDom);

	var _tuiCodeSnippet = __webpack_require__(9);

	var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @fileoverview The base class of views.
	                                                                                                                                                           * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
	                                                                                                                                                           */


	/**
	 * Property for represent all view instance element
	 * @type {string}
	 * @ignore
	 */
	var VIEW_PROP = 'feView';

	/**
	 * Basic view class
	 * @class View
	 * @mixes snippet.CustomEvents
	 * @ignore
	 */

	var View = function () {
	    /**
	     * @param {HTMLElement} container - base container element
	     */
	    function View(container) {
	        _classCallCheck(this, View);

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


	    View.prototype.beforeDestroy = function beforeDestroy() {};

	    /**
	     * Clear instance properties for destroying
	     */


	    View.prototype.clearProperties = function clearProperties() {
	        this.beforeDestroy();

	        dom.removeElement(this.container);

	        this.id = null;
	        this.parent = null;
	        this.children = null;
	        this.container = null;
	        this.boundCache = null;
	    };

	    /**
	     * Destroy view instance
	     * @param {boolean} [onlyChildren=false] - set true then destroy only
	     *  children
	     */


	    View.prototype.destroy = function destroy() {
	        var onlyChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	        this.children.forEach(function (childView) {
	            childView.destroy();
	        });

	        if (onlyChildren) {
	            return;
	        }

	        this.clearProperties();
	    };

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


	    View.prototype.getBound = function getBound() {
	        var bound = this.boundCache;

	        if (!bound) {
	            bound = this.boundCache = _extends({}, dom.getRect(this.container));
	        }

	        return bound;
	    };

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


	    View.prototype.setBound = function setBound() {
	        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	            top = _ref.top,
	            right = _ref.right,
	            bottom = _ref.bottom,
	            left = _ref.left,
	            width = _ref.width,
	            height = _ref.height;

	        dom.setBound(this.container, { top: top, right: right, bottom: bottom, left: left, width: width, height: height });

	        this.boundCache = null;
	    };

	    /**
	     * Create fallback element when invoke constructor without container
	     * @returns {HTMLElement} fallback division element
	     */


	    View.prototype.createFallbackElement = function createFallbackElement() {
	        var el = document.createElement('div');

	        document.body.appendChild(el);

	        return el;
	    };

	    /**
	     * Add child view
	     * @param {View} view - child view to add
	     * @param {function} [before] - function that invoke before add
	     */


	    View.prototype.addChild = function addChild(view) {
	        var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : core.noop;
	        var children = this.children;


	        if (_tuiCodeSnippet2['default'].filter(children, function (child) {
	            return view === child;
	        }).length) {
	            return;
	        }

	        before.call(view, this);

	        // add parent view
	        view.parent = this;

	        children.push(view);
	    };

	    /**
	     * Remove child views
	     * @param {string|View} id - child view id or instance itself
	     * @param {function} [before] - function that invoke before remove
	     */


	    View.prototype.removeChild = function removeChild(id, before) {
	        var children = this.children;

	        var _id = _tuiCodeSnippet2['default'].isString(id) ? id : id.id;
	        var index = -1;

	        _tuiCodeSnippet2['default'].forEach(children, function (child, childIndex) {
	            if (index === -1 && _id === child.id) {
	                index = childIndex;
	            }
	        });

	        before = before || core.noop;

	        if (index < 0) {
	            return;
	        }

	        var view = children[index];

	        before.call(view, this);

	        children.splice(index, 1);
	    };

	    /**
	     * Render view recursively
	     */


	    View.prototype.render = function render() {
	        this.children.forEach(function (childView) {
	            childView.render();
	        });
	    };

	    /**
	     * Invoke function recursively.
	     * @param {function} iteratee - function to invoke child view recursively
	     * @param {boolean} [skipThis=false] - set true then skip invoke with
	     *  this(root) view.
	     */


	    View.prototype.recursive = function recursive() {
	        var iteratee = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : core.noop;
	        var skipThis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        if (!skipThis) {
	            iteratee(this);
	        }

	        this.children.forEach(function (childView) {
	            childView.recursive(iteratee);
	        });
	    };

	    /**
	     * Resize view recursively to parent.
	     * @param {...*} [args] - arguments for supplied to each parent view.
	     */


	    View.prototype.resize = function resize() {
	        var parent = this.parent;


	        while (parent) {
	            if (_tuiCodeSnippet2['default'].isFunction(parent._onResize)) {
	                var _parent;

	                (_parent = parent)._onResize.apply(_parent, arguments);
	            }

	            parent = parent.parent;
	        }
	    };

	    return View;
	}();

	/**
	 * @static
	 */


	View.id = 0;

	_tuiCodeSnippet2['default'].CustomEvents.mixin(View);

	exports['default'] = View;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.noop = noop;
	exports.uniq = uniq;
	exports.reduce = reduce;
	exports.remove = remove;

	var _tuiCodeSnippet = __webpack_require__(9);

	var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * A no-operation function that returns undefined regardless of the arguments
	 *  it receives.
	 * @ignore
	 */
	function noop() {}

	/**
	 * Create a duplicate-free version of an array
	 * @param {Array} array - The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @ignore
	 */
	/**
	 * @fileoverview Core utility methods module
	 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	 */
	function uniq(array) {
	    var map = new _tuiCodeSnippet2['default'].ExMap();

	    _tuiCodeSnippet2['default'].forEach(array, function (element) {
	        if (!map.get(element)) {
	            map.set(element, element);
	        }
	    });

	    var uniqArray = [];

	    map.forEach(function (value) {
	        uniqArray.push(value);
	    });

	    return uniqArray;
	}

	/**
	 * @param {Collection} collection - The collection to iterate over.
	 * @param {function} [iteratee] - The function invoked per iteration.
	 * @param {*} accumulator - The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @ignore
	 */
	function reduce(collection, iteratee, accumulator) {
	    if (_tuiCodeSnippet2['default'].isArray(collection)) {
	        if (accumulator) {
	            return collection.reduce(iteratee, accumulator);
	        }

	        return collection.reduce(iteratee);
	    }

	    _tuiCodeSnippet2['default'].forEach(collection, function (value, index) {
	        if (typeof accumulator === 'undefined') {
	            accumulator = value;
	        } else {
	            accumulator = iteratee(accumulator, value, index);
	        }
	    });

	    return accumulator;
	}

	/**
	 * Removes all elements from array that predicate returns truthy for and
	 *  returns an array of the removed elements. The predicate is invoked with
	 *  three arguments: (value, index, array).
	 * @param {Array} array - The array to modify.
	 * @param {(Function|String|Number)} predicate - The function invoked per
	 *  iteration.
	 * @returns {Array} Returns the new array of removed elements.
	 * @ignore
	 */
	function remove(array, predicate) {
	    var match = void 0;

	    if (_tuiCodeSnippet2['default'].isFunction(predicate)) {
	        match = function match(v) {
	            return predicate(v);
	        };
	    } else {
	        match = function match(v) {
	            return predicate === v;
	        };
	    }

	    var removed = [];

	    for (var idx = 0, len = array.length; idx < len; idx += 1) {
	        var value = array[idx];

	        if (match(value, idx, array)) {
	            removed.push(value);
	            array.splice(idx, 1);
	            len -= 1;
	            idx -= 1;
	        }
	    }

	    return removed;
	}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ })
/******/ ])
});
;