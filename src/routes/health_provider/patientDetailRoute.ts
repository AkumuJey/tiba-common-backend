import { Router, Request, Response } from "express";
import { PatientHistorySchema } from "../../schema/PatientDetails";
import { prismaClient } from "../../server";

const patientDetailsRoute = Router();

patientDetailsRoute.post("/", async (req: Request, res: Response) => {
  try {
    PatientHistorySchema.parse(req.body);
    const { patientID, presentation, medicalHistory } = req.body;
    const history = await prismaClient.medicalHistory.create({
      data: { presentation, medicalHistory, patientID: parseInt(patientID) },
    });

    if (!history) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ history });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
});
patientDetailsRoute.get("/", async (req: Request, res: Response) => {
  try {
    const { patientID } = req.body;
    const histories = await prismaClient.medicalHistory.findMany({
      where: { patientID },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!histories || histories.length === 0) {
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

patientDetailsRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const medicalHistory = await prismaClient.medicalHistory.findUnique({
      where: { id },
    });
    if (!medicalHistory) {
      res.status(404).json({ message: "Medical history not found" });
    } else {
      res.status(200).json(medicalHistory);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "Failed to retrieve medical history" });
  }
});
patientDetailsRoute.patch("/id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    PatientHistorySchema.parse(req.body);
    const { patientID, presentation, medicalHistory } = req.body;
    const updatedHistory = await prismaClient.medicalHistory.update({
      where: { id },
      data: { presentation, medicalHistory, patientID },
    });

    if (!updatedHistory) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ updatedHistory });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
});
patientDetailsRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prismaClient.medicalHistory.delete({ where: { id } });
    res.status(204).json({ message: "History deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Failed to delete history" });
  }
});

patientDetailsRoute.get("/patient/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { patientID } = req.body;
    const medicalHistories = await prismaClient.medicalHistory.findMany({
      where: { id, patientID },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(medicalHistories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "Failed to retrieve medical histories" });
  }
});
