var nodemailer = require('nodemailer');
var fs = require("fs");
var colors = require('colors');
var config = require('./config.js');
var inlineCss = require('inline-css');
var filepath = process.argv.slice(2);

if (filepath.length == 0) {
    return console.log(colors.red('Email file path must be set !'));
}

try {
    var html = fs.readFileSync(filepath[0], "utf8");
} catch (err) {
    return console.log(colors.red('Bad file path !'));
}

inlineCss(html, {url: "filePath"})
    .then(function(html) {

        var smtpTransport = {
            host: config.getkey('host'),
            port: config.getkey('port'),
            auth: config.getkey('auth'),
            tls:{
                rejectUnauthorized: false
            }
        };

        var transporter = nodemailer.createTransport(smtpTransport);

        var mailOptions = {
            from: config.getkey('from'),
            to: config.getkey('to'),
            subject: config.getkey('subject'),
            text: '',
            html: html
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log(colors.green('Email sent'));
        });
    });



