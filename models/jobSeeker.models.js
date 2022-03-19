const mysqlConnection = require("../config/mysql")


const newJobSeeker = async(job_seeker_id, firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into job_seeker(job_seeker_id, firstname, lastname, email, passwordHash, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            values: [job_seeker_id, firstname, lastname, email, password, DateOfBirth, gender, nationality, location, CountryCode, phone, HighestQualification, CurrentJobFunction, YearsExperience, Availabity, SubscribeForAds, category]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}

const checkUser = async(email, job_seeker_id) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where email=? or job_seeker_id=?`,
            values: [email, job_seeker_id]
        },
        (err, results, fields)=>{
            if (err){reject(err)}
            resolve(results)
        })
    })
}
const checkUserById = async(job_seeker_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where job_seeker_id=?`,
            values: [job_seeker_id]
        },
        (err, results, fields)=>{
            if(err) {reject(err)}
            resolve(results)
        })
    })
}
const getJobSeekerDetailsByPhone = async(phone)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from job_seeker where phone=?`,
            values: phone
        },
        (err, results, fields)=>{
            if (err)reject(err)
            resolve(results)
        })
    })
}

const newEmployer = async(employeer_id, firstname, lastname, gender, work_email,passwordHash,CountryCode,  PositionInCompany, website, ContactPerson, WhereDoYouHearAboutUs) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into Employer(employeer_id, firstname, lastname, gender, work_email,passwordHash,CountryCode,  PositionInCompany, website, ContactPerson, WhereDoYouHearAboutUs)values(?,?,?,?,?,?,?,?,?,?,?)`,
            values: [employeer_id, firstname, lastname, gender, work_email,passwordHash,CountryCode,  PositionInCompany, website, ContactPerson, WhereDoYouHearAboutUs]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}

const insertOtpJobSeeker = async (job_seeker_id, otp) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into otp_job_seeker(job_seeker_id, otp)values(?,?)`,
            values: [job_seeker_id, otp]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}

const getOtp = async (job_seeker_id, otp)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from otp_job_seeker where job_seeker_id=? and otp=?`,
            values:[job_seeker_id, otp]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        })
    })
}
const deleteOtpById = async (job_seeker_id) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `delete from otp_job_seeker where job_seeker_id=?`,
            values: job_seeker_id
        },
        (err, results, fields)=>{
            if (err)reject(err)
            resolve(results)
        })
    })
}

const updateOtpStatus = async (job_seeker_id)=> {
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `update job_seeker set isOtpVerified=? where job_seeker_id=?`,
            values:[1, job_seeker_id]
        },
        (err, results, fields)=>{
            err?reject(err)
            :resolve(results)
        }
        )
    })
}
const checkEmployeer= async(work_email, employeer_id) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from Employer where work_email=? or employeer_id=?`,
            values: [work_email, employeer_id]
        },
        (err, results, fields)=>{
            if (err){reject(err)}
            resolve(results)
        })
    })
}

const newAdmin = async(admin_id, firstname, lastname, email,passwordHash,DateOfBirth, gender, nationality, location, CountryCode,  phone) =>{
    return new Promise ((resolve, reject)=>{
        mysqlConnection.query({
            sql: `Insert into _Admin(admin_id, firstname, lastname, email,passwordHash,DateOfBirth, gender, nationality, location, CountryCode,  phone)values(?,?,?,?,?,?,?,?,?,?,?)`,
            values: [admin_id, firstname, lastname, email,passwordHash,DateOfBirth, gender, nationality, location, CountryCode,  phone]
        },
        (err, results, fields)=>{
            if (err) {reject(err)}
            resolve(results)
        }
        )
    })
}

const checkAdmin= async(email, admin_id) =>{
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: `select * from _Admin where email=? or admin_id=?`,
            values: [email, admin_id]
        },
        (err, results, fields)=>{
            if (err){reject(err)}
            resolve(results)
        })
    })
}



module.exports = {
    checkUser,
    newJobSeeker,
    newEmployer,
    checkEmployeer,
    newAdmin,
    checkAdmin,
    insertOtpJobSeeker,
    getJobSeekerDetailsByPhone,
    deleteOtpById,
    getOtp,
    updateOtpStatus,
    checkUserById

}