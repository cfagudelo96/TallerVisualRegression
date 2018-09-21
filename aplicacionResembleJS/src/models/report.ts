export class Report {
  _id: String;
  executed: Boolean;
  executionDate: Date;
  baseImage: Buffer;
  modifiedImage: Buffer;
  diffImage: Buffer;
  diffInformation: any;
}
