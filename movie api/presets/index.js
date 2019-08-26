let carBrands = require('./brands');

carBrands = carBrands.map(car => {
	return {
		name: car.name.toLowerCase()
	};
});

module.exports.carBrands = carBrands;
