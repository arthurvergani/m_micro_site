import { useEffect } from 'react';
import {
  useRive,
  useViewModelInstanceColor,
} from '@rive-app/react-canvas';
import riveFile from '../assets/rive/meister_logo.riv';

const STATE_MACHINE = 'State Machine 1';

// Convert hex string to Rive's 0xAARRGGBB packed integer
function hexToRiveColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // eslint-disable-next-line no-bitwise
  return ((0xff << 24) | (r << 16) | (g << 8) | b) >>> 0;
}

const RIVE_RED = hexToRiveColor('#FF3C2B');

export default function RiveLogo() {
  const { rive, RiveComponent } = useRive(
    {
      src: riveFile,
      stateMachines: STATE_MACHINE,
      autoplay: true,
      autoBind: true,
    },
    { fitCanvasToArtboardHeight: true }
  );

  const { setValue } = useViewModelInstanceColor('colour', rive?.viewModelInstance);

  // Set colour to our red (#FF3C2B) once the setter is available
  useEffect(() => {
    if (setValue) {
      setValue(RIVE_RED);
    }
  }, [setValue]);

  return <RiveComponent className="logo" />;
}
