import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react'

class Popup extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.setState({
      username: e.target.value
    });
  }

  render(){
    const { username } = this.state;

    return (
      <Modal size='mini' open={this.props.popupOpen} onClose={this.props.togglePopup}>
        <Modal.Header>
          Change your username
        </Modal.Header>
        <Modal.Content>
          <Input placeholder='New username' value={username} onChange={this.handleNameChange}/>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.props.togglePopup}>
            Cancel
          </Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Save'
            onClick={() => this.props.updateWhoami(username)}/>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Popup
