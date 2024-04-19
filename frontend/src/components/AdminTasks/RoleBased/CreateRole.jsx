import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

const CreateRole = () => {
    const [roleName, setRoleName] = useState("");
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

const handleSubmit = async (e)=>{
    e.preventDefault();

    const data = {
        nom : roleName,
    }
    await axios
      .post("http://localhost:5000/role", data)
      .then(() => {
        enqueueSnackbar("Un nouveau role a ete ajoute avec succes", {
          variant: "success",
        });
        //navigate("/login");
        setRoleName("");
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error);
      });
}

const validateRoleName = (role) => {
    // Regular expression for alphabetical role validation
    const roleRegex = /^[a-zA-Z]+$/;
    return roleRegex.test(role);
  };

  const validateForm = () => {
    if (!validateRoleName(roleName)) {
        // Handle invalid roleName
        return false;
      }
      return true;
  }

    return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
        <h1>Ajouté un Role</h1>



        </form>
      </div>
    </div>
  )
}

export default CreateRole
