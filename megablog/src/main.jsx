import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import { Login, SignUp } from './components/Index.js';
import './index.css';
import AddPost from './Pages/AddPost.jsx';
import AllPosts from './Pages/AllPosts.jsx';
import EditPost from './Pages/EditPost.jsx';
import Home from './Pages/Home.jsx';
import Post from './Pages/Post.jsx';
import store from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/SignUp',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: '/all-Post',
        element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-Post',
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-Post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/Post/:slug',
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
