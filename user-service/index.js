const express = require("express");
const app = express();

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


app.listen(8001, () => {
  console.log("✅ User Service running on port 8001");
});
