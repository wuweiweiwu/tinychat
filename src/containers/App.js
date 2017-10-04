import React, { Component } from 'react';
import { Header, Comment, Divider, Input, Button } from 'semantic-ui-react';
import Message from '../components/Message';
import MyHeader from '../components/MyHeader';
import Popup from '../components/Popup';
import { formatDate } from '../util/util';
import * as $ from 'jquery';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      lastSeen: 0,
      typedMessage: '',
      whoami: 'nobody',
      avatar: require('../assets/steve.jpg'),
      popupOpen: true,
    };
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateWhoami = this.updateWhoami.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.callGetMessages = this.callGetMessages.bind(this);
  }

  componentDidMount(){
    this.callGetMessages()
  }

  /**
   * callGetMessages
   *
   * We will call getMessages here instead of getting the fakedata.json in a
   * real app. When getMessages is fullfilled, another getMessage call will be called
   */
  callGetMessages(){
    fetch('./fixtures/fakedata.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
            messages: data.messages,
            lastSeen: data.last_seen
        }, this.scrollToBottom);
      });
    // call callGetMessages again after setState to restart the long polling request
  }

  scrollToBottom(){
    const $targetContainer = $('.messages-container');
    const $childContainer = $('.comments');
    $targetContainer.animate({
      scrollTop: $targetContainer.scrollTop() + $childContainer.height()
    }, 'slow');
  }

  /**
   * sendMessage
   *
   * call sendMessage here and the getMessages long polling call will update
   * the states :)
   */
  sendMessage(){
    this.setState(prevState => {
      if (prevState.typedMessage.length > 0){
        const newMessage = {
          id : prevState.messages.length + 1,
          author: prevState.whoami,
          content: prevState.typedMessage,
          timestamp: new Date().getTime()
        }
        return {
          messages: [...prevState.messages, newMessage],
          typedMessage: ''
        };
      }
    }, this.scrollToBottom);
  }

  handleEnterKey(e){
    if (e.keyCode === 13){
      this.sendMessage();
    }
  }

  handleMessageChange(e){
    this.setState({
      typedMessage: e.target.value,
    });
  }


  /**
   * updateAvatar
   *
   * call updateAvatar here to send the POST request with the image <avatar>
   */
  updateAvatar(avatar){
    this.setState({
      avatar,
    });
  }

  togglePopup(){
    this.setState(prevState => ({
      popupOpen: !prevState.popupOpen
    }));
  }


  /**
   * updateWhoami
   *
   * call updateAvatar here to sent the POST request with the new name
   */
  updateWhoami(whoami){
    if (!whoami) return;
    this.setState({
      whoami,
      popupOpen: false
    });
  }


  /**
   * updateMessage
   *
   * call updateMessage here to send the POST request to update the specified message.
   * The LONG POLLING request will be fulfilled and it will update the state.
   */
  updateMessage(messageId, content){
    this.setState(prevState => {
      const messages = prevState.messages.map(message => {
        if (messageId === message.id)
          return Object.assign({}, message, {content}, {"last_edited": new Date().getTime()});
        return message;
      });
      return {
        messages
      }
    });
  }

  render() {
    const { messages, typedMessage, avatar, whoami, popupOpen } = this.state;

    messages.sort(function(a, b) {
      return a.timestamp - b.timestamp;
    });

    const messageList = [];
    let currentDate = null;
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      if (date.toDateString() !== currentDate){
        messageList.push(
          <Header key={message.timestamp} as='h3' dividing color='green'>
            {formatDate(date)}
          </Header>);
        currentDate = date.toDateString();
      }
      messageList.push(
        <Message
          key={message.id}
          id={message.id}
          avatar={whoami === message.author ? avatar : message.avatar || require('../assets/slack.png')}
          updateMessage={whoami === message.author ? this.updateMessage : null}
          name={message.author}
          date={message.timestamp}
          lastEdited={message.last_edited}
          content={message.content}/>);
    });

    return (
      <div className='main-container'>
        <div className='header-container'>
          <MyHeader
            togglePopup={this.togglePopup}
            whoami={whoami}
            avatar={avatar}
            updateAvatar={this.updateAvatar}/>
        </div>
        <Divider horizontal>Messages</Divider>
        <div className='messages-container'>
          <Comment.Group>
            {messageList}
          </Comment.Group>
        </div>
        <div className='send-container'>
          <Input
            className='message-input'
            icon='send'
            placeholder='Send Message'
            onChange={this.handleMessageChange}
            onKeyDown={this.handleEnterKey}
            value={typedMessage}/>
          <Button onClick={this.sendMessage}>Send</Button>
        </div>
        <Popup
          popupOpen={popupOpen}
          updateWhoami={this.updateWhoami}
          togglePopup={this.togglePopup}/>
      </div>
    );
  }
}

export default App;
