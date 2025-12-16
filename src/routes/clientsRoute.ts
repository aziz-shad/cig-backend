import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../controllers/Clients-controller.ts";
import { Router } from "express";

const route = Router();

route.get("/", getClients).post("/", createClient);
route.put("/:id", updateClient).delete("/:id", deleteClient);

export default route;
