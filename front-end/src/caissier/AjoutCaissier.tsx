import { useRef, useState } from "react";
import "./AjoutCaissier.css";
import Swal from "sweetalert2";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
function AjoutCaissier() {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [EMessage, setEMessage] = useState<boolean>(false);
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const password = useRef({});
  password.current = watch("password", "");
  let timerInterval: string | number | NodeJS.Timer | undefined;
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
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: "Utilisatur ajouté avec succes",
            icon: "success",
            //iconHtml: "؟",
           // html: "cet chariot n est pas dans la base de donnee.",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              //const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                //  b.textContent = Swal.getTimerLeft()
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
             // console.log("I was closed by the timer");
            }
          });
           reset();
          return response.json();
         
        } else {
          //sendMessage('message', 'cool');
          return response.json().then((data: any) => {
            setErrorMessage(data.message);
            setEMessage(true);
            setTimeout(()=>{
              setErrorMessage("");
              setEMessage(false);
            }, 3000)
          //  console.log(data.message);
          });
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
              >
                <div
                  className={`justify-content-center alert alert-danger ${
                    !EMessage ? "cacher" : ""
                  }`}
                  role="alert"
                >
                  {errorMessage}
                </div>
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
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Ce champ est obligatoire",
                        },
                        validate: (value) =>
                          password.current === value ||
                          "Mots de passe non correspondant",
                      })}
                      type="password"
                    />
                    <div>
                      {errors.confirmPassword && (
                        <p className="text-danger">
                          {errors.confirmPassword.message as string}
                        </p>
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
