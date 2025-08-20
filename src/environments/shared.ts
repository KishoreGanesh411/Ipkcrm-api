const sharedEnvironment = {
  baseTimeZone: 'Asia/Kolkata',
  port: 3333,
  fbBaseUrl: 'https://graph.facebook.com/',
  /* cspell:disable-next-line */
  googleClientId: '',
  textLocalSmsBaseUrl: 'https://api.textlocal.in/',
  textLocalSendSmsBaseUrl: 'https://api.textlocal.in/send/',
  textLocalApiKey: '',
  /* cspell:disable-next-line */
  firebaseBucketName: '',
  sibApiKey: '',
  currency: 'INR',
  mobileCode: '+',
  firebaseUrl: 'https://easeapp.firebaseio.com',
  localCSVFilePath: 'CSV-Products',
  remoteCSVFilePath: 'CsvProducts',
  emailPattern: '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/',
  signInProvider: {
    phone: 'phone',
    anonymous: 'anonymous',
  },
  timezone: 'Asia/Kolkata',
};

export { sharedEnvironment };
