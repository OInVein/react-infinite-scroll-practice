import { Container } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { DemoOnScrollEvent, DemoObserver, Home } from './page';

const routes = [
  {
    path: '/scrollEvent',
    component: DemoOnScrollEvent,
  },
  {
    path: '/observer',
    component: DemoObserver,
  },
  {
    path: '/',
    component: Home,
  },
];

const App = () => {
  return (
    <Container>
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
