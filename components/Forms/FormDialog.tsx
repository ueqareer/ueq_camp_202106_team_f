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
  viewFeel: boolean;
  viewRay: boolean;
  viewSleep: boolean;
  viewUmbrella: boolean;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOk: (viewWear: boolean, viewHot: boolean, viewFeel:boolean, viewRay: boolean, viewSleep: boolean, viewUmbrella: boolean) => void;
  viewWear: boolean;
  viewHot: boolean;
  viewFeel: boolean;
  viewRay: boolean;
  viewSleep: boolean;
  viewUmbrella: boolean;
};

export default class FormDialog extends React.Component<Props, State> {
  state = {
    viewWear: this.props.viewWear,
    viewHot: this.props.viewHot,
    viewFeel: this.props.viewFeel,
    viewRay: this.props.viewRay,
    viewSleep: this.props.viewSleep,
    viewUmbrella: this.props.viewUmbrella
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
                体感気温指数
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="feel"
                  checked={this.state.viewFeel}
                  onChange={() =>
                    this.setState({ viewFeel: !this.state.viewFeel })
                  }
                />
                不快度指数
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="feel"
                  checked={this.state.viewRay}
                  onChange={() =>
                    this.setState({ viewRay: !this.state.viewRay })
                  }
                />
                紫外線指数
                <div>※UVインデックスを５段階に分類しています。紫外線対策の実施にお役立てください。</div>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="feel"
                  checked={this.state.viewSleep}
                  onChange={() =>
                    this.setState({ viewSleep: !this.state.viewSleep })
                  }
                />
                睡眠指数
                <div>※夜間の体感気温から眠りにくさを表しています。睡眠の環境づくりにお役立てください。</div>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="feel"
                  checked={this.state.viewUmbrella}
                  onChange={() =>
                    this.setState({ viewUmbrella: !this.state.viewUmbrella })
                  }
                />
                傘指数
                <div>※直近12時間の降水確率から外出時の傘の必要性を表しています。</div>
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
              this.props.handleOk(this.state.viewWear, this.state.viewHot, this.state.viewFeel, this.state.viewRay, this.state.viewSleep, this.state.viewUmbrella);
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
