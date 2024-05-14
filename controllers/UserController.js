const db = require("../config/db");

// Get all users
const getAllUsers = async(req, res) => {
    try{
        const data = await db.query("SELECT * FROM users");
        if(!data){
            res.status(404).send({
                success: false,
                message : 'No Records Found.',
            });
        }
        res.status(200).send({
            success: true,
            message : 'User All Records.',
            total : data[0].length,
            data : data[0],
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message : 'Error in getAllUsers'
        })
    }
};

const getUser = async(req, res) => {
    try{
        const userId = req.params.id
        console.log('getUser',userId)
        if(!userId){
            res.status(404).send({
                success: false,
                message : 'No User Found.',
            });
        }
        const data = await db.query("SELECT * FROM users WHERE id=?",[userId]);
        if(!data){
            res.status(404).send({
                success: false,
                message : 'No User Found.',
            });
        }
        res.status(200).send({
            success: true,
            data : data[0],
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message : 'Error in getUser'
        })
    }
};

const addUser = async(req, res) => {
    try{
        const {name,roll_no,phone} = req.body
        if(!name || !roll_no || !phone){
            res.status(404).send({
                success: false,
                message : 'Please fill all info of User.',
            });
        }
        
        const data = await db.query('INSERT INTO users (name, roll_no, phone) VALUES (?, ?, ?)',[name, roll_no, phone])
        if(!data){
            res.status(404).send({
                success: false,
                message : 'Error Insert User Data.',
            });
        }

        res.status(200).send({
            success: true,
            message : 'New User Inserted.',
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message : 'Error in addUser' + error
        })
    }
};

const updateUser = async(req, res) => {
    try{
        const userId = req.params.id
        const {name,roll_no,phone} = req.body
        if(!userId){
            res.status(404).send({
                success: false,
                message : 'Please provide userId.',
            });
        }
        
        const data = await db.query('UPDATE users SET name = ?, roll_no = ?, phone = ? WHERE id = ? ',[name, roll_no, phone, userId])
        if(!data){
            res.status(500).send({
                success: false,
                message : 'Error Update User Data.',
            });
        }

        res.status(200).send({
            success: true,
            message : 'User Updated.',
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message : 'Error in updateUser' + error
        })
    }
};

const deleteUser = async(req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            res.status(404).send({
                success: false,
                message : 'Please provide userId.',
            });
        }
        
        const data = await db.query('DELETE FROM users WHERE id = ? ',[userId])
        if(!data){
            res.status(500).send({
                success: false,
                message : 'Error Delete User Data.',
            });
        }

        res.status(200).send({
            success: true,
            message : 'User Deleted.',
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message : 'Error in deleteUser' + error
        })
    }
};

module.exports = {getAllUsers, getUser, addUser, updateUser, deleteUser}