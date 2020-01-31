const formidable = require('formidable');
const { prisma } = require('../generated/prisma-client');

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.getDepartments = async function(req, res) {
  try {
    const departmentsCount = await prisma
      .departmentsConnection()
      .aggregate()
      .count();
    const departmentsPages = Math.ceil(departmentsCount / 4);
    const departments = await prisma.departments({
      skip:
        departmentsPages == req.query.page
          ? 0
          : (departmentsPages - req.query.page - 1) * 4 +
            (departmentsCount % 4 === 0 ? 4 : departmentsCount % 4),
      first:
        departmentsPages == req.query.page
          ? departmentsCount % 4 === 0
            ? 4
            : departmentsCount % 4
          : 4
    });
    if (!departments) {
      res.status(403).send({ error: 'There are no departments' });
    } else {
      res.status(200).send(departments.reverse());
    }
  } catch (e) {
    console.log(e);
  }
};
exports.getDepartmentsCount = async function(req, res) {
  try {
    const departmentsCount = await prisma
      .departmentsConnection()
      .aggregate()
      .count();
    if (!departmentsCount) {
      res.status(403).send({ error: 'There are no departments' });
    } else {
      res.status(200).send({ totalCount: departmentsCount });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.createDepartment = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const depByName = await prisma.department({ name: toTitleCase(fields.name) });
      if (depByName) {
        res.status(403).send({ error: 'There is department with such name' });
      } else {
        const newDep = await prisma.createDepartment({
          name: toTitleCase(fields.name)
        });
        res.status(200).send(newDep);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
exports.deleteDepartment = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const empls = await prisma.employees({ where: { dpID: { id: fields.id } } });
      if (empls) {
        const deletedEmpls = await prisma.deleteManyEmployees({
          dpID: { id: fields.id }
        });
        const deletedDep = await prisma.deleteDepartment({ id: fields.id });
        res.status(200).send({ department: deletedDep, employees: empls });
      } else {
        const deletedDep = await prisma.deleteDepartment({ id: fields.id });
        res.status(200).send({ department: deletedDep });
      }
    });
  } catch (e) {
    res.status(403).send({ error: 'There are employees with such department' });
  }
};

exports.updateDepartment = async function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      const depByName = await prisma.department({ name: toTitleCase(fields.name) });
      if (depByName) {
        res.status(403).send({ error: 'There is department with such name' });
      } else {
        const updatedDep = await prisma.updateDepartment({
          where: { id: fields.id },
          data: {
            name: toTitleCase(fields.name)
          }
        });
        res.status(200).send(updatedDep);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
