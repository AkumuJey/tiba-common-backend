export interface MedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

export const updateHistory = async ({
  patientID,
  medicalHistory,
  medicalHistoryID,
}: {
  patientID: string;
  medicalHistoryID: string;
  medicalHistory: MedicalHistory;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify(medicalHistory),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};