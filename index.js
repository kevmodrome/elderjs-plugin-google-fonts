const GetGoogleFonts = require('get-google-fonts');
const fs = require('fs')
const path = require('path');
const util = require('util');

const plugin = {
  name: 'elderjs-plugin-google-font-optimizer',
  description: `A plugin that downloads optimized font files from Google Fonts, adds font-fize definitions for them as well as sets up CSS custom properties for good fallback alternatives.`,
  init: (plugin) => {
    const { fonts, subsets, swap, prefix } = plugin.config
    const { distDir } = plugin.settings

    plugin.url = GetGoogleFonts.constructUrl({
      ...fonts,
    },
      subsets
    )
    plugin.url += swap ? '&display=swap' : '';

    plugin.options = {
      outputDir: prefix ? `${distDir}${prefix}` : `${distDir}/`,
      path: prefix ? prefix : '/',
      cssFile: 'auto-generated-fonts.css',
      template: '{filename}.{ext}',
      overwriting: true
    }

    return plugin;
  },
  hooks: [
    {
      hook: 'bootstrap',
      name: 'downloads fonts, injects font-face definitions.',
      description: `A description of what this hook does.`,
      priority: 50,
      run: async ({ plugin }) => {
        const { settings, options, url } = plugin

        const ggf = new GetGoogleFonts(options)

        await ggf.download(url)

        const readFile = util.promisify(fs.readFile);

        const rawData = await readFile(settings.distDir + '/auto-generated-fonts.css')
        const cssContent = rawData.toString('utf8')


        plugin.fonts = cssContent

        return {
          plugin,
        };
      }
    },
    {
      hook: 'stacks',
      name: 'inlineCSSDefinitions',
      description: 'Adds font-face definitions to the head tag style.',
      priority: 100,

      run: async ({ cssStack, plugin }) => {
        if (plugin.config.inlineDefinitions) {
          const { fonts } = plugin

          cssStack.push({
            source: 'hooksjs',
            string: fonts,
            priority: 100,
          })

        }

        return {
          cssStack,
        };
      },
    }
  ],
  config: { // here is where you set the default configs for your plugin. These are merged with the configs found in the user's elder.config.js file.
    inlineDefinitions: true,
  },
};

module.exports = plugin;
