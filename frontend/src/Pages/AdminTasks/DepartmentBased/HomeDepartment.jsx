import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ModalCard from '../../../components/home/ModelCard';

const HomeDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
          .get('http://localhost:5500/department')
          .then((response) => {
            console.log("reponse : ",response.data);
            setDepartments(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, []);


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Liste des départements</h1>
        <Link to='/department/ajouter-department'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <ModalCard model={departments} route={"department"} />
    </div>
  )
}

export default HomeDepartment
