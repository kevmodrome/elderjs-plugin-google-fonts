# elderjs-plugin-google-font-optimizer

This plugin fetches fonts from google fonts, generates font-face definitions and inlines those in the head tag.


## Usage

Simply install and add your config to `elder.config.js`. An example:

```js
'elderjs-plugin-google-font-optimizer': {
  fonts: {
    'Anton': ['400'],
    'Overpass': ['400', '700i'],
    'Inter': ['400'],
  },
  subsets: 'latin'
}
```