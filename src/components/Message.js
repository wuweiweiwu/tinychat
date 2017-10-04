import React, { Component } from 'react';
import { Comment, Form, Button } from 'semantic-ui-react';
import Linkify from 'linkifyjs/react';
import { formatAMPM, formatDate } from '../util/util';
import * as $ from 'jquery';

class Message extends Component {

  constructor(props){
    super(props);
    this.state = {
      editText: ''
    }
    this.toggleEditor = this.toggleEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  toggleEditor(e){
    const { updateMessage, id } = this.props;
    if (!updateMessage) return;
    if ($(`#editor${id}`).hasClass('open')){
      $(`#editor${id}`).removeClass('open');
      return;
    };
    $('.editor').removeClass('open');
    $(`#editor${id}`).addClass('open');
    const $targetContainer = $('.messages-container');
    const $childContainer = $(`#editor${id}`).parent();
    $targetContainer.animate({
      scrollTop: $targetContainer.scrollTop() + $childContainer.scrollTop() + $childContainer.height()
    }, 'fast');
  }

  closeEditor(e){
    $('.editor').removeClass('open');
  }

  handleInputChange(e){
    this.setState({
      editText: e.target.value
    });
  }

  updateMessage(e){
    const { editText } = this.state;
    const { updateMessage, id } = this.props;
    if (!editText) return;
    updateMessage(id, editText);
    this.closeEditor(e);
  }

  render() {
    const { editText } = this.state;
    const { updateMessage, id, avatar, date, lastEdited, content, name } = this.props;

    return (
      <Comment>
        <Comment.Avatar src={avatar} />
        <Comment.Content>
          <Comment.Author as='a'>{name}</Comment.Author>
          <Comment.Metadata>
            <div>{'Sent: ' + formatAMPM(date)}</div>
            {lastEdited &&
              <div>{'Last edited: ' + formatDate(lastEdited) + ' ' + formatAMPM(lastEdited)}</div>}
          </Comment.Metadata>
          <Comment.Text>
            <Linkify>
              {content}
            </Linkify>
          </Comment.Text>
          {updateMessage &&
            <Comment.Actions>
              <Comment.Action onClick={this.toggleEditor}>Edit</Comment.Action>
            </Comment.Actions>}
        </Comment.Content>
        <div id={'editor'+id} className='editor'>
          <Form reply>
            <Form.TextArea value={editText} onChange={this.handleInputChange}/>
            <Button size='mini' content='Cancel' secondary onClick={this.closeEditor}/>
            <Button size='mini' content='Change' primary onClick={this.updateMessage}/>
          </Form>
        </div>
      </Comment>
    );
  }
}

export default Message;
