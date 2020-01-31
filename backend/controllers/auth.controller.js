const formidable = require('formidable');
const bcrypt = require('bcrypt');
const { prisma } = require('../generated/prisma-client');
const jwt = require('jsonwebtoken');

exports.login = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const userByEmail = await prisma.admin({ email: fields.email });
      if (!userByEmail) {
        res.status(403).send({ error: 'There is no user with such email' });
      } else {
        const valid = await bcrypt.compare(fields.password, userByEmail.password);
        if (!valid) {
          res.status(403).send({ error: 'The password is wrong' });
        } else {
          res.status(200).send({
            token: jwt.sign(
              { id: userByEmail.id, name: userByEmail.name, email: userByEmail.email },
              'secretkey'
            ),
            user: userByEmail
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
exports.register = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const adminByEmail = await prisma.admin({ email: fields.email });
      if (adminByEmail) {
        res
          .status(403)
          .send({ error: 'The user with such email is already registrated' })
          .end();
        return;
      }
      const adminByName = await prisma.admin({ name: fields.name });
      if (adminByName) {
        res
          .status(403)
          .send({ error: 'The user with such name is already registrated' })
          .end();
        return;
      }
      const hashedPass = await bcrypt.hash(fields.password, 10);
      const newUser = await prisma.createAdmin({
        email: fields.email,
        name: fields.name,
        password: hashedPass
      });
      res
        .status(200)
        .send(newUser)
        .end();
    });
  } catch (e) {
    console.log(e);
  }
};
