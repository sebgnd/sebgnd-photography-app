import React from 'react';

export const ProcessingImage = (
  <g>
    <rect width="80" height="80" fill="#EAEAEA"/>
    <rect width="80" height="80" fill="#EAEAEA"/>
    <path d="M28 18L0 55V80H79.748L28 18Z" fill="#CBCBCB" stroke="#CBCBCB"/>
    <path d="M59.5 43C51.6667 55 35.8 79.2 35 80H80V66.5L59.5 43Z" fill="#999999" stroke="#999999"/>
  </g>
);

export const icons = {
  'processing-image': ProcessingImage,
};

export type IconName = keyof typeof icons;
