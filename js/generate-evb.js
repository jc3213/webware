const generateEvb = require('generate-evb');
const path = require('path');

const qaacVersion = process.env.QAAC_VERSION || 'unknown';

generateEvb(
  path.join('build', `qaac-win32-${qaacVersion}.evb`),
  path.join('win32', 'qaac.exe'),
  `qaac-singleton-win32-${qaacVersion}.exe`,
  'win32',
  {}
);

generateEvb(
  path.join('build', `qaac-win64-${qaacVersion}.evb`),
  path.join('win64', 'qaac.exe'),
  `qaac-singleton-win64-${qaacVersion}.exe`,
  'win64',
  {}
);
