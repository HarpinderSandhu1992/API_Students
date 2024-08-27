const express = require("express");
const app = express();
const connection = require("./connection");
const cors = require("cors");
const port = 3000;

app.use(express.json());

app.use(cors());

const customers = [
  { id: 1, name: "Harpinder" },
  { id: 2, name: "Harsh" },
  { id: 3, name: "Harry" },
];
app.get("/customers/", (req, res) => {
  res.status(200).json(customers);
});
// // GET
app.get("/students/", async (req, res) => {
  try {
    const data = await connection
      .promise()
      .query(`SELECT * FROM robogarden.students`);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const data = await connection
      .promise()
      .query(`SELECT * FROM robogarden.students`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST
app.post("/add_student/", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  if (!first_name || !last_name) {
    res.status(500).json("Please provide both first name and last name");
  }
  try {
    const data = await connection
      .promise()
      .query(
        `INSERT INTO robogarden.students (first_name, last_name) VALUES (?, ?)`,
        [first_name, last_name]
      );
    if (data) {
      if (data[0].affectedRows > 0) {
        res.status(200).json("New student added");
      }
    } else {
      res.status(200).json("Data not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
app.delete("/delete_student/:id", async (req, res) => {
  var id = req.params.id;
  try {
    const result = await connection
      .promise()
      .query(`DELETE FROM robogarden.students WHERE student_id = ?`, id);
    if (result[0].affectedRows > 0) {
      res.status(200).json("Student deleted successfully");
    } else {
      res.status(500).json("Student not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// PATCH
app.patch("/update_student/:id", async (req, res) => {
  var id = req.params.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  try {
    const result = await connection
      .promise()
      .query(
        `UPDATE robogarden.students SET first_name = ?, last_name = ? WHERE student_id = ?`,
        [first_name, last_name, id]
      );
    if (result[0].affectedRows > 0) {
      res.status(200).json("Student updated successfully");
    } else {
      res.status(500).json("Student not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT
app.put("/overwrite_student/:id", async (req, res) => {
  var id = req.params.id;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  try {
    const result = await connection.promise().query(
      `UPDATE robogarden.students
            SET first_name = ?,
         last_name = ?
         WHERE student_id = ?`,
      [first_name, last_name, id]
    );
    if (result[0].affectedRows > 0) {
      res.status(200).json("Student updated successfully");
    } else {
      res.status(500).json("Student not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
