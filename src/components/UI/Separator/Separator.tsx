import { FunctionComponent } from 'react';

import style from './Separator.module.css';

interface SeparatorProp {
  size: 'small' | 'medium' | 'big' | 'tiny';
  orientation?: 'vertical' | 'horizontal';
}

const classes = {
  horizontal: {
    tiny: 'tinyWidth',
    small: 'smallWidth',
    medium: 'mediumWidth',
    big: 'bigWidth',
  },
  vertical: {
    tiny: 'tinyHeight',
    small: 'smallHeight',
    medium: 'mediumHeight',
    big: 'bigHeight',
  },
};

export const Separator: FunctionComponent<SeparatorProp> = ({ size, orientation = 'horizontal' }) => {
  const styleClass = classes[orientation][size];
  const separatorClasses = [style.separator, style[styleClass]];

  return (
    <div className={separatorClasses.join(' ')} />
  );
};

