const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Job = require("../models/jobs");
const Company = require("../models/company");
const run = require("../geminiApi");
const Apply = require("../models/apply");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const userModel = new UserModel({ email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    // Send verification email after successful signup
    await sendVerificationEmail(email);

    res.status(201).json({
      message: "Signup successful, verification email sent",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const sendVerificationEmail = async (email) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sumerafatima382@gmail.com", // Consider using environment variables for these credentials
      pass: "gvgkvgdebnsqdith", // Use app-specific password here (not regular email password)
    },
  });

  const mailOptions = {
    from: "genAIBot.com",
    to: email,
    subject: "Registration Successful",
    text: "Congrats! You have successfully created an account, try logging in.",
  };

  try {
    // Send the verification email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const hire = async (req, res) => {
  const {
    name,
    post,
    description,
    stipend,
    location,
    email,
    type,
    experience,
    skills,
  } = req.body;
  let company = new Job(req.body);
  let result = await company.save();
  // res.send({message: 'success', data: {name, post, description, stipend}})
  try {
    if (
      !name ||
      !post ||
      !description ||
      !stipend ||
      !location ||
      !email ||
      !type ||
      !experience ||
      !skills
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Success response
    res.status(200).json({
      message: "success",
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const companyController = async (req, res) => {
  try {
    const { name, password, description, location, email, type, people, year } =
      req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !description ||
      !location ||
      !email ||
      !type ||
      !password ||
      !people ||
      !year
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company with this email already exists" });
    }

    // Hash the password before saving the company
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company with the hashed password
    const company = new Company({
      name,
      description,
      location,
      email,
      type,
      people,
      year,
      password: hashedPassword, // Save the hashed password
    });

    // Save the company to the database
    const result = await company.save();

    // Success response
    res.status(201).json({
      message: "Company registered successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Error during company registration:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getJobs = async (req, res) => {
  let result = await Job.find();
  if (result.length > 0) {
    res.send(result);
    console.log(result);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const companyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Company.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

// POST API to find a job by post
const userSearch = async (req, res) => {
  try {
    // Get the post from req.body
    const { post } = req.body;

    // Check if post is provided
    if (!post) {
      return res.status(400).json({ message: "Post is required" });
    }

    // Search for the job by post in the database
    const jobs = await Job.find({
      post: { $regex: post }, // 'i' makes the search case-insensitive
    });
    // If no jobs are found, return an error message
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found with the given post" });
    }

    // Return job details
    res.status(200).json({
      message: "Jobs found",
      success: true,
      data: jobs,
    });
  } catch (err) {
    console.error("Error finding post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const aiChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await run(prompt);
    // res.json(response);
    res.json({ response: response });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error processing request",
    });
  }
};

const userApply = async (req, res) => {
  const { name, post, location, email } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  // Proceed to save application data
  const apply = new Apply({
    name,
    post,
    location,
    email,
    resume: req.file.id, // Assuming filename is stored in the uploaded file
  });

  try {
    const result = await apply.save();
    res.status(200).json({
      message: "Application submitted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const pdf =  async (req, res) => {
  const pdf = await YourModel.findById(req.params.id);
  if (!pdf) return res.status(404).send('PDF not found');
  res.contentType("application/pdf");
  res.send(pdf.data); // Assuming you stored the PDF in a field named 'data'
}


module.exports = {
  signup,
  login,
  hire,
  getJobs,
  companyController,
  companyLogin,
  userSearch,
  aiChat,
  userApply,
};
