import type { Request, Response } from "express";
import { Client } from "../models/Clients.ts";

//get all clients
const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();

    if (!clients.length) {
      res.status(200).json({ msg: "No Clinets found in DB" });
    } else {
      res.status(200).json({ clients });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//create Client
const createClient = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, age } = req.body;
    if (!first_name || !last_name || !email || !age) {
      res.status(400).json({ msg: "Please provide all fiels" });
    } else {
      const client = await Client.create({
        first_name,
        last_name,
        email,
        age,
      });
      res.status(201).json(client);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update one Client
const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, age } = req.body;
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ msg: "Client not found" });
    } else {
      const client = await Client.updateOne(
        { _id: id },
        {
          $set: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
          },
        }
      );

      res.status(200).json(client);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete one client

const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ msg: "Client not found" });
    } else {
      const client = await Client.deleteOne({ _id: id });

      res.status(200).json(client);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getClients, createClient, updateClient, deleteClient };

//more functions will be added later on for example
//const makeClientInavtive = async (req: Request, res: Response) => {}
