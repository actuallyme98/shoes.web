import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageError from './components/PageError';
import { SnackbarProvider } from 'notistack';

// pages
import Home from './pages/home';
import Login from './pages/login';
import Product from './pages/product';

// themes
import theme from './themes/dark-theme';

const routes: RouteConfig[] = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: Login,
    path: '/login',
    exact: true,
  },
  {
    component: Product,
    path: '/products/:tab?',
    exact: true,
  },
  {
    component: () => <PageError code={404} description="Trang không tồn tại" />,
  },
];
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>{renderRoutes(routes)}</SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;