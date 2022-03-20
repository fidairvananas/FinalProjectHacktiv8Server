# Branded Things API Documentation

## Endpoints :

List of available endpoints:

- `POST /admins/register`
- `POST /admins/login`
- `POST /dealers/register`
- `POST /dealers/login`
- `GET /cars`
- `POST /cars`
- `GET /cars/:id`
- `DELETE /cars/:id`
- `PUT /cars/:id`
- `PATCH /cars/:id`
- `GET /inspections`
- `GET /inspections/:id`
- `PATCH /inspections/main/:id`
- `PATCH /inspections/exterior/:id`
- `PATCH /inspections/interior/:id`
- `PATCH /inspections/roadtest/:id`
- `PATCH /inspections/kolong/:id`
- `PATCH /inspections/exterior-detail/:id`
- `GET /inspections/exterior-detail/:id`
- `PATCH /inspections/interior-detail/:id`
- `GET /inspections/interior-detail/:id`
- `PATCH /inspections/kolong-detail/:id`
- `GET /inspections/kolong-detail/:id`
- `PATCH /inspections/roadtest-detail/:id`
- `GET /inspections/roadtest-detail/:id`
- `GET /brands`
- `GET /types`

&nbsp;

## 1. POST /admins/register

Description:

- Register an Admin

Request:

- body:

```json
{
  "name": "Admin",
  "email": "admin@mail.com",
  "password": "12345",
  "phoneNumber": "081327786541"
}
```

_Response (201 - Created)_

```json
{
  "message": "Register for admin success"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email must be unique"
}
OR
{
    "message": "Name is required"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
OR
...
```

&nbsp;

## 2. POST /admins/login

Description:

- Login as admin

Request:

- body:

```json
{
  "email": "admin@mail.com",
  "password": "12345"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login as admin success",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwicGhvbmVOdW1iZXIiOiIwODEzMTExMDc5NTQiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNjQ3NjcxNDM1fQ.tMsTzxoQDERPa8AM10iEJK7GRiu-7xmYTvQ8I4ef8iI"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /dealers/register

Description:

- Register as dealer

Request:

- body:

```json
{
  "name": "Jubel",
  "phoneNumber": "081234567843",
  "email": "jubelsinaga13@gmail.com",
  "password": "12345",
  "storeName": "Jubel Classic",
  "storeAddress": "Medan Helvetia"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "name": "Jubel",
  "email": "jubelsinaga13@gmail.com"
}
```

_Response (400 - Bad request)_

```json
{
  "message": "Email must be unique"
}
OR
{
    "message": "Phone is required"
}
```

&nbsp;

## 4. POST /dealers/login

Description:

- Login as dealer

Request:

- body:

```json
{
  "email": "jubelsinaga13@gmail.com",
  "password": "12345"
}
```

_Response (200- OK)_

```json
{
  "message": "login Succesful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YmVsIiwiZW1haWwiOiJqdWJlbHNpbmFnYTEzQGdtYWlsLmNvbSIsInN0b3JlTmFtZSI6Ikp1YmVsIENsYXNzaWMiLCJwaG9uZU51bWJlciI6IjA4MTMxMTEwNzk1NCIsInN0b3JlQWRkcmVzcyI6Ik1lZGFuIGhlbHZldGlhIiwiaWF0IjoxNjQ3NjcyMjMzfQ.MgiPHgV7pt7bFyf-PTro91pGQLOPBy3rOpJAe6WU8Bg"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 5. GET /cars

Description:

- Get list of all cars

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Ford Model T Touring- 1918",
    "description": "When Henry Ford introduced his new low-priced Model T in 1908, he could not have conceived what impact the humble “T” would have on the world. Before the Model T, most people had not traveled outside their hometown. By making cars available to the masses, this newfound mobility would soon alter American’s living patterns, their landscape, their leisure time, and even their air. ",
    "fuel": "Gasoline",
    "seats": 2,
    "mileage": 70000,
    "price": 100000000,
    "color": "black",
    "yearMade": "1918-04-23T00:00:00.000Z",
    "passedInspection": false,
    "DealerId": 1,
    "TypeId": 1,
    "createdAt": "2022-03-19T07:49:29.675Z",
    "updatedAt": "2022-03-19T07:49:29.675Z",
    "Type": {
      "modelName": "Model T",
      "Brand": {
        "name": "Ford"
      }
    },
    "Dealer": {
      "id": 1,
      "name": "Jubel",
      "email": "jubelsinaga13@gmail.com",
      "phoneNumber": "081311107954",
      "storeName": "Jubel Classic",
      "storeAddress": "Medan helvetia"
    },
    "Images": [
      {
        "id": 1,
        "image": "https://www.lanemotormuseum.org/media/zoo/images/ford_modelT_1918web1a_9071f8b80d69dd143f5a7e9057f0a772.jpg",
        "CarId": 1,
        "createdAt": "2022-03-19T07:49:29.684Z",
        "updatedAt": "2022-03-19T07:49:29.684Z"
      },
      {
        "id": 2,
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/1918_Ford_Model_T_Touring_2.9.jpg",
        "CarId": 1,
        "createdAt": "2022-03-19T07:49:29.684Z",
        "updatedAt": "2022-03-19T07:49:29.684Z"
      }
    ]
  },
  {
    "id": 5,
    "name": "Honda Civic 1988",
    "description": "The fourth generation Honda Civic is an automobile produced by Honda from 1987 until 1991 with the wagon continuing in production in some markets until 1996. The suspension had a new double wishbone suspension in the front and an independent suspension in the rear, the wheelbase was increased to 98.4 inches (250 cm), and the body was redesigned with a lower hood line and more glass, giving less drag. The redesigned Civic was introduced in 1987 for the 1988 model year. The fourth generation Civic would be available in three variants; 3-door hatchback, 4-door sedan and 5-door wagon with various trim levels offered in each variant.",
    "fuel": "Gasoline",
    "seats": 4,
    "mileage": 150000,
    "price": 75000000,
    "color": "silver",
    "yearMade": "1988-04-23T00:00:00.000Z",
    "passedInspection": false,
    "DealerId": 1,
    "TypeId": 6,
    "createdAt": "2022-03-19T07:58:45.279Z",
    "updatedAt": "2022-03-19T07:58:45.279Z",
    "Type": {
      "modelName": "Civic",
      "Brand": {
        "name": "Honda"
      }
    },
    "Dealer": {
      "id": 1,
      "name": "Jubel",
      "email": "jubelsinaga13@gmail.com",
      "phoneNumber": "081311107954",
      "storeName": "Jubel Classic",
      "storeAddress": "Medan helvetia"
    },
    "Images": [
      {
        "id": 3,
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/1989_Honda_Civic_GL_sedan_%28front%29.jpg",
        "CarId": 5,
        "createdAt": "2022-03-19T07:58:45.284Z",
        "updatedAt": "2022-03-19T07:58:45.284Z"
      }
    ]
  }
  ...
]
```

&nbsp;

## 6. POST /cars

Description:

- Post cars as dealer

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
  "name": "Ford Model T Touring- 1918",
  "description": "When Henry Ford introduced his new low-priced Model T in 1908, he could not have conceived what impact the humble “T” would have on the world. Before the Model T, most people had not traveled outside their hometown. By making cars available to the masses, this newfound mobility would soon alter American’s living patterns, their landscape, their leisure time, and even their air. ",
  "fuel": "Gasoline",
  "seats": 2,
  "mileage": 70000,
  "price": 100000000,
  "color": "black",
  "yearMade": "1918-04-23",
  "TypeId": 1,
  "image": [
    "https://www.lanemotormuseum.org/media/zoo/images/ford_modelT_1918web1a_9071f8b80d69dd143f5a7e9057f0a772.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/1918_Ford_Model_T_Touring_2.9.jpg"
  ]
}
```

_Response (200 - OK)_

```json
{
  "message": "Car created"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Image is required"
}
OR
{
    "message": "Car name is required"
}
OR
...

```

&nbsp;

## 7. GET /cars/:id

Description:

- Get a car by id

Request:

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
  "name": "Ford Model T Touring- 1918",
  "description": "When Henry Ford introduced his new low-priced Model T in 1908, he could not have conceived what impact the humble “T” would have on the world. Before the Model T, most people had not traveled outside their hometown. By making cars available to the masses, this newfound mobility would soon alter American’s living patterns, their landscape, their leisure time, and even their air. ",
  "fuel": "Gasoline",
  "seats": 2,
  "mileage": 70000,
  "price": 100000000,
  "color": "black",
  "yearMade": "1918-04-23T00:00:00.000Z",
  "passedInspection": false,
  "DealerId": 1,
  "TypeId": 1,
  "createdAt": "2022-03-19T07:49:29.675Z",
  "updatedAt": "2022-03-19T07:49:29.675Z",
  "Type": {
    "id": 1,
    "modelName": "Model T",
    "BrandId": 5,
    "createdAt": "2022-03-19T06:20:28.481Z",
    "updatedAt": "2022-03-19T06:20:28.481Z",
    "Brand": {
      "id": 5,
      "name": "Ford",
      "createdAt": "2022-03-19T06:20:28.473Z",
      "updatedAt": "2022-03-19T06:20:28.473Z"
    }
  },
  "Dealer": {
    "id": 1,
    "name": "Jubel",
    "email": "jubelsinaga13@gmail.com",
    "phoneNumber": "081311107954",
    "storeName": "Jubel Classic",
    "storeAddress": "Medan helvetia"
  },
  "Images": [
    {
      "id": 1,
      "image": "https://www.lanemotormuseum.org/media/zoo/images/ford_modelT_1918web1a_9071f8b80d69dd143f5a7e9057f0a772.jpg",
      "CarId": 1,
      "createdAt": "2022-03-19T07:49:29.684Z",
      "updatedAt": "2022-03-19T07:49:29.684Z"
    },
    {
      "id": 2,
      "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/1918_Ford_Model_T_Touring_2.9.jpg",
      "CarId": 1,
      "createdAt": "2022-03-19T07:49:29.684Z",
      "updatedAt": "2022-03-19T07:49:29.684Z"
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Car not found"
}
```

&nbsp;

## 8. DELETE /cars/:id

Description:

- Delete car by id from database

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
  "message": "Car Deleted succesfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Car not found"
}
```

&nbsp;

## 9. PUT /cars/:id

Description:

- Edit car by id

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

-body:

```json
{
  "name": "Honda Civic 1988 edited",
  "description": "The fourth generation Honda Civic is an automobile produced by Honda from 1987 until 1991 with the wagon continuing in production in some markets until 1996. The suspension had a new double wishbone suspension in the front and an independent suspension in the rear, the wheelbase was increased to 98.4 inches (250 cm), and the body was redesigned with a lower hood line and more glass, giving less drag. The redesigned Civic was introduced in 1987 for the 1988 model year. The fourth generation Civic would be available in three variants; 3-door hatchback, 4-door sedan and 5-door wagon with various trim levels offered in each variant.",
  "fuel": "Gasoline",
  "seats": 4,
  "mileage": 150000,
  "price": 75000000,
  "color": "silver",
  "yearMade": "1988-04-23",
  "TypeId": 6,
  "image": [
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/1989_Honda_Civic_GL_sedan_%28front%29.jpg"
  ]
}
```

_Response (200 - OK)_

```json
{
  "message": "Car updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Car not found"
}
```

&nbsp;

## 10. PATCH /cars/:id

Description:

- Update inspection status by admin

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
  "passedInspection": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Car inspection status updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Car not found"
}
```

&nbsp;

## 11. GET /inspections

Description:

- Get all inspections

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "mainInspection": false,
    "exteriorInspection": false,
    "interiorInspection": false,
    "roadTest": false,
    "kolongTest": false,
    "CarId": 1,
    "createdAt": "2022-03-19T07:49:29.689Z",
    "updatedAt": "2022-03-19T07:49:29.689Z",
    "Exterior": {
      "id": 1,
      "chassis": false,
      "bumper": false,
      "lights": false,
      "roof": false,
      "spion": false,
      "windShield": false,
      "kacaSamping": false,
      "kacaBelakang": false,
      "tire": false,
      "InspectionId": 1,
      "createdAt": "2022-03-19T07:49:29.697Z",
      "updatedAt": "2022-03-19T07:49:29.697Z"
    },
    "Interior": {
      "id": 1,
      "speedometer": false,
      "klakson": false,
      "steeringWheel": false,
      "rearViewMirror": false,
      "dashboard": false,
      "seats": false,
      "gasPedal": false,
      "brakePedal": false,
      "InspectionId": 1,
      "createdAt": "2022-03-19T07:49:29.693Z",
      "updatedAt": "2022-03-19T07:49:29.693Z"
    },
    "RoadTest": {
      "id": 1,
      "engineStarting": false,
      "engineIdling": false,
      "steeringSystem": false,
      "acceleration": false,
      "engineSound": false,
      "brake": false,
      "InspectionId": 1,
      "createdAt": "2022-03-19T07:49:29.700Z",
      "updatedAt": "2022-03-19T07:49:29.700Z"
    },
    "Kolong": {
      "id": 1,
      "oliMesin": false,
      "transmission": false,
      "minyakRem": false,
      "radiator": false,
      "aki": false,
      "bottomCover": false,
      "knalpot": false,
      "kestabilanBan": false,
      "shockBreaker": false,
      "masterBrake": false,
      "InspectionId": 1,
      "createdAt": "2022-03-19T07:49:29.702Z",
      "updatedAt": "2022-03-19T07:49:29.702Z"
    }
  }
  ...
]
```

&nbsp;

## 12. GET /inspections/:id

Description

- Get inspection by id

Request:

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
  "mainInspection": false,
  "exteriorInspection": false,
  "interiorInspection": false,
  "roadTest": false,
  "kolongTest": false,
  "CarId": 1,
  "createdAt": "2022-03-19T07:49:29.689Z",
  "updatedAt": "2022-03-19T07:49:29.689Z",
  "Exterior": {
    "id": 1,
    "chassis": false,
    "bumper": false,
    "lights": false,
    "roof": false,
    "spion": false,
    "windShield": false,
    "kacaSamping": false,
    "kacaBelakang": false,
    "tire": false,
    "InspectionId": 1,
    "createdAt": "2022-03-19T07:49:29.697Z",
    "updatedAt": "2022-03-19T07:49:29.697Z"
  },
  "Interior": {
    "id": 1,
    "speedometer": false,
    "klakson": false,
    "steeringWheel": false,
    "rearViewMirror": false,
    "dashboard": false,
    "seats": false,
    "gasPedal": false,
    "brakePedal": false,
    "InspectionId": 1,
    "createdAt": "2022-03-19T07:49:29.693Z",
    "updatedAt": "2022-03-19T07:49:29.693Z"
  },
  "RoadTest": {
    "id": 1,
    "engineStarting": false,
    "engineIdling": false,
    "steeringSystem": false,
    "acceleration": false,
    "engineSound": false,
    "brake": false,
    "InspectionId": 1,
    "createdAt": "2022-03-19T07:49:29.700Z",
    "updatedAt": "2022-03-19T07:49:29.700Z"
  },
  "Kolong": {
    "id": 1,
    "oliMesin": false,
    "transmission": false,
    "minyakRem": false,
    "radiator": false,
    "aki": false,
    "bottomCover": false,
    "knalpot": false,
    "kestabilanBan": false,
    "shockBreaker": false,
    "masterBrake": false,
    "InspectionId": 1,
    "createdAt": "2022-03-19T07:49:29.702Z",
    "updatedAt": "2022-03-19T07:49:29.702Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Inspection not found"
}
```

&nbsp;

## 13. PATCH /main/:id

Description:

- Change main inspection status on inspection table

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
  "mainInspection": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Main inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Inspection not found"
}
```

&nbsp;

## 14. PATCH /exterior/:id

Description:

- Change exterior inspection status on inspection table

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
  "exteriorInspection": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Exterior inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Inspection not found"
}
```

&nbsp;

## 15. PATCH /interior/:id

Description:

- Change interior inspection status on inspection table

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
  "interiorInspection": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Interior inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Inspection not found"
}
```

&nbsp;

## 16. PATCH /roadtest/:id

Description:

- Change roadtest inspection status on inspection table

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
  "roadTest": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Road test inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Inspection not found"
}
```

&nbsp;

## 17. PATCH /kolong/:id

Description:

- Change kolong inspection status on inspection table

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
  "kolongTest": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Kolong inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Inspection not found"
}
```

&nbsp;

## 18. PATCH /exterior-detail/:id

Description:

- Change car part inspection on exterior table

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
  "chassis": "boolean",
  "bumper": "boolean",
  "lights": "boolean",
  "roof": "boolean",
  "spion": "boolean",
  "windShield": "boolean",
  "kacaSamping": "boolean",
  "kacaBelakang": "boolean",
  "tire": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "exterior Inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Exterior inspection not found"
}
```

&nbsp;

## 19. GET /exterior-detail/:id

Description:

- Get exterior detail inspection data by id

Request:

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
  "chassis": false,
  "bumper": true,
  "lights": true,
  "roof": true,
  "spion": true,
  "windShield": true,
  "kacaSamping": true,
  "kacaBelakang": true,
  "tire": true,
  "InspectionId": 1,
  "createdAt": "2022-03-19T07:49:29.697Z",
  "updatedAt": "2022-03-19T09:42:28.184Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Exterior inspection not found"
}
```

&nbsp;

## 20. PATCH /interior-detail/:id

Description:

- Change car part inspection on interior table

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
  "speedometer": "boolean",
  "klakson": "boolean",
  "steeringWheel": "boolean",
  "rearViewMirror": "boolean",
  "dashboard": "boolean",
  "seats": "boolean",
  "gasPedal": "boolean",
  "breakPedal": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Interior Inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Interior inspection not found"
}
```

&nbsp;

## 21. GET /interior-detail/:id

Description:

- Get interior detail inspection data by id

Request:

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
  "speedometer": false,
  "klakson": false,
  "steeringWheel": true,
  "rearViewMirror": true,
  "dashboard": true,
  "seats": true,
  "gasPedal": true,
  "brakePedal": true,
  "InspectionId": 1,
  "createdAt": "2022-03-19T07:49:29.693Z",
  "updatedAt": "2022-03-19T09:47:47.860Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Interior inspection not found"
}
```

&nbsp;

## 22. PATCH /kolong-detail/:id

Description:

- Change car part inspection on kolong table

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
  "oliMesin": "boolean",
  "transmission": "boolean",
  "minyakRem": "boolean",
  "radiator": "boolean",
  "aki": "boolean",
  "bottomCover": "boolean",
  "knalpot": "boolean",
  "kestabilanBan": "boolean",
  "shockBreaker": "boolean",
  "masterBrake": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Kolong inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Kolong inspection not found"
}
```

&nbsp;

## 23. GET /kolong-detail/:id

Description:

- Get kolong detail inspection data by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "oliMesin": false,
  "transmission": true,
  "minyakRem": true,
  "radiator": true,
  "aki": true,
  "bottomCover": true,
  "knalpot": true,
  "kestabilanBan": true,
  "shockBreaker": true,
  "masterBrake": true,
  "InspectionId": 3,
  "createdAt": "2022-03-19T07:58:45.311Z",
  "updatedAt": "2022-03-19T09:54:34.007Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Kolong inspection not found"
}
```

&nbsp;

## 24. PATCH /roadtest-detail/:id

Description:

- Change car part inspection on roadtest table

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
  "engineStarting": "boolean",
  "engineIdling": "boolean",
  "steeringSystem": "boolean",
  "acceleration": "boolean",
  "engineSound": "boolean",
  "brake": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "Road test inspection updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Road inspection not found"
}
```

&nbsp;

## 25. GET /roadtest-detail/:id

Description:

- Get roadtest detail inspection data by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "engineStarting": true,
  "engineIdling": true,
  "steeringSystem": true,
  "acceleration": true,
  "engineSound": true,
  "brake": true,
  "InspectionId": 3,
  "createdAt": "2022-03-19T07:58:45.306Z",
  "updatedAt": "2022-03-19T09:59:52.564Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Road inspection not found"
}
```

&nbsp;

## 26. GET /brands

Description:

- Get all list of brands with its model/type

_Response (200 - OK)_

```json
[
  {
    "id": 5,
    "name": "Ford",
    "createdAt": "2022-03-19T06:20:28.473Z",
    "updatedAt": "2022-03-19T06:20:28.473Z",
    "Types": [
      {
        "id": 1,
        "modelName": "Model T",
        "BrandId": 5,
        "createdAt": "2022-03-19T06:20:28.481Z",
        "updatedAt": "2022-03-19T06:20:28.481Z"
      },
      {
        "id": 2,
        "modelName": "Mustang",
        "BrandId": 5,
        "createdAt": "2022-03-19T06:20:28.481Z",
        "updatedAt": "2022-03-19T06:20:28.481Z"
      },
      ...
  },
  ...
]
```

&nbsp;

## 28. GET /types

Description:

- Get all list of types/car model with car data and brand

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "modelName": "Model T",
        "BrandId": 5,
        "createdAt": "2022-03-19T06:20:28.481Z",
        "updatedAt": "2022-03-19T06:20:28.481Z",
        "Cars": [
            {
                "id": 1,
                "name": "Ford Model T Touring- 1918",
                "description": "When Henry Ford introduced his new low-priced Model T in 1908, he could not have conceived what impact the humble “T” would have on the world. Before the Model T, most people had not traveled outside their hometown. By making cars available to the masses, this newfound mobility would soon alter American’s living patterns, their landscape, their leisure time, and even their air. ",
                "fuel": "Gasoline",
                "seats": 2,
                "mileage": 70000,
                "price": 100000000,
                "color": "black",
                "yearMade": "1918-04-23T00:00:00.000Z",
                "passedInspection": true,
                "DealerId": 1,
                "TypeId": 1,
                "createdAt": "2022-03-19T07:49:29.675Z",
                "updatedAt": "2022-03-19T09:13:22.585Z"
            }
        ],
        "Brand": {
            "id": 5,
            "name": "Ford",
            "createdAt": "2022-03-19T06:20:28.473Z",
            "updatedAt": "2022-03-19T06:20:28.473Z"
        }
    },
    ...
]
```

## 29. GET /types/:id

Description:

- Get specific types/car model based on type/model id

_Response (200 - OK)_

```json
{
  "id": 1,
  "modelName": "Model T",
  "BrandId": 5,
  "createdAt": "2022-03-19T06:20:28.481Z",
  "updatedAt": "2022-03-19T06:20:28.481Z",
  "Cars": [
    {
      "id": 1,
      "name": "Ford Model T Touring- 1918",
      "description": "When Henry Ford introduced his new low-priced Model T in 1908, he could not have conceived what impact the humble “T” would have on the world. Before the Model T, most people had not traveled outside their hometown. By making cars available to the masses, this newfound mobility would soon alter American’s living patterns, their landscape, their leisure time, and even their air. ",
      "fuel": "Gasoline",
      "seats": 2,
      "mileage": 70000,
      "price": 100000000,
      "color": "black",
      "yearMade": "1918-04-23T00:00:00.000Z",
      "passedInspection": true,
      "DealerId": 1,
      "TypeId": 1,
      "createdAt": "2022-03-19T07:49:29.675Z",
      "updatedAt": "2022-03-19T09:13:22.585Z"
    }
  ],
  "Brand": {
    "id": 5,
    "name": "Ford",
    "createdAt": "2022-03-19T06:20:28.473Z",
    "updatedAt": "2022-03-19T06:20:28.473Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Type not found"
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

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```