(function attachSheetProductSearchWidget(global) {
  "use strict";
  var STYLE_ID = "product-search-widget-styles";
  var DEFAULT_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Crect width='640' height='420' fill='%23e9efe9'/%3E%3Cpath d='M160 280l92-100 74 76 62-56 92 80' fill='none' stroke='%23859a8d' stroke-width='22' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='238' cy='144' r='34' fill='%23859a8d'/%3E%3C/svg%3E";
  var DEFAULT_MAPPING = {
    productId: 0, title: 1, imageUrl: 2, pageUrl: 3, description: 4, price: 5, keywords: 6, ratingStars: 7, ratingText: 8, ratingUser: 9, infoAdvanced: 10
  };
  
  var INJECTED_STYLE = [
    ":root { --psw-panel: rgba(255, 255, 255, 0.96); --psw-ink: #163126; --psw-muted: #5d7267; --psw-line: rgba(22, 49, 38, 0.12); --psw-accent: #1e8e64; --psw-accent-soft: rgba(30, 142, 100, 0.12); --psw-shadow: 0 24px 48px rgba(18, 45, 35, 0.16); }",
    ".psw-mount { width: min(860px, 100%); margin: 0 auto; }",
    ".psw-shell { position: relative; width: 100%; z-index: 999; }",
    ".psw-form { display: block; }",
    ".psw-searchbox { display: grid; grid-template-columns: 24px minmax(0, 1fr); align-items: center; gap: 12px; width: 100%; min-height: 68px; padding: 0 22px; border: 1px solid rgba(22, 49, 38, 0.14); border-radius: 999px; background: rgba(255, 255, 255, 0.94); box-shadow: 0 16px 30px rgba(18, 45, 35, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8); }",
    ".psw-searchbox:focus-within { border-color: rgba(30, 142, 100, 0.42); box-shadow: 0 0 0 4px rgba(30, 142, 100, 0.12); }",
    ".psw-searchbox svg { width: 24px; height: 24px; color: var(--psw-accent); }",
    ".psw-input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--psw-ink); font: 500 1.08rem/1.4 'Trebuchet MS', 'Segoe UI', sans-serif; }",
    ".psw-input::placeholder { color: #8a978f; }",
    ".psw-results { position: absolute; border-radius: 28px; top: calc(100% + 14px); left: 0; right: 0; display: grid; gap: 14px; padding: 18px; border: 1px solid var(--psw-line); background: var(--psw-panel); box-shadow: var(--psw-shadow); backdrop-filter: blur(16px); }",
    ".psw-results[hidden] { display: none; }",
    ".psw-meta { min-height: 22px; text-align: left; color: var(--psw-muted); font: 400 0.96rem/1.5 Georgia, 'Times New Roman', serif; }",
    ".psw-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }",
    ".psw-card-link { text-decoration: none; display: block; color: inherit; }",
    ".psw-card { display: grid; gap: 14px; min-height: 100%; padding: 18px; border: 1px solid var(--psw-line); border-radius: 26px; background: var(--psw-panel); box-shadow: 0 16px 32px rgba(18, 45, 35, 0.08); overflow: hidden; transition: transform 0.2s ease, box-shadow 0.2s ease; }",
    ".psw-card-link:hover .psw-card { transform: translateY(-4px); box-shadow: 0 24px 48px rgba(18, 45, 35, 0.12); }",
    ".psw-card-media { aspect-ratio: 16 / 11; overflow: hidden; border-radius: 20px; background: linear-gradient(135deg, #f1f4f0, #dce7df); }",
    ".psw-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; }",
    ".psw-card-body { display: grid; gap: 10px; grid-template-rows: auto 1fr auto; align-content: start; }",
    ".psw-card-title { margin: 0; color: var(--psw-ink); font: 700 1.15rem/1.3 'Trebuchet MS', 'Segoe UI', sans-serif; overflow-wrap: anywhere; word-break: break-word; }",
    ".psw-card-desc { display: -webkit-box; margin: 0; overflow: hidden; color: var(--psw-muted); font: 400 0.95rem/1.55 Georgia, 'Times New Roman', serif; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow-wrap: anywhere; word-break: break-word; }",
    ".psw-card-footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 6px; }",
    ".psw-price { color: var(--psw-ink); font: 700 1rem/1 'Trebuchet MS', 'Segoe UI', sans-serif; }",
    ".psw-stars { color: #f59e0b; font-size: 0.95rem; letter-spacing: 2px; }",
    ".psw-link { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 16px; border-radius: 999px; background: #12392b; color: #fff; text-decoration: none; font: 700 0.9rem/1 'Trebuchet MS', 'Segoe UI', sans-serif; }",
    ".psw-reviews { display: grid; gap: 4px; margin-top: 6px; padding-top: 10px; border-top: 1px dashed var(--psw-line); }",
    ".psw-review-text { font: 400 0.85rem/1.4 Georgia, 'Times New Roman', serif; color: var(--psw-muted); font-style: italic; }",
    ".psw-review-user { font: 700 0.8rem/1 'Trebuchet MS', 'Segoe UI', sans-serif; color: var(--psw-ink); text-align: right; }",
    ".psw-empty { padding: 24px; border: 1px dashed rgba(22, 49, 38, 0.16); border-radius: 24px; text-align: center; color: var(--psw-muted); background: rgba(255, 255, 255, 0.56); font: 400 1rem/1.6 Georgia, 'Times New Roman', serif; }",
    ".psw-shop-wrap { width: 100%; display: flex; flex-direction: column; gap: 30px; }",
    ".psw-pagination { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 20px; }",
    ".psw-page-btn { min-width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--psw-line); background: var(--psw-panel); color: var(--psw-ink); border-radius: 50%; cursor: pointer; font: 700 1rem/1 'Trebuchet MS', sans-serif; transition: all 0.2s; }",
    ".psw-page-btn:hover { background: var(--psw-accent-soft); border-color: var(--psw-accent); }",
    ".psw-page-btn.active { background: var(--psw-accent); color: #fff; border-color: var(--psw-accent); }",
    /* --- SUBTLE SCROLLBAR FOR SEARCH --- */
    ".psw-results { max-height: 60vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }",
    ".psw-results::-webkit-scrollbar { width: 5px; }",
    ".psw-results::-webkit-scrollbar-track { background: transparent; }",
    ".psw-results::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }",
    ".psw-results::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }",
    
    /* ORIGINAL RULES */
    "@media (max-width: 1400px) { .psw-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }",
    "@media (max-width: 1200px) { .psw-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }",
    "@media (max-width: 992px) { .psw-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }",
    "@media (max-width: 320px) { .psw-grid { grid-template-columns: 1fr; } .psw-card-footer { align-items: stretch; flex-direction: column; } }"
  ].join("\n");

   function injectStyles(doc) {
    if (doc.getElementById(STYLE_ID)) return;
    var link = doc.createElement("link");
    link.id = STYLE_ID;
    link.rel = "stylesheet";
    link.href = "data:text/css," + encodeURIComponent(INJECTED_STYLE);
    doc.head.appendChild(link);
  }

  function normalizeText(value) { return typeof value === "string" ? value.trim() : ""; }
  function normalizePrice(value) { return typeof value === "number" && isFinite(value) ? "$" + value.toFixed(2) : normalizeText(value) || "Price on request"; }
  function sanitizeUrl(value, fallback) {
    var source = normalizeText(value);
    if (!source) return fallback;
    if (source.indexOf("/") === 0 || source.indexOf("./") === 0 || source.indexOf("../") === 0 || source.indexOf("#") === 0) return source;
    if (/^https?:\/\//i.test(source)) return source;
    return fallback;
  }
  function cellToString(cell) {
    if (!cell) return "";
    if (typeof cell.f === "string" && cell.f.trim()) return cell.f.trim();
    if (cell.v === null || cell.v === undefined) return "";
    if (typeof cell.v === "string") return cell.v.trim();
    if (typeof cell.v === "number" || typeof cell.v === "boolean") return String(cell.v);
    if (cell.v instanceof Date) return cell.v.toISOString();
    return String(cell.v).trim();
  }

  function extractJsonFromGoogleResponse(rawText) {
    var start = rawText.indexOf("{");
    var end = rawText.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) throw new Error("Google Sheets response did not contain valid JSON.");
    return JSON.parse(rawText.slice(start, end + 1));
  }

  function buildSheetUrl(source, useCacheBust) {
    var url = new URL("https://docs.google.com/spreadsheets/d/" + encodeURIComponent(source.sheetId) + "/gviz/tq");
    url.searchParams.set("tqx", "out:json");
    url.searchParams.set("headers", "0");
    if (source.sheetName) url.searchParams.set("sheet", source.sheetName);
    if (source.gid !== undefined && source.gid !== null && source.gid !== "") url.searchParams.set("gid", String(source.gid));
    if (useCacheBust !== false) url.searchParams.set("cacheBust", Date.now().toString(36));
    return url.toString();
  }

  function parseKeywords(value) {
    var text = normalizeText(value);
    if (!text) return [];
    if (text.charAt(0) === "[") {
      try {
        var parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed.map(normalizeText).filter(Boolean);
      } catch (error) {}
    }
    return text.split(/[,|;]/).map(normalizeText).filter(Boolean);
  }

  function resolveMapping(mappingName) {
    var mappingRoot = global.WebsiteMapping || {};
    var mappingKey = normalizeText(mappingName) || "web";
    var chosen = mappingRoot[mappingKey];
    if (!chosen || typeof chosen !== "object" || !chosen.fields) return DEFAULT_MAPPING;
    return Object.assign({}, DEFAULT_MAPPING, chosen.fields);
  }

  function normalizeProduct(record, fallbackId) {
    var source = record && typeof record === "object" ? record : {};
    var productId = normalizeText(source.productId || fallbackId);
    var title = normalizeText(source.title || productId);
    var url = normalizeText(source.pageUrl || "#");
    return {
      productId: productId || "product-" + Math.random().toString(36).slice(2, 10),
      title: title || "Untitled product",
      imageUrl: sanitizeUrl(source.imageUrl, DEFAULT_IMAGE),
      pageUrl: sanitizeUrl(url, "#"),
      description: normalizeText(source.description) || "Product details will appear here when available.",
      price: normalizePrice(source.price),
      keywords: Array.isArray(source.keywords) ? source.keywords.map(normalizeText).filter(Boolean) : [],
      ratingStars: normalizeText(source.ratingStars),
      ratingText: normalizeText(source.ratingText),
      ratingUser: normalizeText(source.ratingUser),
      infoAdvanced: normalizeText(source.infoAdvanced)
    };
  }

  function isLikelyHeaderRow(product) {
    return (product.productId.toLowerCase() === "productid" && product.title.toLowerCase() === "title");
  }

  function rowsToProducts(rows, mapping) {
    return rows.map(function (row, index) {
      var cells = row && Array.isArray(row.c) ? row.c : [];
      return normalizeProduct({
        productId: cellToString(cells[mapping.productId]), title: cellToString(cells[mapping.title]), imageUrl: cellToString(cells[mapping.imageUrl]), pageUrl: cellToString(cells[mapping.pageUrl]), description: cellToString(cells[mapping.description]), price: cellToString(cells[mapping.price]), keywords: parseKeywords(cellToString(cells[mapping.keywords])), ratingStars: cellToString(cells[mapping.ratingStars]), ratingText: cellToString(cells[mapping.ratingText]), ratingUser: cellToString(cells[mapping.ratingUser]), infoAdvanced: cellToString(cells[mapping.infoAdvanced])
      }, "product-" + (index + 1));
    }).filter(function (product) {
      return normalizeText(product.productId) || normalizeText(product.title);
    }).filter(function (product) {
      return !isLikelyHeaderRow(product);
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function scoreProduct(product, term) {
    var title = product.title.toLowerCase();
    var description = product.description.toLowerCase();
    var productId = product.productId.toLowerCase();
    var keywords = product.keywords.join(" ").toLowerCase();
    var score = 0;
    if (title === term) score += 140;
    else if (title.indexOf(term) === 0) score += 100;
    else if (title.indexOf(term) !== -1) score += 70;
    if (keywords.indexOf(term) !== -1) score += 45;
    if (productId.indexOf(term) !== -1) score += 25;
    if (description.indexOf(term) !== -1) score += 18;
    return score;
  }

  function filterProducts(products, query, minChars, limit) {
    var term = normalizeText(query).toLowerCase();
    if (term.length < minChars) return products.slice(0, limit);
    return products.map(function (product) {
      return { product: product, score: scoreProduct(product, term) };
    }).filter(function (entry) {
      return entry.score > 0;
    }).sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.product.title.localeCompare(b.product.title);
    }).slice(0, limit).map(function (entry) { return entry.product; });
  }

  function createMarkup(doc, options) {
    var shell = doc.createElement("section");
    shell.className = "psw-spt-0 j-box ratio_square";
    shell.innerHTML =
      '  <form class="psw-form" novalidate>' +
      '    <label class="psw-searchbox" aria-label="' + escapeHtml(options.label) + '">' +
      '      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10.5 4a6.5 6.5 0 1 0 4.3 11.37l4.42 4.42 1.4-1.4-4.42-4.42A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" fill="currentColor"></path></svg>' +
      '      <input class="psw-input" type="search" autocomplete="off" spellcheck="false" placeholder="' + escapeHtml(options.placeholder) + '">' +
      "    </label>" +
      "  </form>" +
      '  <div class="psw-results" hidden>' +
      '    <div class="psw-meta" aria-live="polite"></div>' +
      '    <div class="psw-grid" role="list"></div>' +
      "  </div>";
    return shell;
  }

  function renderProducts(grid, items) {
    if (!items.length) {
      grid.innerHTML = '<div class="psw-empty">No products found.</div>';
      return;
    }

    grid.innerHTML = items.map(function (product) {
      // 1. Logic for stars (adapted to theme classes)
      var num = parseInt(product.ratingStars, 10);
      var starsHtml = "";
      if (!isNaN(num) && num > 0) {
        var stars = "";
        for (var i = 1; i <= 5; i++) {
            // If the theme uses ri-star-fill for full and ri-star-line for empty
           stars += i <= num ? '<i class="ri-star-fill"></i> ' : '<i class="ri-star-line"></i> ';
        }
        starsHtml = '<div class="rating">' + stars + '</div>';
      }

      // 2. Extracting the number of reviews
      var reviewCountHtml = "";
      if(product.ratingText) {
          // RatingText contains the number, e.g. "24"
          reviewCountHtml = '<span> ' + escapeHtml(product.ratingText) + ' </span>';
      }

      // 3. Tag (New/Trending) - using infoAdvanced or similar mapping, if available
      // Generic class 'trending-label' instead of 'trending-label-product11' 
      // Dynamic on all products.
      var labelHtml = "";
      if(product.infoAdvanced) {
          labelHtml = '<label class="trending-label">' + escapeHtml(product.infoAdvanced) + '</label>';
      }

      // 4. Logic for cut price and discount (If you add these columns in the future)
      // For now, we'll just leave the main Product Price, but you can expand on that.
      var priceHtml = escapeHtml(product.price); 

      // 5. Assembling the final design using theme classes
      return (
        '<div>' +
        '  <div class="basic-product theme-product-3">' +
        '    <div class="img-wrapper">' +
               // Main link on image
        '      <a href="' + escapeHtml(product.pageUrl) + '" class="bg-size blur-up lazyloaded" style="background-image: url(\'' + escapeHtml(product.imageUrl) + '\'); background-size: cover; background-position: center center; display: block;">' +
        '        <img src="' + escapeHtml(product.imageUrl) + '" class="img-fluid blur-up lazyload bg-img" alt="' + escapeHtml(product.title) + '" style="display: none;">' +
        '      </a>' +
        '      <div class="cart-info">' +
                 // Wishlist button (separate logic later)
        '        <a href="javascript:void(0)" title="Add to Wishlist" data-product-id="' + escapeHtml(product.productId) + '">' +
        '          <i class="ri-heart-line"></i>' +
        '        </a>' +
        '      </div>' +
               // Tag (New/Trending)
               labelHtml + 
        '    </div>' +
        '    <div class="product-detail">' +
               // Title
        '      <a class="product-title" href="' + escapeHtml(product.pageUrl) + '">' + escapeHtml(product.title) + '</a>' +
               // Product Description (h6)
        '      <h6>' + escapeHtml(product.description) + '</h6>' +
               // Product Price
        '      <h4 class="price">' + priceHtml + '</h4>' +
               // Product Rating
        '      <div class="rating-w-count mb-0 mt-2">' +
                 starsHtml +
                 reviewCountHtml +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
      );
    }).join("");
  }

  async function loadConfig(configUrl) {
    var response = await fetch(configUrl, { method: "GET", cache: "no-store", credentials: "same-origin", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Failed to load sheet config");
    return response.json();
  }

  async function loadProductsFromSheet(options) {
    var source = { sheetId: options.sheetId, sheetName: options.sheetName, gid: options.gid };
    
    if (!normalizeText(source.sheetId) && normalizeText(options.configUrl)) {
      var config = await loadConfig(options.configUrl);
      source.sheetId = config.sheetId; 
      source.sheetName = config.sheetName || source.sheetName; 
      source.gid = config.gid !== undefined ? config.gid : source.gid;
    }
    
    if (!normalizeText(source.sheetId)) throw new Error("Requires sheetId or configUrl.");

    // 1. Extract all comma-separated IDs
    var sheetIds = source.sheetId.split(',').map(normalizeText).filter(Boolean);

    // 2. We create a unique memory key for the Sheets combination
    var cacheKey = "wromo_data_multi_" + sheetIds.join("_") + "_" + (source.sheetName || "default");
    var cacheTimeKey = cacheKey + "_time";
    var cacheDuration = 1000 * 60 * 60; // 60 minute

    var cachedData = global.localStorage.getItem(cacheKey);
    var cachedTime = global.localStorage.getItem(cacheTimeKey);

    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < cacheDuration)) {
      console.log("Public data uploaded to L-Storage via Multi Sheet");
      return JSON.parse(cachedData);
    }

    // 3. We download ALL tables simultaneously (Parallel for maximum speed)
    var allProducts = [];
    var fetchPromises = sheetIds.map(async function(singleId) {
      var singleSource = Object.assign({}, source, { sheetId: singleId });
      
      try {
        var response = await fetch(buildSheetUrl(singleSource, options.cacheBust !== false), { method: "GET", cache: "no-store", credentials: "omit" });
        if (!response.ok) {
          console.warn("Eroare la descărcarea sheet-ului: " + singleId);
          return []; 
        }
        var rawText = await response.text();
        var payload = extractJsonFromGoogleResponse(rawText);
        var rows = payload.table && Array.isArray(payload.table.rows) ? payload.table.rows : [];
        
        return rowsToProducts(rows, resolveMapping(options.mappingName));
      } catch (error) {
        console.error("Error processing the public data! " + singleId, error);
        return [];
      }
    });

    // 4. We wait for all downloads to finish and merge the results
    var resultsArray = await Promise.all(fetchPromises);
    resultsArray.forEach(function(productsFromOneSheet) {
      allProducts = allProducts.concat(productsFromOneSheet); // Unificăm în același format [{}]
    });

    // 5. We save the final result in memory
    if (allProducts.length > 0) {
      global.localStorage.setItem(cacheKey, JSON.stringify(allProducts));
      global.localStorage.setItem(cacheTimeKey, Date.now().toString());
      console.log("Date extrase din " + sheetIds.length + " surse și salvate în memorie.");
    }

    return allProducts;
  }

  // --- MOD SEARCH ORIGIN ---
  function mountSearch(options) {
    var doc = global.document;
    var target = doc.querySelector("[data-product-search-sheet]");
    if (!target && options.target) target = options.target;
    if (!target) return Promise.reject(new Error("Target not found"));
    
    injectStyles(doc);
    return loadProductsFromSheet(options).then(function (products) {
      var shell = createMarkup(doc, { label: "Product search", placeholder: options.placeholder });
      var grid = shell.querySelector(".psw-grid");
      var meta = shell.querySelector(".psw-meta");
      var input = shell.querySelector(".psw-input");
      var resultsPanel = shell.querySelector(".psw-results");
      
      target.appendChild(shell);
      
      function draw(query) {
        var trimmed = normalizeText(query);
        if (!trimmed) { resultsPanel.hidden = true; return; }
        resultsPanel.hidden = false;
        if (trimmed.length < options.minChars) {
          meta.textContent = "Type at least " + options.minChars + " letters.";
          grid.innerHTML = '<div class="psw-empty">Keep typing...</div>';
          return;
        }
        var results = filterProducts(products, trimmed, options.minChars, options.maxResults);
        meta.textContent = results.length ? results.length + " matching products." : 'No products match.';
        renderProducts(grid, results);
      }

      input.addEventListener("input", function(e) { draw(e.target.value); });
      input.addEventListener("focus", function(e) { if(input.value) draw(input.value); });
      shell.querySelector(".psw-form").addEventListener("submit", function(e) { e.preventDefault(); });
      shell.addEventListener("keydown", function(e) { if(e.key==="Escape") { resultsPanel.hidden=true; input.blur(); }});
      doc.addEventListener("click", function(e) { if(!shell.contains(e.target)) resultsPanel.hidden=true; });
    });
  }

  // --- SHOP MODULE (Grid with Pagination) ---
  function mountShop(options) {
    var doc = global.document;
    var target = options.target;
    if (!target) return Promise.reject(new Error("Shop target not found"));

    injectStyles(doc);
    var limit = options.limit || 24;
    var currentPage = 1;

    // Construim containerul pentru magazin
    target.className = "pt-0 j-box ratio_square";
    target.innerHTML = '<div class="psw-shop-grid g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4"></div><div class="shop-pagination-wrapper"></div>';
    var grid = target.querySelector(".psw-shop-grid");
    var pagination = target.querySelector(".shop-pagination-wrapper");

    return loadProductsFromSheet(options).then(function (products) {
      function renderPage(page) {
        var totalPages = Math.ceil(products.length / limit);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        currentPage = page;

        var start = (page - 1) * limit;
        var end = start + limit;
        var currentProducts = products.slice(start, end);

        renderProducts(grid, currentProducts);
        buildPagination(totalPages);
      }

      function buildPagination(totalPages) {
        if (totalPages <= 1) {
          pagination.innerHTML = "";
          return;
        }

        // Structure theme, without any extraneous classes added
        var html = '<div class="product-pagination"><div class="theme-paggination-block"><nav><ul class="pagination">';

        // Butonul BACK
        var prevDisabled = currentPage === 1 ? "disabled" : "";
        html += '<li class="page-item ' + prevDisabled + '">' +
                '  <a class="page-link" href="javascript:void(0)" aria-label="Previous" tabindex="-1" data-action="prev">' +
                '    <span><i class="ri-arrow-left-s-line"></i></span>' +
                '    <span class="sr-only">Previous</span>' +
                '  </a>' +
                '</li>';

        // Figures (1, 2, 3...)
        for (var i = 1; i <= totalPages; i++) {
          var activeClass = (i === currentPage) ? "active" : "";
          html += '<li class="page-item ' + activeClass + '">' +
                  '  <a class="page-link" href="javascript:void(0)" data-action="page" data-page="' + i + '">' + i + '</a>' +
                  '</li>';
        }

        // Buto NEXT
        var nextDisabled = currentPage === totalPages ? "disabled" : "";
        html += '<li class="page-item ' + nextDisabled + '">' +
                '  <a class="page-link" href="javascript:void(0)" aria-label="Next" data-action="next">' +
                '    <span><i class="ri-arrow-right-s-line"></i></span>' +
                '    <span class="sr-only">Next</span>' +
                '  </a>' +
                '</li>';

        html += '</ul></nav></div></div>';
        pagination.innerHTML = html;

        // --- Click Logic (We use data-action so as not to ruin the design) ---
        pagination.querySelectorAll('[data-action="page"]').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            renderPage(parseInt(this.getAttribute('data-page')));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });

        var prevBtn = pagination.querySelector('[data-action="prev"]');
        if (prevBtn && currentPage > 1) {
          prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            renderPage(currentPage - 1);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }

        var nextBtn = pagination.querySelector('[data-action="next"]');
        if (nextBtn && currentPage < totalPages) {
          nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            renderPage(currentPage + 1);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }

      renderPage(1); // Initializing the first page
    });
  }

  function autoMount() {
    // 1. Initializing the Search Bar
    var searchNodes = global.document.querySelectorAll("[data-product-search-sheet]");
    searchNodes.forEach(function (node) {
      if (node.getAttribute("data-product-search-ready") === "true") return;
      node.setAttribute("data-product-search-ready", "true");
      mountSearch({
        target: node,
        sheetId: node.getAttribute("data-product-search-sheet-id"),
        sheetName: node.getAttribute("data-product-search-sheet-name"),
        mappingName: node.getAttribute("data-product-search-map") || "web",
        minChars: Number(node.getAttribute("data-product-search-min-chars")) || 3,
        maxResults: Number(node.getAttribute("data-product-search-limit")) || 24,
        placeholder: node.getAttribute("data-product-search-placeholder")
      });
    });

    // 2. Initializing the Shop Page Grid
    var shopNodes = global.document.querySelectorAll("[data-product-shop-grid]");
    shopNodes.forEach(function (node) {
      if (node.getAttribute("data-product-shop-ready") === "true") return;
      node.setAttribute("data-product-shop-ready", "true");
      mountShop({
        target: node,
        sheetId: node.getAttribute("data-product-search-sheet-id"),
        sheetName: node.getAttribute("data-product-search-sheet-name"),
        mappingName: node.getAttribute("data-product-search-map") || "web",
        limit: Number(node.getAttribute("data-product-shop-limit")) || 24
      }).catch(function(err) {
        node.innerHTML = '<div class="psw-empty">The shop could not load right now.</div>';
        console.error(err);
      });
    });
  }

  global.SheetProductSearchWidget = {
    mount: mountSearch,
    mountShop: mountShop,
    autoMount: autoMount
  };

  if (global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", autoMount);
  } else {
    autoMount();
  }
})(window);
