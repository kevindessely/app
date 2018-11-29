import * as React from 'react';
import { Svg, Path, Polygon, G } from 'react-native-svg';

import { IconSize } from './types';

interface RestartProps extends IconSize {
  fill?: string;
}

export const Restart: React.SFC<RestartProps> = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox="0 0 24 27">
    <G
      id="Symbols"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <G
        id="icons/chat/restart-white"
        transform="translate(-8.000000, -6.000000)"
      >
        <G id="Page-1">
          <Polygon id="Fill-1" points="0 40 40 40 40 0 0 0" />
          <G
            id="Group-6"
            transform="translate(7.500000, 6.000000)"
            fill={fill}
            fill-rule="nonzero"
          >
            <Path
              d="M1.8280721,10.6908433 C1.23057544,12.1225983 0.919042308,13.6664894 0.919042308,15.2549931 C0.919042308,21.7327432 6.10216876,26.9860966 12.4997346,26.9860966 C18.8974567,26.9860966 24.0813115,21.7325843 24.0813115,15.2549931 C24.0813115,8.77815371 18.8973136,3.52478621 12.4997346,3.52478621 L11.9997346,3.52478621 L11.9997346,4.52478621 L12.4997346,4.52478621 C18.3420315,4.52478621 23.0813115,9.32748483 23.0813115,15.2549931 C23.0813115,21.1832654 18.3421621,25.9860966 12.4997346,25.9860966 C6.65748845,25.9860966 1.91904231,21.1834485 1.91904231,15.2549931 C1.91904231,13.7991943 2.20417077,12.3861591 2.75093559,11.0759705 L2.94349921,10.6145388 L2.02063572,10.2294115 L1.8280721,10.6908433 Z"
              id="Stroke-2"
            />
            <Polygon
              id="Stroke-4"
              points="15.3428178 1.48325459 14.6309884 0.780902199 11.4306733 4.02440001 14.6311134 7.26687794 15.3428187 6.56439973 12.8356267 4.02427585"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
