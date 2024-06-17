// action.ts
export interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

export const bookAppointment = async ({
  patientID,
  details,
}: {
  patientID: number;
  details: AppointmentData;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...details,
        amount: parseInt(details.amount, 10),
      }),
    }
  );
  if (!response.ok) {
    console.log("Failed to book appointment");
    return;
  }
  const data = await response.json();
  return data;
};

export const editAppointment = async ({
  patientID,
  appointmentID,
  details,
}: {
  patientID: number;
  appointmentID: number;
  details: AppointmentData;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...details,
        amount: parseInt(details.amount, 10),
      }),
    }
  );
  if (!response.ok) {
    console.log("Failed to edit appointment");
    return;
  }
  const data = await response.json();
  return data;
};