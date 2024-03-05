const { search, locations } = require("kijiji-scraper");
const { Table } = require("console-table-printer");

async function scrapeKijiji(locations, params) {
	const ads = await Promise.all(
		locations.map((location) =>
			search({
				locationId: location,
				...params,
				options: options,
			})
		)
	);

	const adsData = ads
		.flat()
		.filter(
			(ad) =>
				ad.attributes?.price &&
				ad.attributes?.carmileageinkms &&
				ad.attributes?.caryear
		)
		.map((ad) => {
			let value =
				((ad.attributes?.caryear - options.minYear) / (2024 - options.minYear) +
					(ad.attributes?.carmileageinkms - options.maxKm) / options.maxKm) /
				(2 * ad.attributes?.price);
			return {
				Title: ad.title,
				Price: ad.attributes?.price,
				Location: ad.attributes?.location,
				Year: ad.attributes?.caryear,
				Make: ad.attributes?.carmake,
				Model: ad.attributes?.carmodel,
				Trim: ad.attributes?.cartrim,
				Odometer: ad.attributes?.carmileageinkms,
				Description: ad.description,
				Value: value,
			};
		});
	const table = new Table();
	const adsDataSorted = adsData.sort((a, b) => b.Value - a.Value);
	table.addRows(adsDataSorted);
	table.printTable();
}

const locations_param = [
	locations.ONTARIO.HAMILTON.id,
	locations.ONTARIO.TORONTO_GTA.MISSISSAUGA_PEEL_REGION.id,
	locations.ONTARIO.KITCHENER_AREA.KITCHENER_WATERLOO.id,
	locations.ONTARIO.KITCHENER_AREA.CAMBRIDGE.id,
];
const params = {
	categoryId: 27, // Category ID for cars and vehicles
	q: "toyota corolla", // search keyword
	adType: "OFFERED",
	maxPrice: 15000,
};

const options = {
	minResults: -1,
	minYear: 2000,
	maxKm: 300000,
};

scrapeKijiji(locations_param, params, options)
	.then(() => {
		console.log("ok");
	})
	.catch((err) => {
		console.error(err);
	});
