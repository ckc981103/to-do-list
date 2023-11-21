import { Request, Response } from "express";

import { query } from "../services/database";

export const list = async (req: Request, res: Response) => {
  try {
    const readAllQuery = `SELECT * FROM duties`;
    const { rows } = await query(readAllQuery);
    return res.send({ rows });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const createOne = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const createQuery = `INSERT INTO duties (name) VALUES ('${name}')`;
    await query(createQuery);
    return res.send({ success: true });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updateQuery = `UPDATE duties SET name = '${name}' WHERE id = '${id}'`;
    await query(updateQuery);
    return res.send({ success: true });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM duties WHERE id = '${id}'`;
    const { rows } = await query(deleteQuery);
    return res.send({ success: true });
  } catch (error) {
    return res.status(400).send(error);
  }
};
