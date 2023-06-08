import { Outlet } from '@umijs/max';
import React from 'react';

const BlankLayout: React.FC<unknown> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default BlankLayout;
