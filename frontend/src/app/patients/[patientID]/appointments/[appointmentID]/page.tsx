import React from "react";
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";
import Link from "next/link";

interface PatientDetails {
  firstName: string;
  lastName: string;
}

interface AppointmentDetails {
  id: number;
  createdAt: string; // ISO 8601 date string
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string; // ISO 8601 date string
  amount: number;
  description: string;
  patient: PatientDetails;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchAppointment = async (patientID: string, id: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.appointment;
};

const SingleAppointment = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  console.log(appointmentID);
  const appointment: AppointmentDetails = await fetchAppointment(
    patientID,
    appointmentID
  );
  const { patient } = appointment;
  // console.log(appointment);
  return (
    <Paper elevation={2} className="w-full max-w-lg mx-auto p-6 my-4">
      <Typography variant="h6" component="div" className="mb-4 text-center">
        Appointment Details
      </Typography>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Appointment Time:
        </Typography>
        <Typography variant="body2">
          Date: {new Date(appointment.appointmentTime).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Time: {new Date(appointment.appointmentTime).toLocaleTimeString()}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Venue:
        </Typography>
        <Typography variant="body2">{appointment.venue}</Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Reason for visit:
        </Typography>
        <Typography variant="body2">{appointment.description}</Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Patient Name:
        </Typography>
        <Typography variant="body2">
          {`${patient.firstName} ${patient.lastName}`}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Created at:
        </Typography>
        <Typography variant="body2">
          Date: {new Date(appointment.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Time: {new Date(appointment.createdAt).toLocaleTimeString()}
        </Typography>
      </div>
      <Link
        href={{
          pathname: `/patients/${appointment.patientID}/appointments/${appointment.id}/edit`,
          query: {
            venue: appointment.venue,
            appointmentTime: appointment.appointmentTime,
            amount: appointment.amount,
            description: appointment.description,
          },
        }}
        className="block p-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition"
      >
        Edit
      </Link>
    </Paper>
  );
};

export default SingleAppointment;