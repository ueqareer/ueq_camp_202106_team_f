import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

type State = {
  eventDate:string;
  eventPrefecture:string;
  //value_spot:string;
  //value_schedule:string;
};

type Props = {
  addOpen: boolean;
  handleClickClose: () => void;
  handleClickOk: (viewWear: string, viewHot: string) => void;
  sendInfo: (value_spot:string, value_schedule:string) => void;
  //value_spot: string;
  //value_schedule: string;
};

const currencies = [
  { value: '1', label: '北海道' },{ value: '2', label: '青森県' },{ value: '3', label: '岩手県' },{ value: '4', label: '宮城県' },{ value: '5', label: '秋田県' },{ value: '6', label: '山形県' },{ value: '7', label: '福島県' },{ value: '8', label: '茨城県' },{ value: '9', label: '栃木県' },{ value: '10', label: '群馬県' },
  { value: '11', label: '埼玉県' },{ value: '12', label: '千葉県' },{ value: '13', label: '東京都' },{ value: '14', label: '神奈川県' },{ value: '15', label: '新潟県' }, { value: '16', label: '富山県' },{ value: '17', label: '石川県' },{ value: '18', label: '福井県' },{ value: '19', label: '山梨県' },{ value: '20', label: '長野県' },
  { value: '21', label: '岐阜県' },{ value: '22', label: '静岡県' },{ value: '23', label: '愛知県' },{ value: '24', label: '三重県' },{ value: '25', label: '滋賀県' },{ value: '26', label: '京都府' },{ value: '27', label: '大阪府' },{ value: '28', label: '兵庫県' },{ value: '29', label: '奈良県' },{ value: '30', label: '和歌山県' },
  { value: '31', label: '鳥取県' },{ value: '32', label: '島根県' },{ value: '33', label: '岡山県' },{ value: '34', label: '広島県' },{ value: '35', label: '山口県' },{ value: '36', label: '徳島県' },{ value: '37', label: '香川県' },{ value: '38', label: '愛媛県' },{ value: '39', label: '高知県' },{ value: '40', label: '福岡県' },
  { value: '41', label: '佐賀県' },{ value: '42', label: '長崎県' },{ value: '43', label: '熊本県' },{ value: '44', label: '大分県' },{ value: '45', label: '宮崎県' },{ value: '46', label: '鹿児島県' },{ value: '47', label: '沖縄県' },
]

export default class AddIvent extends React.Component<Props, State> {
  state = {
    eventDate:"2021/08/18",
    eventPrefecture:"東京都",
    //value_spot:this.props.value_spot,
    //value_schedule:this.props.value_schedule
  };

  inputDate=(event: React.ChangeEvent<HTMLInputElement>)=>{
    //console.log(event.target.value);
    this.setState({eventDate:event.target.value});
    //console.log(event.target.value);
    //console.log(this.state.eventDate);
}

  render() {
    return (
      <Dialog
        open={this.props.addOpen}
        onClose={this.props.handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'日程を追加する'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <TextInput
                id={"standard-basic"} multiline={false} rows={1} text={"Please select ivent date"}
                value={this.state.eventDate} type={"date"} onChange={this.inputDate}
            />
          
            <TextField
                id="standard-select-currency"
                select
                label="都道府県選択"
                value={this.state.eventPrefecture}
                onChange={(event) =>
                  this.setState({ eventPrefecture: event.target.value })
                }
                helperText="Please select prefecture"
            >
              {currencies.map(option => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClickClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              //this.props.handleClickOk(this.state.value_spot, this.state.value_schedule);
              this.props.sendInfo(this.state.eventDate, this.state.eventPrefecture);
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
