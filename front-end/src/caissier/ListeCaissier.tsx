import { useEffect, useRef, useState } from "react";
import "./ListeCaissier.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";


function ListeCaissier() {
  const [count, setCount] = useState(0);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formRef = useRef(null);

  const handleChange1 = (event: any) => {
    const valeurAfterChangePrenom = event.target.value;
    setPrenom(valeurAfterChangePrenom);
  };

  const handleChange2 = (event: any) => {
    const valeurAfterChangeNom = event.target.value;
    setNom(valeurAfterChangeNom);
  };

  const handleChange3 = (event: any) => {
    const valeurAfterChangeEmail = event.target.value;
    setEmail(valeurAfterChangeEmail);
  };

  const handleModification = (id: any, prenom: any, nom: any, email: any) => {
    console.log(id);
    console.log(prenom);
    console.log(nom);
    console.log(email);
    setId(id);
    setPrenom(prenom);
    setNom(nom);
    setEmail(email);
  };

  const onSubmit = async (data: any) => {
    fetch(`http://localhost:3000/users/${id}`, {
      body: JSON.stringify({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
      }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
    reset();
    window.location.reload();
  };

  const handleArchive = async (etat: any, id: any) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      body: JSON.stringify({ etat: etat }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  const [caissiers, setCaissiers] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setCaissiers(res.filter((data: any) => data.etat == true));
      });
  });
  [];

  return (
    <>
      <div className=" p-3 w-100 align-items-center">
        {/* <ReactLogo/>*/}

        <div className="card ">
          <div className="card head">
            <h1 className="d-flex justify-content-center w-75">
              {" "}
              Liste des Caissiers
            </h1>{" "}
            <span className="search w-25">
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
          </div>
          <div className="table-wrapper">
            <table className="table table-striped  ">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Etat</th>
                  <th scope="col">Prenom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {caissiers
                  .filter((caissier: any) =>
                    `${caissier.prenom} ${caissier.nom} ${caissier.email} ${caissier.etat}`
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((caissier: any) => (
                    <tr key={caissier.id}>
                      <th scope="row">
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.etat}</span>
                        </div>
                      </th>

                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.prenom}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.nom}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.email}</span>
                        </div>
                      </td>

                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalRegisterForm"
                            className="btn btn-success"
                          >
                            <FontAwesomeIcon
                              icon={["far", "pen-to-square"]}
                              onClick={() => {
                                handleModification(
                                  caissier.id,
                                  caissier.prenom,
                                  caissier.nom,
                                  caissier.email
                                );
                              }}
                            />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger "
                            onClick={() =>
                              Swal.fire({
                                title: "Vous etes sur?",
                                text: "de vouloir archiver ce caissier!",
                                icon: "warning",
                                showCancelButton: "Non",
                                confirmButtonColor: "#4C7FC7",
                                cancelButtonText: "Non",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Oui, archive le!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleArchive(false, caissier.id);
                                }
                              })
                            }
                          >
                            <FontAwesomeIcon icon={["far", "trash-alt"]} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="card head2 ">
            <div
              className="modal fade "
              id="modalRegisterForm"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog " role="document">
                <div className="modal-content fornmm">
                  <div className="modal-header w-100  text-center">
                    <h4 className="modal-title text-light w-100 font-weight-bold">
                      Modification Produit
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
                      ref={formRef}
                      className="formulaire gap-3 d-flex flex-column justify-content-center"
                    >
                      <div className="md-form mb-5">
                        <label className="lab" htmlFor="">
                          Prenom{" "}
                        </label>
                        <input
                          className="form-control border-none"
                          placeholder=""
                          {...register("prenom", {
                            required: {
                              value: true,
                              message: "ce champ est requis",
                            },
                          })}
                          type="text"
                          value={prenom}
                          onChange={handleChange1}
                        />
                        <div>
                          {errors.prenom?.type === "required" && (
                            <span className="text-danger">
                              {errors.prenom.message as unknown as string}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="md-form mb-4">
                        <label className="lab" htmlFor="">
                          Nom{" "}
                        </label>
                        <input
                          className="form-control border-none"
                          placeholder=""
                          {...register("nom", {
                            required: {
                              value: true,
                              message: "ce champ est requis",
                            },
                          })}
                          type="text"
                          value={nom}
                          onChange={handleChange2}
                        />
                        <div>
                          {errors.nom?.type === "required" && (
                            <span className="text-danger">
                              {errors.nom.message as unknown as string}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="md-form mb-4">
                        <label className="lab" htmlFor="">
                          Email{" "}
                        </label>
                        <input
                          className="form-control border-none"
                          placeholder="1500"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "ce champ est requis",
                            },
                          })}
                          type="text"
                          value={email}
                          onChange={handleChange3}
                        />
                        <div>
                          {errors.email?.type === "required" && (
                            <span className="text-danger">
                              {errors.email.message as unknown as string}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <div className="d-flex justify-content-center">
                          <button className="boutton">Enregistrer</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListeCaissier;
