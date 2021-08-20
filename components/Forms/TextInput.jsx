import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const TextInput =(props)=>{
    return(
        <TextField
            id={props.id}
            label={props.label}
            fullWidth={true}
            margin={"dense"}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            helperText={props.text}
        />
    )
}

export default TextInput