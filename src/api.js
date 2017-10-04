//define backend api calls Here

//example api call that returns a promise
export function getPayload(page) {
  return fetch('URLPATH').then((response) => {
    if (response.status !== 200) {
      throw new Error();
    }
    if (response.headers.get('content-type') != 'application/json') {
      throw new TypeError();
    }
    var j = response.json();
    return j; // fulfillment value
  });
}

//update avatar
//send POST request with image as payload
//success 200
export function updateAvatar(image) {
}

//update username
//send POST request with new ussername
//success 200
export function updateUsername(username){
}

//get messages
//send GET request to get messages associated with chatroom
//implemented with LONG POLLING
//success 200 with messages since last seen
export function getMessages(chatroomid, lastseen){
}

//send messages
//POST request send message to chatroom as user at time
//sucess 200
export function sendMessage(chatroomid, username, timestamp){
}

//update messsages
//POST request to update message with messageid in chatroom with content and also update edit timestamp
//success 200
export function updateMessage(chatroomid, messageid, content, timestamp){
}
