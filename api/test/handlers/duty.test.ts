import { describe } from "@jest/globals";
import { Request, Response } from "express";
import { list, createOne, updateOne, deleteOne } from "../../src/handlers/duty";
import { query } from "../../src/services/database";

jest.mock("../../src/services/database", () => {
  const originalModule = jest.requireActual("../../src/services/database");
  return {
    __esModule: true,
    ...originalModule,
    query: jest.fn(),
  };
});

describe("list", () => {
  it("should return a list of duties", async () => {
    const req = {} as Request;
    const res = {
      status: () => ({
        send: jest.fn(),
      }),
      send: jest.fn(),
    } as unknown as Response;

    await list(req, res);

    expect(query).toHaveBeenCalledWith("SELECT * FROM duties");
  });
});

describe("createOne", () => {
  it("should create a duty", async () => {
    const req = {
      body: {
        name: "Test Duty",
      },
    } as Request;
    const res = {
      status: () => ({
        send: jest.fn(),
      }),
      send: jest.fn(),
    } as unknown as Response;

    await createOne(req, res);

    expect(query).toHaveBeenCalledWith(
      "INSERT INTO duties (name) VALUES ('Test Duty')"
    );
  });
});

describe("updateOne", () => {
  it("should update a duty", async () => {
    const req = {
      body: {
        name: "Test Duty",
      },
      params: {
        id: "1",
      },
    } as unknown as Request;
    const res = {
      status: () => ({
        send: jest.fn(),
      }),
      send: jest.fn(),
    } as unknown as Response;

    await updateOne(req, res);

    expect(query).toHaveBeenCalledWith(
      "UPDATE duties SET name = 'Test Duty' WHERE id = '1'"
    );
  });
});

describe("deleteOne", () => {
  it("should delete a duty", async () => {
    const req = {
      params: {
        id: "1",
      },
    } as unknown as Request;
    const res = {
      status: () => ({
        send: jest.fn(),
      }),
      send: jest.fn(),
    } as unknown as Response;

    await deleteOne(req, res);

    expect(query).toHaveBeenCalledWith("DELETE FROM duties WHERE id = '1'");
  });
});
