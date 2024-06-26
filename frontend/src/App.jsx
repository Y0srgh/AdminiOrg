import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./App.css";
import LoginFrom from "./Pages/LoginForm/LoginFrom";
import Logout from "./components/home/Logout.jsx";
import CreateRole from "./Pages/AdminTasks/RoleBased/CreateRole";
import EditRole from "./Pages/AdminTasks/RoleBased/EditRole";
import DeleteRole from "./Pages/AdminTasks/RoleBased/DeleteRole";
import HomeRole from "./Pages/AdminTasks/RoleBased/HomeRole";
import ShowRole from "./Pages/AdminTasks/RoleBased/ShowRole";

import CreateFunction from "./Pages/AdminTasks/FunctionBased/CreateFunction";
import DeleteFunction from "./Pages/AdminTasks/FunctionBased/DeleteFunction";
import EditFunction from "./Pages/AdminTasks/FunctionBased/EditFunction";
import ShowFunction from "./Pages/AdminTasks/FunctionBased/ShowFunction";
import HomeFunction from "./Pages/AdminTasks/FunctionBased/HomeFunction";

import CreateDepartment from "./Pages/AdminTasks/DepartmentBased/CreateDepartment";
import DeleteDepartment from "./Pages/AdminTasks/DepartmentBased/DeleteDepartment";
import EditDepartment from "./Pages/AdminTasks/DepartmentBased/EditDepartment";
import ShowDepartment from "./Pages/AdminTasks/DepartmentBased/ShowDepartment";
import HomeDepartment from "./Pages/AdminTasks/DepartmentBased/HomeDepartment";

import CreateEmployee from "./Pages/AdminTasks/EmployeeBased/CreateEmployee";
import DeleteEmployee from "./Pages/AdminTasks/EmployeeBased/DeleteEmployee";
import HomeEmployee from "./Pages/AdminTasks/EmployeeBased/HomeEmployee";
import ShowEmployee from "./Pages/AdminTasks/EmployeeBased/ShowEmployee";
import EditEmployee from "./Pages/AdminTasks/EmployeeBased/EditEmployee.jsx";

import LeaveRequest from "./Pages/Requests/LeaveRequest";
import AvanceRequest from "./Pages/Requests/AvanceRequest";

import UpdatePassword from "./Pages/EmployeeTasks/UpdatePassword";
import RefundRequest from "./Pages/Requests/RefundRequest";
import FichePaieRequest from "./Pages/Requests/FichePaieRequest";
import AttestationRequest from "./Pages/Requests/AttestationRequest";
import DisplayInvalidRequests from "./Pages/DepartChief/DisplayInvalidRequests";
import DCShowRequests from "./Pages/DepartChief/DCShowRequests";
import HRDisplayInvalidRequests from "./Pages/DepartChief/HRDisplayInvalidRequests";
import EmployeeRequests from "./Pages/DepartChief/EmployeeRequests";
import UnAuth from "./components/home/unAuth";
import axios from "axios";
import SideBar from "./components/home/SideBar.jsx";
import { isAccessTokenExpired, refreshAccessToken } from "./utils/authUtils.js";
import { jwtDecode } from "jwt-decode";
import AddRequest from "./Pages/EmployeeTasks/AddRequest.jsx";
const App = () => {
  /*const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');
  if (token) {
    console.log(token);
    console.log(token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    console.log("tokeeen", token);
  }
*/

  /*useEffect(()=>{
    const fetchRefresh = async ()=>{
      
        
        await axios.post('http://localhost:5500/employee/auth/refresh',{
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
          "jwt":localStorage.getItem('refreshToken')
        }}).then((res)=>console.log(res))
      .catch( (error)=> {
        console.error("error mel app", error);
      })
    }
    fetchRefresh();
  },[])*/
  //const [token,setAccessToken] = useState("");

  useEffect(() => {
    const fetchRefresh = async () => {
      
      try {
        
      
        const response = await axios.get('http://localhost:5500/employee/auth/refresh',
          {
            headers: {
              'Content-Type': 'application/json',
              "jwt":localStorage.getItem('refreshToken'),
            },
          }
        ).then((resp)=>{
          //setAccessToken(resp.accessToken)
          localStorage.setItem('accessToken',resp.data.accessToken);
          console.log('------------------',resp);
        }).catch((error)=>{
          console.log(error);
          
          localStorage.setItem('accessToken','');
          localStorage.setItem('refreshToken','');
          //window.location='/login'
        })
      } catch (error) {
        //console.log(error);
      }
  
        //console.log('New access token:', response);
        /*if (response.status.startsWith("4")) {
          console.log('New access token:', response.data.accessToken);
        }*/
        
      /*} catch (error) {
        localStorage.setItem('accessToken','');
        localStorage.setItem('refreshToken','');
        //console.error('Error refreshing token:', error);
      }*/
    };
  
    fetchRefresh();
  }, []);
  

  //const accessTokenExpired = isAccessTokenExpired();

  //if (accessTokenExpired) {
    // Refresh the access token
    //refreshAccessToken();
  //}

  //const token = localStorage.getItem('accessToken');
  const refresh = localStorage.getItem('refreshToken');
  refresh&&console.log(refresh);
  //setAccessToken(localStorage.getItem('accessToken'))
  const token = localStorage.getItem('accessToken');
  if (token) {
    console.log("tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen",localStorage.getItem('accessToken'));
    var role = localStorage.getItem('userRole');
    console.log(token);
    console.log(token);
    const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
    console.log("the decoded --------",decodedToken);
    console.log("tokeeen", token);
  }
  
  return (
    <SnackbarProvider>
      <div className="flex h-screen">
        <BrowserRouter>
          {(token&& location.pathname !== '/login') &&<SideBar />}
          <div className="flex-1 pl-50 overflow-y-auto">
          <Routes>
            <Route exact path="/login" element={<LoginFrom />} />

            {token && (<>
              {/**admin preserved routes */}
              {role === "admin" && (<>
                <Route exact path="/role" element={<HomeRole />} />
                <Route exact path="/function/ajouter-function" element={<CreateFunction />} />

                <Route exact path="/role/ajouter-role" element={<CreateFunction />} />
                <Route exact path="/role/modifier-role/:id" element={<EditRole />} />
                <Route exact path="/role/effacer-role/:id" element={<DeleteRole />} />
                <Route exact path="/role/detail-role/:id" element={<ShowRole />} />

                <Route exact path="/function" element={<HomeFunction />} />
                <Route exact path="/function/effacer-function/:id" element={<DeleteFunction />} />
                <Route exact path="/function/modifier-function/:id" element={<EditFunction />} />
                <Route exact path="/function/detail-function/:id" element={<ShowFunction />} />

                <Route exact path="/department" element={<HomeDepartment />} />
                <Route exact path="/department/ajouter-department" element={<CreateDepartment />} />
                <Route exact path="/department/effacer-department/:id" element={<DeleteDepartment />} />
                <Route exact path="/department/modifier-department/:id" element={<EditDepartment />} />
                <Route exact path="/department/detail-department/:id" element={<ShowDepartment />} />


                <Route exact path="/employee" element={<HomeEmployee />} />
                <Route exact path="/employee/ajouter-employee" element={<CreateEmployee />} />
                <Route exact path="/employee/effacer-employee/:id" element={<DeleteEmployee />} />
                <Route exact path="/employee/modifier-employee/:id" element={<EditEmployee />} />

                <Route exact path="/employee/detail-employee/:id" element={<ShowEmployee />} />
                <Route exact path="/hr/demandes" element={<HRDisplayInvalidRequests />} />
              </>) || <Route path="/*" element={<UnAuth />} />}
              {/*end of admin preserved routes */}

              {/*employee preserved routes */}
              {((role === "employé") || (role === "depChief")) && (<>
                <Route exact path="/employee/demandes" element={<EmployeeRequests />} />
                <Route exact path="/employee/modifier-mot-de-passe" element={<UpdatePassword />} />
                <Route exact path="/leave" element={<LeaveRequest />} />
                <Route exact path="/avance" element={<AvanceRequest />} />
                <Route exact path="/refund" element={<RefundRequest />} />
                <Route exact path="/fiche_paie" element={<FichePaieRequest />} />
                <Route exact path="/add-request" element={<AddRequest />} />

                <Route exact path="/attestationDeTravail" element={<AttestationRequest />} />
              </>) || <Route path="/*" element={<UnAuth />} />}
              {/*end employee preserved routes */}

              {(role === "depChief") && (<Route exact path="/chef_depart/demandes/:id" element={<DisplayInvalidRequests />} />) || <Route path="/*" element={<UnAuth />} />}

              <Route exact path="/demandes/demande-details/:id" element={<DCShowRequests />} />
            </>) || <Route path="/*" element={<LoginFrom />} />}
              <Route exact path="/logout" element={<Logout/>}/>
          </Routes>
          </div>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
  );
};

export default App;
