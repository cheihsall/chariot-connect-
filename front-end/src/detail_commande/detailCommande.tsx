import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../commande/commande.css";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

library.add(faEye, faEdit, faTrashAlt, faCircleXmark);

function DetailCommande() {
  const [count, setCount] = useState(0);
  const { state } = useLocation();
  const {
    
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const formRef = useRef(null);
  const [prix, setPrix] = useState(0);
  const [verse, setVerse] = useState('');
  const [rendu, setRendu] = useState(0);
  
  const [users, setUsers] = useState<any>([]);

  const [user_id, setInfo3] = useState(localStorage.getItem("id_user"));
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const handleValider = async () => {
   
    const response = await fetch(`http://localhost:3000/commande/${state.id}`, {
      body: JSON.stringify({ etat: false,user: user_id, dateValid: new Date() }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    Swal.fire({
      title: "Commande validé avec succés!",
      icon: "success",
      html: "commande introuvable.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        navigate(``);
      },
    }).then(() => {
       navigate('/dashbord');
    });
   
    const data = await response.json();
  }

  const handleSup = async (idd : string, comd: string) => {
   
    const response = await fetch(`http://localhost:3000/detail-commande/delete`, {
     body: JSON.stringify({ id : idd, cmd: comd}),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
   
    //const data = await response.json();
  }
  

  useEffect(() => {
    fetch("http://localhost:3000/detail-commande")
      .then((res) => res.json())
      .then((res) => {
        setUsers(
          res
            .filter(
              (data: any) =>
                data.commande.id == parseInt(state.id as unknown as string)
            )
            .reverse()
        );
        setPrix(state.montant);
      });

      setRendu(verse !== '' ? verse - prix : '');
  }, [prix, state.id, state.montant, verse]);


  return (
    <>
      <div className=" p-3 w-100 align-items-center">
        <div className="card ">
          <div className="card head"></div>
          <div className="table-wrapper" style={{ minHeight: "50vh" }}>
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">libelle</th>

                  <th scope="col">Prix</th>
                  <th scope="col">quantite</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((detail: any) => (
                  <>
                    <tr>
                      <th scope="row">
                        <div>
                          <span>{detail.produit.libelle}</span>
                        </div>
                      </th>
                      <td>
                        <div>
                          <span>{detail.produit.prix}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span>{detail.quantite}</span>
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn   btn-default btn-rounded "
                          onClick={() => {
                            handleSup(
                             
                             detail.produit.id,
                             state.id
                            );
                         }}
            
                        >
                          <FontAwesomeIcon
                            icon={["far", "circle-xmark"]}
                            style={{ color: "red" }}
                          />
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card head2">
            <div>
              <h3>Total: {prix}f</h3>{" "}
            </div>
            <div>
              <label htmlFor="verse">
                <h3 className="">Versé: </h3>
              </label>
              <input
                className=" w-50 text-gray-500"
                type="number"
                id="verse"
                name="verse"
                defaultValue={verse}
                onChange={(e) => setVerse(parseInt(e.target.value))}
              />
            </div>
            <div>
            <h4>Rendu: {verse  > 0.2 ? rendu + ' f' : 'Saisissez le montant'}</h4>
            </div>
            <button
              className="btn btn-success" onClick={() => {
                handleValider(
                  
                  
                );
             }}

            >
              <h4>Valider</h4>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { DetailCommande };
