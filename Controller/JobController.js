const JobModel = require("../model/Job")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



class JobController {

    static getallJob = async (req, res) => {
        try {
            const data = await JobModel.find()

            res.status(200).json({
                data,
            })
            

        } catch (error) {
            // console.log(error)
            res.status(400)
            .json({status:"failed", message: error.mesage})

        }
    }

    static registerJob = async (req, res) => {
        try {
            const { name, email, password, phone, role, confirmpassword } = req.body;
            const user = await JobModel.findOne({ email: email });
    
            if (user) {
                res.status(401).json({ status: "failed", message: "Email already exists" });
            } else {
                if (name && email && password && role &&  confirmpassword && phone) {
                    if (password === confirmpassword) {
                        const hashpassword = await bcrypt.hash(password, 10);
                        const result = new JobModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            role: role,
                            phone: phone,
                        });
    
                        await result.save();
    
                        // Generate token
                        const token = jwt.sign(
                            { userId: result._id, email: result.email },
                            'nakulpalqpeisf124kskffl123',
                        );
    
                        res.status(201).json({
                            status: "success",
                            message: "Thanks for Registration",
                            token: token
                        });
                    } else {
                        res.status(401).json({ status: "failed", message: "Password and confirm password do not match" });
                    }
                } else {
                    res.status(401).json({ status: "failed", message: "All fields are required" });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "failed", message: "Internal server error" });
        }
    };

    // static registerJob = async (req, res) => {
    //     try {
    //         // console.log(req.body)
    //         const { name, email, password,phone,role, confirmpassword } = req.body
    //         const user = await JobModel.findOne({ email: email });
    //         // console.log(user)

    //         if (user) {
    //             res.status(401).json({ status: "failed", message: "email already exist" })
    //         } else {
    //             if (name && email && password && confirmpassword && phone) {
    //                 if (password == confirmpassword) {
    //                     const hashpassword = await bcrypt.hash(password, 10)
    //                     const result = new JobModel({
    //                         name: name,
    //                         email: email,
    //                         password: hashpassword,
    //                         role:role,
    //                         confirmpassword: confirmpassword,
    //                         phone:phone,

    //                     })

                        

    //                     await result.save()
    //                     res.status(201).json({ status: "success", message: "Thanks! For Registratation" })
    //                 } else {
    //                     res.status(401).json({ status: "failed", message: "password or confirm password are not same" })


    //                 }
    //             } else {
    //                 res.status(401).json({ status: "failed", message: "All Field require" })
    //             }
    //         }



    //     } catch (error) {
    //         console.log(error)
    //     }

    //  }


     static loginJob = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await JobModel.findOne({ email: email })

                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    if (isMatched) {

                        // token gen.
                        const token = jwt.sign({ ID: user._id }, "nakulpalqpeisf124kskffl123")
                        // console.log(token);
                        res.cookie("token", token)

                        res.status(201).json({ status: "success", message: "Login OK Report", token: token, user })


                    }
                    else {
                        res.status(401).json({ status: "failed", message: "Email pr password are not same" })
                    }
                }
                else {
                    res.status(401).json({ status: "failed", message: "you are not a regis user" })
                }


            } else {
                res.status(401).json({ status: "failed", message: "All field require" })

            }

        }

        catch (error) {
            console.log(error)

        }
    }




}

module.exports = JobController