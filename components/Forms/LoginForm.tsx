import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';

type State = {
};

type Props = {
  openl: boolean;
  handleClosel: () => void;
};

export default class LoginForm extends React.Component<Props, State> {
state ={ 	
	name: "",
 	email: "",
 };

inputName = (event: { target: { value: any; }; }) => {
	this.setState({name: event.target.value})
}

inputEmail = (event: { target: { value: any; }; }) => {
	this.setState({email: event.target.value})
}

	
  render(){
    return (
      <Dialog
        open={this.props.openl}
        onClose={this.props.handleClosel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ログイン画面</DialogTitle>
        <DialogContent>
          <TextInput
	  	label={"email"} multiline={false} rows={1} 
		value={this.state.name} type={"text"} onChange={this.inputName}
	  />
	   <TextInput
	  	label={"password"} multiline={false} rows={1} 
		value={this.state.name} type={"text"} onChange={this.inputEmail}
	  />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClosel} color="primary">
            キャンセル
          </Button>
	  <Button onClick={this.props.handleClosel} color="primary">
            ログイン
          </Button>
          
        </DialogActions>
      </Dialog>
    );
  }
}
