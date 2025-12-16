import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.status(200).json({ msg: "Comming soon" });
});

export default route;
