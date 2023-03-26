import { Container } from './components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { DemoOnScrollEvent, DemoObserver, Home } from './pages';
import './styles/index.scss';

const routes = [
  {
    path: '/scrollEvent',
    element: <DemoOnScrollEvent />,
  },
  {
    path: '/observer',
    element: <DemoObserver />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

const App = () => (
  <Container>
    <Router>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
    </Router>
  </Container>
);

export default App;
