process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.code === 'DEP0040') {
    console.warn('DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.');
  } else {
    console.warn(warning);
  }
});
