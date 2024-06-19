import { AddCircleOutline } from "@mui/icons-material";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

interface MedicalHistory {
  id: 1;
  healthProviderID: number | null;
  createdAt: string;
  patientID: number;
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}

const fetchHistories = async ({
  cookieHeader,
  patientID,
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/histories/`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === 200) {
      return response.data.appointments;
    } else {
      console.log("Failed to fetch appointments");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};

const MedicalHistoriesPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const histories: MedicalHistory[] = await fetchHistories({
    cookieHeader,
    patientID,
  });

  console.log(histories);
  return (
    <Grid item xs={12} md={6}>
      <Typography
        variant="h6"
        gutterBottom
        className="flex flex-col md:flex-row justify-center"
      >
        Medical histories
        <Link href={`/patients/${patientID}/create-medical-histories`}>
          <AddCircleOutline /> Add Medical History
        </Link>
      </Typography>
      <List>
        {histories.map((history) => (
          <>
            <Link
              href={`/patients/${patientID}/medical-histories/${history.id}`}
              key={history.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(history.createdAt).formattedDate
                  } Time: ${formatDateTime(history.createdAt).formattedTime}`}
                  secondary={`Presentation: ${history.presentation}`}
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Link>
          </>
        ))}
      </List>
    </Grid>
  );
};

export default MedicalHistoriesPage;
