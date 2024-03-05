# car-scraper
 
## Usage

```
cd {REPO_BASE}/car_scraper
npm i
node main.js
```

## Options

```
const params = {
	categoryId: 27, // Category ID for cars and vehicles
	q: "toyota corolla", // search keyword
	adType: "OFFERED", // use "OFFER" if switching to browser api
	maxPrice: 15000, // highest price willing to purchase at
};

const locations_param = [
	locations.ONTARIO.HAMILTON.id, ... // List of location id's within the locations object
];

const options = {
	minResults: -1, // min number of results to return. -1 => return everything
	minYear: 2000, // *required* lowest year willing to purchase
	maxKm: 300000, // *required* highest milage willing to purchase
};
```
