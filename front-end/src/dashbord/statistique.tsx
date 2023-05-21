import { useEffect, useState } from "react";

import "./Dashbord.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useForm } from "react-hook-form";
import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ClipLoader, PropagateLoader } from "react-spinners";
//import React from "react";

import * as React from "react";

export default function StatisTique() {
  const [prenom, setInfo] = useState(localStorage.getItem("prenom"));
  const [nom, setInfo2] = useState(localStorage.getItem("nom"));
  //const [role, setInfo3] = useState(localStorage.getItem("role"));
  const [loadingProd, setLoading] = React.useState(false);
  const [loadingChar, setLoadingChar] = React.useState(false);
  const [loadingCaisse, setLoadingCaisse] = React.useState(false);
  const [caissiers, setCaissiers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setCaissiers(
          res.filter((data: { etat: boolean }) => data.etat == true)
        );
      });
  },[]);

  const [produit, setProduit] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/produit")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setProduit(res.filter((data: { etat: boolean }) => data.etat == true));
      });
  },[]);
  const [chariot, setChariot] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/chariot")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setChariot(res);
      });
  },[]);

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
    <div
      id="stats"
      className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 shadow-[#FEBC11]"
    >
      <div className="bg-[#4C7FC7] to-white/5 p-6 rounded-lg shadow-[#FEBC11] w-80 flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-4 content-center items-center">
          <div className="text-white" id="stats-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
          </div>
          <div>
            <h4 className="text-white text-lg  uppercase leading-4">
              PRODUITS
            </h4>
            <p className="text-white font-bold text-2xl inline-flex items-center content-center space-x-2">
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
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#4C7FC7] to-white/5 p-6 rounded-lg  w-80 flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-4 items-center">
          <div className="text-white" id="stats-1">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
</svg>
          </div>
          <div>
            <h4 className="text-white text-lg  uppercase leading-4">
              CHARIOTS
            </h4>
            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
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
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#4C7FC7] to-white/5 p-6 rounded-lg w-80 flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-4 items-center">
          <div className="text-white" id="stats-1">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
</svg>
          </div>
          <div>
            <h4 className="text-white text-lg  uppercase leading-4">
              CAISSIERS
            </h4>
            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
