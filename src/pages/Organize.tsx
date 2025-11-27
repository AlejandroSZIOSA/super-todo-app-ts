import { type FC } from "react";

import { useAppSelector } from "../hooks/reduxHooks";

import type { RootState } from "../store";
import List from "../components/List";

import { type Todo } from "../types/shared";

const OrganizePage: FC = () => {
  const todosRedux = useAppSelector((state: RootState) => state.todos);

  return (
    <div>
      <h1>Organize Page </h1>
      <List todos={todosRedux as Todo[]} variant="mobile-ui" />
    </div>
  );
};

export default OrganizePage;
