import { useEffect, useState } from 'react'
import reactLogo from '../assets/chariot3x.png'
import iconeConnect from '../Ellipse 1.png'
import iconeUser from '../assets/icons8-user 1.png'
import viteLogo from '/vite.svg'
import './HistoCmd.css'
import { useForm } from 'react-hook-form';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEye, faEdit, faTrashAlt);

function HistoCmd() {
  const [count, setCount] = useState(0);
  const {register, handleSubmit, formState:{errors}}= useForm({mode:"onChange"})

  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
      fetch('https://bakend-serre-production.up.railway.app/parametres'
      
      )
      .then((res) => res.json())
      .then((res) => {
          
          console.log(res);
          
        setUsers(res);
      });
  
     
       
    },); []


  return (
    <>
      <div className=' p-3 w-100 align-items-center'>
       {/* <ReactLogo/>*/} 
     
    
<div className='card '>
    <div className='card head'><h1> Historique des commandes</h1></div>
    <div className='table-wrapper'>
      <table className="table table-striped">
      <thead className="sticky-top">
    <tr>
    <th scope='col'>N° vente</th>
      <th scope="col">Nombre de Produit</th>
      
      <th scope="col">Prix Total</th>
     
      <th scope='col'>Action</th>
      
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
              <span>{user.temperature}</span>
             </div>
          </td>
         
       
          <td>
             
              <button type="button" className="btn btn-success"><FontAwesomeIcon icon={['far', 'trash-alt']} /></button>
              <button type="button" className="btn btn-danger"><FontAwesomeIcon icon={['far', 'trash-alt']} /></button>
          </td>

      </tr></>
    )}
  </tbody>
</table>
</div>
<div className='card head2'>

    
</div>
</div>
      </div>
     
    </>
  )
}

export default HistoCmd
