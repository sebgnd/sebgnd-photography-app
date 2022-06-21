import React, { useCallback, useMemo } from 'react';
import type { FunctionComponent } from 'react';

import { Svg } from 'components/UI/Content/Svg/Svg';

import styles from './SmallImage.module.scss';
import { ActionBadge } from 'hoc/ActionBadge/ActionBadge';

export type SmallImageProps = {
  id?: string,
  src?: string,
  selected?: boolean,
  clickable?: boolean,
  placeholder?: boolean,
  onClick?: (id: string) => void,
}

export const SmallImage: FunctionComponent<SmallImageProps> = ({
  src,
  id,
  selected = false,
  clickable = false,
  placeholder = false,
  onClick = () => {},
}) => {
  const className = useMemo(
    () => {
      const classNames = [styles.image];

      if (clickable) classNames.push(styles.clickableImage);
			if (selected) classNames.push(styles.selected);

      return classNames.join(' ');
    },
    [clickable, selected]
  );

  const handleClick = useCallback(() => {
    if (!clickable || !id) {
      return;
    }

    onClick(id);
  }, [onClick, id, clickable]);

  return (
		<ActionBadge
			iconName="check"
			visible={selected}
		>
			<div className={className} onClick={handleClick}>
				{(!placeholder && src && id)
					? (
						<img
							src={src}
							alt={id}
						/>
					)
					: (
						<Svg name="processing-image" />
					)
				}
			</div>
		</ActionBadge>
  );
};
