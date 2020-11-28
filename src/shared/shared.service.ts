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

    if (keys.indexOf('!ref') != -1) keys.splice(keys.indexOf('!ref'), 1);
    if (keys.indexOf('!margins') != -1)
      keys.splice(keys.indexOf('!margins'), 1);
    if (keys.indexOf('!rows') != -1) keys.splice(keys.indexOf('!rows'), 1);

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

  async sendMail(params: any, emailType: string): Promise<any> {
    console.log('sendMail');

    let html, subject;

    switch (emailType) {
      case 'application-status':
        html = await this.getApplicationStatusEmailTemplate(params);
        subject = 'Application status updated';
        break;

      case 'forget-password':
        html = await this.getForgetPasswordEmailTemplate(params);
        subject = 'Edmium Reset Password';
        break;
    }
    const msg = {
      to: params.to,
      from: 'admissions@edmium.com', // Use the email address or domain you verified above
      subject: subject,
      // text: 'and easy to do anywhere, even with Node.js',
      html: html,
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

  async getApplicationStatusEmailTemplate(params: any): Promise<any> {
    return `<!DOCTYPE html>
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
                        <p><span>Student's Name: ${
                          params.studentName
                        }</span></p>
                        <p><span>Application ID: ${
                          params.applicationId
                        }</span></p>
                        <p><span>Country: ${params.country}</span></p>
                        <p><span>Institution: ${params.institution}</span></p>
                        <p><span>Program: ${params.program}</span></p>
                        <p><span>Intake: ${params.intake}</span></p>
                        <p><span>Status: ${params.status}</span></p>
                        
    
                        <div class="email-data-para">
                            ${
                              params.role == 'student'
                                ? await this.getStudentStatusContent(params)
                                : await this.getAgentStatusContent(params)
                            }
                        </div> 

                        <p><span>Remarks: ${params.comment}</span></p>
    
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
    <p><b>The Endorse Team</b></p> -->`;
  }

  async getForgetPasswordEmailTemplate(params: any): Promise<any> {
    return `<!DOCTYPE html>
    <html>
    
    <head>
      <title></title>
      <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"> -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    
    <body style="background-color: #ccc;font-family: Poppins, Helvetica, sans-serif;">
      <div class="contact-page"
        style="width: 60%;margin: auto;background:#fff;padding: 30px;border-radius: 10px;margin-top:50px">
        <div class="contact-card">
          <div class="contact-card-body">
            <div style="text-align:center">
              <img style="width:45px;height:34px;" src="https://edmium.s3.us-east-2.amazonaws.com/assets/web-logo.png" alt="Img"><b style="font-size: 40px">EDMIUM</b> 
            </div>
            <div>
              <h2 style="font-weight: 600;text-align: center;">Reset Password</h2>
            </div>
            <div>
              <p class="" style="font-weight: 600;padding-left: 25px;">Dear : ${params.studentName}</p>
            </div>
            <div style="text-align:center;">
              <p class="">There was recently a request to change the password for your account. </p>
              <p class="">I you Requested this change, set a new password here:</p>
            </div>
            <div style="text-align:center">
              <button style="background-color:#bb9356;color:#fff;padding:11px 25px;border: none; border-radius:4px"><a
                  href="http://demo.edmium.com.s3-website.us-east-2.amazonaws.com/auth/forgot-password"
                  style="text-decoration:none;color:#fff;font-size:17px;font-weight:600;">Set New Password</a></button>
            </div>
            <div style="text-align: center">
              <p>If did not make this request, you can ignore this email and your</p>
              <p> password will remain the same.</p>
              <p>Thankyou, Edmium.</p>
            </div>
          </div>
        </div>
    
      </div>
    
    </body>
    
    </html>`;
  }

  async getStudentStatusContent(params: any): Promise<any> {
    switch (params.status) {
      case 'Documents Yet to be Verified':
        return ``;

      case 'Application in Progress':
        return `Hello ${params.studentName}, <br><br>

        This is to inform you that your application to ${params.institution} for ${params.intake} & ${params.year} is under progress. For your future communication please use ${params.applicationId}.`;

      case 'Application Hold by Ed-Team':
        return `Hello ${params.studentName}, <br><br> 

        Our application executive is assessing your application for ${params.institution}. Status of your ${params.applicationId} has been changed to Application on hold by Ed-Team. <br><br>
        
        To further process the application we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'Case Closed':
        return `Hello ${params.studentName}, <br><br> 

      Your Application ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been closed. Details of the closure mentioned in Remarks.`;

      case 'Case Closed-Student Not Qualified':
        return `Hello ${params.studentName}, <br><br> 
  
        Your Application ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been closed. Details of the closure mentioned in Remarks.`;

      case 'Case Closed-Program Qualified':
        return `Hello ${params.studentName}, <br><br> 
  
        Your Application ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been closed. Details of the closure mentioned in Remarks.`;

      case 'Documents verified Forward to Applications':
        return ``;

      case 'Rejected by University':
        return `Hello ${params.studentName}, <br><br> 

        Your application to ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been rejected by University. Remarks mentioned below.`;

      case 'Application on Hold by University':
        return `Hello ${params.studentName}, <br><br> 

        University Officials are assessing your application for ${params.institution}. Status of your ${params.applicationId} has been changed to Application on hold by University. <br><br>
        
        To further process the application we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'Conditional Offer Received':
        return `Congratulations! ${params.studentName}, Here is your Conditional Offer for ${params.program} to ${params.institution} for ${params.intake} & ${params.year}.`;

      case 'Unconditional Offer Received':
        return `Congratulations! ${params.studentName}, Here is your Conditional Offer for ${params.program} to ${params.institution} for ${params.intake} & ${params.year}.`;

      case 'Student Deferred':
        return `Hello ${params.studentName}, <br><br>  

        As per the raised request, your application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been deferred. Details mentioned below.`;

      case 'Funds Under Assessment':
        return `Hello ${params.studentName}, <br><br>  

        Our team is assessing the submitted financials. To proceed further we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'Funds Approved':
        return `Hello ${params.studentName}, <br><br>  

        Great! the produced financials are approved your application is being proceed to further steps.`;

      case 'COE Received':
        return `Hello ${params.studentName}, <br><br>  

        Congratulations! You have received enrollment confirmation from the university.`;

      case 'Payment Received':
        return `Hello ${params.studentName}, <br><br> 

        We have received payment confirmation from the university. Your application is being proceed to further steps`;

      case 'CAS Received':
        return `Hello ${params.studentName}, <br><br>  

        Congratulations! You have received enrollment confirmation from the university.`;

      case 'Refund Request Initiated':
        return `Hello ${params.studentName}, <br><br>  

        As per the raised request, We have initiated the refund process.`;

      case 'VISA in Process':
        return `Hello ${params.studentName}, <br><br> 

        This is to inform you that we in process of logging your VISA. To proceed further we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'VISA Received':
        return `Hello ${params.studentName}, <br><br>

        Great News!! Congratulations on your VISA approval <br><br>
        
        Safe Travels!`;

      case 'VISA Rejected':
        return `Hello ${params.studentName}, <br><br>

        Sorry to inform that your VISA has been rejected. Remarks mentioned Below.`;

      default:
        return ``;
    }
  }

  async getAgentStatusContent(params: any): Promise<any> {
    switch (params.status) {
      case 'Documents Yet to be Verified':
        return ``;

      case 'Application in Progress':
        return `This is to inform you that your application  for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} is under progress. For your future communication please use ${params.applicationId}.`;

      case 'Application Hold by Ed-Team':
        return `Our application executive is assessing your application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year}. Status of your ${params.applicationId} has been changed to Application on hold by Ed-Team. <br><br>

        To further process the application we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'Case Closed':
        return `Your Application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been closed. Details of the closure mentioned in Remarks.`;

      case 'Case Closed-Student Not Qualified':
        return `Your Application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been closed. Details of the closure mentioned in Remarks.`;

      case 'Case Closed-Program Qualified':
        return `Your Application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been closed. Details of the closure mentioned in Remarks.`;

      case 'Documents verified Forward to Applications':
        return ``;

      case 'Rejected by University':
        return `Your application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been rejected by University. Remarks mentioned below.`;

      case 'Application on Hold by University':
        return `University Officials are assessing your application for ${params.institution}. Status of your ${params.applicationId} has been changed to Application on hold by Institute <br><br>
        
        To further process the application we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'Conditional Offer Received':
        return `Congratulations! ${params.studentName}, Here is your Conditional Offer for ${params.program} to ${params.institution} for ${params.intake} & ${params.year}.`;

      case 'Unconditional Offer Received':
        return `Congratulations! ${params.studentName}, Here is your Conditional Offer for ${params.program} to ${params.institution} for ${params.intake} & ${params.year}.`;

      case 'Student Deferred':
        return `As per the raised request, your application for ${params.program} to ${params.institution} for ${params.intake} & ${params.year} has been deferred. Details mentioned below.`;

      case 'Funds Under Assessment':
        return `Our team is assessing the submitted financials. To proceed further we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'Funds Approved':
        return `Great! the produced financials are approved your application is being proceed to further steps.`;

      case 'COE Received':
        return `Congratulations! You have received enrollment confirmation from the university.`;

      case 'Payment Received':
        return `We have received payment confirmation from the university. Your application is being proceed to further steps.`;

      case 'CAS Received':
        return `Congratulations! You have received enrollment confirmation from the university.`;

      case 'Refund Request Initiated':
        return `As per the raised request, we have initiated the refund process.`;

      case 'VISA in Process':
        return `This is to inform you that we in process of logging your VISA. To proceed further we request you to arrange the pending requirements at the earliest, as per remarks mentioned below.`;

      case 'VISA Received':
        return `Great News! Congratulations on your VISA approval <br><br>

        Safe Travels!`;

      case 'VISA Rejected':
        return `Sorry to inform that your VISA has been rejected. Remarks mentioned Below.`;

      default:
        return ``;
    }
  }
}
