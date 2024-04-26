import React from 'react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayInvalidRequests = () => {

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/request`)
            .then((response) => {
                setRole(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default DisplayInvalidRequests
