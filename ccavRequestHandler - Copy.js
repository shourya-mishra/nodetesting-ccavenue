var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    // console.log(request.body)
    // console.log(Object.keys(request.body));
    var body = '',
	workingKey = '401B21E85393521AE0229403B2CF0504',	//Put in the 32-Bit key shared by CCAvenues.
	accessCode = 'AVAH79FG11AW62HAWA',			//Put in the Access Code shared by CCAvenues.
	encRequest = '',
	formbody = '';

    Object.keys(request.body).forEach(key => {
        body += key + '=' + request.body[key] + '&'
    })

    body = body.substring(0, body.length-1)
    console.log(body);

	encRequest = ccav.encrypt(body,workingKey); 
    console.log(encRequest);
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
					
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(formbody);
    response.end();
    
   return; 
};
