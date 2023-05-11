import { useState } from "react";
import reactLogo from "../assets/chariot3x.png";
import iconeConnect from "../Ellipse 1.png";
import iconeUser from "../assets/icons8-user 1.png";
import viteLogo from "/vite.svg";
import "./Connexion.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { log } from "console";
function Connexionp() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const ReactLogo = () => {
    return <div>bonjour</div>;
  };
  const navigate =
    useNavigate(); /*useNavigate est un hook personnalisé pour naviguer entre les pages */
  const [errorMessage, setErrorMessage] = useState("");
  const [EMessage, setEMessage] = useState<boolean>(false);
  const onSubmit = (data: any) => {
    fetch("http://localhost:3000/auth", {
      body: JSON.stringify({ email: data.email, password: data.password }),
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
          return response.json().then((data: any) => {
            setErrorMessage(data.message);
            setEMessage(true);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("id_user", data.id);
        localStorage.setItem("prenom", data.prenom);
        localStorage.setItem("nom", data.nom);
        localStorage.setItem("role", data.role);
        navigate("/dashbord");
      });
  };
  return (
    <>
      <div className="container p-3 w-100 align-items-center">
        {/* <ReactLogo/>*/}
        <div className="card border-white text-center font-bold ">
          <h1 className="titre">Chariot connecté</h1>
        </div>

        <div className="d-flex">
          <div className="form2">
            <div className="iconne">
              <img src={reactLogo} alt="" />{" "}
            </div>
            <div className="iconne2">
              <br />
              <p>
                Cette PLATEFORME sera destinée à améliorer la vitesse de
                traitement des paiements dans les supermarchés. Elle repose sur
                une technologie de scan des produits par code barre et de
                génération de code QR pour faciliter le processus d'achat. La
                solution permettra également un suivi en temps réel du solde du
                chariot pour aider les clients à mieux gérer leur budget.
              </p>
            </div>
          </div>
          <div className="form1">
            <div className="logo">
              {" "}
              <span className="contour">
                <img src={iconeUser} alt="" />
              </span>
            </div>
            <div className="formm">
              <form
                onSubmit={handleSubmit(onSubmit)}
                action=""
                className="formulaire w-50 gap-5 d-flex flex-column"
              >
                <div className="d-flex flex-column">
                  <div
                    className={`justify-content-center alert alert-danger ${
                      !EMessage ? "cacher" : ""
                    }`}
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                  <label className="lab" htmlFor="">
                    Email{" "}
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="contact@gmail.com"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                        message: "le format du mail est incorrect",
                      },
                    })}
                    type="text"
                  />
                  <div>
                    {errors.email?.type === "required" && (
                      <span className="text-danger">
                        {errors.email.message as unknown as string}
                      </span>
                    )}
                  </div>
                  <div>
                    {errors.email?.type === "pattern" && (
                      <span className="text-danger">
                        {errors.email.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column">
                  {}
                  <label className="lab" htmlFor="">
                    Mot de pass{" "}
                  </label>

                  <input
                    className="form-control border-none"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                      minLength: {
                        value: 4,
                        message:
                          "le mot de passe doit etre au moins 6 caracteres",
                      },
                    })}
                    type="password"
                  />
                  <div>
                    {errors.password?.type === "required" && (
                      <span className="text-danger">
                        {errors.password.message as unknown as string}
                      </span>
                    )}
                  </div>
                  <div>
                    {errors.password?.type === "minLength" && (
                      <span className="text-danger">
                        {errors.password.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="boutton">se connecter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connexionp;
