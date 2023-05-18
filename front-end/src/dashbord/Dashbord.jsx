/*import { useEffect, useState } from "react";
import reactLogo from "../assets/chariot3x.png";
import iconeConnect from "../Ellipse 1.png";
import iconeUser from "../assets/icons8-user 1.png";
import viteLogo from "/vite.svg";
import "./Dashbord.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useForm } from "react-hook-form";
import { Link, Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader, PropagateLoader } from "react-spinners";
import React from "react";
function Dashbord() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [prenom, setInfo] = useState(localStorage.getItem("prenom"));
  const [nom, setInfo2] = useState(localStorage.getItem("nom"));
  //const [role, setInfo3] = useState(localStorage.getItem("role"));
  const [loadingProd, setLoading] = React.useState(false);
  const [loadingChar, setLoadingChar] = React.useState(false);
  const [loadingCaisse, setLoadingCaisse] = React.useState(false);
  const [caissiers, setCaissiers] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setCaissiers(res.filter((data: any) => data.etat == true));
      });
  });



  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
if(!token){
  navigate("/")
}
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    redirect('/')
    
   
  };

  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleMouseOver = () => {
    setShowSubMenu(true);
  };

  const handleMouseOut = () => {
    setShowSubMenu(false);
  };
  const onSubmit = (data: any) => {
    fetch("http://localhost:3000/auth/login", {
      body: JSON.stringify({ email: data.email, password: data.password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  };
  return (
    <>
      <div className=" p-3 align-items-center">
      

        <div className=" navbaar  border-white text-center text-light font-bold ">
          <h2>{prenom} </h2> <h4>{nom} </h4> <h5>{role} </h5>
        </div>

        <div className="d-flex gap-5">
      

 

          <div className="sidebaar">
        
           

          <div className=" w-75 justify-content-center">
            <StatisTique />
            <div className="d-flex justify-content-center">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div
        className=" modal fade"
        id="modalLoginForm"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <form action="">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {" "}
              <div className="popup">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold text-light">
                    Enregistrement CHariot
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    <label
                      className="text-light"
                      data-error="wrong"
                      data-bs-success="right"
                      htmlFor="defaultForm-email"
                    >
                      N° Chariot
                    </label>
                    <input
                      type="Number"
                      id=""
                      className="form-control validate"
                    />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="submit" className="boutton">
                    Enregistré
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashbord;*/


import "./Dashbord.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useForm } from "react-hook-form";
import { Link, Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader, PropagateLoader } from "react-spinners";
//import React from "react";


import { useEffect, useState } from "react";

import * as React from 'react';


import StatisTique from './statistique';
import { Height } from "@mui/icons-material";


export default function Dashbord() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [EMessage, setEMessage] = useState(false);
  const [chariot, setChariot] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const [prenom, setInfo] = useState(localStorage.getItem("prenom"));
  const [nom, setInfo2] = useState(localStorage.getItem("nom"));
  const [role, setInfo3] = useState(localStorage.getItem("role"));
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });



  useEffect(() => {
    fetch("http://localhost:3000/chariot")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setChariot(res);
      });
  });


  const onSubmit = (data) => {
    console.log(data)
    fetch("http://localhost:3000/chariot", {
      body: JSON.stringify({
        reference: data.reference,

      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          //sendMessage('message', 'cool');
          return response.json().then((data) => {
            setErrorMessage(data.message);
            setEMessage(true);
            console.log(data.message);
          });
        }
      })
      .then((response) => console.log(response));
  };

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate("/")
  }
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    redirect('/')


  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <>
      <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#FEBC11] shadow">
        <div class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
          {prenom}
        </div>
        <div class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
          {nom}
        </div>
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">


            <button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
              <span class="block relative w-6 h-px rounded-sm bg-white"></span>
              <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
            <ul class="flex flex-col lg:flex-row list-none ml-auto">
              <li class="nav-item">
                <div class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  {role}
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <div className="flex flex-row">
        {/*  <div class="bg-[#FEBC11]" style={{width:'250px', height:'58rem'}}></div>*/}

        <aside class="relative flex flex-col w-64 h-900 px-5 py-8 overflow-y-auto bg-[#4C7FC7] border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <a href="#">

          </a>

          <div class="flex flex-col justify-between flex-1 mt-6">
            <nav class="-mx-3 space-y-6 ">
              {role == 'Administrateur' && <> <div class="space-y-3 ">
                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Produits</label>
                {/* <Link to="listeproduit">
              <div className=" bttn">
                <span
                  className={`${
                    location.pathname === "/dashboard/listeproduit"
                      ? "border-2 border-emerald-600"
                      : ""
                  } text-[#4C7FC7] bg-emerald hover:bg-[#4C7FC7] hover:text-white py-3 px-4 w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  <span className="ml-2">produit</span>
                </span>
              </div>
                </Link>*/}

                <Link to="listeproduit">
                  <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row gap-2">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                    </svg>

                    <span class="mx-2 text-sm font-medium">Produits</span>
                  </a>
                </Link>
                <Link to="ajouterproduit">

                  <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>

                    <span class="mx-3 text-sm font-medium">+ produit</span>
                  </a>
                </Link>
              </div>

                <div class="space-y-3 ">
                  <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Caissiers</label>
                  <Link to="listecaissier">
                    <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row">
                      <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                      </svg>

                      <span class="mx-2 text-sm font-medium">CAISSIERS</span>
                    </a>
                  </Link>

                  <Link to="ajoutercaissier">
                    <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row gap-2">
                      <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                      </svg>

                      <span class="mx-2 text-sm font-medium">CAISSIERS</span>
                    </a>
                  </Link>


                  <button type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRegister"
                    className="btn ">
                    <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row gap-2">
                      <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                      </svg>

                      <span class="mx-2 text-sm font-medium">CHARIOT</span>
                    </a>
                  </button>
                </div>

              </>
              }



              <div class=" ">

                <Link to="commande">
                  <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row gap-2">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                    </svg>

                    <span class="mx-2 text-sm font-medium">Commandes</span>
                  </a>
                </Link>



                <a class="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span class="mx-2 text-sm font-medium" onClick={() => logout()} >Deconnexion</span>
                </a>

              </div>
            </nav>
          </div>
        </aside>
        <div class="bg-white w-full h-1400 mb-0">

          <div class="">

            {/* contenue*/}
            <div id="content" class="bg-white/10 col-span-9 rounded-lg p-6 flex flex-col justify-center items-center gap-4">
              <div class="w-full items-center content-center">
                <StatisTique />
              </div>

              <div class="flex flex-row items-center justify-center w-full">
                <Outlet />
              </div>
            </div>


          </div>
        </div>
      </div>




      <div
        className="modal fade "
        id="modalRegister"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content fornmm">
            <div className="modal-header w-100  text-center">
              <h4 className="modal-title text-light w-100 font-weight-bold">
                Chariots
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>


            <div className="modal-body mx-3">
              <form
                onSubmit={handleSubmit(onSubmit)}

                className="formulaire gap-3 d-flex justify-content-center"
              >
                <div className="d-flex flex-column ">
                  <label className="lab" htmlFor="">
                    Reference{" "}
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="5"
                    {...register("reference", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="Number"
                  />
                  <div>
                    {errors.reference?.type === "required" && (
                      <span className="text-danger">
                        {errors.reference.message}
                      </span>
                    )}
                  </div>
                </div>




                <div className="modal-footer d-flex justify-content-center">
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"

                      className="text-white transition-colors duration-3000 transform px-3 py-2 bg-emerald hover:bg-[#FEBC11] hover:text-white py-3  w-55 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </form>


              <span className="search w-25 mb-3">
                <input
                  className="inp form-control border-none"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />{" "}
                <button className="btns btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="#fff"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z " />
                  </svg>
                </button>{" "}
              </span>


              <div className="table-wrapper radius bg-white " style={{ maxHeight: "300px", borderRadius: "10px" }}>

                <table className="table table-striped " >
                  <thead className="sticky-top">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Reference</th>


                    </tr>
                  </thead>
                  {chariot.length === 0 ? (
                    <>
                      <span
                        className="spinner-border text-primary"
                        role="status"
                      ></span>
                      <span className="text-muted fs-6 fw-semibold mt-5">
                        Loading...
                      </span>
                    </>
                  ) : (
                    <tbody>
                      {chariot.filter((chariots) =>
                        `${chariots.reference}`
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ).map((chariots) => (
                        <tr key={chariots.id}>

                          <td>
                            <div className="">
                              <span>{chariots.id}</span>
                            </div>
                          </td>
                          <td>
                            <div >
                              <span>{chariots.reference}</span>
                            </div>
                          </td>


                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

