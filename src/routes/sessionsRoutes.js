import { Router } from 'express';
import userModel from '../dao/mongo/models/usersModel';
import { createHash } from '../utils';
import passport from 'passport';

const router = Router();


router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "User registered" });
})

router.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });

    
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
})

router.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
});

router.put('/restartPassword', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            status: "error",
            error: "Incomplete Values",
        });
    }
    
    const user = await userModel.findOne({ email });
    
    if (!user) return res.status(404).send({ status: "error", error: "Not user found" });
    
    const newHashedPassword = createHash(password);
    
    await userModel.updateOne({ _id: user._id }, { $set: { password: newHashedPassword } });
    
    res.send({ status: "success", message: "Contraseña restaurada" });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});


export default router;

// router.post('/register', async (req, res) => {
//    const { first_name, last_name, email, age, password } = req.body;
//    const exists = await userModel.findOne({ email });
//    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
//    const user = {
//        first_name,
//       last_name,
//        email,
//        age,
//        password: createHash(password), 
//    }
//    let result = await userModel.create(user);
//    res.send({ status: "success", message: "User registered" });
// })

// router.post('/login', async (req, res) => {
//    const { email, password } = req.body;
//    const user = await userModel.findOne({ email, password }); 
//    if (!user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
//    if (!isValidPassword(user, password)) return res.status(400).send({ status: "error", error: "bad password" });
//
//      if (user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") {
//        req.session.user = {
//            name: `${user.first_name} ${user.last_name}`,
//            email: user.email,
//            age: user.age,
//            admin: true 
//        };
//        res.redirect('/products');
//    } else {
//        req.session.user = {
//            name: `${user.first_name} ${user.last_name}`,
//            email: user.email,
//            age: user.age,
//            admin: false 
//        };
//        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
//    }
// });

// router.get('/logout', (req, res) => {
//    req.session.destroy(err => {
//        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
//        res.redirect('/');
//    })
//  });

//  export default router;
