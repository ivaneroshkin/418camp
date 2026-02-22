import type { IConfiguration } from '@cucumber/cucumber';

const config: IConfiguration = {
  default: {
    requireModule: ['tsx'],
    import: ['features/**/*.ts'],
    format: ['progress', 'html:cucumber-report.html'],
    publishQuiet: true,
  },
};

export default config;
