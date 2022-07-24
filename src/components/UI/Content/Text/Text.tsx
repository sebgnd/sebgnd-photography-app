import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

import { ContentSize } from '../types';
import { contentSizes } from '../constant';

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'regular';

export type TextProps = {
  text: string,
  wrap?: boolean,
  lines?: number,
  bold?: boolean,
  type?: TextType,
  ellipsis?: boolean,
  size?: ContentSize,
  className?: string,
  style?: CSSProperties,
};

export const Text: FunctionComponent<TextProps> = ({
  text,
  lines,
  style,
  className,
  wrap = true,
  size = 'regular',
  type = 'regular',
  ellipsis = false,
}) => {
  const textElementStyle = useMemo((): CSSProperties => {
    const fontSize = contentSizes[size];

    return {
      ...style,
      overflow: 'hidden',
      fontFamily: 'Open Sans',
      lineClamp: lines ? lines : undefined,
      textOverflow: ellipsis ? 'ellipsis' : 'initial',
      whiteSpace: wrap ? 'normal' : 'nowrap',
      fontSize,
    };
  }, [size, style, ellipsis, wrap, lines]);

  const props = {
    className,
    style: textElementStyle,
  };

  const element = type !== 'regular' ? type : 'div';

  return React.createElement(element, props, text);
};
