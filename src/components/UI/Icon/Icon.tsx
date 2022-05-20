import React, { FunctionComponent, useMemo } from 'react'

export type IconVariant = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
export type IconProps = {
  name: string,
  variant?: IconVariant,
};

export const Icon: FunctionComponent<IconProps> = ({
  name,
  variant = 'solid',
}) => {
  const className = useMemo(() => {
    return `fa-${variant} fa-${name}`;
  }, [variant, name]);

  return (
    <div className={className} />
  );
};
