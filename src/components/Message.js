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
    e.stopPropagation();
    if (!this.props.updateMessage) return;
    if ($(`#editor${this.props.id}`).hasClass('open')){
      $(`#editor${this.props.id}`).removeClass('open');
      return;
    };
    $('.editor').removeClass('open');
    $(`#editor${this.props.id}`).addClass('open');
  }

  closeEditor(e){
    e.stopPropagation();
    $('.editor').removeClass('open');
  }

  handleInputChange(e){
    this.setState({
      editText: e.target.value
    });
  }

  updateMessage(e){
    if (!this.state.editText) return;
    this.props.updateMessage(this.props.id, this.state.editText);
    this.closeEditor(e);
  }

  render() {
    const { editText } = this.state;
    const { updateMessage, id, avatar, date, lastEdited, content, name } = this.props;

    return (
      <Comment className={updateMessage ? 'can-edit' : ''} onClick={this.toggleEditor}>
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
        </Comment.Content>
        <div id={'editor'+id} className='editor' onClick={(e) => e.stopPropagation()}>
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
