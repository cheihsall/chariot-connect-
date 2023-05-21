import { useEffect, useRef, useState } from "react";
import reactLogo from "../assets/chariot3x.png";

import "../commande/commande.css";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faTrashAlt, faCircle, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { log } from "console";
import { useLocation, useParams } from "react-router-dom";

library.add(faEye, faEdit, faTrashAlt, faCircleXmark);

function DetailCommande() {
  const [count, setCount] = useState(0);
  const {state} = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const formRef = useRef(null); 
  const [prix, setPrix] = useState(100);
  const [verse, setVerse] = useState(0);
  const [rendu, setRendu] = useState(0);
  const [commande, setCommande] = useState([]);
  const [users, setUsers] = useState<any>([]);


  function formatDate(date: string): string {
    const d = new Date(date);
    const formattedDate = `${('0' + d.getDate()).slice(-2)}-${('0' + (d.getMonth() + 1)).slice(-2)}-${d.getFullYear()}`;
    const formattedTime = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
    return `${formattedDate} à ${formattedTime}`;
  }
  
  const [ user_id, setInfo3] = useState(localStorage.getItem('id_user'))
const [ montant, setMontant] = useState("")
const [ id, setId] = useState("")

  function handleValider(id: any, montant: any, user: any) {
    console.log(id);
    console.log(montant);
    console.log(user);
    setId(id);
    setMontant(montant);
    setInfo3(user);
    
  }
  console.log(state);
  
  useEffect(() => {
    fetch("http://localhost:3000/detail-commande")
    .then((res) => res.json())
    .then((res) => {
      // const use = res.etat = 0
    
      //setCommande(res.filter((data: any) => data.commande.id == 3))
      setUsers(res.filter((data: any) => data.commande.id == parseInt(state.id as unknown as string)).reverse());
      setPrix(res[0].commande.montant)
      console.log(res)
    });

    setRendu(verse - prix);
    
  },[prix, verse]);

  const onSubmit = async (data: any) => {
    fetch(`http://localhost:3000/commande/${id}`, {
      body: JSON.stringify({
        user: user_id,
        etat: false,
      }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log());
    
    window.location.reload();
  };
  [prix, verse];

  return (
    <>
      <div className=" p-3 w-100 align-items-center">
        {/* <ReactLogo/>*/}

        <div className="card ">
          <div className="card head"></div>
          <div className="table-wrapper" style={{ minHeight: "50vh"}}>
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">libele</th>
                 
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
                        <div >
                        <span>{detail.produit.libelle}</span>
                        </div>
                      </th>
                      <td>
                        <div >
                          <span>{detail.produit.prix}</span>
                        </div>
                      </td>
                      <td>
                        <div >
                          <span>{detail.produit.quantite}</span>
                        </div>
                      </td>

                      <td>
                        <button  type="button"
                          className="btn   btn-default btn-rounded "
                          data-bs-toggle="modal"
                          data-bs-target="#modalRegisterForm">
                          <FontAwesomeIcon icon={["far", "circle-xmark"]} style={{ color: "red" }}
                         
                          />
                        </button>
                      </td>
                    </tr>
                  </>
                )) }
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
                className="inputt w-50"
                type="number"
                id="verse"
                name="verse"
                value={verse}
                onChange={(e) => setVerse(parseInt(e.target.value))}
              />
            </div>
            <div>
              <h3>Rendu: {rendu} f</h3>
            </div>
            <div className="card valider"  style={{ position: "fixed" , height:"40px", width: "150px", right: "350px"}}>
              <h3>Valider</h3>{" "}
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}

export {DetailCommande};
