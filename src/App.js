import './App.css';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import PageRoutes from './components/PageRoutes/PageRoutes';

function App() {
  return (
    <Provider store={store}>
      <PageRoutes />
    </Provider >
  );
}

export default App;
