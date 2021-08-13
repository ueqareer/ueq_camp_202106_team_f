import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type State = {
  viewWear: boolean;
  viewHot: boolean;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOk: (viewWear: boolean, viewHot: boolean) => void;
  viewWear: boolean;
  viewHot: boolean;
};

export default class FormDialog extends React.Component<Props, State> {
  state = {
    viewWear: this.props.viewWear,
    viewHot: this.props.viewHot,
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'指数を追加する'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <label>
                <input
                  type="checkbox"
                  name="wear"
                  checked={this.state.viewWear}
                  onChange={() =>
                    this.setState({ viewWear: !this.state.viewWear })
                  }
                />
                服装指数
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="hot"
                  checked={this.state.viewHot}
                  onChange={() =>
                    this.setState({ viewHot: !this.state.viewHot })
                  }
                />
                熱中症指数
              </label>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              this.props.handleOk(this.state.viewWear, this.state.viewHot);
            }}
            color="primary"
            autoFocus
          >
            追加する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
