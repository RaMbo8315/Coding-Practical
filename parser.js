// Using fs-extra package to read the raw file
// Moment.js to make date user friendly
const fs = require('fs-extra');
const moment = require('moment');
var email = {};

// 
fs.readFile("original_msg.txt", "utf8", function(error, data) {
  
    // If the code experiences any errors logging the error to the console.
    if (error) {
      return console.log(error);
    }
    
    // Using .match() and regex to search for relevant fields
    // then save them to variable to build an email object further down
    var delivered = (data.match(/delivered-to:\s*(.+)/i))[1]
    var date = (data.match(/date:\s*(.+)\s+from/i))[1]
    var date_formated = moment(date).format('llll')
    var from = (data.match(/from:\s*(.+)\s+to/i))[1]
    var to = (data.match(/to:\s*(.+)\s+message-id/i))[1]
    var message_id = (data.match(/message-id:\s*(.+)\s+in-reply-to/i))[1]
    var in_reply_to = (data.match(/in-reply-to:\s*(.+)\s+references/i))[1]
    var subject = (data.match(/subject: re:\s*(.+)\s+MIME-Version/i))[1]
    var MIME_version = (data.match(/MIME-Version:\s*(.+)\s+Content-Type/i))[1]
    var content_Type = (data.match(/Content-Type:\s*(.+)\s+b/i))[1]
             
    // Building the email object and removing any unwanted 
    // special characters
    email = {
      delivered: delivered,
      date: date_formated,
      from: from.replace(/[<>]/g,""),
      to: to.replace(/[<>]/g,""),
      message_id: message_id.replace(/[<>]/g,""),
      in_reply_to: in_reply_to.replace(/[<>]/g,""),
      subject: subject,
      MIME_version: MIME_version,
      content_Type: content_Type.replace(/[; ]/g,""),
    }
    
    // logging the email object to the console
    console.log(email)
})

    