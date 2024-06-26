import { Employee } from "./../models/Employee.js";
import { Department } from "./../models/Department.js";
import { Function } from "./../models/Function.js";
import { Role } from "./../models/Role.js";
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { JWTSECRETKEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./../config/config.js"


export const addEmployee = async (req, res) => {
  try {
    const { nom, prenom, departement, fonction, role, email, dateEmbauche, mot_de_passe } =
      req.body;
    console.log(req.body);
    if (
      !nom ||
      !prenom ||
      !departement ||
      !fonction ||
      !role ||
      !email ||
      !dateEmbauche ||
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

    if (mot_de_passe) {
      var hashedPassword = await bcrypt.hash(mot_de_passe, 10);
      //updatedFields.mot_de_passe = hashedPassword;
    }

    const newEmployee = await Employee.create({
      nom,
      prenom,
      departement,
      fonction,
      role,
      email,
      dateEmbauche,
      mot_de_passe :hashedPassword,
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
/*
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    //const { mot_de_passe, ancien_mot_de_passe } = req.body;
    //console.log(req.body);
    const mot_de_passe = req.body.mot_de_passe ; 
    const ancien_mot_de_passe = req.body.ancien_mot_de_passe;
    // Vérification si l'employé existe
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    if(ancien_mot_de_passe){

    const hashedOldPassword = await bcrypt.hash(employee.mot_de_passe, 10);

    console.log("mot_de_passe : ", employee.mot_de_passe, "ancien", ancien_mot_de_passe, "ancien hashed", hashedOldPassword, "nouveau", mot_de_passe);

    // Vérification de l'ancien mot de passe
    const isPasswordCorrect = await bcrypt.compare(employee.mot_de_passe, hashedOldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect." });
    }
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
*/
/*
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { mot_de_passe, ancien_mot_de_passe } = req.body;

    console.log("el body", req.body);

    const employee = await Employee.findById(id).select('+mot_de_passe');;
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    

    if (ancien_mot_de_passe) {
      console.log("memmi 1", ancien_mot_de_passe);
      const oldPass = await bcrypt.hash(mot_de_passe, 10);
      console.log("memmi",employee.mot_de_passe);
      const isPasswordCorrect = await bcrypt.compare(employee.mot_de_passe,ancien_mot_de_passe);
      console.log("hello",isPasswordCorrect);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Ancien mot de passe incorrect." });
      }
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    employee.mot_de_passe = hashedPassword;
    await employee.save();

    return res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe de l'employé :", error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du mot de passe." });
  }
};
*/



export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { mot_de_passe, ancien_mot_de_passe } = req.body;

    console.log("Request body:", req.body);

    const employee = await Employee.findById(id).select('+mot_de_passe');
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    if (!ancien_mot_de_passe) {
      return res.status(400).json({ message: "Ancien mot de passe manquant." });
    }

    console.log("Hashed password from database:", employee);

    const isPasswordCorrect = await bcrypt.compare(ancien_mot_de_passe.toString(),employee.mot_de_passe);
    console.log("Is password correct?", isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect." });
    }

    const hashedNewPassword = await bcrypt.hash(mot_de_passe, 10);
    employee.mot_de_passe = hashedNewPassword;
    await employee.save();

    return res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe de l'employé :", error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du mot de passe." });
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
    console.log(req.body);

    if (
      !nom ||
      !prenom ||
      !departement ||
      !fonction ||
      !role ||
      !email ||
      !dateEmbauche
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

const generateAuthToken = id => {
  return jwt.sign({ id }, JWTSECRETKEY, {
    expiresIn: "7d",
  });
};

export const authEmployee = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({ message: "Veuillez fournir tous les champs" })
    }

    const employee = await Employee.findOne({ email }).select('+mot_de_passe');
    if (!employee) {
      return res.status(401).send({ message: "Invald Email " });
    }

    const validPassword = await bcrypt.compare(mot_de_passe, employee.mot_de_passe);
    if (!validPassword) {
      return res.status(401).send({ message: "Invald Password" });
    }

    /*const token = generateAuthToken(employee._id);
    res.status(200).json({ 
      token, 
      message: "Logged in successfully" 
    });*/

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "id": employee._id,
          "email": employee.email,
          "role": employee.role,
          "department": employee.departement,
          "fonction":employee.fonction,
        }
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    );

    const refreshToken = jwt.sign(
      {
        "id": employee._id,
        "email": employee.email
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    /*res.cookie('jwt', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: false, //https
      sameSite: 'None', //cross-site cookie
      //maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry
      maxAge: 60 * 2000, //cookie expiry
      //path: '/employee/auth/refresh',
    })*/

    /*res.cookie('jwt', refreshToken, {
      httpOnly: true,
      origin: "http://localhost:5173",
      //secure: false,
      sameSite: 'none',
      maxAge: 60 * 30000000,
    });*/

    /**
     * res
                  .cookie("token", token, {
                    origin: "http://...firstOrigin..."
                    expires: // set desired expiration here
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                  })
                  .cookie("checkToken", true, {
                    origin: "http://...firstOrigin..."
                    expires: // same as above
                    secure: true,
                    sameSite: "none",
                  })
     */

    res.status(200).json({ accessToken, refreshToken })

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const refresh = (req, res) => {
  //const cookies = req.cookies;
  console.log("log mel refresh el headers", req.headers.jwt);
  //console.log("Cookies:", cookies);
  if (!req.headers?.jwt) return res.status(401).json({ message: 'Unauthorized 1' });
  const refreshToken = req.headers.jwt

  try {
    const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    console.log("-----------",decodedToken);
  
  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Foridden' })
      const foundUser = await Employee.findOne({ email: decoded.email })
      if (!foundUser) return res.status(401).json({ message: 'Unauthorized 2' })
      const accessToken = jwt.sign({
        "UserInfo": {
          "id": foundUser._id,
          "email": foundUser.email,
          "role": foundUser.role,
          "department": foundUser.departement,
          "fonction":foundUser.fonction,
        }
      },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
      );
      console.log("access token mel back",accessToken);
      return res.status(201).json({ accessToken });
    }))
  } catch (error) {
    console.log("lerreur menna");
    return res.status(403).json({ message: 'Unauthorized 3',refreshToken:'',accessToken:'' });
  }
}

/*export const refresh = (req, res) => {
const cookies = req.cookies;
console.log("log mel refresh el headers", req.headers);
console.log("Cookies:", cookies);
if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized 1' });
const refreshToken = cookies.jwt
jwt.verify(
refreshToken,
REFRESH_TOKEN_SECRET,
asyncHandler(async (err, decoded) => {if (err) return res.status(403).json({ message: 'Foridden' })
const foundUser = await Employee.findOne({ email: decoded.email })
if (!foundUser) return res.status(401).json({ message: 'Unauthorized 2' })
const accessToken = jwt.sign({"UserInfo": {
"id": foundUser._id,
"email": foundUser.email,
"role": foundUser.role,
"department": foundUser.departement,}},
ACCESS_TOKEN_SECRET,
{ expiresIn: '20s' }
);
res.status(201).json({ accessToken });
}))}*/

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204)
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false })
  res.status(201).json({ message: 'Cookie cleared' })
}

/*
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    mot_de_passe: Joi.string().required().label("Mot de passe"),
  });
  return schema.validate(data);
};*/
