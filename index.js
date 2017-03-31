const os = require('os');
const chalk = require('chalk');
const mdns = require('mdns');
const readPkgUp = require('read-pkg-up').sync;

const pkg = readPkgUp({ normalize: false }).pkg;
const pluginName = 'Browsersync mDNS';

module.exports = {
  'plugin:name': pluginName,
  plugin: function(options, browserSync) {
    const displayName = options.name || pkg.name || os.hostname() ;

    mdns.createAdvertisement(mdns.tcp('http'), browserSync.options.get('port'), {
      name: displayName
    });

    browserSync.logger.info(
      '[' + chalk.blue('mDNS') + ']',
      'Advertising',
      chalk.cyan(displayName)
    );
  }
};
