import keys from "@/keys";
import { TInternship } from "@/types/internship.type";
import axios from "axios";
import { fromAddress, setKey } from "react-geocode";
setKey("GOOGLEAPIKEY"); // Replace with custom API Key

const getInternships = async (rnummer: string, session: any): Promise<TInternship[]> => {
  let internships: TInternship[] = []
  if (session?.user.role === "COORDINATOR") {
    internships = (await axios(keys.NEXT_PUBLIC_URL + `/internships`)).data
  } else {
    internships = (await axios(keys.NEXT_PUBLIC_URL + `/internships/user?rnummer=${rnummer}`)).data
  }

  const internshipsWithCoords = await Promise.all(
    internships.map(async (internship) => {
      try {
        const { lat, lng } = (await fromAddress(internship.location))
          .results[0].geometry.location;
        const startDate = new Date(internship.startDate);
        const endDate = new Date(internship.endDate)
        return {
          ...internship,
          startDate,
          endDate,
          lat,
          lng
        };
      } catch (err) {
        const startDate = new Date(internship.startDate);
        const endDate = new Date(internship.endDate)
        return {
          ...internship,
          startDate,
          endDate,
          lat: -34.397,
          lng: 150.644
        };
      }
    }),
  );
  return internshipsWithCoords as TInternship[];
};

const updateInternship = async (internship: any) => {
      return fetch(`${process.env.NEXT_PUBLIC_URL}/internships/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(internship),
      });
}

const getInternshipLocationById = async (id: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_URL}/internships/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const internshipService = { getInternships, updateInternship };
export default internshipService;
