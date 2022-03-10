import React from "react";
import { useRoutes } from 'react-router-dom';
import Routes from "./router/routes"

const App: React.FC = (): JSX.Element => {
  let routes: any = [];
  Routes.forEach((route: any, index: number) => {
    const Ele = route.element;
    const router = {
      path: route.path,
      element: <Ele />,
    };
    routes.push(router);
  });
  const router = useRoutes([...routes]);
  return <>{router}</>;
};
export default App;