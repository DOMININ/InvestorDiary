import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = 5000;
const mongoUrl =
  "mongodb+srv://dominin:klas3000@cluster0.mwcdn.mongodb.net/app?retryWrites=true&w=majority";

const start = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, (): void =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
};

start();
