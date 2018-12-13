import React, { Suspense, lazy } from "react";
const PageComponent = lazy(() => import("./index"));

export const Loadable = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageComponent {...props} />
  </Suspense>
);
export default Loadable;
