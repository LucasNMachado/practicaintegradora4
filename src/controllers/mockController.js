// import faker from "faker";
import Product from '../dao/mongo/models/productModel.js'; 


export const mockingProducts = async (req, res) => {
  try {
    const numberOfProducts = 100;
    const mockedProducts = [];

    for (let i = 0; i < numberOfProducts; i++) {
      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        code: faker.random.alphaNumeric(8).toUpperCase(),
        price: parseFloat(faker.commerce.price()),
        status: faker.random.boolean() ? 'available' : 'out_of_stock',
        stock: faker.random.number({ min: 1, max: 100 }),
        category: faker.random.arrayElement(['Electronics', 'Clothing', 'Books', 'Home']),
        thumbnails: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
      });

      mockedProducts.push(product);
      await product.save();
    }

    res.json({
      status: 'success',
      message: 'Mocked products generated and saved successfully',
      products: mockedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
};

