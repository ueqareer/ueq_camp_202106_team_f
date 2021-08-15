import React, { ReactNode, FC, ChangeEvent } from 'react';
/*
interface BaseProps {
  onChange?(event: ChangeEvent): void;
  chidlren?: ReactNode;
}

interface ControlledProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: never;
}

interface UncontrolledProps extends BaseProps {
  checked?: never;
  defaultChecked?: boolean;
}

type Props = ControlledProps | UncontrolledProps;

const Checkbox: FC<Props> = ({
  checked,
  defaultChecked,
  onChange = () => {},
  children
}) => (
  <label className="checkbox">
    <input
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={event => onChange(event)}
      className="checkbox__main"
    />
    <span className="checkbod__label">{children}服装指数</span>
  </label>
);

export default Checkbox;
*/