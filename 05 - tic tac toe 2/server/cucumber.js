export default {
  default: {
    import: ['features/steps.ts'],
    format: ['progress', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    loader: ['tsx'],
  },
};
