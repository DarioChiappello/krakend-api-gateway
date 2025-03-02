# KrakenD API Gateway

## Dario Chiappello

This project sets up an API Gateway using KrakenD to route requests to multiple microservices.

```
                            +-----------------+
                            |   Prometheus    |
                            +--------+--------+
                                     | 9090
+-------------+        +-------------+-------------+
|   KrakenD   |        |         Grafana          |
| (8080/8090) +--------+ (3000)                   |
+-----+-------+        +--------------------------+
      |
      |  +------------+        +------------+        +------------+
      +->| Auth-Svc   |        | User-Svc   |        | Product-Svc|
         | (8000)     |        | (8001)     |        | (8002)     |
         +------------+        +------------+        +------------+

```


## 📌 Project Structure
```
📂 Base-KrakenD
│️── 📂 auth-service
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
│️── 📂 user-service
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
│️── 📂 product-service
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
│️── 📂 krakend
│   └── krakend.json
│️── 📂 prometheus
│   └── prometheus.yml
│️── 📂 grafana
│   └── provisioning
│️── 📂 elasticsearch
│️── docker-compose.yml
│️── README.md
```

## 🚀 How to Test the Endpoints
### **1️⃣ Authentication**
**Login** (POST `/login`)
```sh
curl -X POST "http://localhost:8080/login" \
     -H "Content-Type: application/json" \
     -d '{ "username": "admin", "password": "password" }'
```
Response (Success):
```json
{
  "token": "your_jwt_token_here"
}
```
Response (Failure):
```json
{
  "message": "Unauthorized"
}
```

---

### **2️⃣ Users**
**Get User by ID** (GET `/users/{id}`)
Example for user with ID **1**:
```sh
curl -X GET "http://localhost:8080/users/1"
```
Response:
```json
{
  "id": 1,
  "name": "Alice"
}
```

---

### **3️⃣ Products**
**Get All Products** (GET `/products`)
```sh
curl -X GET "http://localhost:8080/products"
```
Response:
```json
{
  "data": [
    { "id": 1, "name": "Laptop", "price": 1000 },
    { "id": 2, "name": "Phone", "price": 500 }
  ]
}
```

**Get Product by ID (Filtered)** (GET `/product-filtering/{id}`)
Example for product ID **1**:
```sh
curl -X GET "http://localhost:8080/product-filtering/1"
```
Response (Price and Stock are removed):
```json
{
  "id": 1,
  "name": "Laptop"
}
```

---

### **4️⃣ User-Product Relationship**
**Get User and Associated Products** (GET `/user-products/{userId}`)
Example for user ID **1**:
```sh
curl -X GET "http://localhost:8080/user-products/1"
```
Response:
```json
{
  "user": {
    "id": 1,
    "name": "Alice"
  },
  "products": [
    { "id": 1, "name": "Laptop", "price": 1000 },
    { "id": 2, "name": "Phone", "price": 500 }
  ]
}
```

---

## 🛠 Monitoring and Logging
- **Prometheus** is available at: [`http://localhost:9090`](http://localhost:9090)
- **Grafana** is available at: [`http://localhost:3000`](http://localhost:3000)
- **Elasticsearch logs** are stored in: `http://elasticsearch:9200/krakend-logs`

---

## 📌 Run the Services
```sh
docker-compose up --build
```
This will start:
- KrakenD API Gateway
- Auth Service
- User Service
- Product Service
- Prometheus
- Grafana
- Elasticsearch

