import React from "react";
import { Router } from "react-router-dom";

export const CustomRouter = React.memo((props:any) => {
  const { history, ...restProps } = props;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...restProps}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
});
