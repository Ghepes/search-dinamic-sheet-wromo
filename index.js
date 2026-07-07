// ==========================================
// index.js - NPM Entry Point (Hibrid Node/CDN)
// ==========================================
(function initWromoPackage() {
    const baseUrl = "https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.9";

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // Node.js environment / Module installed via terminal (npm install)
        const sheetSearch = require('./sheet-search-wromo.js');
        const wromoBlog = require('./wromo-blog-widgets.js');

        module.exports = {
            sheetSearch,
            wromoBlog
        };
    } else {
        // Browser Environment / Called directly via <script> tag from CDN
        const scriptsToLoad = [
            `${baseUrl}/sheet-search-wromo.js`,
            `${baseUrl}/wromo-blog-widgets.js`
        ];

        // Sequential injection into the browser DOM
        scriptsToLoad.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false; 
            document.body.appendChild(script);
        });
    }
})();