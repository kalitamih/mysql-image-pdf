const PDFDocument = require('pdfkit');
const fs = require('fs');
const User = require('../models/user');

const removeFile = (id) => {
  fs.unlink(`./public/pdf/${id}.pdf`, (err) => {
    if (err) {
      console.log(`File with id:${id} was not removed. ${err}`);
    } else {
      console.log(`File with id:${id} was removed`);
    }
  });
};

const createPDF = (writeStream, image, text) => {
  const doc = new PDFDocument();
  doc.pipe(writeStream);
  doc.text(text, {
    width: 410,
    align: 'left',
  });
  doc.image(image, 50, 150, { width: 300 });
  doc.end();
};

const savePDF = (id) => {
  const readableStream = fs.readFileSync(`./public/pdf/${id}.pdf`);
  User
    .update({ pdf: readableStream }, {
      where: {
        id,
      },
    })
    .then(() => {
      console.log(`PDF-file for record with id: ${id} was created`);
      removeFile(id);
    })
    .catch((err) => {
      console.log(`PDF-file for record with id: ${id} was not created. ${err}`);
    });
};

exports.postDisplayUsers = (req, res) => {
  const { user } = req.body;
  User
    .findAll({ where: { firstName: user }, raw: true })
    .then((users) => {
      const noPdfUser = users.filter(item => !item.pdf);
      if (noPdfUser.length) {
        noPdfUser.forEach((item) => {
          const {
            firstName, lastName, image, id,
          } = item;
          const text = `${firstName} ${lastName}`;
          const writeStream = fs.createWriteStream(`./public/pdf/${id}.pdf`);
          createPDF(writeStream, image, text);
          writeStream.on('finish', () => {
            savePDF(id);
          });
        });
        res.status(201).json({ message: true });
      } else {
        res.status(201).json({ message: false });
      }
    })
    .catch(() => {
      res.status(500).render('error', { message: 'Server error!' });
    });
};

exports.getMainPage = (req, res) => {
  res.render('main');
};
