import React, {useState, useCallback, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            wearopen:false,
            hotopen:false
        }
    }

    render(){
        return(
            <Dialog
                open={this.props.open}
                onClose={this.props.handeleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"指数を追加する"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div>
                    <label><input type="checkbox" name="wear"/>服装指数</label>
                    </div>
                    if(wear.checked) console
                    <div>
                    <label><input type="checkbox" name="hot"/>熱中症指数</label>
                    </div>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={this.props.handeleClose} color="primary" autoFocus>
                    追加する
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
}