import React from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';



const DCModalSingleCard = ({ model, route }) => {
    console.log("model from single", model);
    console.log("route from single", route);
    return (
        <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
            <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                {new Date(model.date_creation).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}

            </h2>
            <h2 className={"absolute top-20 right-2 px-4 py-1 rounded-lg " + ((model.status === "Approuvée" && "bg-green-300") || (model.status === "Refusée" && "bg-red-300") || (model.status === "Annulée" && "bg-orange-300")||(model.status === "En_attente" && "bg-yellow-300"))}>
                {model.status}

            </h2>
            <h4 className='my-7 text-gray-500'>{"id : " + model._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-red-300 text-2xl' />
                <h2 className='my-1'>{model.type}</h2>
            </div>

            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2xl' />
                <h2 className='my-1'>{model.nom + (model.prenom ? " " + model.prenom : " ")}</h2>
            </div>

            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <Link to={`/demandes/demande-details/${model._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                </Link>
            </div>

        </div>
    );
};

export default DCModalSingleCard
