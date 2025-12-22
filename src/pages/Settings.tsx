import { type FC } from "react";
import SelectorLanguages from "../components/SelectorLanguages";

const SettingsPage: FC = () => {
  return (
    <div>
      <h1>Set Language</h1>
      <SelectorLanguages />
    </div>
  );
};

export default SettingsPage;
