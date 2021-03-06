import React from 'react';
import { Icon } from '@alifd/next';
import { IconProps } from '@alifd/next/types/icon';

const CustomIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2479571_vpkbg3segs.js',
});

const _Icon: React.FC<IconProps> = (props) => {
  return (
    <CustomIcon {...props} />
  );
};

export default _Icon;
