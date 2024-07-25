import mongoose, { Schema, model } from "mongoose";

const UsersSchema = new Schema({
  name: String,
  age: Number,
  phone: Number,
  email: String,
  education: String,
  prevAttendance: String,
  registrationDate: Date
});

const AdminSchema = new Schema({
  name: String,
  phone: Number,
  email: String,
  password: String
});

export const Users = model("User", UsersSchema);
export const Admin = model("Admin", AdminSchema);