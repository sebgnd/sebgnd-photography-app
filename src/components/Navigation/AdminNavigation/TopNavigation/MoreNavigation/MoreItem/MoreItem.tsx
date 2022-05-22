import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Text } from 'components/UI/Content/Text/Text';

import styles from './MoreItem.module.css';

interface MoreItemProps {
    name: string;
    url: string;
    onClick?: () => void;
}

const MoreItem: FunctionComponent<MoreItemProps> = ({ name, url, onClick }) => {
    return (
        <Link onClick={onClick} className={styles.moreItem} to={url}>
            <Text text={name} />
        </Link>
    )
}

export default MoreItem