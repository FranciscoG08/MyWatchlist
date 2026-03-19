import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";

const register = async(req,res)=>{
    const {email,password} = req.body

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where:{email:email},
    });
    if(userExists){
        return res.status(400).json({error: "User already Exists"})
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create User
    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword
        }
    });

    // Generate JWT Token
    const token = generateToken(user.id,res);

    res.status(201).json({
        status: "success",
        data:{
            user:{
                id:user.id,
                email:user.email
            },
            token,
        }
    })
};

const login = async(req,res)=>{
    const {email,password} = req.body

    // Check if user email exists in the table
    const user = await prisma.user.findUnique({
        where:{email:email},
    });
    if(!user){
        return res.status(400).json({error: "Invalid email or password"})
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid ){
        return res.status(401).json({error: "Invalid email or password"})
    }

    // Generate JWT Token
    const token = generateToken(user.id,res);

    res.status(201).json({
        status: "success",
        data:{
            user:{
                id:user.id,
                email:user.email
            },
            token,
        }
    })
}

const logout = async (req, res) => {
  res.clearCookie("token", { // Usa o nome exato: "token"
    httpOnly: true,
    sameSite: "lax", 
    secure: false // em dev deve ser false
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};

export {register,login,logout};