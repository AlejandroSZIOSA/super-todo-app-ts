import { type FC } from "react";

import { useAppSelector } from "../hooks/reduxHooks";

const OrganizePage: FC = () => {
  // const todosRedux = useSelector((state: RootState) => state.todos);

  const counter = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Organize Page {counter}</h1>
    </div>
  );
};

export default OrganizePage;
