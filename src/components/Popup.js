import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react'

class Popup extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleNameChange(e){
    this.setState({
      username: e.target.value
    });
  }

  handleEnterKey(e){
    const { username } = this.state;
    const { updateWhoami } = this.props;
    if (e.keyCode === 13){
      updateWhoami(username);
    }
  }

  render(){
    const { username } = this.state;
    const { popupOpen, togglePopup, updateWhoami } = this.props;

    return (
      <Modal size='mini' open={popupOpen} onClose={togglePopup}>
        <Modal.Header>
          Set your username
        </Modal.Header>
        <Modal.Content>
          <Input
            placeholder='New username'
            value={username}
            onKeyDown={this.handleEnterKey}
            onChange={this.handleNameChange}/>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={togglePopup}>
            Cancel
          </Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Save'
            onClick={() => updateWhoami(username)}/>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Popup
