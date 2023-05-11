import { useEffect, useState } from "react";
import reactLogo from "../assets/chariot3x.png";
import iconeConnect from "../Ellipse 1.png";
import iconeUser from "../assets/icons8-user 1.png";
import viteLogo from "/vite.svg";
import "./Dashbord.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useForm } from "react-hook-form";
//import AjoutProduit from '../produit/AjoutProduit'
//import { Dropdown, SplitButton } from 'react-bootstrap';

//import Commande from '../commande/Commande'
//import Connexionp from '../connexion/Connexion'
//import Admin from '../admin/Admin.js'
//import AjoutCaissier from '../caissier/AjoutCaissier.js'
import ListeProduit from "../produit/ListeProduit.js";
import AjoutCaissier from "../caissier/AjoutCaissier.js";
import AjoutProduit from "../produit/AjoutProduit.js";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader, PropagateLoader } from "react-spinners";
import React from "react";
//import ListeCaissier from '../caissier/ListeCaissier.js'
//import HistoCmd from '../historiquecommande/HistoCmd.js'
function Dashbord() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [ info, setInfo] = useState(localStorage.getItem('prenom'))
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

  const [produit, setProduit] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:3000/produit")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setProduit(res.filter((data: any) => data.etat == true));
      });
  });
  const [chariot, setChariot] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:3000/chariot")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setChariot(res.filter((data: any) => data.etat == true));
      });
  });

  const StatisTique = () => {
    React.useEffect(() => {
      if (produit.length == 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, [produit]);

    React.useEffect(() => {
      if (chariot.length == 0) {
        setLoadingChar(true);
      } else {
        setLoadingChar(false);
      }
    }, [chariot]);

    React.useEffect(() => {
      if (caissiers.length == 0) {
        setLoadingCaisse(true);
      } else {
        setLoadingCaisse(false);
      }
    }, [caissiers]);
    return (
      <div className="card cartemere d-flex">
        <div className="card carte ">
          <h2>Produits</h2>
          <div className="sweet-loading">
            {loadingProd ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PropagateLoader color={"#FEBC11"} />
              </div>
            ) : (
              <div>
                <h1> {produit.length}</h1>
              </div>
            )}
          </div>
        </div>

        <div className="card carte cart2">
          <h2>Chariot</h2>
          <div className="sweet-loading">
            {loadingChar ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PropagateLoader color={"#FEBC11"} />
              </div>
            ) : (
              <div>
                <h1> {chariot.length}</h1>
              </div>
            )}
          </div>
        </div>
        <div className="card carte ">
          <h2>Caissiers</h2>
          <div className="sweet-loading">
            {loadingCaisse ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PropagateLoader color={"#FEBC11"} />
              </div>
            ) : (
              <div>
                <h1> {caissiers.length}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
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
        {/* <ReactLogo/>*/}

        <div className=" navbaar  border-white text-center font-bold ">
        {info}
        </div>

        <div className="d-flex gap-5">
          {/*   <div className='sidebaar'>
      <p className='menu'><h4>Dashboard</h4></p>
      <p className='menu' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <h4>Caissier</h4>
        {showSubMenu && (
          <ul className='sub-menu'>
            <li>Afficher Caissier</li>
            <li>Ajouter Caissier</li>
          </ul>
        )}
      </p>
      <p className=''><h4><a href='' className='menu' data-bs-toggle='modal' data-bs-target='#modalLoginForm'>Panier</a></h4></p>
      <div className='menu'><h4>Produit</h4></div>
    </div>
    <div className='sidebaar'>
      <p className='menu'><h4>Dashboard</h4></p>
      <SplitButton id='caissier-dropdown' title='Caissier'drop='all' variant='secondary' >
        <Dropdown.Item>Afficher Caissier</Dropdown.Item>
        <Dropdown.Item>Ajouter Caissier</Dropdown.Item>
      </SplitButton>
      <p className=''><h4><a href='' className='menu' data-bs-toggle='modal' data-bs-target='#modalLoginForm'>Panier</a></h4></p>
      <div className='menu'><h4>Produit</h4></div>
    </div>*/}

          {/*<div className="sidebaar">
  <p  className="menu">
    <h4>Dashboard</h4>
  </p>
  <p  className="menu dropdown-toggle" data-bs-toggle="dropdown">
    <h4 className='menu'>Caissier</h4>
  </p>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">liste des caissiers</a></li>
    <li><a className="dropdown-item" href="#">Ajouter caissier</a></li>
  
  </ul>
  <p className="menu">
    <h4><a href="" className="menu" data-bs-toggle="modal" data-bs-target="#modalLoginForm">Panier</a></h4>
  </p>
  <p className="menu">
    <h4>Produit</h4>
  </p>
</div>*/}

          <div className="sidebaar">
            <Link to="listecaissier">
              <div className=" bttn">
                <span
                  className={`${
                    location.pathname === "/dashboard/listecaissier"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>*/}
                  <span className="ml-2">liste des caissiers</span>
                </span>
              </div>
            </Link>

            <Link to="listecaissierArchive">
              <div className=" bttn">
                <span
                  className={`${
                    location.pathname === "/dashboard/listecaissierArchive"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>*/}
                  <span className="ml-2">liste des caissiers archiver</span>
                </span>
              </div>
            </Link>

            <Link to="ajoutercaissier">
              <div className="bttn">
                <span
                  className={`${
                    location.pathname === "/dashboard/ajoutercaissiers"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>*/}
                  <span className="ml-2">Ajouter caissier</span>
                </span>
              </div>
            </Link>

            <Link to="listeproduitArchive">
              <div className=" bttn">
                <span
                  className={`${
                    location.pathname === "/dashboard/listeproduitArchive"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/*  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>*/}
                  <span className="ml-2">listeproduit archiver</span>
                </span>
              </div>
            </Link>
            <Link to="listeproduit">
              <div className=" bttn">
                <span
                  className={`${
                    location.pathname === "/dashboard/listeproduit"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/*  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>*/}
                  <span className="ml-2">listeproduit</span>
                </span>
              </div>
            </Link>
            <Link to="ajouterproduit">
              <div className="bttn text-light">
                <span
                  className={`${
                    location.pathname === "/dashboard/ajouterproduit"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>*/}
                  <span className="ml-2">Ajouter produit</span>
                </span>
              </div>
            </Link>

            <Link to="commande">
              <div className="bttn text-light">
                <span
                  className={`${
                    location.pathname === "/dashboard/commande"
                      ? "border-2 border-emerald-600"
                      : ""
                  } bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>*/}
                  <span className="ml-2">commande</span>
                </span>
              </div>
            </Link>
            <div className=" bttn">
              <span
                onClick={() => logout()}
                className="bg-red hover:text-black hover:bg-emerald-100 py-3 mt-24 px-6 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row"
              >
                {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>*/}
                <span className="ml-2">Deconnexion</span>
              </span>
            </div>
          </div>

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

export default Dashbord;
