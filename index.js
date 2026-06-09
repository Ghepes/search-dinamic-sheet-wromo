// We import the main logic
import './sheet-search-wromo.js';

// 1. We allow use as NPM modules
export const init = (options) => {
    if (typeof window !== 'undefined' && window.ProductSearchWidget) {
        // The settings (options) to your mount function
        return window.ProductSearchWidget.mount(options);
    }
};

// 2. Export the object for default import
const widget = typeof window !== 'undefined' ? window.ProductSearchWidget : null;
export default widget;
