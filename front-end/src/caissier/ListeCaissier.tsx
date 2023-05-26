import { useEffect, useRef, useState } from "react";
import "./ListeCaissier.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ListeCaissier() {
  const [count, setCount] = useState(0);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [caissiers, setCaissiers] = useState<any>([]);
  const [user_id, setInfo3] = useState(localStorage.getItem("id_user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formRef = useRef(null);
  useEffect(() => {
    const defaultValues: { prenom: string; nom: string; email: string } = {
      prenom: "",
      nom: "",
      email: "",
    };
    defaultValues.prenom = prenom;
    defaultValues.nom = nom;
    defaultValues.email = email;
    reset({ ...defaultValues });
  }, [nom, prenom, email]);
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
    setId(id);
    setPrenom(prenom);
    setNom(nom);
    setEmail(email);
    setUpdate(false);
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
    setUpdate(true);
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
    setUpdate(true);
  };

  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setCaissiers(res.filter((data: any) => data.etat == true && data.id != user_id));
      });
    setUpdate(false);
  };

  useEffect(() => {
    if (update) {
      fetchUsers();
    }
  }, [update]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className=" p-3 w-100 align-items-center">
        {/* <ReactLogo/>*/}

        <div className="card ">
          <div className="card head">
            <Link to="../listecaissierArchive">
              <a
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">
                  Caissiers Archivés
                </span>
              </a>
            </Link>
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
          <div className="table-wrapper" style={{ minHeight: "50vh" }}>
            <table className="table table-striped  ">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Prenom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>

                  <th scope="col">Actions</th>
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
                      <td>
                        <div>
                          <span>{caissier.prenom}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span>{caissier.nom}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span>{caissier.email}</span>
                        </div>
                      </td>

                      <td>
                        <div>
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalRegisterForm"
                            className="btn "
                          >
                            <FontAwesomeIcon
                              icon={["far", "pen-to-square"]}
                              style={{ color: "green" }}
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
                            className="btn "
                            onClick={() => {
                              setUpdate(false);
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
                              });
                            }}
                          >
                            <FontAwesomeIcon
                              icon={["far", "trash-alt"]}
                              style={{ color: "red" }}
                            />
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
                          defaultValue={prenom}
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
                          defaultValue={nom}
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
                          defaultValue={email}
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
                          <button
                            type="submit"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            className="boutton"
                          >
                            Enregistrer
                          </button>
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

export { ListeCaissier };
