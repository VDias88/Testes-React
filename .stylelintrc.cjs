/** .stylelintrc.cjs */
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['@stylistic/stylelint-plugin', 'stylelint-order'],

  rules: {
    // ========= Estilísticas (usam prefixo @stylistic/) =========
    '@stylistic/indentation': 2,
    '@stylistic/max-empty-lines': 1,
    '@stylistic/no-eol-whitespace': true,
    '@stylistic/string-quotes': 'single',
    '@stylistic/color-hex-case': 'lower',

    // chaves
    '@stylistic/block-opening-brace-newline-before': 'always-multi-line',
    '@stylistic/block-closing-brace-newline-before': 'always-multi-line',
    '@stylistic/block-closing-brace-newline-after': 'always',

    // declarações
    '@stylistic/declaration-colon-space-after': 'always-single-line',
    '@stylistic/declaration-block-trailing-semicolon': 'always',

    // listas separadas por vírgula
    '@stylistic/function-comma-space-after': 'always-single-line',
    '@stylistic/value-list-comma-space-after': 'always-single-line',

    // números / unidades
    '@stylistic/number-leading-zero': 'always',
    '@stylistic/number-no-trailing-zeros': true,
    '@stylistic/unit-case': 'lower',

    // seletores / propriedades
    '@stylistic/property-case': 'lower',
    '@stylistic/selector-list-comma-space-after': 'always-single-line',
    '@stylistic/selector-combinator-space-before': 'always',
    '@stylistic/selector-combinator-space-after': 'always',

    // at-rules
    '@stylistic/at-rule-name-case': 'lower',
    '@stylistic/at-rule-name-space-after': 'always-single-line',
    '@stylistic/at-rule-semicolon-newline-after': 'always',

    // outras estilo
    '@stylistic/no-missing-end-of-source-newline': true,
    '@stylistic/unicode-bom': 'never',

    // ========= Qualidade (ainda são core, sem prefixo) =========
    'color-no-invalid-hex': true,
    'block-no-empty': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'declaration-block-no-duplicate-properties': true,

    // ========= Ordenação =========
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
          'opacity',
        ],
      },
    ],
  },

  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
  ],
};
