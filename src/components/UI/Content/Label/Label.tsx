import React, { FunctionComponent } from 'react';

import { Text } from 'components/UI/Content/Text/Text';

import styles from './Label.module.scss';

export type LabelColor = 'default' | 'info';
export type LabelProps = {
  text: string,
  color?: 'default' | 'info',
}

export const Label: FunctionComponent<LabelProps> = ({ text, color = 'default' }) => {
  const className = [styles.labelContainer, styles[color]].join(' ');

  return (
    <div className={className}>
      <Text size="small" text={text} />
    </div>
  );
}