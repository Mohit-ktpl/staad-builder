import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfuly");
  } catch (error) {
    console.error("Couldn't connect to db", error);
    process.exit(1);
  }
};
