"use client";
import VitalsForm from "@/components/VitalsForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface VitalsResults {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

interface EditVitalsProps {
  params: { vitalsID: string; patientID: string };
}

const fetchVitals = async ({
  patientID,
  vitalsID,
}: {
  patientID: string;
  vitalsID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/appointments/${vitalsID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically handle cookies
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data.appointment;
    } else {
      console.log("Failed to fetch patient details");
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
};

const updateVitals = async ({
  patientID,
  updatedVitals,
  vitalsID,
}: {
  patientID: string;
  updatedVitals: VitalsResults;
  vitalsID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
      {
        updatedVitals,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 201) {
      console.log("Failed");
      return;
    }
    return response.data;
  } catch (error) {
    console.error("Failed to update appointment", error);
    return;
  }
};

const EditVitals = ({ params }: EditVitalsProps) => {
  const { vitalsID, patientID } = params;
  const [vitals, setVitals] = useState<VitalsResults | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAppointment = await fetchVitals({
        patientID,
        vitalsID,
      });
      if (fetchedAppointment) {
        setVitals(fetchedAppointment);
      }
    };

    fetchData();
  }, [patientID, vitalsID]);

  const router = useRouter();
  const handleUpdate = async (updatedVitals: VitalsResults) => {
    const result = await updateVitals({
      patientID,
      updatedVitals,
      vitalsID,
    });

    if (result.id) {
      router.push(`/patients/${patientID}/vitals/${result.id}`);
    }
  };
  return (
    <>
      <VitalsForm
        handlerFunction={handleUpdate}
        vitals={vitals as VitalsResults}
      />
    </>
  );
};

export default EditVitals;
