import { type FC } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from './routes';

import Admin from '@/pages/admin';
import Layout from '@/components/layout';

const App: FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path={ROUTES.ADMIN} element={<Admin />} />
        <Route path="*" element={<Navigate to={ROUTES.ADMIN} replace/>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
