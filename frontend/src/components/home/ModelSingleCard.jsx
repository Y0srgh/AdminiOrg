import React from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';



const ModalSingleCard = ({ model, route }) => {
  console.log("model from single", model);
  console.log("route from single", route);
  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {new Date(model.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}

      </h2>
      <h4 className='my-7 text-gray-500'>{model._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{model.nom + (model.prenom ? " " + model.prenom : " ")}</h2>
      </div>
      {
        (model.email) && (
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl' />
            <h2 className='my-1'>{model.email}</h2>
          </div>
        )
      }
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <Link to={`/${route}/detail-${route}/${model._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/${route}/modifier-${route}/${model._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/${route}/effacer-${route}/${model._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>

      </div>
      {/*
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/${route}/details/${model._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/${route}/edit/${model._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/${route}/delete/${model._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
      */}

    </div>
  );
};

export default ModalSingleCard
