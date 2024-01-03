import mongoose from "mongoose";

const connect = async () => {
  const URL  = process.env.MONGODB_URL
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
