import React, { FC } from 'react';
import * as icons from 'lucide-react';

type IconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: string;
};

const Lucide: FC<IconProps> = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Lucide icon "${name}" does not exist.`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Lucide;
