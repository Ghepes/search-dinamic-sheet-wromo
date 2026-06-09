# search-dinamic-sheet-wromo
Search bar data Website from Spreadsheet Google Only with url ID from Spreadsheet



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

By Wromo
Iulian Ghepes