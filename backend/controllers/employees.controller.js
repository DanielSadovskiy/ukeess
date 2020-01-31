const formidable = require('formidable');
const { prisma } = require('../generated/prisma-client');

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.getEmployees = async function(req, res) {
  try {
    const employeesCount = await prisma
      .employeesConnection({
        where: { name_starts_with: toTitleCase(req.query.startsWith) }
      })
      .aggregate()
      .count();
    const pages = Math.ceil(employeesCount / 4);
    const employees = await prisma.employees({
      where: { name_starts_with: toTitleCase(req.query.startsWith) },
      skip:
        pages == req.query.page
          ? 0
          : (pages - req.query.page - 1) * 4 + (employeesCount % 4 === 0 ? 4 : employeesCount % 4),
      first: pages == req.query.page ? (employeesCount % 4 === 0 ? 4 : employeesCount % 4) : 4
    }).$fragment(`{
        id
        name
        active
        dpID{
          id
          name
        }
      }`);
    if (!employees) {
      res.status(403).send({ error: 'There are no employees' });
    } else {
      res.status(200).send(employees.reverse());
    }
  } catch (e) {
    console.log(e);
  }
};
exports.getEmployeesCount = async function(req, res) {
  try {
    const employeesCount = await prisma
      .employeesConnection({
        where: { name_starts_with: toTitleCase(req.query.startsWith) }
      })
      .aggregate()
      .count();
    if (!employeesCount) {
      res.status(403).send({ error: 'There are no employees' });
    } else {
      res.status(200).send({ totalCount: employeesCount });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.createEmployee = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const emplByName = await prisma.employee({ name: toTitleCase(fields.name) });
      if (emplByName) {
        res.status(403).send({ error: 'There is employee with such name' });
      } else {
        const newEmpl = await prisma.createEmployee({
          name: toTitleCase(fields.name),
          active: fields.active,
          dpID: {
            connect: {
              id: fields.department
            }
          }
        }).$fragment(`{
            id
            name
            active
            dpID{
              id
              name
            }
          }`);
        res.status(200).send(newEmpl);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteEmployee = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      await prisma.deleteEmployee({ id: fields.id });
      res.status(200).send();
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateEmployee = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const emplByName = await prisma.employee({ name: toTitleCase(fields.name) });
      if (emplByName) {
        res.status(403).send({ error: 'There is employee with such name' });
      } else {
        const updated = await prisma.updateEmployee({
          where: { id: fields.id },
          data: {
            name: toTitleCase(fields.name),
            active: fields.active,
            dpID: {
              connect: {
                id: fields.department
              }
            }
          }
        }).$fragment(`{
              id
              name
              active
              dpID{
                id
                name
              }
            }`);
        res.status(200).send(updated);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
