import { useEffect, type FC } from "react";

import { useSelector } from "react-redux";

import { type RootState } from "../store/redux/store";

const OrganizePage: FC = () => {
  const todosRedux = useSelector((state: RootState) => state.todos); // Use RootState for type safety

  useEffect(() => {
    console.log(todosRedux);
  }, [todosRedux]);

  return (
    <div>
      <h1>Organize Page</h1>
    </div>
  );
};

export default OrganizePage;
