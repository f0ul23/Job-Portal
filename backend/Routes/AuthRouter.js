const { signup, login, hire, getJobs, companyController, companyLogin, userSearch, aiChat, userApply, pdf, getPDF } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, hireValidation, jobsValidation, companyValidation, companyLoginValidation, searchValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();

// router.post('/signup', (req,res)=>{
//     res.send('login success')
// });
const upload = require('../Middleware/upload')

router.post('/signup', signupValidation, signup);
router.post('/signIn', loginValidation, login);
router.post('/create', hireValidation, hire);
router.get('/posted', jobsValidation, getJobs);
router.post('/company', companyValidation, companyController);
router.post('/login', companyLoginValidation, companyLogin );
router.post('/usersearch', searchValidation, userSearch);
router.post('/aiAnswers', aiChat)
// router.post('/userApply', upload.single('resume'), userApply); // Handle single resume file upload
router.post('/userApply', upload.single('resume'), userApply);

module.exports  = router;