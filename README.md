# FedEx Tracking Clone

A simple front-end tracking page clone that demonstrates a basic FedEx-style tracking flow.

## Features
- Tracking form with validation
- Detailed tracking page
- View-more-details page
- JSON-based shipment data loading
- Basic invalid tracking ID handling

## Project Files
- `fedex-tracking.html` — main tracking form page
- `fedex-tracking-detailed.html` — detailed tracking page
- `View-more-details.html` — shipment facts and travel history page
- `js/fedx-tab.js` — tab switching and form submission behavior
- `js/tracking-detailed.js` — detailed tracking page interactions
- `js/view-more-details.js` — loads shipment details from JSON
- `data/shipments.json` — sample shipment data

## How it works
1. Enter a tracking number on the main page.
2. Click TRACK to open the detailed tracking page.
3. Click "View more details" to open the full shipment details page.
4. The pages read shipment information from the JSON file.

## Notes
- The current demo uses sample data from `data/shipments.json`.
- Invalid tracking numbers show a warning message instead of displaying normal tracking details.
