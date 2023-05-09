import { useState } from "react";
import reactLogo from "../assets/chariot3x.png";
import iconeConnect from "../Ellipse 1.png";
import iconeUser from "../assets/icons8-user 1.png";
import viteLogo from "/vite.svg";
import "./AjoutCaissier.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
function AjoutCaissier() {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [EMessage, setEMessage] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: any) => {
    fetch("http://localhost:3000/users", {
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        prenom: data.prenom,
        nom: data.nom,
        role: data.role,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response.status === 201) {
          return response.json()
      } else { 
     
          //sendMessage('message', 'cool');
          return response.json().then((data:any) => {
            setErrorMessage(data.message)
            setEMessage(true) 
              console.log(data.message)
          })
      }
    })
      .then((response) => console.log(response));
  };
  return (
    <>
      <div className=" align-items-center">
        {/* <ReactLogo/>*/}

        <div className="d-flex">
          <div className="form1">
            <div className="formm">
              <form
                onSubmit={handleSubmit(onSubmit)}
                action=""
                className="formulaire gap-5 d-flex flex-column justify-content-center"
              ><div className={`justify-content-center alert alert-danger ${!EMessage ? "cacher": ""}`}
              role='alert'>{errorMessage}</div>
                <div className="d-flex gap-5 justify-content-center">
                  <div className="d-flex flex-column ">
                    <label className="lab" htmlFor="">
                      Prenom{" "}
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="Cheikh"
                      {...register("prenom", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="text"
                    />
                    <div>
                      {errors.prenom?.type === "required" && (
                        <span className="text-danger">
                          {errors.prenom.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column ">
                    <label className="lab" htmlFor="">
                      Nom{" "}
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="SALL"
                      {...register("nom", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="text"
                    />
                    <div>
                      {errors.nom?.type === "required" && (
                        <span className="text-danger">
                          {errors.nom.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-5 justify-content-center">
                
                  <div className="d-flex flex-column">
                    
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
                    <label className="lab" htmlFor="">
                      Role{" "}
                    </label>
                    <select
                      className="form-control role border-none"
                      {...register("role", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                    >
                      <option value="">Choisir un rôle</option>
                      <option value="Administrateur">Administrateur</option>
                      <option value="Caissier">Caissier</option>
                    </select>

                    <div>
                      {errors.role?.type === "required" && (
                        <span className="text-danger">
                          {errors.role.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-5 justify-content-center">
                  <div className="d-flex flex-column">
                    <label className="lab" htmlFor="">
                      Mot de passe
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="****"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
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
                  </div>
                  <div className="d-flex flex-column">
                    <label className="lab" htmlFor="">
                      Confirmation de Mot de passe
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="****"
                      {...register("passwordConf", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="password"
                    />
                    <div>
                      {errors.passwordConf?.type === "required" && (
                        <span className="text-danger">
                          {errors.passwordConf.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button className="boutton">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AjoutCaissier;
