const express = require("express");
const favicon = require("express-favicon");
const bcrypt = require("bcrypt");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
const ip = process.env.IP || "0.0.0.0";
const app = express();
const JSONStream = require('JSONStream')
const AWS = require("aws-sdk");
const https = require("https");
var fs = require("fs");



ccav = require('./ccavutil.js'),

ccavReqHandler = require('./ccavRequestHandler.js'),
ccavResHandler = require('./ccavResponseHandler.js');

var ccavenue = require('ccavenue');
ccavenue.setMerchant('183192');
ccavenue.setWorkingKey('401B21E85393521AE0229403B2CF0504');

const Razorpay = require("razorpay");

require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

var messagebird = require("messagebird")(process.env.MessageBirdAccesKey);

//app.use(cors());
var enableCORS = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, token, Content-Length, X-Requested-With, *"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, token, Content-Length, X-Requested-With, *"
  );
  next();
});
app.use(enableCORS);
app.use(cors())

app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 50000,
  })
);

var salt = 10;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "noreply@mindon.in",
    pass: "Em#@!ail",
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

AWS.config.region = "ap-south-1";

const uri =
  "mongodb+srv://prashanth:connectcircleoflifemongo@circleoflife-shzki.mongodb.net/UsersDB?retryWrites=true&w=majority";

/////////////////////////////////////Common Functions//////////////////////////////////////////////

app.post("/api/getip", function (req, res) {
  var ip = req.ip;
  res.send(ip);
});

app.post("/api/loginapi", function (req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserEmail: req.body.UserEmail };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      if (result) {
        bcrypt.compare(
          req.body.UserPassword,
          result.UserPassword,
          function (bcrypterr, bcryptresult) {
            if (bcryptresult == true) {
              if (result.UserActivated === true) {
                var userdata = {
                  UserID: result.UserID,
                  UserEmail: result.UserEmail,
                  UserType: result.UserType,
                  Status: "login successful",
                };
                res.send(userdata);
              } else if (result.UserActivated === false) {
                var userdata = {
                  UserID: result.UserID,
                  UserEmail: result.UserEmail,
                  UserType: result.UserType,
                  Status: "activate account",
                };
                res.send(userdata);
              }
            } else {
              var userdata = {
                Status: "wrong password",
              };
              res.send(userdata);
              // redirect to login page
            }
          }
        );
      } else {
        var userdata = {
          Status: "user not found",
        };
        res.send(userdata);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/registerapi", function (req, res) {
  ////console.log(req.body);
  bcrypt.hash(req.body.UserPassword, salt, (bcrypterr, encrypted) => {
    req.body.UserPassword = encrypted;

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect((err) => {
      const collection = client.db("UsersDB").collection("Users");
      var registerUser = {
        UserID: req.body.UserID,
        UserEmail: req.body.UserEmail,
        UserPassword: req.body.UserPassword,
        UserFirstName: req.body.UserFirstName,
        UserLastName: req.body.UserLastName,
        UserType: req.body.UserType,
        UserPremium: req.body.UserPremium,
        UserActivated: req.body.UserActivated,
      };
      var query = { UserEmail: req.body.UserEmail };
      ////console.log(collection);
      collection.findOne(query, function (err, result) {
        if (err) throw err;
        ////console.log(result);
        if (result) {
          res.send("User already exists");
        } else {
          collection.insertOne(registerUser, function (err, result) {
            if (err) res.send(err);
            if (result) {
              res.send("registered");
            }
            ////console.log("registered");
            client.close();
            // perform actions on the collection object
          });
        }
      });
    });
  });
});

app.post("/api/loginsocialapi", function (req, res) {
  ////console.log(req);
  var query = { UserEmail: req.body.UserEmail };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var dataupdate = {
      $set: {
        UserID: req.body.UserID,
        UserEmail: req.body.UserEmail,
        UserFirstName: req.body.UserFirstName,
        UserLastName: req.body.UserLastName,
        UserType: req.body.UserType,
        UserPremium: req.body.UserPremium,
        UserActivated: req.body.UserActivated,
      },
    };
    var datainsert = {
      UserID: req.body.UserID,
      UserEmail: req.body.UserEmail,
      UserFirstName: req.body.UserFirstName,
      UserLastName: req.body.UserLastName,
      UserType: req.body.UserType,
      UserPremium: req.body.UserPremium,
      UserActivated: req.body.UserActivated,
    };
    const collection = client.db("UsersDB").collection("Users");

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      ////console.log(result);
      if (result) {
        var userdata = {
          Status: "login successful",
        };
        res.send(userdata);
      } else {
        collection.insertOne(datainsert, function (errinsrt, resultinsert) {
          if (errinsrt) res.send(errinsrt);
          if (resultinsert) {
            var userdata = {
              Status: "login successful",
            };
            res.send(userdata);
          } else {
            var userdata = {
              Status: "login unsuccessful",
            };
            res.send(userdata);
          }
          client.close();
          // perform actions on the collection object
        });
      }
    });
  });
});

app.post("/api/checkuser", function (req, res) {
  ////console.log(req);
  var query = { UserEmail: req.body.UserEmail };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var dataupdate = {
      $set: {
        UserID: req.body.UserID,
        UserName: req.body.UserName,
        UserNumber: req.body.UserNumber,
        UserEmail: req.body.UserEmail,
        RegisteredDate: req.body.RegisteredDate,
      },
    };
    var datainsert = {
      UserID: req.body.UserID,
      UserName: req.body.UserName,
      UserNumber: req.body.UserNumber,
      UserEmail: req.body.UserEmail,
      RegisteredDate: req.body.RegisteredDate,
    };
    const collection = client.db("UsersDataBase").collection("Users");

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      ////console.log(result);
      if (result) {
        var userdata = {
          user: result,
          Status: "user exists",
        };
        res.send(userdata);
      } else {
        collection.insertOne(datainsert, function (errinsrt, resultinsert) {
          if (errinsrt) res.send(errinsrt);
          if (resultinsert) {
            var userdata = {
              Status: "user added",
            };
            res.send(userdata);
          } else {
            var userdata = {
              Status: "mismatch",
            };
            res.send(userdata);
          }
          client.close();
          // perform actions on the collection object
        });
      }
    });
  });
});

app.post("/api/addorder", function (req, res) {
  ////console.log(req);
  var query = { OrderID: req.body.OrderID };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var dataupdate = {
      $set: {
        OrderOTP: req.body.OrderOTP,
        WarrantyStatus: "Waiting",
      },
    };
    var datainsert = {
      UserID: req.body.UserID,
      OrderID: req.body.OrderID,
      InvoiceID: req.body.InvoiceID,
      UserEmail: req.body.UserEmail,
      UserNumber: req.body.UserNumber,
      Product: req.body.Product,
      ProductOrigin: req.body.ProductOrigin,
      OrderOTP: req.body.OrderOTP,
      WarrantyStatus: "Waiting",
      RegisteredDate: req.body.RegisteredDate,
    };
    const collection = client.db("OrdersDB").collection(req.body.UserID);

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      ////console.log(result);
      if (result) {
        collection.updateOne(
          query,
          dataupdate,
          function (errinsrt, resultinsert) {
            if (errinsrt) res.send(errinsrt);
            if (resultinsert) {
              var params = {
                originator: "Rehamo",
                recipients: ["91" + req.body.UserNumber + ""],
                body:
                  "Rehamo: Your One Time Password is " +
                  req.body.OrderOTP +
                  ". Dont share this code with anyone.",
              };

              messagebird.messages.create(params, function (err, response) {
                if (err) {
                  return console.log(err);
                }
                console.log(response);
              });
              var mailOptions = {
                from: '"Rehamo" <support@crytiq.co>', // sender address
                to: req.body.UserEmail, // list of receivers
                subject: "Warranty: One Time Password", // Subject line
                html:
                  "Rehamo: Your One Time Password is " +
                  req.body.OrderOTP +
                  ". Dont share this code with anyone.", // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  res.send("Error sending mail: " + error);
                }
                ////console.log("Message sent: " + info.response);
                res.send("Message sent: " + info.response);
              });
              var orderdata = {
                orderdata: resultinsert,
                Status: "added",
              };
              res.send(orderdata);
            } else {
              var orderdata = {
                Status: "not added",
              };
              res.send(orderdata);
            }
            client.close();
            // perform actions on the collection object
          }
        );
      } else {
        collection.insertOne(datainsert, function (errinsrt, resultinsert) {
          if (errinsrt) res.send(errinsrt);
          if (resultinsert) {
            var params = {
              originator: "Rehamo",
              recipients: ["91" + req.body.UserNumber + ""],
              body:
                "Rehamo: Your One Time Password is " +
                req.body.OrderOTP +
                ". Dont share this code with anyone.",
            };

            messagebird.messages.create(params, function (err, response) {
              if (err) {
                return console.log(err);
              }
              console.log(response);
            });

            var mailOptions = {
              from: '"Rehamo" <support@crytiq.co>', // sender address
              to: req.body.UserEmail, // list of receivers
              subject: "Warranty: One Time Password", // Subject line
              html:
                "Rehamo: Your One Time Password is " +
                req.body.OrderOTP +
                ". Dont share this code with anyone.", // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.send("Error sending mail: " + error);
              }
              ////console.log("Message sent: " + info.response);
              res.send("Message sent: " + info.response);
            });

            var orderdata = {
              orderdata: resultinsert,
              Status: "added",
            };
            res.send(orderdata);
          } else {
            var orderdata = {
              Status: "not added",
            };
            res.send(orderdata);
          }
          client.close();
          // perform actions on the collection object
        });
      }
    });
  });
});

app.post("/api/checkotp", function (req, res) {
  ////console.log(req);
  var query = { OrderID: req.body.OrderID };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var newvalues = {
      $set: {
        OrderID: req.body.OrderID,
        WarrantyStatus: "Valid",
        RegisteredDate: req.body.RegisteredDate,
      },
    };
    const collection = client.db("OrdersDB").collection(req.body.UserID);

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      ////console.log(result);
      if (result) {
        if (result.OrderOTP === req.body.EnteredOTP) {
          collection.updateOne(
            query,
            newvalues,
            function (errinsrt, resultinsert) {
              if (errinsrt) res.send(errinsrt);
              if (resultinsert) {
                var params = {
                  originator: "Rehamo",
                  recipients: ["91" + req.body.UserNumber + ""],
                  body:
                    "Rehamo: Thank you for submitting your order details. We will get back to you with warranty activation status in next 48 hours",
                };

                messagebird.messages.create(params, function (err, response) {
                  if (err) {
                    return console.log(err);
                  }
                  console.log(response);
                });

                var mailOptions = {
                  from: '"Rehamo" <support@crytiq.co>', // sender address
                  to: req.body.UserEmail, // list of receivers
                  subject: "Warranty: Submission Successful", // Subject line
                  html:
                    "Rehamo: Thank you for submitting your order details. We will get back to you with warranty activation status in next 48 hours", // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.send("Error sending mail: " + error);
                  }
                  ////console.log("Message sent: " + info.response);
                  res.send("Message sent: " + info.response);
                });
                var orderdata = {
                  orderdata: resultinsert,
                  Status: "verified",
                };
                res.send(orderdata);
              } else {
                var orderdata = {
                  Status: "error",
                };
                res.send(orderdata);
              }
              client.close();
              // perform actions on the collection object
            }
          );
        } else {
          var orderdata = {
            Status: "mismatch",
          };
          res.send(orderdata);
        }
      } else {
        var orderdata = {
          Status: "not present",
        };
        res.send(orderdata);
      }
    });
  });
});

app.post("/api/saveuserdata", function (req, res) {
  ////console.log(req.body);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserEmail: req.body.UserEmail };
    var newvalues = {
      $set: {
        UserFirstName: req.body.UserFirstName,
        UserLastName: req.body.UserLastName,
        UserEmail: req.body.UserEmail,
      },
    };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);
    collection.updateOne(query, newvalues, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send("settings saved");
      } else {
        res.send("settings not saved");
      }
      client.close();
    });
  });
});

app.post("/api/resetpassword", function (req, res) {
  ////console.log(req);
  bcrypt.hash(req.body.UserPassword, salt, (bcrypterr, encrypted) => {
    req.body.UserPassword = encrypted;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect((err) => {
      var query = { UserEmail: req.body.UserEmail };
      var newvalues = { $set: { UserPassword: req.body.UserPassword } };
      const collection = client.db("UsersDB").collection("Users");
      ////console.log(collection);
      collection.updateOne(query, newvalues, function (err, result) {
        if (err) res.send(err);
        if (result) {
          res.send("reset");
        }

        client.close();
      });
      // perform actions on the collection object
    });
  });
});

app.post("/api/activate", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserID: req.body.UserID };
    var newvalues = { $set: { UserActivated: req.body.UserActivated } };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);
    collection.updateOne(query, newvalues, function (err, result) {
      if (err) throw err;
      res.send("activated");
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/profilepic", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserEmail: req.body.UserEmail };
    var newvalues = { $set: { ProfileImage: req.body.ProfileImage } };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);
    collection.updateOne(query, newvalues, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send("updated");
      } else {
        res.send("not updated");
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/getuserdata", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserEmail: req.body.UserEmail };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      if (result) {
        var userdata = {
          user: result,
          Status: "user found",
        };
        res.send(userdata);
      } else {
        var userdata = {
          Status: "user not found",
        };
        res.send(userdata);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/saveusertype", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserEmail: req.body.UserEmail };
    var newvalues = { $set: { UserType: req.body.UserType } };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);
    collection.updateOne(query, newvalues, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send("done");
      } else {
        res.send("not updated");
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

/////////////////////////////////////Program Functions//////////////////////////////////////////////////////

app.post("/api/addprogram", function (req, res) {
  ////console.log(req);
  var query = { ProgramID: req.body.ProgramID };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var dataupdate = {
      $set: {
        UserID: req.body.UserID,
        ProgramID: req.body.ProgramID,
        ProgramName: req.body.ProgramName,
        ProgramCategory: req.body.ProgramCategory,
        ProgramType: req.body.ProgramType,
        ProgramPrice: req.body.ProgramPrice,
        ProgramStatus: req.body.ProgramStatus,
        ProgramDesc: req.body.ProgramDesc,
        ProgramDate: req.body.ProgramDate,
        ProgramImage: req.body.ProgramImage,
        Sessions: req.body.Sessions,
        Levels: req.body.Levels,
      },
    };
    var datainsert = {
      UserID: req.body.UserID,
      ProgramID: req.body.ProgramID,
      ProgramName: req.body.ProgramName,
      ProgramCategory: req.body.ProgramCategory,
      ProgramType: req.body.ProgramType,
      ProgramPrice: req.body.ProgramPrice,
      ProgramStatus: req.body.ProgramStatus,
      ProgramDesc: req.body.ProgramDesc,
      ProgramDate: req.body.ProgramDate,
      ProgramImage: req.body.ProgramImage,
      Sessions: req.body.Sessions,
      Levels: req.body.Levels,
    };
    const collection = client.db("ProgramDB").collection("Programs");

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      ////console.log(result);
      if (result) {
        collection.updateOne(
          query,
          dataupdate,
          function (errorupdate, resultupdate) {
            if (errorupdate) res.send(errorupdate);
            if (resultupdate) {
              res.send("done");
            } else {
              ////console.log('not ther');
            }
            client.close();

            // perform actions on the collection object
          }
        );
      } else {
        collection.insertOne(datainsert, function (errinsrt, resultinsert) {
          if (errinsrt) res.send(errinsrt);
          if (resultinsert) {
            res.send("done");
          }
          client.close();
          // perform actions on the collection object
        });
      }
    });
  });
});


app.post("/api/getblogdata", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
	  var query = { BlogID: req.body.BlogID };
	  const collection = client.db("BlogDB").collection('Blogs');
	  ////console.log(collection);
  
	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		if (result) {
				var productdata = {
				blog: result,
				Status: "blog found",
			  };
			  res.send(productdata);
		} else {
		  var productdata = {
			Status: "blog not found",
		  };
		  res.send(productdata);
		}
		client.close();
	  });
	  // perform actions on the collection object
	});
  });



  app.post("/api/getbloglist", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {

	  const collection = client.db("BlogDB").collection('Blogs');
	  ////console.log(collection);
  
	  collection
	  .find({})
	  .project({ BlogID : 1 , BlogName : 1 , BlogAuthor : 1 , BlogDate : 1 , BlogTime : 1, BlogContent:1})
	  .sort( { BlogDate : 1 } )
	  .pipe(JSONStream.stringify())
	.pipe(res.type('json'))
	  
	  // perform actions on the collection object
	});
  });

  app.post("/api/getenquirylist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collection = client.db("EnquiryDB").collection("Enquiry");
      ////console.log(collection);
    
      collection
      .find({})
      .project({ EnquiryID : 1 , EnquiryEmail : 1 ,EnquiryMessage:1, EnquirySchoolName : 1 , EnquiryDesignation : 1 , EnquiryContact : 1,PrefTime:1})
      .sort( { EnquiryEmail : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });

    app.post("/api/getsamplelogs", function (req, res) {
      ////console.log(req);
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
      
      client.connect((err) => {
    
        const collection = client.db("SampleDB").collection("Sample");
        ////console.log(collection);
      
        collection
        .find({})
        .project({ SampleID : 1 , UserEmail : 1 , Journal : 1 , Timestamp : 1})
        .sort( { Timestamp : 1 } )
        .pipe(JSONStream.stringify())
      .pipe(res.type('json'))
        
        // perform actions on the collection object
      });
      });

      


    app.post("/api/addsamplelog", function (req, res) {
      ////console.log(req);
      var query = { SampleID: req.body.SampleID };
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
      client.connect((err) => {
        var dataupdate = {
          $set: {
            SampleID: req.body.SampleID,
            UserEmail: req.body.UserEmail,
            Journal:req.body.Journal,
            Timestamp:req.body.Timestamp,
          },
        };
        var datainsert = {
          SampleID: req.body.SampleID,
          UserEmail: req.body.UserEmail,
          Journal:req.body.Journal,
          Timestamp:req.body.Timestamp,
        };
        const collection = client.db("SampleDB").collection("Sample");
    
        collection.findOne(query, function (err, result) {
          if (err) throw err;
          ////console.log(result);
          if (result) {
            collection.updateOne(
              query,
              dataupdate,
              function (errorupdate, resultupdate) {
                if (errorupdate) res.send(errorupdate);
                if (resultupdate) {
                  res.send("done");
                } else {
                  ////console.log('not ther');
                }
                client.close();
    
                // perform actions on the collection object
              }
            );
          } else {
            collection.insertOne(datainsert, function (errinsrt, resultinsert) {
              if (errinsrt) res.send(errinsrt);
              if (resultinsert) {
                res.send("done");
              }
              client.close();
              // perform actions on the collection object
            });
          }
        });
      });
    });

    

    app.post("/api/addgaevent", function (req, res) {
      ////console.log(req);
      var query = { TrackID: req.body.TrackID };
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
      client.connect((err) => {
        var dataupdate = {
          $set: {
            category: req.body.category,
            action: req.body.action,
            label: req.body.label,
            value: req.body.value,
            event: req.body.event,
            TrackID: req.body.TrackID,
            Timestamp: req.body.Timestamp,
          },
        };
        var datainsert = {
          category: req.body.category,
          action: req.body.action,
          label: req.body.label,
          value: req.body.value,
          event: req.body.event,
          TrackID: req.body.TrackID,
          Timestamp: req.body.Timestamp,
        };
        const collection = client.db("GAEventsDB").collection("GAEvents");
    
        collection.findOne(query, function (err, result) {
          if (err) throw err;
          ////console.log(result);
          if (result) {
            collection.updateOne(
              query,
              dataupdate,
              function (errorupdate, resultupdate) {
                if (errorupdate) res.send(errorupdate);
                if (resultupdate) {
                  res.send("done");
                } else {
                  ////console.log('not ther');
                }
                client.close();
    
                // perform actions on the collection object
              }
            );
          } else {
            collection.insertOne(datainsert, function (errinsrt, resultinsert) {
              if (errinsrt) res.send(errinsrt);
              if (resultinsert) {
                res.send("done");
              }
              client.close();
              // perform actions on the collection object
            });
          }
        });
      });
    });



    app.post("/api/addutmevent", function (req, res) {
      ////console.log(req);
      var query = { TrackID: req.body.TrackID };
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
      client.connect((err) => {
        var dataupdate = {
          $set: {
            source: req.body.source,
            medium: req.body.medium,
            campaign: req.body.campaign,
            content: req.body.content,
            url:req.body.url,
            TrackID: req.body.TrackID,
            Timestamp: req.body.Timestamp,
          },
        };
        var datainsert = {
          source: req.body.source,
          medium: req.body.medium,
          campaign: req.body.campaign,
          content: req.body.content,
          url:req.body.url,
          TrackID: req.body.TrackID,
          Timestamp: req.body.Timestamp,
        };
        const collection = client.db("UTMEventsDB").collection("UTMEvents");
    
        collection.findOne(query, function (err, result) {
          if (err) throw err;
          ////console.log(result);
          if (result) {
            collection.updateOne(
              query,
              dataupdate,
              function (errorupdate, resultupdate) {
                if (errorupdate) res.send(errorupdate);
                if (resultupdate) {
                  res.send("done");
                } else {
                  ////console.log('not ther');
                }
                client.close();
    
                // perform actions on the collection object
              }
            );
          } else {
            collection.insertOne(datainsert, function (errinsrt, resultinsert) {
              if (errinsrt) res.send(errinsrt);
              if (resultinsert) {
                res.send("done");
              }
              client.close();
              // perform actions on the collection object
            });
          }
        });
      });
    });

    app.post("/api/getgaeventlist", function (req, res) {
      ////console.log(req);
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
      
      client.connect((err) => {
    
        const collection = client.db("GAEventsDB").collection("GAEvents");
        ////console.log(collection);
      
        collection
        .find({})
        .project({ 
        category: 1,
        action: 1,
        label: 1,
        value: 1,
        event: 1,
        TrackID: 1,
        Timestamp: 1,})
        .sort( { Timestamp : 1 } )
        .pipe(JSONStream.stringify())
      .pipe(res.type('json'))
        
        // perform actions on the collection object
      });
      });
    
      app.post("/api/getutmeventlist", function (req, res) {
      ////console.log(req);
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
      
      client.connect((err) => {
    
        const collection = client.db("UTMEventsDB").collection("UTMEvents");
        ////console.log(collection);
      
        collection
        .find({})
        .project({ 
        source: 1,
        medium: 1,
        campaign: 1,
        content: 1,
        url:1,
        TrackID: 1,
        Timestamp: 1,})
        .sort( { Timestamp : 1 } )
        .pipe(JSONStream.stringify())
      .pipe(res.type('json'))
        
        // perform actions on the collection object
      });
      });

app.post("/api/addenquiry", function (req, res) {
  ////console.log(req);
  var query = { EnquiryID: req.body.EnquiryID };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var dataupdate = {
      $set: {
        EnquiryID: req.body.EnquiryID,
        EnquiryEmail: req.body.EnquiryEmail,
        EnquirySchoolName: req.body.EnquirySchoolName,
        EnquiryDesignation: req.body.EnquiryDesignation,
        EnquiryMessage: req.body.EnquiryMessage,
        EnquiryContact: req.body.EnquiryContact,
        PrefTime:req.body.PrefTime,
      },
    };
    var datainsert = {
      EnquiryID: req.body.EnquiryID,
      EnquiryEmail: req.body.EnquiryEmail,
      EnquirySchoolName: req.body.EnquirySchoolName,
      EnquiryDesignation: req.body.EnquiryDesignation,
      EnquiryMessage: req.body.EnquiryMessage,
      EnquiryContact: req.body.EnquiryContact,
      PrefTime:req.body.PrefTime,
    };
    const collection = client.db("EnquiryDB").collection("Enquiry");

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      ////console.log(result);
      if (result) {
        collection.updateOne(
          query,
          dataupdate,
          function (errorupdate, resultupdate) {
            if (errorupdate) res.send(errorupdate);
            if (resultupdate) {
              res.send("done");
            } else {
              ////console.log('not ther');
            }
            client.close();

            // perform actions on the collection object
          }
        );
      } else {
        collection.insertOne(datainsert, function (errinsrt, resultinsert) {
          if (errinsrt) res.send(errinsrt);
          if (resultinsert) {
            res.send("done");
          }
          client.close();
          // perform actions on the collection object
        });
      }
    });
  });
});

app.post("/api/getprogramdata", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { ProgramID: req.body.ProgramID };
    const collection = client.db("ProgramDB").collection("Programs");
    ////console.log(collection);

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      if (result) {
        var programdata = {
          Program: result,
          Status: "program found",
        };
        res.send(programdata);
      } else {
        var programdata = {
          Status: "program not found",
        };
        res.send(programdata);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/getproductdata", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
	  var query = { ProductID: req.body.ProductID };
	  const collection = client.db("ProductDB").collection('Products');
	  ////console.log(collection);
  
	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		if (result) {
				var productdata = {
				Product: result,
				Status: "product found",
			  };
			  res.send(productdata);
		} else {
		  var productdata = {
			Status: "product not found",
		  };
		  res.send(productdata);
		}
		client.close();
	  });
	  // perform actions on the collection object
	});
  });


  

  app.post("/api/getbannerdata", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
	  var query = { BannerID: req.body.BannerID };
	  const collection = client.db("BannerDB").collection('Banners');
	  ////console.log(collection);
  
	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		if (result) {
				var productdata = {
				banner: result,
				Status: "banner found",
			  };
			  res.send(productdata);
		} else {
		  var productdata = {
			Status: "banner not found",
		  };
		  res.send(productdata);
		}
		client.close();
	  });
	  // perform actions on the collection object
	});
  });

  

  app.post("/api/gettestimonialdata", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
	  var query = { TestimonalID: req.body.TestimonalID };
	  const collection = client.db("TestimonialDB").collection('Testimonials');
	  ////console.log(collection);
  
	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		if (result) {
				var productdata = {
				testimonial: result,
				Status: "testimonial found",
			  };
			  res.send(productdata);
		} else {
		  var productdata = {
			Status: "testimonial not found",
		  };
		  res.send(productdata);
		}
		client.close();
	  });
	  // perform actions on the collection object
	});
  });


  app.post("/api/getblogdata", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
	  var query = { BlogID: req.body.BlogID };
	  const collection = client.db("BlogDB").collection('Blogs');
	  ////console.log(collection);
  
	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		if (result) {
				var productdata = {
				blog: result,
				Status: "blog found",
			  };
			  res.send(productdata);
		} else {
		  var productdata = {
			Status: "blog not found",
		  };
		  res.send(productdata);
		}
		client.close();
	  });
	  // perform actions on the collection object
	});
  });


  app.post("/api/gettrendingdata", function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
	  var query = { TrendingID: req.body.TrendingID };
	  const collection = client.db("TrendingDB").collection('Trending');
	  ////console.log(collection);
  
	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		if (result) {
				var productdata = {
				trending: result,
				Status: "trending found",
			  };
			  res.send(productdata);
		} else {
		  var productdata = {
			Status: "trending not found",
		  };
		  res.send(productdata);
		}
		client.close();
	  });
	  // perform actions on the collection object
	});
  });



app.post("/api/getprogramlist", async function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("ProgramDB").collection("Programs");
    ////console.log(collection);

    collection
      .find(
        {},
        {
          ProgramID: 1,
          ProgramName: 1,
          ProgramCategory: 1,
          ProgramType: 1,
          ProgramDate: 1,
        }
      )
      .sort({ ProgramDate: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        if (result) {
          var programlist = {
            program: result,
            Status: "program found",
          };
          res.send(programlist);
        } else {
          var programlist = {
            Status: "program not found",
          };
          res.send(programlist);
        }
        client.close();
      });
    // perform actions on the collection object
  });
});


app.post("/api/getproductlist",async function (req, res) {
	////console.log(req);
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {

	  const collection = client.db("ProductDB").collection('Products');

	  
	  ////console.log(collection);
  
	 /*  

	collection.find().each(function(err, doc) {
		
		//client.close();
		//console.log(doc)
		if(doc) {
			// Got a document
			res.write(JSON.stringify(doc))
			console.log(doc)
		  } else {
			client.close();
			res.end()
			return false;
		  }

	  });
	
	collection.createIndex(
		{ ProgramID : 1 }, function(err, result) {
		console.log(result);
	  });*/

	  collection
	  .find({})
	  .project({ 
	  		ProductID: 1,
			ProductName: 1,
			ProductCategory: 1,
			SubCategory: 1,
			ProductHighlights: 1,
			ProductFeatures: 1,
			ProductSpecs: 1,
			ProductPrice: 1,
			ProductStatus: 1,
			ProductDesc: 1,
			ProductUrl:1,
			ProductStock:1,
			SpecList: 1,
			AgeGroup: 1,
			Material: 1,
			Legs: 1,
			FAQs: 1,
			Colors:1,
			Sizes:1,
            RentalDeposit:1,
            RentalGST:1,
            RentalPrice:1,
            ProductKey:1,
            RentalKey:1,
            CustomiseKey:1,
			VideoThere:1,
			APlus:1,
			Prices:1,
			ProductDate: 1,
		})
	  .sort( { ProductDate : 1 } )
    .pipe(JSONStream.stringify())
	.pipe(res.type('json'))

	
	
	
	  // perform actions on the collection object
	});
  });



  app.post("/api/getwishlist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
    const collection = client.db("WishlistDB").collection(req.body.UserEmail);
      ////console.log(collection);
    
      collection
      .find({})
      .project({ WishID : 1 , ProductID : 1 , Product : 1})
      .sort( { WishID : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });
  
    app.post("/api/getbannerlist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
    const collection = client.db("BannerDB").collection('Banners');
      ////console.log(collection);
    
      collection
      .find({})
      .project({ BannerID : 1 , BannerFor : 1 , Timestamp : 1 , BannerURL : 1})
      .sort( { Timestamp : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });
  
    app.post("/api/gettestimoniallist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collection = client.db("TestimonialDB").collection('Testimonials');
      ////console.log(collection);
    
      collection
      .find({})
      .project({ TestimonialID : 1 , TestimonialContent : 1 , TestimonialDesignation : 1 , TestimonialName : 1, TestimonialRating:1,Timestamp:1,})
      .sort( { Timestamp : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });
  
    app.post("/api/getbloglist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collection = client.db("BlogDB").collection('Blogs');
      ////console.log(collection);
    
      collection
      .find({})
      .project({ BlogID : 1 , BlogName : 1 , BlogDate : 1 , BlogTime : 1, BlogAuthor:1, BlogContent:1,})
      .sort( { BlogDate : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });
  
    app.post("/api/gettrendinglist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collection = client.db("TrendingDB").collection('Trending');
      ////console.log(collection);
    
      collection
      .find({})
      .project({ TrendingID : 1 , Trending1 : 1 , Trending2 : 1 , Trending3 : 1, Trending4:1,})
      .sort( { TrendingID : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });
  
    app.post("/api/getofferlist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collection = client.db("OfferDB").collection('Offers');
      ////console.log(collection);
    
      collection
      .find({})
      .project({ OfferID : 1 , OfferName : 1 ,OfferDiscount : 1 , OfferDate : 1 ,OfferExpiryDate : 1 ,OfferExpiryTime : 1 ,OfferDescription : 1 , OfferTime : 1})
      .sort( { OfferDate : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });
  {/*}
    app.post("/api/getorderlist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collectiondb = client.db("OrdersDB");
      ////console.log(collection);
    var orderarray=[];
      collectiondb.listCollections().forEach(function(collname) {
  
      collectiondb.collection(collname.name).find().toArray(function (err, result) {
        if (err) throw err;
        if (result) {
          orderarray.push(result);
            //res.send(transactionslist);
        } else {
          var transactionslist = {
          Status: "orders not found",
          };
          //res.send(transactionslist);
        }
        //client.close();
        });
      
    })
    setTimeout(function(){ 
      console.log(orderarray);
      res.send(orderarray)
     }, 15000);
    //console.log(orderarray)
    
      // perform actions on the collection object
    });
    });
  
  */}
  
   
    app.post("/api/getorderlist", function (req, res) {
    ////console.log(req);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    
    client.connect((err) => {
  
      const collection = client.db("OrdersDB").collection('Orders');
      ////console.log(collection);
    
      collection
      .find({})
      .project({ UserID : 1 ,_id:1, OrderID : 1 , InvoiceID : 1 , UserEmail : 1, UserNumber:1, Product:1,ProductOrigin:1,WarrantyStatus:1,RegisteredDate:1})
      .sort( { UserID : 1 } )
      .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
      
      // perform actions on the collection object
    });
    });

app.post("/api/getprogramcount", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("ProgramDB").collection("Programs");
    ////console.log(collection);

    collection.countDocuments(function (err, result) {
      if (err) throw err;
      if (result) {
        var programlist = {
          program: result,
          Status: "program found",
        };
        res.send(programlist);
      } else {
        var programlist = {
          Status: "program not found",
        };
        res.send(programlist);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/addnewsletter", function (req, res) {
	////console.log(req);
	var query = { NewsletterEmail: req.body.NewsletterEmail };
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  
	client.connect((err) => {
		var dataupdate = {
			$set:{
				NewsletterEmail: req.body.NewsletterEmail,

			
		}}
		var datainsert = {
			NewsletterEmail: req.body.NewsletterEmail,
			
		}
	  const collection = client.db("NewsletterDB").collection('Newsletter');

	  collection.findOne(query, function (err, result) {
		if (err) throw err;
		////console.log(result);
		if (result) {
		  res.send("there")
		} else {
			collection.insertOne(datainsert, function (errinsrt, resultinsert) {
				if (errinsrt) res.send(errinsrt);
				if (resultinsert) {
				  res.send("done");
				}
				client.close();
				// perform actions on the collection object
			  });
		}
	  });
	  
	  
  });
});

app.post("/api/getuserlist", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);

    collection
      .find({}, { UserID: 1, UserFirstName: 1, UserEmail: 1, UserType: 1 })
      .sort({ UserID: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        if (result) {
          var userlist = {
            user: result,
            Status: "user found",
          };
          res.send(userlist);
        } else {
          var userlist = {
            Status: "user not found",
          };
          res.send(userlist);
        }
        client.close();
      });
    // perform actions on the collection object
  });
});

app.post("/api/gettransactionslist", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("TransactionsDB").collection("Transactions");
    ////console.log(collection);

    collection.find().toArray(function (err, result) {
      if (err) throw err;
      if (result) {
        var transactionslist = {
          transaction: result,
          Status: "transactions found",
        };
        res.send(transactionslist);
      } else {
        var transactionslist = {
          Status: "transactions not found",
        };
        res.send(transactionslist);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/gettransactiondata", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { TXNID: req.body.TXNID };
    const collection = client.db("TransactionsDB").collection("Transactions");
    ////console.log(collection);

    collection.findOne(query, function (err, result) {
      if (err) throw err;
      if (result) {
        var transactiondata = {
          transaction: result,
          Status: "transaction found",
        };
        res.send(transactiondata);
      } else {
        var transactiondata = {
          Status: "transaction not found",
        };
        res.send(transactiondata);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/purchasedlist", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { PAYMENTUSERID: req.body.Owner };
    const collection = client
      .db("UserTransactionsDB")
      .collection(req.body.Owner);
    ////console.log(collection);

    collection.find().toArray(function (err, result) {
      if (err) throw err;
      if (result) {
        var userlist = {
          user: result,
          Status: "user found",
        };
        res.send(userlist);
      } else {
        var userlist = {
          Status: "user not found",
        };
        res.send(userlist);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/getusercount", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);

    collection.countDocuments(function (err, result) {
      if (err) throw err;
      if (result) {
        var userlist = {
          user: result,
          Status: "user found",
        };
        res.send(userlist);
      } else {
        var userlist = {
          Status: "user not found",
        };
        res.send(userlist);
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/deleteuser", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { UserEmail: req.body.UserEmail };
    const collection = client.db("UsersDB").collection("Users");
    ////console.log(collection);

    collection.remove(query, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send("user deleted");
      } else {
        res.send("user not deleted");
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

app.post("/api/deleteprogram", function (req, res) {
  ////console.log(req);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    var query = { ProgramID: req.body.ProgramID };
    const collection = client.db("ProgramDB").collection("Programs");
    ////console.log(collection);

    collection.deleteOne(query, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send("program deleted");
      } else {
        res.send("program not deleted");
      }
      client.close();
    });
    // perform actions on the collection object
  });
});

/////////////////////////////////////Mail/Nodemailer Functions//////////////////////////////////////////////

app.post("/api/sendmail", function (req, res) {
  ////console.log("req.body.to is " + req.body.to);
  ////console.log("req.body.subject is " + req.body.subject);
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Rehamo" <support@crytiq.co>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    html: req.body.body, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send("Error sending mail: " + error);
    }
    ////console.log("Message sent: " + info.response);
    res.send("Message sent: " + info.response);
  });
});

app.post("/api/sendmailattachments", function (req, res) {
  ////console.log("req.body.to is " + req.body.to);
  ////console.log("req.body.subject is " + req.body.subject);
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Rehamo" <support@crytiq.co>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    html: req.body.body, // html body
    attachments: req.body.attachments,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send("Error sending mail: " + error);
    }
    ////console.log("Message sent: " + info.response);
  });
  res.send("Message sent");
});

/////////////////////////////////////S3 Storage Functions//////////////////////////////////////////////

app.post("/api/uploadaudio", function (req, res) {
  ////console.log(req);
  var key =
    `Programs/` +
    req.body.ProgramID +
    `/` +
    req.body.SessionID +
    `/` +
    req.body.SessionName +
    `.mp3`;
  var buffer = new Buffer.from(
    req.body.SessionBody.replace(/^data:audio\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: "colbucket",
    Key: key,
    Body: buffer,
    ContentType: "audio/mpeg",
  };

  s3.putObject(params, function (err, data) {
    ////console.log(err, data);
    if (data) {
      res.send("done");
    } else {
      res.send("document upload failed:" + err);
    }
  });
});

app.post("/api/uploadbg", function (req, res) {
  ////console.log(req);
  var key =
    `Programs/` +
    req.body.ProgramID +
    `/` +
    req.body.SessionID +
    `/` +
    req.body.SessionName +
    `_BG.mp3`;
  var buffer = new Buffer.from(
    req.body.SessionBody.replace(/^data:audio\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: "colbucket",
    Key: key,
    Body: buffer,
    ContentType: "audio/mpeg",
  };

  s3.putObject(params, function (err, data) {
    ////console.log(err, data);
    if (data) {
      res.send("done");
    } else {
      res.send("document upload failed:" + err);
    }
  });
});

app.post("/api/downloadaudio", function (req, res) {
  ////console.log(req);
  var key =
    `Programs/` +
    req.body.ProgramID +
    `/` +
    req.body.SessionID +
    `/` +
    req.body.SessionName +
    `.mp3`;
  const signedUrlExpireSeconds = 60 * 60 * 5;
  const params = {
    Bucket: "colbucket",
    Key: key,
    Expires: signedUrlExpireSeconds,
  };
  s3.getSignedUrl("putObject", params, function (err, url) {
    //console.log('The URL is', url);
    if (url) {
      var sessiondata = {
        data: url,
        Status: "session found",
      };
      res.send(sessiondata);
    } else {
      res.send(err);
    }
  });
});

app.post("/api/uploadvideo", function (req, res) {
  ////console.log(req);
  var key =
    `Programs/` +
    req.body.ProgramID +
    `/` +
    req.body.SessionID +
    `/` +
    req.body.SessionName +
    `.mp4`;
  var buffer = new Buffer.from(
    req.body.SessionBody.replace(/^data:video\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: "colbucket",
    Key: key,
    Body: buffer,
    ContentType: "video/mp4",
  };

  s3.putObject(params, function (err, data) {
    ////console.log(err, data);
    if (data) {
      res.send("done");
    } else {
      res.send("document upload failed:" + err);
    }
  });
});



app.post("/api/uploadthumb", function (req, res) {
  ////console.log(req);
  var key =
    `Programs/` +
    req.body.ProgramID +
    `/` +
    req.body.SessionID +
    `/` +
    req.body.SessionName +
    `.jpg`;
  var buffer = new Buffer.from(
    req.body.SessionBody.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: "colbucket",
    Key: key,
    Body: buffer,
    ContentType: "image/jpg",
  };

  s3.putObject(params, function (err, data) {
    ////console.log(err, data);
    if (data) {
      res.send("done");
    } else {
      res.send("document upload failed:" + err);
    }
  });
});

app.post("/api/deleteprograms3", async function (req, res) {
  ////console.log(req);
  async function emptyS3Directory(bucket, dir) {
    const listParams = {
      Bucket: bucket,
      Prefix: dir,
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
      Bucket: bucket,
      Delete: { Objects: [] },
    };

    listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
  }
  await emptyS3Directory("colbucket", "Programs/" + req.body.ProgramID + "");
  res.send("done");
});

app.post("/api/downloadvideo", function (req, res) {
  ////console.log(req);
  var key =
    `Programs/` +
    req.body.ProgramID +
    `/` +
    req.body.SessionID +
    `/` +
    req.body.SessionName +
    `.mp4`;
  const signedUrlExpireSeconds = 60 * 60 * 5;
  const params = {
    Bucket: "colbucket",
    Key: key,
    Expires: signedUrlExpireSeconds,
  };
  s3.getSignedUrl("putObject", params, function (err, url) {
    //console.log('The URL is', url);
    if (url) {
      var sessiondata = {
        data: url,
        Status: "session found",
      };
      res.send(sessiondata);
    } else {
      res.send(err);
    }
  });
});

app.post("/api/templateupload", function (req, res) {
  ////console.log(req);
  var key = "" + req.body.UserID + "/Templates/" + req.body.filename + ".pdf";
  try {
    var buffer = new Buffer.from(
      req.body.filedata.replace(/^data:application\/\w+;base64,/, ""),
      "base64"
    );
  } catch (error) {
    var buffer = new Buffer.from(req.body.filedata, "base64");
  }
  const params = {
    Bucket: "colbucket",
    Key: key,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "application/pdf",
  };
  s3.upload(params, function (err, data) {
    ////console.log(err, data);
    if (data) {
      res.send("document upload success");
    } else {
      res.send("document upload failed:" + err);
    }
  });
});

app.post("/api/docdownload", function (req, res) {
  ////console.log(req);
  var key = "" + req.body.UserID + "/Documents/" + req.body.filename + ".pdf";

  const params = {
    Bucket: "colbucket",
    Key: key,
  };
  s3.getObject(params, (err, data) => {
    if (err)
      if (data) {
        //console.error(err);
        var docdata = {
          data: data.Body,
          Status: "doc found",
        };
        res.send(docdata);
      } else {
        res.send(err);
      }
  });
});

app.post("/api/templatedownload", function (req, res) {
  ////console.log(req);
  var key = "" + req.body.UserID + "/Templates/" + req.body.filename + ".pdf";

  const params = {
    Bucket: "colbucket",
    Key: key,
  };
  s3.getObject(params, (err, data) => {
    if (err)
      if (data) {
        //console.error(err);
        var templatedata = {
          data: data.Body,
          Status: "doc found",
        };
        res.send(templatedata);
      } else {
        res.send(err);
      }
  });
});

app.post("/api/addrazorpayorder",async function (req, res) {

  try {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
        amount: parseInt(req.body.amount), // amount in smallest currency unit
        currency: req.body.currency,
        receipt: req.body.receipt,
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
} catch (error) {
    res.status(500).send(error);
}


});


app.post("/api/mobiletherapyconfirm2", function (req, res) {
  var TherapyUserID = req.body.TherapyUserID;
  var TherapyOrderID = req.body.TherapyOrderID;
  var TherapyID = req.body.TherapyID;
  var TherapyPrice = decodeURI(req.body.TherapyPrice);
  var TherapyStatus = decodeURI(req.body.TherapyStatus);
  var TherapyPsychologistID = req.body.TherapyPsychologistID;
  var TherapyPsychologistName = decodeURI(req.body.TherapyPsychologistName);
  var TherapyDuration = decodeURI(req.body.TherapyDuration);
  var TherapyDate = decodeURI(req.body.TherapyDate);
  var TherapyTime = decodeURI(req.body.TherapyTime);
  var TherapyTimestamp = decodeURI(req.body.TherapyTimestamp);
  var TherapyCustomerName = decodeURI(req.body.TherapyCustomerName);
  var TherapyCustomerEmail = decodeURI(req.body.TherapyCustomerEmail);
  var TherapyPsychologistEmail = decodeURI(req.body.TherapyPsychologistEmail);
  var PaymentID = decodeURI(req.body.PaymentID);

  var CustomerBody = "";

  CustomerBody += "<div>";
  CustomerBody +=
    "<p>Appointment(" +
    TherapyID +
    ") Booked on " +
    TherapyDate +
    " at " +
    TherapyTime +
    "</p>";
  CustomerBody += "<p>Details</p>";
  CustomerBody += "<p>Consultant Name: " + TherapyPsychologistName + "</p>";
  CustomerBody += "<p>Consultant Email: " + TherapyPsychologistEmail + "</p>";
  CustomerBody += "<p>Duration: " + TherapyDuration + "</p>";
  CustomerBody += "<p>Price: " + TherapyPrice + "</p>";
  CustomerBody += "<p>Link: https://meet.circleof.life/" + TherapyID + "</p>";
  CustomerBody += "<p></p>";
  CustomerBody += `<p>The meet link will be active 5 mins before the appointment time. To join the meeting click on the link above. Do Not Share The Email.This email consists a secure link to Rehamo, Please do not share this email, link or access code with others.Questions about the Email? If you need to modify the email or have questions about the email, Please reach out to the sender by emailing them directly</p>`;
  CustomerBody += "</div>";

  var PsychologistBody = "";

  PsychologistBody += "<div>";
  PsychologistBody +=
    "<p>Appointment(" +
    TherapyID +
    ") Booked on " +
    TherapyDate +
    " at " +
    TherapyTime +
    "</p>";
  PsychologistBody += "<p>Details</p>";
  PsychologistBody += "<p>Customer Name: " + TherapyCustomerName + "</p>";
  PsychologistBody += "<p>Customer Email: " + TherapyCustomerEmail + "</p>";
  PsychologistBody += "<p>Duration: " + TherapyDuration + "</p>";
  PsychologistBody += "<p>Price: " + TherapyPrice + "</p>";
  PsychologistBody +=
    "<p>Link: https://meet.circleof.life/" + TherapyID + "</p>";
  PsychologistBody += "<p></p>";
  PsychologistBody += `<p>This appointment was booked from the website. It is suggested to open the above link atleast 5 mins prior to the appointment time. To join the meeting click on the link above. Do Not Share The Email.This email consists a secure link to Rehamo, Please do not share this email, link or access code with others.Questions about the Email?	  If you need to modify the email or have questions about the email, Please reach out to the sender by emailing them directly</p>`;
  PsychologistBody += "</div>";

  console.log(TherapyUserID);
  console.log(TherapyOrderID);
  console.log(req);

  if (req.body.PaymentStatus === true) {
    //res.redirect('/#/auth/success');
    console.log("Success");
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const totalQueries = 1;
    let completedQueries = 0;
    client.connect(async (err) => {
      var query2 = { TherapyID: TherapyID };

      var dataupdate2 = {
        $set: {
          UserID: TherapyPsychologistID,
          TherapyID: TherapyID,
          TherapyPrice: TherapyPrice,
          TherapyStatus: "Scheduled",
          TherapyPsychologistID: TherapyUserID,
          TherapyPsychologistName: TherapyPsychologistName,
          TherapyDuration: TherapyDuration,
          TherapyDate: TherapyDate,
          TherapyTime: TherapyTime,
          TherapyTimestamp: TherapyTimestamp,
          PaymentID: PaymentID,
        },
      };
      var datainsert2 = {
        UserID: TherapyPsychologistID,
        TherapyID: TherapyID,
        TherapyPrice: TherapyPrice,
        TherapyStatus: "Scheduled",
        TherapyPsychologistID: TherapyUserID,
        TherapyPsychologistName: TherapyCustomerName,
        TherapyDuration: TherapyDuration,
        TherapyDate: TherapyDate,
        TherapyTime: TherapyTime,
        TherapyTimestamp: TherapyTimestamp,
        PaymentID: PaymentID,
      };
      const collection2 = client
        .db("TherapyDB")
        .collection(TherapyPsychologistID);

      collection2.findOne(query2, function (err, result) {
        if (err) throw err;
        ////console.log(result);
        if (result) {
          collection2.updateOne(
            query2,
            dataupdate2,
            function (errorupdate, resultupdate) {
              if (errorupdate) res.send(errorupdate);
              if (resultupdate) {
                dispose();
              } else {
                ////console.log('not ther');
              }
              client.close();

              // perform actions on the collection object
            }
          );
        } else {
          collection2.insertOne(datainsert2, function (errinsrt, resultinsert) {
            if (errinsrt) res.send(errinsrt);
            if (resultinsert) {
              dispose();
            }
            client.close();
            // perform actions on the collection object
          });
        }
      });

      function dispose() {
        if (++completedQueries >= totalQueries) {
          client.close();

          var mailOptions = {
            from: '"Rehamo" <support@crytiq.co>', // sender address
            to: TherapyCustomerEmail, // list of receivers
            subject:
              "Appointment Booked on " +
              TherapyDate +
              " at " +
              TherapyTime +
              "", // Subject line
            html: CustomerBody, // html body
          };

          var mailOptions2 = {
            from: '"Rehamo" <support@crytiq.co>', // sender address
            to: TherapyPsychologistEmail, // list of receivers
            subject:
              "Appointment Booked on " +
              TherapyDate +
              " at " +
              TherapyTime +
              "", // Subject line
            html: PsychologistBody, // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              //res.send("Error sending mail: " + error);
            }
            ////console.log("Message sent: " + info.response);
            //res.send("Message sent: " + info.response);
          });

          transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
              //res.send("Error sending mail: " + error);
            }
            ////console.log("Message sent: " + info.response);
            //res.send("Message sent: " + info.response);
          });

          res.send("done");
        }
      }
    });
  } else {
    //res.redirect('/#/auth/failure');

    res.send("not done");
  }
});

  

app.post("/api/make-payment", function (req, res) {

  ccavenue.setOrderId('kasdbkbhb6756324wefew');
  ccavenue.setRedirectUrl('/api/order-redirect');
  ccavenue.setOrderAmount('100');

  console.log('makepayment')
  

  ccavenue.makePayment(res);

});


app.post("/api/order-redirect", function (req, res) {
  var data = ccavenue.paymentRedirect(req); //It will get response from ccavenue payment.

  if(data.isCheckSumValid == true && data.AuthDesc == 'Y') {
    // Success
    // Your code
    res.send("success");
  } else if(data.isCheckSumValid == true && data.AuthDesc == 'N') {
    // Unuccessful
    // Your code
    res.send("unsuccessful");
  } else if(data.isCheckSumValid == true && data.AuthDesc == 'B') {
    // Batch processing mode
    // Your code
    res.send("batch");
  } else {
    // Illegal access
    // Your code
    res.send("illegal");
  }
});

app.post('/api/ccavRequestHandler', function (request, response){
  console.log('request')
	ccavReqHandler.postReq(request, response);
});


app.post('/api/ccavResponseHandler', function (request, response){
  console.log('response')
  ccavResHandler.postRes(request, response);
});



////////////////////////////////////Boilerplate functions///////////////////////////////////////////////

app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, ip, function () {
  console.log("Server is running on Port: " + port);
});
