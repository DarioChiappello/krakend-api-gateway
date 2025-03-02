const express = require("express");
const app = express();


const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "TV", price: 200 }
];

app.get("/products", (req, res) => {
    res.json({data: products});
});

app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);

  const product = products.find(p => p.id === productId);

  if (product) {
      res.json(product);
  } else {
      res.status(404).json({ message: "Product not found" });
  }
});

app.listen(8002, () => console.log("Product Service running on port 8002"));
