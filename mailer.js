var nodemailer = require('nodemailer');

const sender = 'YourEmail';
const pass = 'YourPassword';

var enviarEmail = function() {
    var transporte = nodemailer.createTransport({
    host: 'mail.yourhost.com',
    port: '25',
    secure: false,
    ignoreTLS: true,
    auth: {
        user: sender,
        pass: pass
    },
    tls:{
        ciphers:'SSLv3',
        rejectUnauthorized: true
    },
    authMethod: 'PLAIN',
    debug: true
    });


    var _definir_header_email = function (emailDest, emailTitulo, mensagem, logFile = '') {
        var header = {
            from: sender,
            to: emailDest,
            subject: emailTitulo,
            html: mensagem            
        };

        if (logFile.length != 0) {
            header.attachments = [{ 
                filename: logFile,
                path: logFile
            }]
        }

        return header;
    }

    var _enviar_email = function (mailTo, subject, message, logFile) {
        var email = _definir_header_email(mailTo, subject, message, logFile);
        transporte.sendMail(email, function (err, info) {
            if (err) throw err;
        });
    }

    return {
        enviar_email: _enviar_email
    };
}();

module.exports = enviarEmail;
