const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const products = require('../data/products');
const { NotFoundError, ValidationError } = require('../errors');
const asyncHandler = require('../middleware/asyncHandler');

// Validation middleware for product creation and update
function validateProduct(req, res, next) {
  const { name, price, description, category, inStock } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "name"' });
  }
  
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: 'Invalid or missing "price"' });
  }
  
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "description"' });
  }
  
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "category"' });
  }
  
  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'Invalid or missing "inStock" (should be boolean)' });
  }
  
  next();
}

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns all products
 *     description: Retrieve a paginated list of products.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page.
 *     responses:
 *       200:
 *         description: A JSON array of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                       inStock:
 *                         type: boolean
 */
// GET /api/products - Get all products with pagination e.g. /api/products?page=1&limit=10
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || products.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: products.length,
    data: paginatedProducts
  });
});

// GET /api/products/:id - Get a specific product e.g /api/products/1
router.get('/:id', asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    throw new NotFoundError('Product not found');
  }
}));

// GET /api/products/category/:category - Get products by category e.g /api/products/category/electronics
router.get('/category/:category', asyncHandler(async (req, res) => {
  const { category } = req.params;
  const filteredProducts = products.filter(product => product.category === category);
  res.json(filteredProducts);
}));

// GET /api/products/search - Search products by name using query parameter "q" e.g /api/products/search?q=laptop
router.get('/search', asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: 'Query parameter "q" is required for search.' });
  }
  const searchTerm = q.toLowerCase();
  const matchingProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  res.json(matchingProducts);
}));

// GET /api/products/stats - Get product statistics (count by category) e.g /api/products/stats
router.get('/stats', asyncHandler(async (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
}));

// POST /api/products - Create a new product 
router.post('/', validateProduct, asyncHandler(async (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
}));

// PUT /api/products/:id - Update an existing product e.g /api/products/1
router.put('/:id', validateProduct, asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    throw new NotFoundError('Product not found');
  }
}));

// DELETE /api/products/:id - Delete a product e.g /api/products/1
router.delete('/:id', asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}));

module.exports = router;