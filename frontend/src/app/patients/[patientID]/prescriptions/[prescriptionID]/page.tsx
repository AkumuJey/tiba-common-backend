import React from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchPrescriptions = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};

const SinglePrescriptionsPage = async ({
  params,
}: {
  params: { patientID: string; prescriptionID: string };
}) => {
  const { patientID, prescriptionID } = params;
  const results = await fetchPrescriptions({ patientID, prescriptionID });
  console.log(results);
  return <div>SinglePrescriptionsPage</div>;
};

export default SinglePrescriptionsPage;