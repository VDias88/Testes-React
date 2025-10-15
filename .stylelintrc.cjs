module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],

  plugins: [
    '@stylistic/stylelint-plugin',
    'stylelint-order'
  ],

  rules: {
    /*
     * Regras estilísticas modernas (prefixadas com @stylistic/)
     */
    '@stylistic/indentation': 2,
    '@stylistic/max-empty-lines': 1,
    '@stylistic/no-eol-whitespace': true,
    '@stylistic/string-quotes': 'single',
    '@stylistic/color-hex-case': 'lower',
    '@stylistic/declaration-colon-space-after': 'always-single-line',
    '@stylistic/block-opening-brace-space-before': 'always',

    /*
     * Regras de qualidade
     */
    'color-no-invalid-hex': true,
    'block-no-empty': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'declaration-block-no-duplicate-properties': true,

    /*
     * Ordenação de propriedades
     */
    'order/properties-order': [
      {
        properties: [
          'content',
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
          'display',
          'flex',
          'flex-direction',
          'align-items',
          'justify-content',
          'width',
          'height',
          'min-width',
          'min-height',
          'margin',
          'padding',
          'background',
          'background-color',
          'color',
          'font',
          'font-size',
          'font-weight',
          'text-align',
          'border',
          'border-radius',
          'box-shadow',
          'overflow',
          'opacity'
        ]
      }
    ]
  },

  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**'
  ]
};
