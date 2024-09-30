const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const updateMultipleListings = async (query, updateData) => {
  try {
    const result = await Listing.updateMany(query, updateData, {
      runValidators: true, // Ensure schema validation is applied to updates
    });
    console.log("Update Result:", result);
  } catch (err) {
    console.error("Error updating listings:", err);
  }
};

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data =  initData.data.map((obj) => ({...obj, Owner: "66ed9d9123f5a31a8f6191e7"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
