import React from 'react';
import AutoSanoat from '../AutoSanoat';
import Contact from '../Contact';

// Lazy load components for performance
const Home = React.lazy(() => import('../Home'));
const SignIn = React.lazy(() => import('../pages/SignInPage/SignInPage'));
const SignUp = React.lazy(() => import('../pages/SignUpPage/SignUpPage'));

export const navbar = [
  {
    id: '1',
    path: 'home',
    title: 'Home',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Home />
      </React.Suspense>
    ),
    isPrivate: false,
    isHidden: true,
  },
  {
    id: '2',
    path: 'signin',
    title: 'Sign In',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SignIn />
      </React.Suspense>
    ),
    isPrivate: true,
    isHidden: true,
  },
  {
    id: '3',
    path: 'signup',
    title: 'Sign Up',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </React.Suspense>
    ),
    isPrivate: true,
    isHidden: true,
  },
  {
    id: '4',
    path: "automobilSanoat",
    title: "Auto Industry",
    element: (
      <React.Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
        <AutoSanoat/>
      </React.Suspense>
    ),
    isPrivate: false,
    isHidden: true,
  },
  {
    id: '5',
    path: "contact",
    title: "Contact us",
    element: (
      <React.Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
        <Contact/>
      </React.Suspense>
    ),
    isPrivate: false,
    isHidden: false ,
  },
  // {
  //   id: '6',
  //   path: "/signup",
  //   title: "Ro'yxatdan o'tish",
  //   element: (
  //     <React.Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
  //       <Contact/>
  //     </React.Suspense>
  //   ),
  //   isPrivate: false,
  //   isHidden: true,
  // },
];
