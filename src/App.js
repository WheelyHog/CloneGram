import './App.css';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import PageRoutes from './components/PageRoutes/PageRoutes';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <PageRoutes />
      <ToastContainer position='top-center' />
    </Provider >
  );
}

export default App;
