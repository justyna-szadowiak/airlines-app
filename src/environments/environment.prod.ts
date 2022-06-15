export interface Enviornment {
  production: boolean;
  apiURL: string;
  cookieKey: string;
  firebase: Firebase;
}

export interface Firebase {
  projectId: string;
  appId: string;
  storageBucket: string;
  apiKey: string;
  authDomain: string;
  messagingSenderId: string;
  measurementId: string;
}

export const environment: Enviornment = {
  production: true,
  apiURL: '',
  cookieKey: 'th',
  firebase:  {
    projectId: 'airlines-angular',
    appId: '1:598138869343:web:49b5ce194403ebdc33edea',
    storageBucket: 'airlines-angular.appspot.com',
    apiKey: 'AIzaSyDTcQsNqnhoPU5cCvRYY93Ya3EFsTEsIvk',
    authDomain: 'airlines-angular.firebaseapp.com',
    messagingSenderId: '598138869343',
    measurementId: 'G-R0FERVZ88T',
  }
};
