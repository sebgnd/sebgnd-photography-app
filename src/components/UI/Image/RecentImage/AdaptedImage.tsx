import styled, { css } from 'styled-components';
import { ImageFade } from 'components/UI/Image';

export const AdaptedImage = styled(ImageFade)<{ type: string }>`
    ${ props => props.type === 'landscape' && css`
        width: 100%;
        height: auto;
    `}
    ${ props => (props.type === 'portrait' || props.type !== 'landscape') && css`
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: auto;
        margin-right: auto;
        transform: translateX(-50%) translateY(-50%);
    ` }
`;
