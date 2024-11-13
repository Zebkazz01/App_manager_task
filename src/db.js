import mongoose from "mongoose";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/merndb");
    console.log("Conexion con exito a mongodb");
  } catch (error) {
    console.log(error);
  }
};
