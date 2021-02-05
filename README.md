# elderjs-plugin-google-fonts

This plugin fetches fonts from google fonts, generates font-face definitions and inlines those in the head tag.


## Usage

Simply install and add your config to `elder.config.js`. An example:

```js
'elderjs-plugin-google-fonts': {
  fonts: {
    'Anton': ['400'],
    'Overpass': ['400', '700i'],
    'Inter': ['400'],
  },
  subsets: ['latin'],
}
```

## Config

| Name          | Descriptions           | Default  |
| ------------- |:-----------------------| --------:|
| `fonts`       | Objects of fonts (key) to be downloaded in specified weights (value, Array) | required |
| `subsets`     | DEPRECATED: Array of subsets to be downloaded | `[]` |
| `swap`        | Adds `font-display: swap` CSS property. Recommended by Pagespeed Insights. | `false` |
| `prefix`      | Optional folder name where the files be saved to. Useful if you have a server prefix set in your Elder config. | `'/'` |
