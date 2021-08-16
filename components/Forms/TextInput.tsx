import React from 'react';
import TextField from "@material-ui/core/TextField";

const TextInput = (props: { label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; multiline: boolean | undefined; rows: string | number | undefined; value: unknown; type: string | undefined; onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined; }) => {
    return (
        <TextField
            fullWidth
            label={props.label}
            margin="dense"
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    );
};

export default TextInput;