import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import db from '.';

export const register = (req,res) => {

    //Check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[req.body.email, req.body.username], (err,data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // const plainPassword = 'Elango3008@';
        // const hashedPassword = bcrypt.hashSync(plainPassword, 10);


        const q = "INSERT INTO users (`username` , `email` , `password`, `isAdmin`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.isAdmin || '',
        ]

        db.query(q, [values], (err,data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User has been created successfully")
        })
    })

}
export const login = (req,res) => {
    //Check user
    const q = "SELECT * FROM users WHERE username=?"

    db.query(q,[req.body.username], (err,data)=>{
        console.log(req.body.username)
        console.log(req.body)
        if(err) return res.json(err);
        if(data.length == 0) return res.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        console.log(isPasswordCorrect)
        // const isPasswordCorrect = bcrypt.compareSync(plainPassword, hashedPassword);
        // console.log('Is password correct (independent test):', isPasswordCorrect);

        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other)
    })
    
}
export const logout = (req,res) => {

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true,
    }).status(200).json("User has been logged out");
}

    
