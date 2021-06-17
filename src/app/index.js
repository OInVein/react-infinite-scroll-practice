/* eslint-disable react/display-name */
import { Container } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { DemoOnScrollEvent, DemoObserver, Home } from './page';

const renderComponentWithProps = (props, Component) => {
  const { REACT_APP_API_KEY } = process.env;
  return <Component apiKey={REACT_APP_API_KEY} {...props} />;
};

const routes = [
  {
    path: '/scrollEvent',
    render: (routeProps) => renderComponentWithProps(routeProps, DemoOnScrollEvent),
  },
  {
    path: '/observer',
    render: (routeProps) => renderComponentWithProps(routeProps, DemoObserver),
  },
  {
    path: '/',
    component: Home,
  },
];

const App = () => {
  const env = process.env;
  return (
    <Container>
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} env={env} />
          ))}
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
