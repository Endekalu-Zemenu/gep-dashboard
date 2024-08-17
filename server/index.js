import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { addUser, checkAdmin, deleteUser, editUserData, fetchAdminData, fetchUserData, addAdmin } from "./controller/mongoose.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors(
  // {
  // origin: ["https://gep-hmyc.vercel.app", "https://gep-hmyc.vercel.app/add", "https://gep-hmyc.vercel.app/edit", "https://gep-hmyc.vercel.app/delete", "https://gep-hmyc.vercel.app/users", "https://gep-hmyc.vercel.app/login"],
  // methods: ["POST", "GET", "DELETE", "PUT"],
  // credentials: true
// }
));
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const usersList = await fetchUserData();
  res.json({ users: usersList });
});

app.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  userData.age = parseInt(userData.age);

  try {
    const updatedUser = await editUserData(id, userData);
    res.json({updatedUser: updatedUser})
  } catch(err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await deleteUser(id);

    res.json({deletedUser})
  } catch(err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  // returns true or false, true to let the admin login

  try {
    const result = await checkAdmin(req.body.email, req.body.password);
    res.json({ isAdmin: result });
  } catch(err) {
    console.log(err)
  }
})

app.get("/admins", async(req, res) => {
  const adminList = await fetchAdminData();
  res.json({ admins: adminList })
})

app.post("/add-admin", async(req, res) => {
  await addAdmin(req.body);
})

app.post("/add", async(req, res) => {
  await addUser(req.body)
});

app.listen(port, () => console.log(`server running on port ${port}`));