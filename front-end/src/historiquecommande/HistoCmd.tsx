import { useEffect, useRef, useState } from "react";
import "./HistoCmd.css";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";


library.add(faEye, faEdit, faTrashAlt);

function HistoCmd() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const formRef = useRef(null);
  const [prix, setPrix] = useState(12000);
  const [verse, setVerse] = useState(0);
  const [rendu, setRendu] = useState(0);
  const [users, setUsers] = useState<any>([]);
  const [user_id, setInfo3] = useState(localStorage.getItem("id_user"));
  const [commande, setCommande] = useState([]);
  const [id, setId] = useState("");

  function filterCommande(e:any) {
    if(e.target.value == "tout"){
      setUsers(commande)
      return
    }

    setUsers(commande.filter((com:any)=> e.target.value == "valider"? com.etat == false: com.etat == true ))
  
  }

  useEffect(() => {
    fetch("http://localhost:3000/commande")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.reverse());
        setCommande(res.reverse())
      });

    setRendu(verse - prix);
  }, [prix, verse]);

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
          <div className="card head"><h1>Historique des commandes</h1>
            <select className="text-white bg-[#4C7FC7] right-0" name="" id="" onChange={(e)=>filterCommande(e)}>
              <option value="tout">tout</option>
              <option value="valider">valider</option>
              <option value="non valider">non valider</option>
            </select>
          </div>
          <div className="table-wrapper" style={{ minHeight: "50vh" }}>
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th  scope="col">N° commande</th>

                  <th scope="col">Prix Total</th>
                  <th scope="col">Chariot</th>
                 
                  <th scope="col">Etat</th>
                  <th scope="col">Caissiers</th>
                  <th scope="col">Date de validation</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((Produit: any, index: number) => (
                  <tr key={index}>
                    <th scope="row">
                      <div>
                        <span>{Produit.id}</span>
                      </div>
                    </th>
                    <td>
                      <div >
                        <span>{Produit.montant}</span>
                      </div>
                    </td>
                    <td>
                      <div >
                        <span>{Produit.chariot.reference}</span>
                      </div>
                    </td>
                    <td>
                      <div >
                        <span>{Produit.etat ? "non valider" : "valider"}</span>
                      </div>
                    </td>
                    <td>
                      <div >
                        <span>{Produit.user?.prenom } &nbsp; &nbsp; {Produit.user?.nom }  </span>
                      </div>
                    </td>
                    <td>
                      <div >
                        <span>{Produit.dateValid && Produit.dateValid.includes('T') ? `${Produit.dateValid.split('T')[0]} à ${Produit.dateValid.split('T')[1].split('Z')[0].split('.')[0]}` : ''}

</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody> 
            </table>
          </div>
          <div className="card head2"></div>
        </div>
      </div>
    </>
  );
}

export default HistoCmd;
