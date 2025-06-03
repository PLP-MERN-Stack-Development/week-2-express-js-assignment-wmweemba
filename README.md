[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19697543&assignment_repo_type=AssignmentRepo)

# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server.
2. Create RESTful API routes for a product resource.
3. Implement custom middleware for logging, authentication, and validation.
4. Add comprehensive error handling.
5. Develop advanced features like filtering, pagination, search, and statistics.

## Getting Started

1. Accept the GitHub Classroom assignment invitation.
2. Clone your personal repository created by GitHub Classroom.
3. Install dependencies:
   
   ```
   npm install
   ```
4. Create a `.env` file based on the provided `.env.example` with the required environment variables.
5. Run the server:
   
   ```
   npm start
   ```

## Files Included

- `server.js`: Main Express.js server file.
- `/routes/products.js`: Contains all product-related API endpoints.
- `/middleware`: Custom middleware files (logger, auth, asyncHandler, errorHandler).
- `/data/products.js`: In-memory database for products.
- `.env.example`: Example environment variables file.
- `test_cases_postman.md`: Postman test cases for the API.

## API Endpoints

Detailed below are the API endpoints and what they do:

### 1. GET /api/products
- **Description:** Retrieve all products with support for pagination.
- **Query Parameters:**
  - `page` (optional): The page number (defaults to 1).
  - `limit` (optional): Number of items per page (defaults to returning all products).
- **Example Request:**
  ```
  GET http://localhost:3000/api/products?page=1&limit=10
  ```
- **Expected Response:**
  ```json
  {
    "page": 1,
    "limit": 10,
    "total": 15,
    "data": [
      {
        "id": "1",
        "name": "Laptop",
        "description": "High-performance laptop with 16GB RAM",
        "price": 1200,
        "category": "electronics",
        "inStock": true
      },
      ...
    ]
  }
  ```

### 2. GET /api/products/{id}
- **Description:** Retrieve details of a specific product by its ID.
- **Example Request:**
  ```
  GET http://localhost:3000/api/products/1
  ```
- **Expected Response:**
  A JSON object containing the product details. If the product is not found, a 404 status and message "Product not found" is returned.

### 3. GET /api/products/category/{category}
- **Description:** Retrieve products filtered by their category.
- **Example Request:**
  ```
  GET http://localhost:3000/api/products/category/electronics
  ```
- **Expected Response:**
  A JSON array of products in the "electronics" category.

### 4. GET /api/products/search
- **Description:** Search for products by name using a query parameter `q`.
- **Query Parameter:**
  - `q`: The search term (case-insensitive).
- **Example Request:**
  ```
  GET http://localhost:3000/api/products/search?q=laptop
  ```
- **Expected Response:**
  A JSON array containing products whose name includes the search term.
- **Error Case:** If `q` is missing, a 400 response with a message "Query parameter 'q' is required for search."

### 5. GET /api/products/stats
- **Description:** Get statistics on products, such as the count per category.
- **Example Request:**
  ```
  GET http://localhost:3000/api/products/stats
  ```
- **Expected Response:**
  A JSON object with categories and respective counts, e.g., `{ "electronics": 2, "kitchen": 1 }`.

### 6. POST /api/products
- **Description:** Create a new product.
- **Headers:**
  - `Content-Type: application/json`
- **Body Parameters:**
  - `name`: (string) Name of the product.
  - `description`: (string) Description of the product.
  - `price`: (number) Price in USD.
  - `category`: (string) Category.
  - `inStock`: (boolean) Availability.
- **Example Request:**
  ```
  POST http://localhost:3000/api/products
  ```
  **Body:**
  ```json
  {
    "name": "Tablet",
    "description": "A lightweight tablet with 8GB RAM",
    "price": 400,
    "category": "electronics",
    "inStock": true
  }
  ```
- **Expected Response:**
  The created product with a new unique ID and a status code 201.

### 7. PUT /api/products/{id}
- **Description:** Update an existing product.
- **Headers:**
  - `Content-Type: application/json`
- **Body Parameters:** Same as POST.
- **Example Request:**
  ```
  PUT http://localhost:3000/api/products/1
  ```
  **Body:**
  ```json
  {
    "name": "Updated Laptop",
    "description": "Updated description for laptop",
    "price": 1150,
    "category": "electronics",
    "inStock": true
  }
  ```
- **Expected Response:**
  Returns the updated product details. If the product does not exist, responds with a 404 error.

### 8. DELETE /api/products/{id}
- **Description:** Delete a product.
- **Example Request:**
  ```
  DELETE http://localhost:3000/api/products/1
  ```
- **Expected Response:**
  A 204 status code indicating successful deletion with no content returned. If the product is not found, a 404 error is returned.

## Authentication

All endpoints require an `Authorization` header with a valid token.  
**Example:**  
```
Authorization: Bearer WSM_secret_key*#789)-+
```
> **Note:** When testing in Postman using the Bearer Token option, Postman automatically prefixes the token with "Bearer ". Ensure your middleware is set up to account for this.

## Testing with Postman

A full set of Postman test cases is provided in [`test_cases_postman.md`](./test_cases_postman.md) for your reference.

## Postman Collection

For a complete set of sample requests, responses, and test cases, please use our [Postman Collection](https://williammweemba.postman.co/workspace/PLP-Feb2025-MERN~08ca356e-b393-418a-8c37-4f887feb48d6/collection/45467633-249523dd-b3e9-4de8-b127-13b8687aebd6?action=share&creator=45467633). This collection includes all endpoints documented in this README for easy testing and collaboration.

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)