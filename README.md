# Basic Shop API

REST API created for Polazak BE Assignment.

## How to start

After cloning the project, open the terminal in the project and type:

```
npm install

npm start
```

First command installs all of the dependencies(only needs to be executed once!), and the second command starts the server.

Server is running at http://localhost:8080/

Swagger is located at http://localhost:8080/api-docs/

API is connected with MongoDB Atlas.

Every API endpoint was tested with Postman.

Unit tests are located in the folder `test`. Script to start them:

```
npm run test
```

All responses are in standardized JSON format:

```
{
  "data": {},
  "message": ""
}
```

## API Documentation

### Authentication endpoints /api/user

#### POST `/api/user/register`

Register an account endpoint

#### POST `/api/user/login`

Login to account endpoint

### Admin endpoints /api/product

Admin routes are protected and are the following:

#### GET `/api/product/`

Display all products(visible and invisible)

#### POST `/api/product/add`

Add a new product to the database

#### PATCH `/api/product/:productId/edit`

Update the product

#### DELETE `/api/product/:productId/delete`

### Shop-n-cart endpoints /api/shop-n-cart

Shop and cart routes are the following:

#### GET `/api/shop-n-cart/`

Display all visible products

#### POST `/api/shop-n-cart/cart`

Adding products to cart. This route is enabled only for logged in users.
