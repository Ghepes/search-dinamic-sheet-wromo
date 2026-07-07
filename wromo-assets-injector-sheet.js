(function injectWromoAssets() {
    const baseUrl = "https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.5";

    // 1. Function to inject CSS/Fonts into
    function injectHeadResources() {
        const resources = [
            { tag: 'link', rel: 'stylesheet', href: `${baseUrl}/css/font-awesome.css` },
            { tag: 'link', rel: 'stylesheet', href: `${baseUrl}/css/remixicon.css` },
            { tag: 'link', rel: 'stylesheet', href: `${baseUrl}/css/bootstrap.css` },
            { tag: 'link', rel: 'stylesheet', href: `${baseUrl}/css/style.css` }
        ];

        resources.forEach(res => {
            const el = document.createElement(res.tag);
            el.rel = res.rel;
            el.href = res.href;
            document.head.appendChild(el);
        });
    }

    // 2. Function to inject HTML and Script into 
    function injectBodyResources() {
        // Tap to top insertion
        const tapTop = document.createElement('div');
        tapTop.className = 'tap-top';
        tapTop.style.display = 'block';
        tapTop.innerHTML = `
            <div>
                <i class="ri-arrow-up-double-line"></i>
            </div>
        `;
        document.body.appendChild(tapTop);

        // Insert script
        const script = document.createElement('script');
        script.src = `${baseUrl}/js/script-wro.js`;
        document.body.appendChild(script);
    }

    // We execute the Head injection immediately
    injectHeadResources();

    // We execute the Body injection only when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectBodyResources);
    } else {
        injectBodyResources();
    }
})();
