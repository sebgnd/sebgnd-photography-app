import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

import { ContentSize } from '../types';
import { contentSizes } from '../constant';

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'regular';

export type TextProps = {
  text: string,
  bold?: boolean,
  type?: TextType,
  size?: ContentSize,
  className?: string,
  style?: CSSProperties,
};

export const Text: FunctionComponent<TextProps> = ({
  text,
  style,
  className,
  bold = false,
  size = 'regular',
  type = 'regular',
}) => {
  const textElementStyle = useMemo((): CSSProperties => {
    const fontWeight = bold ? 'bold' : 'normal';
    const fontSize = contentSizes[size];

    return {
      ...style,
      fontFamily: 'Open Sans',
      fontWeight,
      fontSize,
    };
  }, [bold, size, style]);

  const props = {
    className,
    style: textElementStyle,
  };

  const element = type !== 'regular' ? type : 'div';

  return React.createElement(element, props, text);
};
