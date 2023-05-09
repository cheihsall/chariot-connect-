import { useEffect, useState } from 'react'
import reactLogo from '../assets/chariot3x.png'
import iconeConnect from '../Ellipse 1.png'
import iconeUser from '../assets/icons8-user 1.png'
import viteLogo from '/vite.svg'
import './commande.css'
import { useForm } from 'react-hook-form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEye, faEdit, faTrashAlt);

function Commande() {
  const [count, setCount] = useState(0);
  const {register, handleSubmit, formState:{errors}}= useForm({mode:"onChange"})
const [prix, setPrix] = useState(12000)
const [verse, setVerse] = useState(0)
const [rendu, setRendu] = useState(0)
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
      fetch('https://bakend-serre-production.up.railway.app/parametres'
      
      )
      .then((res) => res.json())
      .then((res) => {
          
          console.log(res);
          
        setUsers(res);
      });
  
     
        setRendu(verse - prix);
       [prix, verse]
      
    },); [prix, verse]


  return (
    <>
      <div className=' p-3 w-100 align-items-center'>
       {/* <ReactLogo/>*/} 
     
    
<div className='card '>
    <div className='card head'></div>
    <div className='table-wrapper'>
      <table className="table table-striped">
      <thead className="sticky-top">
    <tr>
      <th scope="col">N° vente</th>
      <th scope="col">Nombre de Produit</th>
      <th scope="col">Prix Total</th>
      <th scope='col'>Actions</th>
      
    </tr>
  </thead>
  <tbody>
  {users?.map((user: any) => 
    <><tr>
          <th scope="row">
          <div className="flex justify-center items-center gap-2">
              <span>{user.lumiere}</span>
             </div>
          </th>
          <td>
             <div className="flex justify-center items-center gap-2">
              <span>{user.temperature}</span>
             </div>
          </td>
          <td>
             <div className="flex justify-center items-center gap-2">
              <span>{user.humidite}</span>
             </div>
          </td>
       
          <td>
             
              <button type="button" className="btn btn-danger"><FontAwesomeIcon icon={['far', 'trash-alt']} /></button>

          </td>

      </tr></>
    )}
  </tbody>
</table>
</div>
<div className='card head2'><div><h3>Total: {prix}f</h3> </div><div>
  <label htmlFor="verse"><h3 className=''>Versé: </h3></label>
  <input className='inputt w-50' type="number" id="verse" name="verse" value={verse} onChange={(e) => setVerse(parseInt(e.target.value))} />
</div>
<div><h3>Rendu: {rendu} f</h3></div>
<div className='card valider'><h3>Valider</h3> </div>
    
</div>
</div>
      </div>
     
    </>
  )
}

export default Commande
