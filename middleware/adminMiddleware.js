import users from "../data/users";

const adminMiddlware = (req, res, next) => {
    const user = users.find(user => user.id === req.userId);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (user.role !== "admin") {
        return res.status(404).json({
            message: "Admin access required"
        });
    }

    next()
}

export default adminMiddlware;