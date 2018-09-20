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
  },
  diffInformation: {
    type: Schema.Types.Mixed
  }
});

export class Report {
  _id: String;
  executed: Boolean;
  executionDate: Date;
  diffInformation: any;

  constructor(_id: String, executionDate: Date) {
    this._id = _id;
    this.executed = false;
    this.executionDate = executionDate;
    this.diffInformation = {};
  }

  generateReport() {
    try {
      this.executeScreenshotsGenerator();
    } catch(e) {
      console.log(e);
    }
  }

  executeScreenshotsGenerator() {
    const currentReport: Report = this;
    cypress.run({
      spec: 'cypress/integration/colors_spec.js',
      env: {
        id: currentReport._id
      }
    }).then(() => {
      const preFileName = `generador-${currentReport._id}-pre.png`;
      const postFileName = `generador-${currentReport._id}-post.png`;
      fs.copyFileSync(`./cypress/screenshots/colors_spec.js/${preFileName}`, `./assets/${preFileName}`);
      fs.copyFileSync(`./cypress/screenshots/colors_spec.js/${postFileName}`, `./assets/${postFileName}`);
      resemble(`./assets/${preFileName}`)
        .compareTo(`./assets/${postFileName}`)
        .ignoreLess()
        .onComplete(function (data) {
          fs.writeFileSync(`./assets/generador-${currentReport._id}-diff.png`, data.getBuffer());
          currentReport.diffInformation.misMatchPercentage = data.misMatchPercentage;
          currentReport.diffInformation.isSameDimensions = data.isSameDimensions;
          currentReport.diffInformation.dimensionDifference = data.dimensionDifference;
          const ReportModel = mongoose.model('Report', ReportSchema);
          ReportModel.findById(currentReport._id, (err, report) => {
            report.executed = true;
            report.diffInformation = currentReport.diffInformation;
            report.save();
          });
        });
    });
  }
}
