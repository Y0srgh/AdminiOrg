import { Employee } from "./../models/Employee.js";
import { Department } from "./../models/Department.js";
import { Function } from "./../models/Function.js";
import { Role } from "./../models/Role.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export const addEmployee = async (req, res) => {
  try {
    const { nom, prenom, departement, fonction, role, email, dateEmbauche ,mot_de_passe } =
      req.body;
    console.log(req.body);
    if (
      !nom ||
      !prenom ||
      !departement ||
      !fonction ||
      !role ||
      !email ||
      !dateEmbauche||
      !mot_de_passe
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    // Vérifier si le département existe
    const existingDepartment = await Department.findById(departement);
    if (!existingDepartment) {
      return res
        .status(400)
        .json({ message: "Le département spécifié n'existe pas." });
    }

    // Vérifier si la fonction existe
    const existingFunction = await Function.findById(fonction);
    if (!existingFunction) {
      return res
        .status(400)
        .json({ message: "La fonction spécifiée n'existe pas." });
    }

    // Vérifier si le rôle existe
    const existingRole = await Role.findById(role);
    if (!existingRole) {
      return res
        .status(400)
        .json({ message: "Le rôle spécifié n'existe pas." });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Un employé avec cet email existe déjà." });
    }

    const newEmployee = await Employee.create({
      nom,
      prenom,
      departement,
      fonction,
      role,
      email,
      dateEmbauche,
      mot_de_passe,
    });

    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'employé :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'employé.",
    });
  }
};

export const findAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des employés :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des employés.",
    });
  }
};

export const findOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { mot_de_passe, ancien_mot_de_passe } = req.body;

    // Vérification si l'employé existe
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    // Vérification de l'ancien mot de passe
    const isPasswordCorrect = await bcrypt.compare(ancien_mot_de_passe, employee.mot_de_passe);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect." });
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Mettre à jour le mot de passe de l'employé avec le mot de passe haché
    employee.mot_de_passe = hashedPassword;
    await employee.save();

    return res
      .status(200)
      .json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du mot de passe de l'employé :",
      error
    );
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du mot de passe.",
    });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nom,
      prenom,
      departement,
      fonction,
      role,
      email,
      mot_de_passe,
      dateEmbauche,
      solde_conge,
    } = req.body;

    if (
      !nom ||
      !prenom ||
      !departement ||
      !fonction ||
      !role ||
      !email ||
      !dateEmbauche ||
      !solde_conge
    ) {
      return res.status(400).json({
        message:
          "Veuillez fournir tous les champs requis : nom, prénom, département, fonction, rôle, email",
      });
    }

    let updatedFields = {
      nom,
      prenom,
      departement,
      fonction,
      role,
      email,
      dateEmbauche,
      solde_conge,
    };

    if (mot_de_passe) {
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
      updatedFields.mot_de_passe = hashedPassword;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    return res.status(200).json({ message: "Employé mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour de l'employé.",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérification si l'employé existe
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    return res.status(200).json({ message: "Employé supprimé avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du mot de passe de l'employé :",
      error
    );
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du mot de passe.",
    });
  }
};

export const authEmployee = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee)
      return res.status(401).send({ message: "Invald Email or Password" });

    const validPassword = await bcrypt.compare(req.body.mot_de_passe,employee.mot_de_passe);
    if (!validPassword)
      return res.status(401).send({ message: "Invald Email or Password" });

    const token = employee.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    mot_de_passe: Joi.string().required().label("Mot de passe"),
  });
  return schema.validate(data);
};
