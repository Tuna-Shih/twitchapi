module.exports = {
  '*.js': ['yarn prettier --write', 'yarn lint'],
  '**/!(README).md': ['yarn prettier --write --parser markdown'],
  '**/README.md': ['badges', 'yarn prettier --write --parser markdown'],
  '**/package.json': [
    'yarn prettier-package-json --write',
    'yarn prettier --write --parser json',
  ],
};
