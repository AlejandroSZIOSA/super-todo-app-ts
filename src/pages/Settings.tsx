import { type FC } from "react";
import Header from "../components/Header/Header";
import SelectorRoot from "../components/selector/SelectorRoot";

const SettingsPage: FC = () => {
  return (
    <>
      <Header>
        <h2>Settings</h2>
      </Header>
      <main>
        <section className="settingsPage__sections">
          <h3>Language</h3>
          <SelectorRoot variant="Language">
            <SelectorRoot.Item value="en">English</SelectorRoot.Item>
            <SelectorRoot.Item value="sv">Svenska</SelectorRoot.Item>
            <SelectorRoot.Item value="es">Spanish</SelectorRoot.Item>
          </SelectorRoot>
        </section>
        <section className="settingsPage__sections">
          <h3>remain days warning</h3>
          <SelectorRoot variant="RemainDaysBeforeWarning">
            <SelectorRoot.Item value={3}>Three</SelectorRoot.Item>
            <SelectorRoot.Item value={6}>Six</SelectorRoot.Item>
            <SelectorRoot.Item value={9}>Nine</SelectorRoot.Item>
          </SelectorRoot>
        </section>
      </main>
    </>
  );
};

export default SettingsPage;
