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

export const findOneRequest = async (req, res) => {
  try {
    
    const { id } = req.params;
    const request = await Request.findById(id);
    return res.status(200).json(request);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

