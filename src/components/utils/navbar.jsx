import React from 'react';
import AutoSanoat from "../AutoSanoat";

const navbar = [
  {
    id: 1,
    title: 'BoshSahifa',
    path: '/bosh-sahifa',
    isPrivate: true,
    element: <div>Bosh Sahifa</div>, // Element for Bosh Sahifa
    role: ["admin"],
  },
  {
    id: 2,
    title: 'Sanoat',
    path: '/sanoat',
    isPrivate: true,
    element: <AutoSanoat />, // Element for Sanoat (AutoSanoat component)
    role: ["admin"],
    children: [
      {
        id: '2-1',
        title: 'Automobil Sanoati',
        path: 'automobil-sanoati', // Child path under /sanoat
        isPrivate: true,
        element: <div>Automobil Sanoati</div>,
        role: ["admin"],
      },
      {
        id: '2-2',
        title: 'Atmosfera havosini kuzatish tizimlari',
        path: 'atmosfera', // Child path under /sanoat
        isPrivate: true,
        element: <div>Atmosfera havosi</div>,
        role: ["admin"],
      },
      // Add more child routes here as needed
    ]
  },
  {
    id: 3,
    title: 'Aloqa',
    path: '/aloqa',
    isPrivate: true,
    element: <div>Aloqa</div>, // Element for Aloqa
    role: ["admin"],
  },
];

export default navbar;
