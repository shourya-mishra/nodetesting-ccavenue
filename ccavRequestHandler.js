var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    // console.log(request);
    var body = '',
	workingKey = 'FC0C5AF32C086306F1736E90103C8295',	//Put in the 32-Bit key shared by CCAvenues.
	accessCode = 'AVWT72JC97AK36TWKA',			//Put in the Access Code shared by CCAvenues.
	encRequest = '',
	formbody = '';
    
    console.log("in data");
    body += qs.stringify(request.body);
    console.log(body);
    encRequest = ccav.encrypt(body,workingKey); 
    console.log(encRequest);
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
            
    console.log('in the end');
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(formbody);
    response.end();
   
   return; 
};

