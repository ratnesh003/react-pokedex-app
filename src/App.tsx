import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About, Home, Item, Pokemon } from '@/pages/Index/index';
import Layout from './Layout';

function App() {
  const router = createBrowserRouter([
    {
      id: 'default',
      path: '/',
      element: <Layout />,
      children: [
        {
          id: 'home',
          path: '',
          element: <Home />,
        },
        {
          id: 'about',
          path: '/about',
          element: <About />,
        },
        {
          id: 'pokemon',
          path: '/pokemon',
          element: <Pokemon />,
        },
        {
          id: 'item',
          path: '/item',
          element: <Item />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
