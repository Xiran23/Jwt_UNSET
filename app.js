const PORT = process.env.PORT || 4000;

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const secretkey = "secretkey";
app.get("/", (req, res) => {
  //   res.send("WE LIVE");
  res.json({
    message: "A sample api",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "chiran",
    email: "thapachiran23@gmail.com",
  };
  jwt.sign({ user }, secretkey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bebrer = bearerHeader.split(" ");
    const token = bebrer[1];
    console.log(token);
    res.json({ token });
    next();
  } else [res.send({ result: "Token is not valid" })];
}

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretkey, (err, auth) => {
    if (err) {
      res.send({ result: "Invalid TOken" });
    } else {
      res.json({
        message: "profile accesed",
        auth,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`we are live on port${PORT}`);
});
