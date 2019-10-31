const productsMock = [{
    "active": true,
    "boughtUnits": 90,
    "clientPrice": 3000,
    "description": "Tortilla de harina de trigo enrollada rellena de diversos y ricos ingredientes",
    "id": "60be5e14-3396-4ab8-ae5b-2906fde9f2cb",
    "image": "https://images.pexels.com/photos/327168/pexels-photo-327168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "name": "Burrito",
    "soldUnits": 70,
    "unitaryPrice": 2000,
    "units": 20,
}];

function filteredProductsMock(name) {
    return productsMock.filter(product => product.name === 'name');
}

class ProductsServiceMock {
    async getProducts() {
        return Promise.resolve(productsMock);
    }

    async createProduct() {
        return Promise.resolve(productsMock[0]);
    }
}

module.exports = {
    ProductsServiceMock,
    filteredProductsMock,
    productsMock
};