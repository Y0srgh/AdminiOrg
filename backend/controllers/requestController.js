import { Request } from "./../models/Request.js";

export const findAllRequests = async (req, res) => {
    try {
      const requests = await Request.find({});
      console.log(typeof(req),typeof(res));
      return res.status(200).json({
        data: requests,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes :", error);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la récupération des demandes.",
      });
    }
};

export const findEmployeeRequest = async (req, res) => {
    try {
      const {id} = req.params;
      const requests = await Request.find({employee:id});
      console.log(typeof(req),typeof(res));
      return res.status(200).json({
        data: requests,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes :", error);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la récupération des demandes.",
      });
    }
};

export const findOneRequest = async (req, res) => {
  try {
    
    const { id } = req.params;
    const request = await Request.findById(id);
    return res.status(200).json(request);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    
    const { id } = req.params;
    const {etat, previous }= req.body
    console.log(req.body);
    const request = await Request.findById(id);
    if(!request) {
      return res.status(404).json({message : "cette demande n'existe pas"})
    }

    if(previous === "admin"){
      request.status = etat ;
      request.validationRH = true
    }else {
      if((previous === "depChief")&&(etat === "Refusée")){
        request.validationChef = true ;
        request.status = etat ;
      }else {
      if(previous === "employé"){
        request.status = etat ;

      }
    }
    }
    await request.save();
    return res.status(200).json({ message: "La demande a été validée avec succès." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

