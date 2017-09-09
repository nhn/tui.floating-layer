/**
 * @fileoverview Core utility methods module
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */
import snippet from 'tui-code-snippet';

/**
 * A no-operation function that returns undefined regardless of the arguments
 *  it receives.
 * @ignore
 */
export function noop() {}

/**
 * Create a duplicate-free version of an array
 * @param {Array} array - The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @ignore
 */
export function uniq(array) {
    const map = new snippet.ExMap();

    snippet.forEach(array, element => {
        if (!map.get(element)) {
            map.set(element, element);
        }
    });

    const uniqArray = [];

    map.forEach(value => {
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
export function reduce(collection, iteratee, accumulator) {
    if (snippet.isArray(collection)) {
        if (accumulator) {
            return collection.reduce(iteratee, accumulator);
        }

        return collection.reduce(iteratee);
    }

    snippet.forEach(collection, (value, index) => {
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
export function remove(array, predicate) {
    let match;

    if (snippet.isFunction(predicate)) {
        match = function(v) {
            return predicate(v);
        };
    } else {
        match = function(v) {
            return predicate === v;
        };
    }

    const removed = [];

    for (let idx = 0, len = array.length; idx < len; idx += 1) {
        const value = array[idx];

        if (match(value, idx, array)) {
            removed.push(value);
            array.splice(idx, 1);
            len -= 1;
            idx -= 1;
        }
    }

    return removed;
}
