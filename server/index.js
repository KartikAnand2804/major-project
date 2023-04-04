const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "asdadaaxaxaaxaxa213123121qd";

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(cookieParser());

const port = 5000;

mongoose.connect(
  "mongodb+srv://kartikanand:Dr%40gonball2821@cluster0.paoeug0.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, typeOfUser } =
    req.body;
  try {
    const userDoc = await User.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      typeOfUser,
      password: bcrypt.hashSync(password, salt),
    });
    console.log(userDoc);
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });
  console.log(userDoc);
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign(
      {
        id: userDoc._id,
        firstName: userDoc.firstName,
        typeOfUser: userDoc.typeOfUser,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .json({
            id: userDoc._id,
            firstName: userDoc.firstName,
            typeOfUser: userDoc.typeOfUser,
          });
      }
    );
  } else {
    res.status(400).json("Invalid Credentials.");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    console.log(info);
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
