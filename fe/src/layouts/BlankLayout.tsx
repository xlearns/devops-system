import { Outlet } from '@umijs/max';
import React from 'react';

const BlankLayout: React.FC<unknown> = () => {
  return (
    // <Layout style={{ minHeight: '100vh' }}>
    //   <Layout.Header>Header</Layout.Header>
    //   <Layout.Content
    //     style={{ padding: '0 50px', marginTop: 64, overflow: 'auto' }}
    //   >
    //     <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
    //     </div>
    //   </Layout.Content>
    //   <Layout.Footer style={{ textAlign: 'center' }}>Footer</Layout.Footer>
    // </Layout>
    <>
      <Outlet />
    </>
  );
};

export default BlankLayout;
