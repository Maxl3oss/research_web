import { FC } from 'react';
import * as icons from 'lucide-react';
interface IconProps {
  name: keyof typeof icons;
  color?: string;
  className?: string;
  size?: string;
};

const Lucide: FC<IconProps> = ({ name, className, color, size }) => {
  const LucideIcon = icons[name] as icons.LucideIcon

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon className={className} color={color} size={size} />;
};

export default Lucide;
