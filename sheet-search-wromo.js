(function attachSheetProductSearchWidget(global) {
  "use strict";

  var STYLE_ID = "product-search-widget-styles";
  var DEFAULT_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Crect width='640' height='420' fill='%23e9efe9'/%3E%3Cpath d='M160 280l92-100 74 76 62-56 92 80' fill='none' stroke='%23859a8d' stroke-width='22' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='238' cy='144' r='34' fill='%23859a8d'/%3E%3C/svg%3E";
  var DEFAULT_MAPPING = {
    productId: 0,
    title: 1,
    imageUrl: 2,
    pageUrl: 3,
    description: 4,
    price: 5,
    keywords: 6
  };
  var INJECTED_STYLE = [
    ":root {",
    "  --psw-panel: rgba(255, 255, 255, 0.96);",
    "  --psw-ink: #163126;",
    "  --psw-muted: #5d7267;",
    "  --psw-line: rgba(22, 49, 38, 0.12);",
    "  --psw-accent: #1e8e64;",
    "  --psw-accent-soft: rgba(30, 142, 100, 0.12);",
    "  --psw-shadow: 0 24px 48px rgba(18, 45, 35, 0.16);",
    "}",
    ".psw-mount {",
    "  width: min(860px, 100%);",
    "  margin: 0 auto;",
    "}",
    ".psw-shell {",
    "  position: relative;",
    "  width: 100%;",
    "  z-index: 10;",
    "}",
    ".psw-form {",
    "  display: block;",
    "}",
    ".psw-searchbox {",
    "  display: grid;",
    "  grid-template-columns: 24px minmax(0, 1fr);",
    "  align-items: center;",
    "  gap: 12px;",
    "  width: 100%;",
    "  min-height: 68px;",
    "  padding: 0 22px;",
    "  border: 1px solid rgba(22, 49, 38, 0.14);",
    "  border-radius: 999px;",
    "  background: rgba(255, 255, 255, 0.94);",
    "  box-shadow: 0 16px 30px rgba(18, 45, 35, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);",
    "}",
    ".psw-searchbox:focus-within {",
    "  border-color: rgba(30, 142, 100, 0.42);",
    "  box-shadow: 0 0 0 4px rgba(30, 142, 100, 0.12);",
    "}",
    ".psw-searchbox svg {",
    "  width: 24px;",
    "  height: 24px;",
    "  color: var(--psw-accent);",
    "}",
    ".psw-input {",
    "  width: 100%;",
    "  border: 0;",
    "  outline: 0;",
    "  background: transparent;",
    "  color: var(--psw-ink);",
    "  font: 500 1.08rem/1.4 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-input::placeholder {",
    "  color: #8a978f;",
    "}",
    ".psw-results {",
    "  position: absolute;",
    "  top: calc(100% + 14px);",
    "  left: 0;",
    "  right: 0;",
    "  display: grid;",
    "  gap: 14px;",
    "  padding: 18px;",
    "  border: 1px solid var(--psw-line);",
    "  border-radius: 28px;",
    "  background: var(--psw-panel);",
    "  box-shadow: var(--psw-shadow);",
    "  backdrop-filter: blur(16px);",
    "}",
    ".psw-results[hidden] {",
    "  display: none;",
    "}",
    ".psw-meta {",
    "  min-height: 22px;",
    "  text-align: left;",
    "  color: var(--psw-muted);",
    "  font: 400 0.96rem/1.5 Georgia, 'Times New Roman', serif;",
    "}",
    ".psw-grid {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, minmax(0, 1fr));",
    "  gap: 18px;",
    "}",
    ".psw-card {",
    "  display: grid;",
    "  gap: 14px;",
    "  min-height: 100%;",
    "  padding: 18px;",
    "  border: 1px solid var(--psw-line);",
    "  border-radius: 26px;",
    "  background: var(--psw-panel);",
    "  box-shadow: 0 16px 32px rgba(18, 45, 35, 0.08);",
    "  overflow: hidden;",
    "}",
    ".psw-card-media {",
    "  aspect-ratio: 16 / 11;",
    "  overflow: hidden;",
    "  border-radius: 20px;",
    "  background: linear-gradient(135deg, #f1f4f0, #dce7df);",
    "}",
    ".psw-card-media img {",
    "  width: 100%;",
    "  height: 100%;",
    "  object-fit: cover;",
    "  display: block;",
    "}",
    ".psw-card-body {",
    "  display: grid;",
    "  gap: 10px;",
    "  grid-template-rows: auto 1fr auto;",
    "  align-content: start;",
    "}",
    ".psw-card-title {",
    "  margin: 0;",
    "  color: var(--psw-ink);",
    "  font: 700 1.15rem/1.3 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "  overflow-wrap: anywhere;",
    "  word-break: break-word;",
    "}",
    ".psw-card-desc {",
    "  display: -webkit-box;",
    "  margin: 0;",
    "  overflow: hidden;",
    "  color: var(--psw-muted);",
    "  font: 400 0.95rem/1.55 Georgia, 'Times New Roman', serif;",
    "  -webkit-line-clamp: 3;",
    "  -webkit-box-orient: vertical;",
    "  overflow-wrap: anywhere;",
    "  word-break: break-word;",
    "}",
    ".psw-card-footer {",
    "  display: flex;",
    "  justify-content: space-between;",
    "  align-items: center;",
    "  gap: 12px;",
    "  margin-top: 6px;",
    "}",
    ".psw-price {",
    "  color: var(--psw-ink);",
    "  font: 700 1rem/1 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-link {",
    "  display: inline-flex;",
    "  align-items: center;",
    "  justify-content: center;",
    "  min-height: 40px;",
    "  padding: 0 16px;",
    "  border-radius: 999px;",
    "  background: #12392b;",
    "  color: #fff;",
    "  text-decoration: none;",
    "  font: 700 0.9rem/1 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-empty {",
    "  padding: 24px;",
    "  border: 1px dashed rgba(22, 49, 38, 0.16);",
    "  border-radius: 24px;",
    "  text-align: center;",
    "  color: var(--psw-muted);",
    "  background: rgba(255, 255, 255, 0.56);",
    "  font: 400 1rem/1.6 Georgia, 'Times New Roman', serif;",
    "}",
    "@media (max-width: 768px) {",
    "  .psw-grid {",
    "    grid-template-columns: repeat(2, minmax(0, 1fr));",
    "  }",
    "}",
    "@media (max-width: 425px) {",
    "  .psw-searchbox {",
    "    min-height: 60px;",
    "    padding: 0 18px;",
    "  }",
    "  .psw-results {",
    "    position: static;",
    "    margin-top: 12px;",
    "    padding: 16px;",
    "  }",
    "  .psw-grid {",
    "    grid-template-columns: 1fr;",
    "  }",
    "  .psw-card-footer {",
    "    align-items: stretch;",
    "    flex-direction: column;",
    "  }",
    "  .psw-link {",
    "    width: 100%;",
    "  }",
    "}",
    ""
  ].join("\n");

  function injectStyles(doc) {
    if (doc.getElementById(STYLE_ID)) {
      return;
    }

    var style = doc.createElement("style");
    style.id = STYLE_ID;
    style.textContent = INJECTED_STYLE;
    doc.head.appendChild(style);
  }

  function normalizeText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function normalizePrice(value) {
    if (typeof value === "number" && isFinite(value)) {
      return "$" + value.toFixed(2);
    }

    return normalizeText(value) || "Price on request";
  }

  function sanitizeUrl(value, fallback) {
    var source = normalizeText(value);

    if (!source) {
      return fallback;
    }

    if (
      source.indexOf("/") === 0 ||
      source.indexOf("./") === 0 ||
      source.indexOf("../") === 0 ||
      source.indexOf("#") === 0
    ) {
      return source;
    }

    if (/^https?:\/\//i.test(source)) {
      return source;
    }

    return fallback;
  }

  function cellToString(cell) {
    if (!cell) {
      return "";
    }

    if (typeof cell.f === "string" && cell.f.trim()) {
      return cell.f.trim();
    }

    if (cell.v === null || cell.v === undefined) {
      return "";
    }

    if (typeof cell.v === "string") {
      return cell.v.trim();
    }

    if (typeof cell.v === "number" || typeof cell.v === "boolean") {
      return String(cell.v);
    }

    if (cell.v instanceof Date) {
      return cell.v.toISOString();
    }

    return String(cell.v).trim();
  }

  function extractJsonFromGoogleResponse(rawText) {
    var start = rawText.indexOf("{");
    var end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Google Sheets response did not contain valid JSON.");
    }

    return JSON.parse(rawText.slice(start, end + 1));
  }

  function buildSheetUrl(source, useCacheBust) {
    var url = new URL(
      "https://docs.google.com/spreadsheets/d/" +
        encodeURIComponent(source.sheetId) +
        "/gviz/tq"
    );

    url.searchParams.set("tqx", "out:json");
    url.searchParams.set("headers", "0");

    if (source.sheetName) {
      url.searchParams.set("sheet", source.sheetName);
    }

    if (source.gid !== undefined && source.gid !== null && source.gid !== "") {
      url.searchParams.set("gid", String(source.gid));
    }

    if (useCacheBust !== false) {
      url.searchParams.set("cacheBust", Date.now().toString(36));
    }

    return url.toString();
  }

  function parseKeywords(value) {
    var text = normalizeText(value);

    if (!text) {
      return [];
    }

    if (text.charAt(0) === "[") {
      try {
        var parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed.map(normalizeText).filter(Boolean);
        }
      } catch (error) {
        // Fall back to delimiter parsing.
      }
    }

    return text
      .split(/[,|;]/)
      .map(normalizeText)
      .filter(Boolean);
  }

  function resolveMapping(mappingName) {
    var mappingRoot = global.WebsiteMapping || {};
    var mappingKey = normalizeText(mappingName) || "web";
    var chosen = mappingRoot[mappingKey];

    if (!chosen || typeof chosen !== "object" || !chosen.fields) {
      return DEFAULT_MAPPING;
    }

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
      description:
        normalizeText(source.description) ||
        "Product details will appear here when available.",
      price: normalizePrice(source.price),
      keywords: Array.isArray(source.keywords)
        ? source.keywords.map(normalizeText).filter(Boolean)
        : []
    };
  }

  function isLikelyHeaderRow(product) {
    return (
      product.productId.toLowerCase() === "productid" &&
      product.title.toLowerCase() === "title"
    );
  }

  function rowsToProducts(rows, mapping) {
    return rows
      .map(function mapRow(row, index) {
        var cells = row && Array.isArray(row.c) ? row.c : [];
        var product = normalizeProduct(
          {
            productId: cellToString(cells[mapping.productId]),
            title: cellToString(cells[mapping.title]),
            imageUrl: cellToString(cells[mapping.imageUrl]),
            pageUrl: cellToString(cells[mapping.pageUrl]),
            description: cellToString(cells[mapping.description]),
            price: cellToString(cells[mapping.price]),
            keywords: parseKeywords(cellToString(cells[mapping.keywords]))
          },
          "product-" + (index + 1)
        );

        return product;
      })
      .filter(function keepProduct(product) {
        return normalizeText(product.productId) || normalizeText(product.title);
      })
      .filter(function skipHeaderRows(product) {
        return !isLikelyHeaderRow(product);
      });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function scoreProduct(product, term) {
    var title = product.title.toLowerCase();
    var description = product.description.toLowerCase();
    var productId = product.productId.toLowerCase();
    var keywords = product.keywords.join(" ").toLowerCase();
    var score = 0;

    if (title === term) {
      score += 140;
    } else if (title.indexOf(term) === 0) {
      score += 100;
    } else if (title.indexOf(term) !== -1) {
      score += 70;
    }

    if (keywords.indexOf(term) !== -1) {
      score += 45;
    }

    if (productId.indexOf(term) !== -1) {
      score += 25;
    }

    if (description.indexOf(term) !== -1) {
      score += 18;
    }

    return score;
  }

  function filterProducts(products, query, minChars, limit) {
    var term = normalizeText(query).toLowerCase();

    if (term.length < minChars) {
      return products.slice(0, limit);
    }

    return products
      .map(function addScore(product) {
        return {
          product: product,
          score: scoreProduct(product, term)
        };
      })
      .filter(function keepMatch(entry) {
        return entry.score > 0;
      })
      .sort(function sortMatches(a, b) {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.product.title.localeCompare(b.product.title);
      })
      .slice(0, limit)
      .map(function unwrap(entry) {
        return entry.product;
      });
  }

  function createMarkup(doc, options) {
    var shell = doc.createElement("section");
    shell.className = "psw-shell";
    shell.innerHTML =
      '  <form class="psw-form" novalidate>' +
      '    <label class="psw-searchbox" aria-label="' +
      escapeHtml(options.label) +
      '">' +
      '      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '        <path d="M10.5 4a6.5 6.5 0 1 0 4.3 11.37l4.42 4.42 1.4-1.4-4.42-4.42A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" fill="currentColor"></path>' +
      "      </svg>" +
      '      <input class="psw-input" type="search" autocomplete="off" spellcheck="false" placeholder="' +
      escapeHtml(options.placeholder) +
      '">' +
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
      grid.innerHTML =
        '<div class="psw-empty">No matching products were found. Try another keyword or a shorter phrase.</div>';
      return;
    }

    grid.innerHTML = items
      .map(function mapProduct(product) {
        return (
          '<article class="psw-card" role="listitem">' +
          '  <div class="psw-card-media">' +
          '    <img src="' +
          escapeHtml(product.imageUrl) +
          '" alt="' +
          escapeHtml(product.title) +
          '">' +
          "  </div>" +
          '  <div class="psw-card-body">' +
          '    <h3 class="psw-card-title">' +
          escapeHtml(product.title) +
          "</h3>" +
          '    <p class="psw-card-desc">' +
          escapeHtml(product.description) +
          "</p>" +
          '    <div class="psw-card-footer">' +
          '      <span class="psw-price">' +
          escapeHtml(product.price) +
          "</span>" +
          '      <a class="psw-link" href="' +
          escapeHtml(product.pageUrl) +
          '">Open product</a>' +
          "    </div>" +
          "  </div>" +
          "</article>"
        );
      })
      .join("");
  }

  function resolveTarget(doc, target) {
    if (target && typeof target === "string") {
      return doc.querySelector(target);
    }

    if (target && target.nodeType === 1) {
      return target;
    }

    return (
      doc.querySelector("[data-product-search-sheet]") ||
      doc.querySelector("header") ||
      doc.querySelector("main") ||
      doc.body
    );
  }

  async function loadConfig(configUrl) {
    var response = await fetch(configUrl, {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(
        "Failed to load sheet config from " +
          configUrl +
          " (" +
          response.status +
          " " +
          response.statusText +
          ")."
      );
    }

    return response.json();
  }

  async function loadProductsFromSheet(options) {
    var source = {
      sheetId: options.sheetId,
      sheetName: options.sheetName,
      gid: options.gid
    };

    if (!normalizeText(source.sheetId) && normalizeText(options.configUrl)) {
      var config = await loadConfig(options.configUrl);
      source.sheetId = config.sheetId;
      source.sheetName = config.sheetName || source.sheetName;
      source.gid = config.gid !== undefined ? config.gid : source.gid;
    }

    if (!normalizeText(source.sheetId)) {
      throw new Error("SheetProductSearchWidget requires sheetId or configUrl.");
    }

    var response = await fetch(buildSheetUrl(source, options.cacheBust !== false), {
      method: "GET",
      cache: "no-store",
      credentials: "omit"
    });

    if (!response.ok) {
      throw new Error(
        "Failed to load sheet data (" +
          response.status +
          " " +
          response.statusText +
          ")."
      );
    }

    var rawText = await response.text();
    var payload = extractJsonFromGoogleResponse(rawText);
    var rows = payload.table && Array.isArray(payload.table.rows) ? payload.table.rows : [];
    return rowsToProducts(rows, resolveMapping(options.mappingName));
  }

  function mountSearch(options) {
    var config = Object.assign(
      {
        target: null,
        configUrl: "",
        sheetId: "",
        sheetName: "",
        gid: "",
        mappingName: "web",
        minChars: 3,
        maxResults: 8,
        placeholder: "Search by product title, ID, or keyword..."
      },
      options || {}
    );
    var minChars = Number(config.minChars) || 3;
    var maxResults = Number(config.maxResults) || 8;
    var inputPlaceholder =
      normalizeText(config.placeholder) || "Search by product title, ID, or keyword...";
    var doc = global.document;
    var target = resolveTarget(doc, config.target);

    if (!target) {
      throw new Error("SheetProductSearchWidget could not find a mount target.");
    }

    injectStyles(doc);

    return loadProductsFromSheet(config).then(function handleProducts(products) {
      var shell = createMarkup(doc, {
        label: "Product search",
        placeholder: inputPlaceholder
      });
      var grid = shell.querySelector(".psw-grid");
      var meta = shell.querySelector(".psw-meta");
      var input = shell.querySelector(".psw-input");
      var resultsPanel = shell.querySelector(".psw-results");
      var wrapper =
        target.hasAttribute && target.hasAttribute("data-product-search-sheet")
          ? target
          : doc.createElement("div");

      if (wrapper !== target) {
        wrapper.className = "psw-mount";
        target.appendChild(wrapper);
      } else {
        wrapper.innerHTML = "";
        wrapper.classList.add("psw-mount");
      }

      wrapper.appendChild(shell);

      function openResults() {
        resultsPanel.hidden = false;
      }

      function closeResults() {
        resultsPanel.hidden = true;
      }

      function draw(query) {
        var trimmed = normalizeText(query);
        var results;

        if (!trimmed) {
          meta.textContent = "";
          grid.innerHTML = "";
          closeResults();
          return;
        }

        openResults();

        if (trimmed.length < minChars) {
          meta.textContent =
            "Type at least " +
            minChars +
            " letters to search the catalog.";
          grid.innerHTML =
            '<div class="psw-empty">Keep typing to open matching products in this search tray.</div>';
          return;
        }

        results = filterProducts(products, trimmed, minChars, maxResults);

        if (results.length) {
          meta.textContent =
            results.length +
            " matching product" +
            (results.length === 1 ? "" : "s") +
            ' for "' +
            trimmed +
            '".';
        } else {
          meta.textContent = 'No products match "' + trimmed + '".';
        }

        renderProducts(grid, results);
      }

      input.addEventListener("input", function handleInput(event) {
        draw(event.target.value);
      });

      input.addEventListener("focus", function handleFocus() {
        if (normalizeText(input.value)) {
          draw(input.value);
        }
      });

      shell.querySelector(".psw-form").addEventListener("submit", function blockSubmit(event) {
        event.preventDefault();
      });

      shell.addEventListener("keydown", function handleKeydown(event) {
        if (event.key === "Escape") {
          closeResults();
          input.blur();
        }
      });

      doc.addEventListener("click", function handleDocumentClick(event) {
        if (!shell.contains(event.target)) {
          closeResults();
        }
      });

      return {
        element: shell,
        products: products,
        refresh: draw
      };
    });
  }

  function autoMount() {
    var nodes = global.document.querySelectorAll("[data-product-search-sheet]");

    nodes.forEach(function mountNode(node) {
      if (node.getAttribute("data-product-search-ready") === "true") {
        return;
      }

      node.setAttribute("data-product-search-ready", "true");
      mountSearch({
        target: node,
        configUrl: node.getAttribute("data-product-search-sheet-config"),
        sheetId: node.getAttribute("data-product-search-sheet-id"),
        sheetName: node.getAttribute("data-product-search-sheet-name"),
        gid: node.getAttribute("data-product-search-sheet-gid"),
        mappingName: node.getAttribute("data-product-search-sheet-map") || "web",
        minChars: Number(node.getAttribute("data-product-search-min-chars")) || 3,
        maxResults: Number(node.getAttribute("data-product-search-limit")) || 8,
        placeholder: node.getAttribute("data-product-search-placeholder") || undefined
      }).catch(function handleError(error) {
        node.innerHTML =
          '<div class="psw-empty">The product search could not load right now.</div>';
        console.error(error);
      });
    });
  }

  global.SheetProductSearchWidget = {
    mount: mountSearch,
    autoMount: autoMount
  };

  if (global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", autoMount);
  } else {
    autoMount();
  }
})(window);
