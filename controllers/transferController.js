import bcrypt from 'bcrypt';
import users from '../data/users.js';

export const transferMoney = async (req, res) => {
    try {
        const { recipientId, amount, pin, accountNumber } = req.body;

        if (!recipientId || !amount || !pin || !accountNumber) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const sender = users.find(user => user.id === req.userId);

        if (!sender) {
            return res.status(404).json({
                message: "Sender not found"
            });
        }
        const accountNumberMatch = users.find(user => user.accountNumber === Number(accountNumber))

        if(!accountNumberMatch){
            return res.status(400).json({
                message: "Incorrect account number"
            })
        }

        const recipient = users.find(user => user.id === Number(recipientId)
        );

        if(!recipient){
            return res.status(404).json({
                message: "Recipient not found"
            });
        }

        if(sender.id === recipient.id){
            return res.status(400).json({
                message: "You cannot transfer money to yourself"
            });
        }

        if(amount <= 0){
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        if(sender.balance < amount){
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        if(!sender.pin){
            return res.status(400).json({
                message: "Create a PIN"
            });
        }

        const pinMatch = await bcrypt.compare(pin, sender.pin);

        if(!pinMatch){
            return res.status(400).json({
                message: "Incorrect PIN"
            });
        }


        sender.balance -= Number(amount);
        recipient.balance += Number(amount);

        res.json({
            message: "Transfer successful",
            amount: Number(amount),
            senderBalance: sender.balance
        });
    }catch(e){
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};