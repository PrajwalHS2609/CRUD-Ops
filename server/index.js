const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require("./db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser("mySecretKey"));

app.use(passport.initialize());
app.use(passport.session());

require("../passportConfig")(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.post("/register", (req, res) => {
  const query =
    "INSERT INTO `project2`.`users` (`username`, `password`) VALUES (?,?)";
  const query2 = "SELECT * FROM project2.users where username = ?";

  db.query(query2, [req.body.username], async (err, rows) => {
    if (err) {
      console.log(err);
    }
    if (rows.length > 0) {
      res.send("User already exists");
    }
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      db.query(query, [req.body.username, hashedPassword], (err, rows) => {
        if (err) {
          console.log(err);
        }
        res.send("User created");
      });
    }
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.send("User not found");
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
        }
        res.send("User logged in");
        console.log(user);
      });
    }
  })(req, res, next);
});
app.get("/getUser", (req, res) => {
  res.send(req.user);
});
app.listen(3001, () => {
  console.log("Sever started in port 3001");
});

app.get("/get-user", async (req, res) => {
  try {
    const query = "SELECT id, username,password FROM project2.users"; // Fetch users (excluding password)
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results); // Send users as JSON response
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/get-user/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = "DELETE FROM project2.users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});
app.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!id) return res.status(400).json({ message: "User ID is required" });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const query = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    const values = [username, hashedPassword, id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
