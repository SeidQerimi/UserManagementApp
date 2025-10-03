import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastProvider } from './components/Toast';
import { Layout } from './components/Layout';
import { LoadingSkeleton } from './components/LoadingSkeleton';

const UsersList = lazy(() =>
  import('./pages/UsersList').then((module) => ({ default: module.UsersList }))
);
const UserDetails = lazy(() =>
  import('./pages/UserDetails').then((module) => ({ default: module.UserDetails }))
);
const AddUser = lazy(() =>
  import('./pages/AddUser').then((module) => ({ default: module.AddUser }))
);
const EditUser = lazy(() =>
  import('./pages/EditUser').then((module) => ({ default: module.EditUser }))
);

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users/:id/edit" element={<EditUser />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}

export default App;
