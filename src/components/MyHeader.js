import React, { Component } from 'react';
import { Header, Label } from 'semantic-ui-react';
import * as $ from 'jquery';

class MyHeader extends Component {

  uploadAvatar(){
    let self = this;
    $('#image-upload').trigger('click');
    $('#image-upload').change(function () {
      if (this.files && this.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e){
          self.props.updateAvatar(e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  render (){
    const { avatar, whoami, togglePopup } = this.props;

    return (
      <Header as='h2' icon textAlign='center'>
        <img id='header-avatar' alt='' src={avatar} onClick={this.uploadAvatar.bind(this)}/>
        <Header.Content>
          TinyChat
        </Header.Content>
        <Label as='a' color='teal' onClick={togglePopup}>
          {whoami}
          <Label.Detail>edit</Label.Detail>
        </Label>
        <input id='image-upload' type="file"/>
      </Header>
    );
  }
}

export default MyHeader;
