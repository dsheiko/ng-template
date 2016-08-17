"use strict";
exports.observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    return function (el, callback) {
        if (MutationObserver) {
            // define a new observer
            var observer = new MutationObserver(function (mutations) {
                var matches = mutations.filter(function (mutation) {
                    return mutation.addedNodes.length ||
                        mutation.removedNodes.length || mutation.type === "attributes";
                });
                if (matches.length) {
                    callback();
                }
            });
            // have the observer observe foo for changes in children
            observer.observe(el, { childList: true, subtree: true, attributes: true, characterData: true });
            return;
        }
        [
            "DOMNodeInserted",
            "DOMNodeRemoved",
            "DOMSubtreeModified",
            "DOMAttrModified",
            "DOMAttributeNameChanged",
            "DOMCharacterDataModified"
        ].forEach(function (ev) {
            el.addEventListener(ev, callback, false);
        });
    };
})();
