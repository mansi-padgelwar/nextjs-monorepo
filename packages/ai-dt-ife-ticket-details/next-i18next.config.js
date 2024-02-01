const i18Config = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
      locales: ['en', 'es', 'hi'],
      defaultLocale: 'en',
    },
  };

export const { i18n } = i18Config;
