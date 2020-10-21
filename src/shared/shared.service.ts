import { Injectable } from '@nestjs/common';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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',
);

const xlsx = require('xlsx');
const AWS = require('aws-sdk');

const config = {
  AWS_ACCESS_KEY: 'AKIAJRWPZ3BTWK7YU3AQ',
  AWS_SECRET_KEY: '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',
  AWS_BUCKET: 'edmium',
};

const paginationObject = {
  start: 0,
  limit: 1000,
  sortBy: 'createdAt',
  sortOrder: 'DESC',
};

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
});
@Injectable()
export class SharedService {
  // constructor(@InjectModel('User') private userModel: Model<User>) {}

  async excelToJSON(fileData): Promise<any> {
    var result = xlsx.read(fileData, {
      type: 'buffer',
    });

    const sheets = Object.keys(result.Sheets);

    const excelData = result.Sheets[sheets[0]];
    const keys = Object.keys(result.Sheets[sheets[0]]);

    keys.splice(keys.indexOf('!ref'), 1);
    keys.splice(keys.indexOf('!margins'), 1);
    keys.splice(keys.indexOf('!rows'), 1);

    const table = [];

    const columns = [];

    const headerIndex = parseInt(
      keys[0].substring(keys[0].length - 1, keys[0].length),
    );

    var i = 0;
    for (; i < keys.length; i++) {
      if (
        headerIndex ===
        parseInt(keys[i].substring(keys[i].length - 1, keys[i].length))
      ) {
        columns.push(keys[i].substring(0, keys[i].length - 1).trim());
      } else {
        break;
      }
    }

    let currentIndex = headerIndex + 1;

    var record = {};
    for (var j = 0; i < keys.length; i++, j++) {
      if (columns.length == j) {
        table.push(record);
        record = {};
        j = 0;
        currentIndex++;
      }
      if (excelData[columns[j] + currentIndex]) {
        let value = excelData[columns[j] + currentIndex].v;
        if (typeof value == 'string') {
          value = value.trim();
        }

        record[excelData[columns[j] + headerIndex].v] = value;
      } else {
        record[excelData[columns[j] + headerIndex].v] = null;
        i--;
      }
    }
    table.push(record);

    return table;
  }

  async uploadFileToAWSBucket(file, path) {
    let fileName = file.originalname;
    fileName = fileName.replace(/\//g, '-');
    fileName = fileName.replace(/ /g, '_');
    fileName = fileName.replace(/[()]/g, '');
    let index = fileName.lastIndexOf('.');
    if (index === -1) index = fileName.length;
    fileName =
      fileName.substring(0, index) +
      '-' +
      new Date().getTime() +
      fileName.substring(index);

    return await s3
      .upload({
        Bucket: config.AWS_BUCKET,
        Key: path + '/' + fileName, // File name you want to save as in S3
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      })
      .promise();
  }

  async prepareParams(params: any): Promise<any> {
    // params = Object.assign(params, paginationObject);
    const config = {
      paginationObject: {
        start: params.start ? params.start : paginationObject.start,
        limit: params.limit ? params.limit : paginationObject.limit,
        sortBy: params.sortBy ? params.sortBy : paginationObject.sortBy,
        sortOrder: params.sortOrder
          ? params.sortOrder
          : paginationObject.sortOrder,
      },
      findObject: params,
    };

    delete config.findObject.start;
    delete config.findObject.limit;
    delete config.findObject.sortBy;
    delete config.findObject.sortOrder;

    return config;
  }

  async sendMail(params: any): Promise<any> {
    console.log('sendMail');
    const msg = {
      to: 'harshavardhanpvk@gmail.com',
      from: 'admissions@edmium.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<!DOCTYPE html>
      <html>
      
      <head>
          <title>Email</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <link href="https://fonts.googleapis.com/css2?family=Mulish&display=swap" rel="stylesheet">
          <style>
          body {
              font-family: 'Mulish', sans-serif;
          }
      
          .email-template {
              max-width: 800px;
              margin: auto;
          }
      
          .email-section {
              margin: 5px 0px;
              /*padding: 20px 15px;*/
              border-radius: 5px;
              box-shadow: 0 1px 6px rgba(32, 33, 36, .28);
              border-color: rgba(223, 225, 229, 0);
              background: #cccccc14;
              border-radius: 10px;
          }
      
          .logo {
              background: #3700BE;
              padding: 20px 0px;
          }
      
          .logo img {
              height: 30px;
              width: 45px;
              margin-top: -10px;
          }
      
          .logo span {
              font-size: 29px;
              height: auto;
              margin-top: 19px;
              font-weight: bold;
              color: #fff;
              letter-spacing: 1px;
          }
      
          .email-data {
              margin: 10px 0px 0px 0px;
              padding: 15px 7px 10px 7px;
          }
      
          .email-data p {
              margin-bottom: 8px;
          }
      
          .email-data span {
              font-weight: bold;
          }
      
          .email-data-para {
              margin: 18px 0px 15px 0px;
          }
      
          .email-data-para p {
              text-align: justify;
          }
      
          .thanks {
              margin: 30px 0px;
          }
      
          .thanks p {
              font-weight: 400;
              margin-bottom: 8px;
          }
          </style>
      </head>
      
      <body>
          <div class="email-template">
              <div class="email-section">
                  <div class="logo">
                      <div class="container">
                          <img src="web-logo.png">
                          <span>EDMIUM</span>
                      </div>
                  </div>
                  <div class="container">
                      <div class="email-data">
                          <p><span>Student's Name: ${params.studentName}</span></p>
                          <p><span>Application ID: ${params.applicationId}</span></p>
                          <p><span>Country: ${params.country}</span></p>
                          <p><span>Institution: ${params.institution}</span></p>
                          <p><span>Program: ${params.program}</span></p>
                          <p><span>Intake: ${params.intake}</span></p>
                          <p><span>Status: ${params.status}</span></p>
      
                          <div class="email-data-para">
                              <p>Great that you wish to apply to ${params.institution} for ${params.intake} ${params.year}  , Please note that we have send your application to our quality team to evaluate the eligibility,  You will be further notified on the progress. </p>
                          </div> 
      
                          <div class="thanks">
                              <p>Thanks</p>
                              <p>Applications - Review Team</p>
                          </div>
                      </div>    
      
                  </div>
              </div>
          </div>
      </body>
      
      </html>
      <!-- <p>Dear <b>ANIL,</b></p>
      <p>Please Verify your email address to complete your Endorse Account</p>
      <div style="text-align: center; ">
          <button style="padding: 15px 24px;background: #55a197;border: 1px solid #55a197;border-radius: 5px;margin: 30px 0px;" type="submit" class="btn-primary">Verify Email Address&nbsp;&nbsp;<span style="align-items: center;"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span></button>
      </div>
      <p>Thank You, </p>
      <p><b>The Endorse Team</b></p> -->`,
    };

    sgMail.send(msg).then(
      response => {
        console.error(response);
      },
      error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  }
}
