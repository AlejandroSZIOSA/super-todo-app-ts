import { type FC, useState } from "react";
import Header from "../../components/Header/Header";
import SelectorRoot from "../../components/selector/SelectorRoot";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { handleDeleteAllTodos } from "../../utils/crudsREDUX";

const SettingsPage: FC = () => {
  const [isLockOn, setIsLockOn] = useState(true); //TODO: add lock me before feature, this is to manage the lock state, if the user click on the lock button, the lock state will be on, otherwise it will be off, this is to manage the lock style in the delete all events section.

  const dispatch = useAppDispatch();

  return (
    <>
      <Header>
        <h2>Settings</h2>
      </Header>
      <main className="settingsPage__main">
        <section className="settingsPage__sections">
          <h3>Language</h3>
          <SelectorRoot selectorIdentifier="language">
            <SelectorRoot.Item value="en">English</SelectorRoot.Item>
            <SelectorRoot.Item value="sv">Swedish</SelectorRoot.Item>
            <SelectorRoot.Item value="es">Spanish</SelectorRoot.Item>
          </SelectorRoot>
        </section>
        <section className="settingsPage__sections">
          <h3>Remaining days warning</h3>
          <SelectorRoot selectorIdentifier="daysCountdown">
            <SelectorRoot.Item value={3}>Three</SelectorRoot.Item>
            <SelectorRoot.Item value={6}>Six</SelectorRoot.Item>
            <SelectorRoot.Item value={9}>Nine</SelectorRoot.Item>
          </SelectorRoot>
        </section>
        <section className="settingsPage__sections">
          <h3>Select theme</h3>
          <SelectorRoot selectorIdentifier="theme">
            <SelectorRoot.Item value="default">Default</SelectorRoot.Item>
            <SelectorRoot.Item value="ocean">Ocean</SelectorRoot.Item>
          </SelectorRoot>
        </section>

        <section className="settingsPage__sections">
          <h3>Delete all events</h3>
          <div>
            <button onClick={() => setIsLockOn(!isLockOn)}>lock</button>
            <button
              onClick={() => handleDeleteAllTodos(dispatch)}
              disabled={isLockOn}
            >
              Delete
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default SettingsPage;
