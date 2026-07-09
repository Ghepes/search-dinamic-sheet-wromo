// ==========================================
  // WROMO BLOG MODULES (CORECTAT 'global' -> 'window')
  // ==========================================
  // --- GLOBAL HELPER FUNCTIONS FOR BLOG WIDGET ---
  var DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Crect width='640' height='420' fill='%23e9efe9'/%3E%3Cpath d='M160 280l92-100 74 76 62-56 92 80' fill='none' stroke='%23859a8d' stroke-width='22' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='238' cy='144' r='34' fill='%23859a8d'/%3E%3C/svg%3E";

  function normalizeText(value) { return typeof value === "string" ? value.trim() : ""; }
  
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
  
  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // ==========================================
  // AUTOMATIC BLOG INITIALIZATION
  // ==========================================

  window.document.addEventListener("DOMContentLoaded", function() {
    
    // 3. Initializing Blog Grid
    var blogGridNodes = window.document.querySelectorAll("[data-blog-grid]");
    blogGridNodes.forEach(function (node) {
      if (node.getAttribute("data-blog-ready") === "true") return;
      node.setAttribute("data-blog-ready", "true");
      mountBlogGrid({
        target: node,
        sheetId: node.getAttribute("data-blog-sheet-id"),
        sheetName: node.getAttribute("data-blog-sheet-name"),
        limit: Number(node.getAttribute("data-blog-limit")) || 6
      });
    });

    // 4. Initializing Blog Single Page
    var blogSingleNodes = window.document.querySelectorAll("[data-blog-single]");
    blogSingleNodes.forEach(function (node) {
      if (node.getAttribute("data-blog-ready") === "true") return;
      node.setAttribute("data-blog-ready", "true");
      mountBlogSingle({
        target: node,
        sheetId: node.getAttribute("data-blog-sheet-id"),
        sheetName: node.getAttribute("data-blog-sheet-name")
      });
    });

  });

  var BLOG_MAPPING = {
    id: 0, title: 1, summary: 2, fullDesc: 3, source: 4, media: 5, date: 6, urlSlug: 7, author: 8
  };

  function rowsToBlogs(rows) {
    return rows.map(function(row) {
      var cells = row && Array.isArray(row.c) ? row.c : [];
      return {
        id: cellToString(cells[BLOG_MAPPING.id]),
        title: cellToString(cells[BLOG_MAPPING.title]),
        summary: cellToString(cells[BLOG_MAPPING.summary]),
        fullDesc: cellToString(cells[BLOG_MAPPING.fullDesc]),
        source: cellToString(cells[BLOG_MAPPING.source]),
        media: sanitizeUrl(cellToString(cells[BLOG_MAPPING.media]), DEFAULT_IMAGE),
        date: cellToString(cells[BLOG_MAPPING.date]) || new Date().toLocaleDateString(),
        urlSlug: cellToString(cells[BLOG_MAPPING.urlSlug]),
        author: cellToString(cells[BLOG_MAPPING.author]) || "admin"
      };
    }).filter(function(blog) {
      return blog.id && blog.title.toLowerCase() !== "title"; // Avoid the header
    });
  }

  // Downloading and saving blogs to local cloudx-bricks-prod-bucket
  async function loadBlogsFromSheet(options) {
    var source = { sheetId: options.sheetId, sheetName: options.sheetName };
    if (!normalizeText(source.sheetId)) throw new Error("Blog requires sheetId.");

    var sheetIds = source.sheetId.split(',').map(normalizeText).filter(Boolean);
    var cacheKey = "wromo_blog_multi_" + sheetIds.join("_") + "_" + (source.sheetName || "default");
    var cacheTimeKey = cacheKey + "_time";
    var cacheDuration = 1000 * 60 * 60; // 60 minutes cache

    // MODIFIED: we use window.localStorage
    var cachedData = window.localStorage.getItem(cacheKey);
    var cachedTime = window.localStorage.getItem(cacheTimeKey);

    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < cacheDuration)) {
      console.log("Blog data loaded from Local Storage");
      return JSON.parse(cachedData);
    }

    var allBlogs = [];
    var fetchPromises = sheetIds.map(async function(singleId) {
      var singleSource = Object.assign({}, source, { sheetId: singleId });
      try {
        var response = await fetch(buildSheetUrl(singleSource, true), { method: "GET", cache: "no-store", credentials: "omit" });
        if (!response.ok) return [];
        var rawText = await response.text();
        var payload = extractJsonFromGoogleResponse(rawText);
        var rows = payload.table && Array.isArray(payload.table.rows) ? payload.table.rows : [];
        return rowsToBlogs(rows);
      } catch (error) {
        console.error("Eroare descarcare Blog Sheet: " + singleId, error);
        return [];
      }
    });

    var resultsArray = await Promise.all(fetchPromises);
    resultsArray.forEach(function(blogs) { allBlogs = allBlogs.concat(blogs); });

    if (allBlogs.length > 0) {
      // MODIFIED: we use window.localStorage
      window.localStorage.setItem(cacheKey, JSON.stringify(allBlogs));
      window.localStorage.setItem(cacheTimeKey, Date.now().toString());
    }
    return allBlogs;
  }

  // --- 1. BLOG GRID (ALL) WITH PAGINATION ---
  function mountBlogGrid(options) {
    // MODIFIED: we use window.document
    var doc = window.document;
    var target = options.target;
    if (!target) return Promise.reject(new Error("Blog target not found"));

    var limit = options.limit || 8;
    var currentPage = 1;

    target.innerHTML = 
      '<div class="breadcrumb-section"><div class="container"><h2>Blog</h2><nav class="theme-breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="/">Home</a></li><li class="breadcrumb-item active">Blog</li></ol></nav></div></div>' +
      '<section class="blog-page section-b-space ratio2_3"><div class="container"><div class="row g-sm-4 g-3"><div class="col-lg-12 col-xl-12 col-xxl-12 no-sidebar">' +
      '<div class="row g-4 wromo-blog-grid"></div>' + 
      '<div class="wromo-blog-pagination"></div>' + 
      '</div></div></div></section>';

    var grid = target.querySelector(".wromo-blog-grid");
    var pagination = target.querySelector(".wromo-blog-pagination");
    
    return loadBlogsFromSheet(options).then(function (blogs) {
      function renderPage(page) {
        var totalPages = Math.ceil(blogs.length / limit);
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        currentPage = page;

        var start = (page - 1) * limit;
        var currentBlogs = blogs.slice(start, start + limit);

        grid.innerHTML = currentBlogs.map(function(blog) {
          var singleLink = 'single/?article=' + encodeURIComponent(blog.urlSlug || blog.id);
          return (
            '<div class="col-sm-6 col-xxl-4">' +
            '  <div class="blog-box sticky-blog-box">' +
            '    <div class="blog-image">' +
            '      <div class="blog-label-tag"><i class="ri-pushpin-fill"></i></div>' +
            '      <a href="' + singleLink + '"><img src="' + escapeHtml(blog.media) + '" alt="' + escapeHtml(blog.title) + '" style="width:100%; object-fit:cover;"></a>' +
            '    </div>' +
            '    <div class="blog-contain">' +
            '      <a href="' + singleLink + '"><h3>' + escapeHtml(blog.title) + '</h3></a>' +
            '      <div class="blog-label">' +
            '        <span class="time"><i class="ri-time-line"></i><span>' + escapeHtml(blog.date) + '</span></span>' +
            '        <span class="super"><i class="ri-user-line"></i><span>' + escapeHtml(blog.author) + '</span></span>' +
            '      </div>' +
            '      <p>' + escapeHtml(blog.summary) + '</p>' +
            '      <a class="blog-button" href="' + singleLink + '">Read More <i class="ri-arrow-right-line"></i></a>' +
            '    </div>' +
            '  </div>' +
            '</div>'
          );
        }).join("");

        buildPagination(totalPages);
      }

      function buildPagination(totalPages) {
        if (totalPages <= 1) { pagination.innerHTML = ""; return; }
        var html = '<div class="product-pagination"><div class="theme-paggination-block"><nav><ul class="pagination">';
        for (var i = 1; i <= totalPages; i++) {
          var active = (i === currentPage) ? "active" : "";
          html += '<li class="page-item ' + active + '"><a class="page-link" href="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>';
        }
        html += '</ul></nav></div></div>';
        pagination.innerHTML = html;

        pagination.querySelectorAll('.page-link').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            renderPage(parseInt(this.getAttribute('data-page')));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      }

      renderPage(1);
    });
  }

  // --- 2. SINGLE BLOG PAGE ---
  function mountBlogSingle(options) {
    // MODIFIED: we use window
    var doc = window.document;
    var target = options.target;
    if (!target) return Promise.reject(new Error("Single Blog target not found"));

    // MODIFIED: we use window.location
    var urlParams = new URLSearchParams(window.location.search);
    var articleSlug = urlParams.get('article');

    if (!articleSlug) {
      target.innerHTML = '<div class="container py-5 text-center"><h2>The article was not found.</h2><a href="/blog/" class="btn btn-solid">Back to Blog</a></div>';
      return Promise.resolve();
    }

    return loadBlogsFromSheet(options).then(function (blogs) {
      var blog = blogs.find(function(b) { return b.urlSlug === articleSlug || b.id === articleSlug; });

      if (!blog) {
        target.innerHTML = '<div class="container py-5 text-center"><h2>The article was not found in the database.</h2><a href="/blog/" class="btn btn-solid">Back to Blog</a></div>';
        return;
      }

      var formattedDesc = blog.fullDesc.split('\n').filter(Boolean).map(function(p) {
        return '<p>' + escapeHtml(p) + '</p>';
      }).join('');

      target.innerHTML = 
        '<div class="breadcrumb-section"><div class="container"><h2>Blog</h2><nav class="theme-breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="/">Home</a></li><li class="breadcrumb-item"><a href="/blog/">Blog</a></li><li class="breadcrumb-item active">Blog Details</li></ol></nav></div></div>' +
        '<section class="blog-detail-page section-b-space ratio2_3">' +
        '  <div class="container">' +
        '    <div class="blog-detail">' +
        '      <img class="img-fluid" src="' + escapeHtml(blog.media) + '" alt="' + escapeHtml(blog.title) + '">' +
        '      <h3>' + escapeHtml(blog.title) + '</h3>' +
        '      <ul class="post-social">' +
        '        <li><i class="ri-time-line"></i> ' + escapeHtml(blog.date) + '</li>' +
        '        <li><i class="ri-user-line"></i> Posted By : ' + escapeHtml(blog.author) + '</li>' +
        '        <li><i class="ri-link-m"></i> Source: <a href="' + escapeHtml(blog.source) + '" target="_blank">Link</a></li>' +
        '      </ul>' +
        '    </div>' +
        '    <div class="blog-detail-contain">' +
               formattedDesc +
        '    </div>' +
        '  </div>' +
        '</section>';
    });
  }
