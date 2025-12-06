const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserModel = require("./schema");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("connected to database!"));

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await UserModel.create({
      name,
      email,
      message,
    });

    res
      .status(201)
      .json({ message: "Contact saved successfully", data: newContact });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error saving data", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
