import { Request } from "../models/Request";

export const findAllRequests = async (req, res) => {
    try {
      const requests = await Request.find({});
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