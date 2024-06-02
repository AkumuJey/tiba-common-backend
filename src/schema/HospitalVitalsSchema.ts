import { z } from "zod";

export const HospitalVitalsSchema = z.object({
  patientID: z.number().int().positive(),
  healthProviderID: z.number().int(),
  medicalHistoryID: z.number().int().optional(),
  breathingRate: z.number().int(),
  systolicBP: z.number().int(),
  diastolicBP: z.number().int(),
  pulseRate: z.number().int(),
  weightKg: z.number().positive(),
});
