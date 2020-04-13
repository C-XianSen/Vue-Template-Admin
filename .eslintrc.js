module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended', '@vue/standard'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        'comma-dangle': 'off',
        'space-before-function-paren': 'off',
        'no-return-assign': 'off',
        'template-curly-spacing': 'off'
    },
}
