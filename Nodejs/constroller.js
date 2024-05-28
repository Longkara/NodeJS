const express = require("express");
const router = express.Router();

// Sample data
let items = [
  {
    id: 1,
    fullName: "John Doe",
    emailId: "johndoe@example.com",
    salary: 5000,
    city: "New York",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    emailId: "janesmith@example.com",
    salary: 6000,
    city: "Los Angeles",
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    emailId: "mikejohnson@example.com",
    salary: 4500,
    city: "Chicago",
  },
];

// Xử lý POST request tại /api/submit-form
router.get("/employee/get-all", (req, res) => {
  res.json(items);
});

// Lấy thông tin nhân viên theo ID
router.get("/employee/get/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send({ message: "Employee not found" });
  }
});

// Tạo mới một nhân viên
router.post("/employee/create", (req, res) => {
  const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  const newItem = {
    id: id,
    fullName: req.body.fullName,
    emailId: req.body.emailId,
    salary: req.body.salary,
    city: req.body.city,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});
// Update item by ID
router.put("/employee/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items[index] = {
      id: id,
      fullName: req.body.fullName,
      emailId: req.body.emailId,
      salary: req.body.salary,
      city: req.body.city,
    };
    res.json(items[index]);
  } else {
    res.status(404).send({ message: "Employee not found" });
  }
});

// Delete item by ID
router.delete("/employee/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).send({ message: "Employee not found" });
  }
});
module.exports = router;
