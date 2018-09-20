import * as mongoose from 'mongoose';

const fs = require('file-system');
const cypress = require('cypress');
const resemble = require('resemblejs');

const Schema = mongoose.Schema;

export const ReportSchema = new Schema({
  executionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  executed: {
    type: Boolean,
    default: false
  }
});

export class Report {
  _id: String;
  executed: Boolean;
  executionDate: Date;

  constructor(_id: String, executionDate: Date) {
    this._id = _id;
    this.executionDate = executionDate;
  }

  generateReport() {
    try {
      this.executeScreenshotsGenerator();
    } catch(e) {
      console.log(e);
    }
  }

  executeScreenshotsGenerator() {
    const id = this._id;
    cypress.run({
      spec: 'cypress/integration/colors_spec.js',
      env: {
        id: id
      }
    }).then(() => {
      const preFileName = `generador-${id}-pre.png`;
      const postFileName = `generador-${id}-post.png`;
      fs.copyFileSync(`./cypress/screenshots/colors_spec.js/${preFileName}`, `./assets/${preFileName}`);
      fs.copyFileSync(`./cypress/screenshots/colors_spec.js/${postFileName}`, `./assets/${postFileName}`);
      resemble(`./assets/${preFileName}`)
        .compareTo(`./assets/${postFileName}`)
        .ignoreLess()
        .onComplete(function (data) {
          fs.writeFileSync(`./assets/generador-${id}-diff.png`, data.getBuffer());
        });
    });
  }
}
