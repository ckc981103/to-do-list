import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3030";

export interface Duty {
  id: string;
  name: string;
}

export const listAll = async (): Promise<Duty[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/duties`);
    return data.rows;
  } catch (error) {
    return [];
  }
};

export const createOne = async (name: string): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/duties`, { name });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateOne = async (id: string, name: string): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/duties/${id}`, { name });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteOne = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/duties/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};
