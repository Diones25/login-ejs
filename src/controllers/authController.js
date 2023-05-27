const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const loginPage = (req, res) => {
  res.render('pages/login')
}

const homePage = (req, res) => {
  res.render('pages/home');
}

const about = (req, res) => {
  res.render('pages/about')
}

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email
    }
  })

  if(!user) {
    req.flash('messageError', 'Email obrigatório!')

    req.session.save(() => {
      res.redirect('/');
    })
    return;
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if(!passwordMatch) {
    req.flash('messageError', 'Email ou Senha incorreta!')

    req.session.save(() => {
      res.redirect('/');
    })
    return;
  }

  req.session.userid = user.id;
  console.log("Id do usuário ==> ",user.id)
  req.flash('message', 'Login realizado com sucesso!')

  req.session.save(() => {
    res.redirect('/home');
  })

}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/'); 
}

const registerPage = (req, res) => {
  res.render('pages/register')
}

const registerPost = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExist = await User.findOne({
    where: {
      email: email
    }
  });

  if(emailExist) {
    console.log('O email já está em uso!')
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = {
    name,
    email,
    password: hashPassword
  }

  await User.create(user)
}

module.exports = {
  loginPage,
  loginPost,
  logout,
  registerPage,
  registerPost,
  homePage,
  about
}