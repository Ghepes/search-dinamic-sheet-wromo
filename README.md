# search-dinamic-sheet-wromo
Search bar data Website from Spreadsheet Google Only with url ID from Spreadsheet


## v1.1.1 ##
Each new version is different: use the version that suits yor team.
What's coming in v1.1.1 : Besides a new search bar design connected with Google sheet, we added shop page products with dynamic pagination, and blog page + single blog page on click. it is still in its early stages and is not yet complete but each version will get closer to completion.

# Each version will bring new improvements. The direction of Studio Wromo for dynamic html saas design: for json data formats.
Each new piece in this design pyramid will bring huge value over time.
Our models do not need packages that can change or the next day bring errors, and are static models dynamically packaged that serve forever.

## For excellent security I suggest to add the SRI integrity code:
## For example, you search for it through https://registry.npmjs.org/sheet-search-wromo : the correct "integrity hash" according to the version
````
<script 
  src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.7/wromo-assets-injector-sheet.js" 
  integrity="sha512-ibkZQQ3DGVDGnDhgsrCMZoi1WTRy7KfDvIvKy4t24zpfmO7GpnffzpAhuMo8D32qdDjhWcjI2Z2cwX2Q1XikLw==" 
  crossorigin="anonymous" defer>
</script>
````

## Installation
* ## dynamic CDN installation:

* ## For ALL HEAD WEBPAGE 
````

		  <!--Google font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.1.1/wromo-assets-injector-sheet.js"></script>
</head>
<body>

````

* ## For BODY SEARCH WEBPAGE 


````

<div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        
<div
	  style="position: relative; z-index: 99999;"
      data-product-search-sheet
      data-product-search-sheet-id="1StUxxxxxxxxxxx-IUaB8l_uPPhs, 1AUsTBP9VfYBosxxxxxxxxxxxxxTrRucpC29LkU"
      data-product-search-sheet-name="Sheet1"
      data-product-search-map="web"
      data-product-search-placeholder="Search the sheet catalog..."
      data-product-search-min-chars="3"
      data-product-search-limit="40">
    </div>

      </div>
    </div>
  </div>

````

* ## For BODY PRODUCTS WEBPAGE 

````

<section style="padding: 60px 0; background-color: #f8f9fa; min-height: 80vh;">
  <div class="container">
    
    <div
      data-product-shop-grid
      data-product-search-sheet-id="1StUxxxxxxxxxxx-IUaB8l_uPPhs, 1AUsTBP9VfYBosxxxxxxxxxxxxxTrRucpC29LkU"
      data-product-search-sheet-name="Tabell1"
      data-product-search-map="web"
      data-product-shop-limit="12">
    </div>

  </div>
</section>

````

* ## For BODY BLOG WEBPAGE 

````
<div
      data-blog-grid
      data-blog-sheet-id="1StUxxxxxxxxxxx-IUaB8l_uPPhs, 1AUsTBP9VfYBosxxxxxxxxxxxxxTrRucpC29LkU"
      data-blog-sheet-name="Date_Publice, Date_Private"
      data-blog-map="blog"
      data-blog-limit="8">
</div>

````
* ## For END BODY SCRIPT JS + MAPS = PRODUCTS

````
<script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.1.1/maps.js"></script> // <!-- maps.js for Shop / mapsblog.js blog -->
<script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.1.1/js/sheet-search-wromo.js" defer></script>

</body>
````
* ## For END BODY SCRIPT JS + MAPS = BLOG

````
 <script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.1.1/mapsblog.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.1.1/wromo-blog-widgets.js" defer></script>

</body>
````
![v1.1.1 Shop + Search](/img/image-9.png)
![v1.1.1 Blog + Search + Single page](/img/image-8.png)



## v1.0.4 ##
 improvement - depends on the theme, the div can be placed as desired - body or header:
````
<div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        
        <div
	  style="position: relative; z-index: 99999;"
      data-product-search-sheet
      data-product-search-sheet-id="YOUR_SHEET_ID"
      data-product-search-sheet-name="Sheet1"
      data-product-search-map="web"
      data-product-search-placeholder="Search the sheet catalog..."
      data-product-search-min-chars="3"
      data-product-search-limit="8">
    </div>

      </div>
    </div>
  </div>
````

 ## Body v1.0.4


````
<script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.4/maps.js"></script>
<script 
  src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.4/sheet-search-wromo.js" 
  integrity="sha512-[HASH_NEW_GENERATED_HERE]"
  crossorigin="anonymous" defer>
</script>
````
---
![v1.0.4](/img/image-5.png)
![v1.0.4](/img/image-6.png)
General access "Anyone with the link"
![Sheet public Link](/img/image-7.png)



## v1.0.3

In version v1.0.3, the star list view data sheet was added to the search bar and other pages.
Removing the button, and clicking on the entire product portion to reach the single product page.

![v1.0.3](/img/image-3.png)
Add the possibility of requesting data for the shop page or single product page: infoAdvanced ID is exactly for advanced details on the single page where it is attached under the product as advanced details and you can add a simple info text or an html URL where the advanced data with images and explanations about a product listed.

---

## v1.0.2
Added data points (Rating & Single page info product): 

ratingStars: 7, // Column H 

ratingText: 8, // Column I 

ratingUser: 9, // Column J 

infoAdvanced: 10 // Column K


---

![Style search bar for your website](/img/image.png)
![Mobile Style search bar for your website](/img/image-1.png)

## The following steps must be followed to add a search bar with your own data from your own Google Spreadsheet:
## It can be installed as an NPM package or added as a static url
````
npm i search-dinamic-sheet-wromo
````

## For any installation method, the following DIV point must be added to the header:
````
<div
  data-product-search-sheet
  data-product-search-sheet-id="INSERT_YOUR_SHEET_ID_HERE"  // <-- Change to INSERT_... from URL Sheet!!! -->
  data-product-search-sheet-name="NumeleTabuluiDacaEnevoie" // <-- Change to INSERT_... Name Sheet!!! -->
  data-product-search-sheet-map="web"
  data-product-search-placeholder="Search the sheet catalog..." // <-- Change to INSERT_... Name Bar search!!! -->
  data-product-search-min-chars="3"
  data-product-search-limit="8"
></div>

</header>
````


## Add the following CDN url to the end of the body (Only for Static webpage) (For NPM packages: only need maps.js):
````
    <script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.0/maps.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.0/sheet-search-wromo.js" defer></script>

    </body>
````



![Spreadsheet google products](/img/image-4.png)

## example product sheet:
````
									
productId	title	imageUrl	pageUrl	description	price	keywords	

orion-desk-lamp	Orion Desk Next	https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80	/products/orion-desk-next	A brass desk next with warm LED light and a dimmable touch base for focused workspaces.	$256.00	next, desk, next, space, orion	

luma-office-chair	Office Desk Next	https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=900&q=80	/products/or-desk-new	Now modern office interiors without overwhelming the layout, next type.	$421.00	office, desk, next, space, orion	

atlas-walnut-desk	New Desk Next	https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80	/products/ion-desk-ne	Compact wireless speaker tuned for clear remote meetings in medium-sized workspaces.	$625.00	new, desk, next, space, orion	

orion-desk-lamp	Now Desk Next	https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80	/products/ozn-desk-blue	Eight adjustment, quiet motor control, and a wide surface for dual-monitor setups.	$198.00	now, desk, next, space, orion

halo-monitor-stand	Monitor Desk Next	https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80	/products/ovo-desk-test	Ilhouette built for long professional sessions for focused workspaces.	$296.00	monitor, desk, next, space, orion	

terra-planter-set	Terra Planet Next	https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80	/products/lup-desk-man	Screens to eye level while adding hidden storage for notebooks, cables, and accessories.	$366.00	terra, desk, next, space, orion	

folio-storage-unit	Folio Storage Next	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80	/products/ner-desk-beb	Ceramic planters that soften modern office interiors without overwhelming the layout.	$544.00	folio, desk, next, space, orion	
````

## The search is performed using "keywords".
## Each sheet row is prescribed according to maps as the products are written: id, title, image url, description, price, and keywords
````
productId	
title	
imageUrl	
pageUrl	
description	
price	
keywords
````


## Other specifications according to statics webpages:
## Use cdn url with SRI "integrity" id format:
````
## Version 1.0.0 
````
````
<script 
  src="https://cdn.jsdelivr.net/npm/search-dinamic-sheet-wromo@1.0.0/sheet-search-wromo.js" 
  integrity="sha512-[HASH_NEW_GENERATED_HERE]"
  crossorigin="anonymous" defer>
</script>
````
---

Good luck with the sheet search bar!



Original example Sheet:



By Wromo
Iulian Ghepes