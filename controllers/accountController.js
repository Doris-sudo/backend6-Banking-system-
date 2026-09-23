import bcrypt from 'bcrypt';
import users from '../data/users.js';

export const getBalance = (req, res) =>{
    const user = users.find((user)=> user.id === req.userId);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        balance: user.balance
    });
};

export const createPin = async(req, res) => {
    const {pin} = req.body;

    if(!pin){
        return res.status(400).json({
            message: "PIN is required"
        });
    }

    if(!/^\d{4}$/.test(pin)){
        return res.status(400).json({
            message: "PIN must be exactly 4 digits"
        });
    }

    const user = users.find(user => user.id === req.userId);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    if(user.pin){
        return res.status(409).json({
            message: "PIN already exists"
        });
    }

    user.pin = await bcrypt.hash(pin, 10);

    res.status(201).json({
        message: "PIN created successfully"
    });
};

export const deposit = (req, res) => {
    const {amount, role} = req.body;

    if(!amount) {
        return res.status(400).json({
            message: "Amount is required"
        });
    }

    

    if(amount <= 0){
        return res.status(400).json({
            message: "Amount must be greater than zero"
        });
    }

    const user = users.find(user => user.id === req.userId);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.balance += Number(amount);

    res.json({
        message: "Deposit successful",
        deposited: Number(amount),
        balance: user.balance
    });
};

export const updatePin = async(req, res) => {
    const {oldpin, newpin} = req.body;

    const user = users.find(user => user.id === req.userId);

    if(oldpin === newpin){
        return res.status(400).json({
            message:"New PIN must be different from old PIN"
        })
    }

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    if(!user.pin){
        return res.status(400).json({
            message: "Create a PIN first"
        });
    }

    if(!oldpin || !newpin){
        return res.status(400).json({
            message: "Old PIN and new PIN are required"
        });
    }

    if(!/^\d{4}$/.test(newpin)){
        return res.status(400).json({
            message: "New PIN must be exactly 4 digits"
        });
    }

    const pinMatch = await bcrypt.compare(oldpin, user.pin);

    if(!pinMatch){
        return res.status(401).json({
            message: "Old PIN is incorrect"
        });
    }

    user.pin = await bcrypt.hash(newpin, 10)

    res.json({
        message: "PIN updated successfully"
    })
}