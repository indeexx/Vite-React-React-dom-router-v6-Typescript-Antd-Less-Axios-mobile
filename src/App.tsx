import React, { ReactNode, Suspense } from "react";
import { useRoutes } from 'react-router-dom';
import Routes from "./router/routes"

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<h1>一个特别好看的Loading...</h1>}>
    {children}
  </Suspense>
}

const App: React.FC = (): JSX.Element => {
  let routes: any = [];
  Routes.forEach((route: any, index: number) => {
    const Ele = route.element;
    const router = {
      path: route.path,
      element: lazyLoad(<Ele />),
    };
    routes.push(router);
  });
  const router = useRoutes([...routes]);
  return <>{router}</>;
};
export default App;
