import { Heart } from 'lucide-react';

interface HeartIconProps {
  like?: boolean;
  onClick?: () => void;
  className?: string;
  size?: string;
}

const HeartIcon = ({ like = false, onClick, className = '', size = '24' }: HeartIconProps) => {
  return (
    <Heart
      strokeWidth={1}
      fill={like ? '#EC221F' : 'transparent'}
      stroke={like ? '#EC221F' : '#AAAAAA'}
      className={`cursor-pointer transition-colors ${className}`}
      onClick={onClick}
      size={size}
    />
  );
};

export default HeartIcon;
