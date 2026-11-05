// src/components/Lanyard.d.ts
import { CSSProperties, ReactElement } from 'react';

export interface LanyardProps {
  frontImage?: string;
  backImage?: string;
  imageFit?: 'cover' | 'contain';
  cardColor?: string;
  orientation?: 'portrait' | 'landscape';
  finish?: 'glossy' | 'matte' | 'holographic' | 'metallic';
  cornerRadius?: number;
  size?: number;
  anchor?: 'center' | 'left' | 'right' | number;
  strapLength?: number;
  strapImage?: string;
  strapColor?: string;
  strapWidth?: number;
  metal?: 'silver' | 'gold' | 'graphite' | 'bronze';
  gravity?: number;
  damping?: number;
  elasticity?: number;
  breeze?: number;
  interactive?: boolean;
  intro?: boolean | 'drop' | string;
  pointerEventsAuto?: boolean;
  onPullTrigger?: () => void;
  onPullProgress?: (deltaY: number) => void;
  className?: string;
  style?: CSSProperties;
}

declare function Lanyard(props: LanyardProps): ReactElement;
export default Lanyard;

