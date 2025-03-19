const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose.set("strictQuery", true);
  return mongoose.connect(process.env.DB_URI);
}

async function seedDatabase() {
  const Plant = require("../models/plant");
  const Nation = require("../models/nation");

  if (process.env.FORCE_SEED) {
    await Plant.deleteMany();
    await Nation.deleteMany();
  }

  const plants = require("./plants.json");

  if ((await Plant.countDocuments()) == 0) {
    await Plant.insertMany(plants);
  }

  const nations = require("./nations.json");

  if ((await Nation.countDocuments()) == 0) {
    await Nation.insertMany(nations);
  }
}

module.exports = {
  connectToDatabase,
  seedDatabase,
};
