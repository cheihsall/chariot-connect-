import { useEffect, useRef, useState } from "react";
import "./ListeProduit.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

library.add(faEye, faEdit, faTrashAlt);

function ListeProduit() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [libelle, setLibelle] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [id, setId] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const formRef = useRef(null);
  const handleChange1 = (event: any) => {
    const valeurAfterChangeLibelle = event.target.value;
    setLibelle(valeurAfterChangeLibelle);
  };
  const handleChange2 = (event: any) => {
    const valeurAfterChangeQuantite = event.target.value;
    setQuantite(valeurAfterChangeQuantite);
  };
  const handleChange3 = (event: any) => {
    const valeurAfterChangePrix = event.target.value;
    setPrix(valeurAfterChangePrix);
  };
  function Modif(id: any, libelle: any, quantite: any, prix: any) {
    console.log(id);
    console.log(libelle);
    console.log(prix);
    setId(id);
    setLibelle(libelle);
    setPrix(prix);
    setQuantite(quantite);
  }

  const handleArchive = async (etat: any, id: any) => {
    const response = await fetch(`http://localhost:3000/produit/${id}`, {
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

  const onSubmit = async (data: any) => {
    fetch(`http://localhost:3000/produit/${id}`, {
      body: JSON.stringify({
        libelle: data.libelle,
        quantite: data.quantite,
        prix: data.prix,
      }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log());
    reset();
    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:3000/produit/")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.filter((data: any) => data.etat == false));
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
              Liste des Produit
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
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Nbre</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Libelé</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Type</th>
                  <th scope="col">Cathegorie</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((produit: any) =>
                    `${produit.libelle} ${produit.prix} ${produit.cathegorie}`
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((produit: any) => (
                    <tr key={produit.id}>
                      <th scope="row">
                        <div className="flex justify-center items-center gap-2">
                          <span>{produit.quantite}</span>
                        </div>
                      </th>
                      <td>
                        <div>
                          <span>
                            <img
                              style={{ width: "2em", borderRadius: "2em" }}
                              src={`data:image/png;base64,${produit.photo}`}
                              alt=""
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="">
                          <span>{produit.libelle}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center justify-items-center align-items-center gap-2">
                          <span>{produit.prix}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{produit.type}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{produit.cathegorie}</span>
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-success btn-default btn-rounded mb-4"
                          data-bs-toggle="modal"
                          data-bs-target="#modalRegisterForm"
                        >
                          <FontAwesomeIcon
                            icon={["far", "pen-to-square"]}
                            onClick={() => {
                              Modif(
                                produit.id,
                                produit.libelle,
                                produit.quantite,
                                produit.prix
                              );
                            }}
                          />
                        </button>

                        <button
                          type="button"
                          className="btn btn-default btn-rounded mb-4"
                          onClick={() =>
                            Swal.fire({
                              title: "Vous etes sur?",
                              text: "de vouloir desarchiver ce produit!",
                              icon: "success",
                              showCancelButton: "Non",
                              confirmButtonColor: "#4C7FC7",
                              cancelButtonText: "Non",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Oui, archive le!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleArchive(true, produit.id);
                              }
                            })
                          }
                        >
                          <FontAwesomeIcon icon={["far", "trash-alt"]} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="card head2"></div>
        </div>
      </div>

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
                    Libelé{" "}
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="Samsung A10"
                    {...register("libelle", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="text"
                    value={libelle}
                    onChange={handleChange1}
                  />
                  <div>
                    {errors.libelle?.type === "required" && (
                      <span className="text-danger">
                        {errors.libelle.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>

                <div className="md-form mb-4">
                  <label className="lab" htmlFor="">
                    Quantité{" "}
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="10"
                    {...register("quantite", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="text"
                    value={quantite}
                    onChange={handleChange2}
                  />
                  <div>
                    {errors.quantite?.type === "required" && (
                      <span className="text-danger">
                        {errors.quantite.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>

                <div className="md-form mb-4">
                  <label className="lab" htmlFor="">
                    Prix{" "}
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="1500"
                    {...register("prix", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="Number"
                    value={prix}
                    onChange={handleChange3}
                  />
                  <div>
                    {errors.prix?.type === "required" && (
                      <span className="text-danger">
                        {errors.prix.message as unknown as string}
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

      <div className="text-center"></div>
    </>
  );
}

export default ListeProduit;
