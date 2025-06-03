# Postman Test Cases for the Product API

Below are the detailed test cases to validate the CRUD operations and endpoints of the API. Ensure you include the required authentication header (Authorization: `WSM_secret_key*#789)-+`) in all requests.

---

## 1. GET All Products (With Pagination)

- **Method:** GET  
- **URL:** `http://localhost:3000/api/products?page=1&limit=10`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
- **Expected Outcome:**  
  - A JSON object with properties:  
    - `page` (current page number)  
    - `limit` (number of items per page)  
    - `total` (total number of products)  
    - `data` (array of products for the current page)

---

## 2. GET a Specific Product by ID

- **Method:** GET  
- **URL:** `http://localhost:3000/api/products/1`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
- **Expected Outcome:**  
  - If product with id “1” exists, a JSON object with the product details is returned.  
- **Negative Case:**  
  - For a non-existent ID (e.g., `/api/products/999`), a 404 response with message "Product not found" is returned.

---

## 3. GET Products by Category

- **Method:** GET  
- **URL:** `http://localhost:3000/api/products/category/electronics`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
- **Expected Outcome:**  
  - A JSON array of products that belong to the "electronics" category is returned.

---

## 4. GET Products by Search Query (Name)

- **Method:** GET  
- **URL:** `http://localhost:3000/api/products/search?q=laptop`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
- **Expected Outcome:**  
  - A JSON array of products whose names contain the term "laptop" (case-insensitive) is returned.  
- **Negative Case:**  
  - If the query parameter `q` is missing or empty, a 400 response with a message indicating that "Query parameter 'q' is required for search." is returned.

---

## 5. GET Product Statistics

- **Method:** GET  
- **URL:** `http://localhost:3000/api/products/stats`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
- **Expected Outcome:**  
  - A JSON object containing the count of products grouped by category (e.g., `{ "electronics": 2, "kitchen": 1 }`) is returned.

---

## 6. POST Create a New Product

- **Method:** POST  
- **URL:** `http://localhost:3000/api/products`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
  - `Content-Type: application/json`  
- **Body:**
  ```json
  {
    "name": "Tablet",
    "description": "A lightweight tablet with 8GB RAM",
    "price": 400,
    "category": "electronics",
    "inStock": true
  }
  ```  
- **Expected Outcome:**  
  - A new product is created with a unique ID, and a 201 status code is returned along with the created product details.

---

## 7. PUT Update an Existing Product

- **Method:** PUT  
- **URL:** `http://localhost:3000/api/products/1`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
  - `Content-Type: application/json`  
- **Body:**
  ```json
  {
    "name": "Updated Laptop",
    "description": "Updated description for laptop",
    "price": 1150,
    "category": "electronics",
    "inStock": true
  }
  ```  
- **Expected Outcome:**  
  - The product with ID “1” is updated. A JSON response with the updated product details is returned.
- **Negative Case:**  
  - Attempting to update a non-existent product ID should return a 404 error with an appropriate error message.

---

## 8. DELETE Remove a Product

- **Method:** DELETE  
- **URL:** `http://localhost:3000/api/products/1`  
- **Headers:**  
  - `Authorization: WSM_secret_key*#789)-+`  
- **Expected Outcome:**  
  - The product with ID “1” is deleted and a 204 status code (No Content) is returned.
- **Negative Case:**  
  - Deleting a product that does not exist should return a 404 response with an appropriate error message.

---

Use these test cases in Postman to validate each endpoint of your Product API.