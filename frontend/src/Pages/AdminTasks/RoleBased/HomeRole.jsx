import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ModalCard from '../../../components/home/ModelCard';

const HomeRole = () => {
    const [roles, setRoles] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
          .get('http://localhost:5000/roles')
          .then((response) => {
            console.log(response);
            setBooks(response.data.data);
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
        <h1 className='text-3xl my-8'>Liste des rôle</h1>
        <Link to='/roles/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <ModalCard model={roles} route={"role"} />
    </div>
  )
}

export default HomeRole
