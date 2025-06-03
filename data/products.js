/*!
 * products.js
 * In-memory database for products used by the API.
 * This file exports an array of product objects.
 */

const products = [
  {
    id: '1',               // Unique identifier for the product
    name: 'Laptop',        // Name of the product
    description: 'High-performance laptop with 16GB RAM', // Brief description of the product
    price: 1200,           // Price in USD
    category: 'electronics',// Category to which the product belongs
    inStock: true          // Indicates if product is available in stock
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

module.exports = products;