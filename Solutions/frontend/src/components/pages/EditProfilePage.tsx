import { useEffect, useState } from "react";
import EditProfileTemplate from "../templates/EditProfileTemplate";
import { fetchWithAuth } from "@services/apiService";

function EditProfilePage() {
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    email: "",
    cpf: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithAuth(
          "/user",
          localStorage.getItem("token") || ""
        );
        setUserData({
          avatar: data.avatar,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return <EditProfileTemplate userData={userData} />;
}

export default EditProfilePage;
