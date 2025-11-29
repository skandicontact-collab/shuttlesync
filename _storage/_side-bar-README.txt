1. side-bar.js
    $w('#statebox').changeState("pay");

2. side-bar-velo.js
    $w("#htmlSidebar").postMessage({
   hide: ["pay","training","desttools"]
});

3. README
    ✔ How to Use This in Wix Studio

1. Add an HTML Embed

Add → Embed → HTML iframe

2. Paste the full sidebar code

3. Set width
	•	Desktop: 260px
	•	Tablet: 180px
	•	Mobile: 78px (sidebar auto-collapses)

4. Connect navigation

If each module is in a different Multi-State Box inside Wix:
-----side-bar.js-----
$w('#statebox').changeState("pay");
---------------------
You replace "pay" with:
	•	"home"
	•	"profile"
	•	"schedule"
	•	"pay"
	•	"training"
	•	"docs"
	•	"baseinfo"
	•	"desttools"
	•	"help"

These match the data-page="" attributes in the HTML.

5. For Airtable-based permissions

You can hide menu items with Velo:
-----side-bar-velo.js-----
$w("#htmlSidebar").postMessage({
   hide: ["pay","training","desttools"]
});
--------------------------

