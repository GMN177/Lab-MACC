import mongoose from "mongoose";

async function seedDatabase() {
  const Nation = mongoose.model("Nation");
  const Plant = mongoose.model("Plant");

  if (process.env.FORCE_SEED) {
    await Plant.deleteMany();
    await Nation.deleteMany();
  }

  if ((await Plant.countDocuments()) == 0) {
    await import("./plants.json", {
      with: { type: "json" },
    })
      .then((m) => m.default)
      .then((plants) => Plant.insertMany(plants));
  }

  if ((await Nation.countDocuments()) == 0) {
    await import("./nations.json", {
      with: { type: "json" },
    })
      .then((m) => m.default)
      .then((nations) => Nation.insertMany(nations));
  }
}

export { seedDatabase };
