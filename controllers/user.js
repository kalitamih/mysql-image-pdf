const PDFDocument = require('pdfkit');
const fs = require('fs');
const User = require('../models/user');

exports.postDisplayUsers = (req, res) => {
  const { user } = req.body;
  User
    .findAll({ where: { firstName: user }, raw: true })
    .then((users) => {
      const noPdfUser = users.filter(item => !item.pdf);
      if (noPdfUser.length) {
        const {
          firstName, lastName, image, id,
        } = noPdfUser[0];
        const text = `${firstName} ${lastName}`;
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(`./public/pdf/${id}.pdf`);
        doc.pipe(writeStream);
        doc.text(text, {
          width: 410,
          align: 'left',
        });
        doc.image(image, 50, 150, { width: 300 });
        doc.end();
        writeStream.on('finish', () => {
          const readableStream = fs.readFileSync(`./public/pdf/${id}.pdf`);
          User
            .update({ pdf: readableStream }, {
              where: {
                id,
              },
            })
            .then(() => {
              console.log(`PDF-file for record with id: ${id} was created`);
            })
            .catch((err) => {
              console.log(`PDF-file for record with id: ${id} was not created. ${err}`);
            });
        });
        res.render('users');
      } else {
        res.render('nothing');
      }
    })
    .catch(() => {
      res.status(500).render('error');
    });
};

exports.getMainPage = (req, res) => {
  res.render('main');
};
