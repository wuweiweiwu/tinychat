Here is where your spec/explanation to the tinychat backend developer goes.

Hi backend developer,

Here are the specs for a couple API calls that I think would provide the functionality needed for the TinyChat app. However, any input/feedback is appreciated.

This is assuming that the server is running on the same host.

The format of the RESTful API documentation will be <**method**> <**url**>.

### Update Avatar

update the avatar image with the specified image

**POST: /api/update/avatar**

url params [REQUIRED]: userid `string`

data params: FormData key='img'

https://developer.mozilla.org/en-US/docs/Web/API/FormData

Success: 200 success

Failure: 500 Internal Server, 422 Unprocessable Entry, 415 Unsupported Media Type

Example:

```
var formdata = new FormData();
formdata.append('img', $('#file')[0].files[0]);

$.ajax({
    url: '/api/update/avatar?userid=bob',
    data: formdata,
    processData: false,
    type: 'POST',
    success: function (r) {
      console.log(r);
    }
});
```

### Update username
**POST: /api/update/username**

url params [REQUIRED]: userid `string`

data params: JSON: 'newname' `string`

Success: 200 success

Failure: 500 Internal Server, 422 Unprocessable Entry

Example:

```
$.ajax({
  url: "/api/update/username?userid=bob",
  dataType: "json",
  data : {
    newname: "bob's new name"
  },
  type : "POST",
  success : function(r) {
    console.log(r);
  }
});
```

### Get messages
based on Facebook Messenger long pooling request
https://www.pubnub.com/blog/2014-12-01-http-long-polling/

Pretty much the request would not finish until the server has updates.

Will fulfill the request when a message with timestamp or edit timestamp newer than lastseen is received for the chatroom.

As user base grows we would have to consider how to scale.

**Method: GET /api/pull**

url params [REQUIRED]: chatroomid `string`, lastseen `int`

Success: 200 success with message object similar to `fakedata.json`

Failure: 500 Internal Server

Example:

```
$.ajax({
  url: "/api/pull?chatroomid=mychatroom&lastseen=1421953434028",
  type : "GET",
  success : function(r) {
    console.log(r);
  }
});
```

### Send message

This route will update the messages in the chatroom specified by chatroomid

**POST: /api/message**

url params [REQUIRED]: chatroomid `string`

data params: JSON: 'message' `string`, timestamp `int`, author `string`

Success: 200 success

Failure: 500 Internal Server, 422 Unprocessable Entry

Example:

```
$.ajax({
  url: "/api/message?chatroomid=mychatroom",
  dataType: "json",
  data : {
    author: "bob",
    message: "i'm sending a message here",
    timestamp: 1421953434028
  },
  type : "POST",
  success : function(r) {
    console.log(r);
  }
});
```

### Update message

This route will update the message specified by messageid in the chatroom specified by chatroomid

**POST: /api/update/message**

url params [REQUIRED]: chatroomid `string`

data params: JSON: 'message' `string`, messageid `int`, last_edited `int`

Success: 200 success

Failure: 500 Internal Server, 422 Unprocessable Entry

Example:

```
$.ajax({
  url: "/api/update/message?chatroomid=mychatroom",
  dataType: "json",
  data : {
    messageid: 4,
    message: "i'm updating a message here",
    last_edited: 1421953434028
  },
  type : "POST",
  success : function(r) {
    console.log(r);
  }
});
```
