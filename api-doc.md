# Branded Things API Documentation

## Endpoints :

List of available endpoints:

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /products/histories`
- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/login-google`
- `GET /pub/products`
- `GET /pub/histories`
- `PATCH /products/:id`
- `GET /wishlist`
- `POST /wishlist/:productId`
- `DELETE /wishlist/:id`

&nbsp;

## 1. POST /products

Description:

- Create a product

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

- body:

```json
{
  "name": "string (required)",
  "description": "string (required)",
  "price": "integer (required)",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "name": "Meja Kayu",
  "description": "Meja Kayu jati",
  "price": 100000,
  "imgUrl": "https://3.bp.blogspot.com/-LQZH414qkzs/VlfUu7rtSZI/AAAAAAAAGyE/4cXh4fcvYxM/s1600/34.jpg",
  "categoryId": 1,
  "authorId": 2,
  "updatedAt": "2022-02-01T12:45:40.490Z",
  "createdAt": "2022-02-01T12:45:40.490Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Name must be inputted"]
}
OR
{
  "message": ["Description must be inputted"]
}
OR
{
  "message": ["Price must be inputted"]
}
OR
{
  "message": ["Price must be at least Rp 10000"]
}
```

&nbsp;

## 2. GET /products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Sofa Tamu",
    "description": "Sofa bagus untuk ruang tamu anda",
    "price": 2000000,
    "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/905/0990531_PE819028_S4.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2022-02-01T12:38:44.422Z",
    "updatedAt": "2022-02-01T12:38:44.422Z"
  },
  {
    "id": 2,
    "name": "Meja makan",
    "description": "Meja makan berkualitas untuk ruang makan anda",
    "price": 1500000,
    "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/452/0445221_PE595674_S4.jpg",
    "categoryId": 9,
    "authorId": 1,
    "createdAt": "2022-02-01T12:38:44.422Z",
    "updatedAt": "2022-02-01T12:38:44.422Z"
  },
  ...
]
```

&nbsp;

## 3. GET /products/:id

Description:

- Get a product by id

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Sofa Tamu",
  "description": "Sofa bagus untuk ruang tamu anda",
  "price": 2000000,
  "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/905/0990531_PE819028_S4.jpg",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2022-02-01T12:38:44.422Z",
  "updatedAt": "2022-02-01T12:38:44.422Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Item not found"
}
```

&nbsp;

## 4. PUT /products/:id

Description:

- Update a product by id

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string (required)",
  "description": "string (required)",
  "price": "integer (required)",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "name": "Meja kayu baru",
  "description": "Meja kayu Baru untuk rumah anda",
  "price": 200000,
  "imgUrl": "https://3.bp.blogspot.com/-LQZH414qkzs/VlfUu7rtSZI/AAAAAAAAGyE/4cXh4fcvYxM/s1600/34.jpg",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2022-02-01T12:45:40.490Z",
  "updatedAt": "2022-02-01T13:10:45.716Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Item not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Name must be inputted"]
}
OR
{
  "message": ["Description must be inputted"]
}
OR
{
  "message": ["Price must be inputted"]
}
OR
{
  "message": ["Price must be at least Rp 10000"]
}
```

&nbsp;

## 5. DELETE /products/:id

Description:

- Delete product by id

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Meja kayu baru deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Item not found"
}
```

&nbsp;

## 6. POST /register

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "email": "adminBaru@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Email must be inputted"]
}
OR
{
  "message": ["Must be an email format"]
}
OR
{
  "message": ["Password must be inputted"]
}
OR
{
  "message": ["Password minimum 5 characters"]
}
OR
{
  "message": ["email must be unique"]
}
```

&nbsp;

## 7. POST /login

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Succesful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjQzODE1NTk4LCJleHAiOjE2NDM4MTkxOTh9.PkvqMZrcNXBMHHag9eBvC_AxbJ3onwvTZGbsVqvgLmA",
  "role": "Admin",
  "authorId": 21,
  "email": "jack@gmail.com"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 8. POST /login-google

Request:

- body:

```json
{
  "token": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Succesful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoibXdvcmtlcjEzMkBnbWFpbC5jb20iLCJyb2xlIjoiU3RhZmYiLCJpYXQiOjE2NDM4MTU3NTcsImV4cCI6MTY0MzgxOTM1N30.t6yzKo7ldevQFvWLuEr9rgfBMH-vhzLRECtGc9HRK20",
  "role": "Staff",
  "authorId": 12,
  "email": "jubelsinaga13@gmail.com"
}
```

&nbsp;

## 9. GET /products/histories

Request:

- body:

```json
{
  "token": "string (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 8,
        "entityId": 1,
        "title": "Sofa Tamu",
        "description": "Entity with id 1 status hase been updated from active into active",
        "updatedBy": "jack@gmail.com",
        "createdAt": "2022-02-07T15:54:56.538Z",
        "updatedAt": "2022-02-07T15:54:56.538Z"
    },
    {
        "id": 9,
        "entityId": 4,
        "title": "james",
        "description": "New product with id 4 created",
        "updatedBy": "jack@gmail.com",
        "createdAt": "2022-02-07T15:56:32.280Z",
        "updatedAt": "2022-02-07T15:56:32.280Z"
    },
    ...
]
```

&nbsp;

## 10. POST /pub/register

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": 14,
  "email": "test@email.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Email must be inputted"]
}
OR
{
  "message": ["Must be an email format"]
}
OR
{
  "message": ["Password must be inputted"]
}
OR
{
  "message": ["Password minimum 5 characters"]
}
OR
{
  "message": ["email must be unique"]
}
```

&nbsp;

## 11. POST /pub/login

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Succesful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2NDQzMzg3NTAsImV4cCI6MTY0NDM0MjM1MH0.NYHNrAPSGWYH_vwgbJdsUmGxPREnHqf4xdaMMOVDfrY",
  "role": "Customer",
  "authorId": 14,
  "email": "test@email.com"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 12. POST pub/login-google

Description:

- Login customer with google account

Request:

- body:

```json
{
  "token": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Succesful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoibXdvcmtlcjEzMkBnbWFpbC5jb20iLCJyb2xlIjoiU3RhZmYiLCJpYXQiOjE2NDM4MTU3NTcsImV4cCI6MTY0MzgxOTM1N30.t6yzKo7ldevQFvWLuEr9rgfBMH-vhzLRECtGc9HRK20",
  "role": "Customer",
  "authorId": 12,
  "email": "jubelsinaga13@gmail.com"
}
```

&nbsp;

## 13. GET /pub/products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

- query:

```json
{
  "page": "integer",
  "size": "integer (required)",
  "name": "string",
  "maxPrice": "integer"
}
```

_Response (200 - OK)_

```json
{
  "count": 15,
  "rows": [
    {
      "id": 17,
      "name": "Sofa Tamu 8",
      "description": "Sofa bagus untuk ruang tamu anda",
      "price": 2000000,
      "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/905/0990531_PE819028_S4.jpg",
      "categoryId": 1,
      "authorId": 1,
      "status": "active",
      "createdAt": "2022-02-15T11:12:29.324Z",
      "updatedAt": "2022-02-15T11:12:29.324Z"
    },
    {
      "id": 18,
      "name": "Meja makan 9",
      "description": "Meja makan berkualitas untuk ruang makan anda",
      "price": 1500000,
      "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/452/0445221_PE595674_S4.jpg",
      "categoryId": 9,
      "authorId": 1,
      "status": "active",
      "createdAt": "2022-02-15T11:12:29.324Z",
      "updatedAt": "2022-02-15T11:12:29.324Z"
    },
    {
      "id": 19,
      "name": "Sofa Tamu 10",
      "description": "Sofa bagus untuk ruang tamu anda",
      "price": 2000000,
      "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/905/0990531_PE819028_S4.jpg",
      "categoryId": 1,
      "authorId": 1,
      "status": "active",
      "createdAt": "2022-02-15T11:12:30.291Z",
      "updatedAt": "2022-02-15T11:12:30.291Z"
    }
  ],
  "totalPages": 5
}
```

&nbsp;

## 14. GET /pub/products/:id

Description:

- Get product by id

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Sofa Tamu",
  "description": "Sofa bagus untuk ruang tamu anda",
  "price": 2000000,
  "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/905/0990531_PE819028_S4.jpg",
  "categoryId": 1,
  "authorId": 1,
  "status": "active",
  "createdAt": "2022-02-15T11:11:38.986Z",
  "updatedAt": "2022-02-15T11:11:38.986Z"
}
```

&nbsp;

## 15. GET /pub/histories

Description:

- Get history of products

Request:

- headers:

```json
{
  "token": "string (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 8,
        "entityId": 1,
        "title": "Sofa Tamu",
        "description": "Entity with id 1 status hase been updated from active into active",
        "updatedBy": "jack@gmail.com",
        "createdAt": "2022-02-07T15:54:56.538Z",
        "updatedAt": "2022-02-07T15:54:56.538Z"
    },
    {
        "id": 9,
        "entityId": 4,
        "title": "james",
        "description": "New product with id 4 created",
        "updatedBy": "jack@gmail.com",
        "createdAt": "2022-02-07T15:56:32.280Z",
        "updatedAt": "2022-02-07T15:56:32.280Z"
    },
    ...
]
```

&nbsp;

## 16. PATCH /products/:id

Description:

- Change status of a product

Request:

- headers:

```json
{
  "token": "string (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "updated": {
    "id": 5,
    "name": "Meja makan",
    "description": "Meja makan berkualitas untuk ruang makan anda",
    "price": 1500000,
    "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/452/0445221_PE595674_S4.jpg",
    "categoryId": 9,
    "authorId": 1,
    "status": "archieved",
    "createdAt": "2022-02-07T13:59:17.021Z",
    "updatedAt": "2022-02-10T12:14:42.805Z"
  },
  "history": {
    "id": 25,
    "entityId": 5,
    "title": "Meja makan",
    "description": "Entity with id 5 status hase been updated from inactive into archieved",
    "updatedBy": "jack@gmail.com",
    "updatedAt": "2022-02-10T12:14:42.824Z",
    "createdAt": "2022-02-10T12:14:42.824Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Value must be active, inactive, or archieved"]
}
```

&nbsp;

## 17. GET /pub/wishlist

Description:

- Get wishlist for a registered user

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 5,
    "Product": {
      "id": 21,
      "name": "Sofa Tamu 12",
      "description": "Sofa bagus untuk ruang tamu anda",
      "price": 2000000,
      "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/905/0990531_PE819028_S4.jpg",
      "categoryId": 1,
      "authorId": 1,
      "status": "active",
      "createdAt": "2022-02-15T11:12:31.269Z",
      "updatedAt": "2022-02-15T11:12:31.269Z"
    }
  },
  {
    "id": 6,
    "Product": {
      "id": 18,
      "name": "Meja makan 9",
      "description": "Meja makan berkualitas untuk ruang makan anda",
      "price": 1500000,
      "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/452/0445221_PE595674_S4.jpg",
      "categoryId": 9,
      "authorId": 1,
      "status": "active",
      "createdAt": "2022-02-15T11:12:29.324Z",
      "updatedAt": "2022-02-15T11:12:29.324Z"
    }
  },
 ...
]
```

&nbsp;

## 18. POST /pub/wishlist/:productId

Description:

- Add wishlist for login user

Request:

- headers:

```json
{
  "access_token": "string (required)"
}
```

- params:

```json
{
  "productId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "UserId": 4,
  "ProductId": 12,
  "updatedAt": "2022-02-19T08:10:13.734Z",
  "createdAt": "2022-02-19T08:10:13.734Z"
}
```

&nbsp;

## 19. DELETE /pub/wishlist/:id

Description:

- Delete a wishlist

Request:

- body:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Item not found"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Wishlist deleted successfully"
}
```

&nbsp;

## 20. POST /pub/qrcode

Description:

- Get qr-code

Request:

- body:

```json
{
  "detailUrl": "string (required)"
}
```

_Response (200 - Ok)_

```json
{
  "success": true,
  "qrcode": "data:image/png;base64,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",
  "size": {
    "width": 400,
    "height": 400
  }
}
```

&nbsp;

## Global Error

_Response (400 - Bad Request)_

```json
{
  "message": "jwt must be provided"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token or user"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to access this resource"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
