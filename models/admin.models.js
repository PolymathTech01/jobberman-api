const mysqlConnection = require("../config/mysql")

const newAdmin = async(admin_id, firstname, lastname, email,passwordHash,DateOfBirth, gender, nationality, location, CountryCode,  phone) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into _Admin(admin_id, firstname, lastname, email,passwordHash,DateOfBirth, gender, nationality, location, CountryCode,  phone)values(?,?,?,?,?,?,?,?,?,?,?)`,
            values: [admin_id, firstname, lastname, email,passwordHash,DateOfBirth, gender, nationality, location, CountryCode,  phone]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}

const checkAdmin= async(email) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from _Admin where email=?`,
            values: email
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}

const checkAdminById = async(admin_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from _Admin where admin_id=?`,
            values: admin_id
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}

const getAdminDetailsByEmail = async(email)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from _Admin where email=?`,
            values: email
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}

const insertOtpAdmin = async (admin_id, otp) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into otp_admin (admin_id, otp)values(?,?)`,
            values: [admin_id, otp]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}

const getOtpAdmin = async (admin_id, otp)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from otp_admin where admin_id=? and otp=?`,
            values:[admin_id, otp]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}
const deleteOtpById = async (admin_id) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `delete from otp_admin where job_seeker_id=?`,
            values: admin_id
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        })
    })
}

const updateOtpStatus = async (admin_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `update _Admin set isOtpVerified=? where admin_id=?`,
            values:[1, admin_id]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}


module.exports = {
    
    newAdmin,
    checkAdmin,
    deleteOtpById,
    getOtpAdmin,
    updateOtpStatus,
    insertOtpAdmin,
    getAdminDetailsByEmail,
    checkAdminById

}