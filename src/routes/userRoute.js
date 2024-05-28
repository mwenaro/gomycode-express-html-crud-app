const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { unique: true, type: String, required: true },
    age: { type: Number, required: true },
    hobbies: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
  });
  
  const User = mongoose.model("User", userSchema);
// Create a new user
router.post("/", async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.post("/many", async (req, res) => {
    try {
      req.body.forEach(async(usr)=>{
        const user = new User(usr);
        await user.save()
      })
      
      
    
      res.status(201).send("users suceffully created");
    } catch (error) {
      res.status(400).send(error);
    }
  });
  // Get all users
  router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Get a single user by ID
  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update a user by ID
  router.put("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete a user by ID
  router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  module.exports = router