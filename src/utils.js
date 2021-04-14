export const test = "I'm an import";

/**
 * 
 * @param {String} name 
 * @returns Object => DOM Element
 */
 function makeHtmlEl(name) {
    return document.createElement(name);
}

/**
 * 
 * @param {Object} el 
 * @returns Object => DOM Element
 */
function copy(el) {
    return el.cloneNode(true);
}

/**
 * 
 * @param {Object} el 
 * @param {String} inner 
 * @returns Object => DOM Element
 */
function innerHtml(el, inner) {
    try {
        let cp = copy(el);
        cp.innerHTML = inner;
        return cp;
    } catch (e) {
        console.log(e);
    }
}

/**
 * 
 * @param {Object} parent 
 * @param {Object} child 
 * @returns Object => DOM Element
 */
function append(parent, child) {
    try {
        let parentcopy = copy(parent);
        let childcopy = copy(child);
        parentcopy.appendChild(childcopy);
        return parentcopy;
    } catch (e) {
        console.log(e);
    }
    
}

export {
    makeHtmlEl,
    innerHtml,
    append,
    copy
}