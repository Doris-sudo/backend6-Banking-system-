import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

if(!validEmail.test(email)){
    return res.status(400).json({
        message: "Invalid email format"
    })
}

if(!validPassword.test(password)){
    return res.status(400).json({
        message: "Password must be at least 6 characters and contain an uppercase letter, lowercase letter, number and special character"

    })
}

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fiels are required"
            });
        }



        const estinguisher = users.find(user => user.email === email);

        if (estinguisher) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            accountNumber: Math.floor(1000000000 + Math.random() * 9000000000),
            name,
            email,
            password: hashed,
            balance: 100,
            pin: null
        };

        users.push(newUser);

        res.status(201).json({

            message: "Registeration successful",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                balance: newUser.balance
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find((user) => user.email === email);

        if(!user){
            return res.status(401).json({
                message: "Invalid email"
            });
        }

        

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        return res.json({
            message: "Login successful",
            token
        })
    }catch(e){
        console.log(e);
        
        res.status(500).json({
            message:"Something went wrong"
        });
    }
};