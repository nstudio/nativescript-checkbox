module.exports = {
  packages: {
    '@nativescript/angular': {
      entryPoints: {
        '.': {
          override: {
            main: './index.js',
            typings: './index.d.ts',
          },
          ignoreMissingDependencies: true,
        },
      },
      ignorableDeepImportMatchers: [
        /zone.js\//,
        /tns-core-modules\//,
        /@nativescript\/core\//,
      ],
    },
    '@nstudio/nativescript-checkbox': {
      entryPoints: {
        angular: {
          override: {
            main: './index.js',
            typings: './index.d.ts',
          },
          ignoreMissingDependencies: true,
        },
      },
      ignorableDeepImportMatchers: [
        /tns-core-modules\//,
        /@nativescript\/core\//,
        /@nativescript\/angular\//,
        /nativescript-angular\//,
        /nativescript-angular\/forms\//,
        /@angular\/core\//,
        /@angular\/forms\//,
      ],
    },
  },
};
