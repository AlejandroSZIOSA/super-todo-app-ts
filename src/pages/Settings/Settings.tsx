import { type FC, useState } from "react";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";

import Header from "../../components/Header/Header";
import SelectorRoot from "../../components/selector/SelectorRoot";
import SelectRootModal from "../../components/mobile-ui/SelectModal/SelectRootModal";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { handleDeleteAllTodos } from "../../utils/crudsREDUX";

import { type RootState } from "../../store";
import { translations } from "../../data/translations";

import styles from "./Settings.module.css";

const SettingsPage: FC = () => {
  const [isLockOn, setIsLockOn] = useState(true); //TODO: add lock me before feature, this is to manage the lock state, if the user click on the lock button, the lock state will be on, otherwise it will be off, this is to manage the lock style in the delete all events section.
  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); //It is working perfectly
  const dispatch = useAppDispatch();

  //translations  en - swe as context param, this change the current language state
  const settings = useAppSelector((state: RootState) => state.settings);

  const TRANSLATION = translations[settings.language];
  const { settingsPage_T } = TRANSLATION;

  return (
    <>
      <Header>
        <h2>{settingsPage_T ? settingsPage_T.settings : "Settings"}</h2>
      </Header>
      <main className={styles.settingsPageMainContainer}>
        <section className={styles.settingsPageSections}>
          <h3>{settingsPage_T ? settingsPage_T.language : "Language"} </h3>
          {isMobile ? (
            <SelectRootModal selectorKey="language">
              <SelectRootModal.Item value="en">English</SelectRootModal.Item>
              <SelectRootModal.Item value="sv">Swedish</SelectRootModal.Item>
              <SelectRootModal.Item value="es">Spanish</SelectRootModal.Item>
            </SelectRootModal>
          ) : (
            <SelectorRoot selectorIdentifier="language">
              <SelectorRoot.Item value="en">English</SelectorRoot.Item>
              <SelectorRoot.Item value="sv">Swedish</SelectorRoot.Item>
              <SelectorRoot.Item value="es">Spanish</SelectorRoot.Item>
            </SelectorRoot>
          )}
        </section>
        <section className={styles.settingsPageSections}>
          <h3>
            {settingsPage_T ? settingsPage_T.warnMeFrom : "Warn me from?"}
          </h3>

          {isMobile ? (
            <SelectRootModal selectorKey="daysCountdown">
              <SelectRootModal.Item value="2">2 Days</SelectRootModal.Item>
              <SelectRootModal.Item value="3">3 Days</SelectRootModal.Item>
              <SelectRootModal.Item value="6">6 Days</SelectRootModal.Item>
              <SelectRootModal.Item value="9">9 Days</SelectRootModal.Item>
            </SelectRootModal>
          ) : (
            <SelectorRoot selectorIdentifier="daysCountdown">
              <SelectorRoot.Item value={3}>Three</SelectorRoot.Item>
              <SelectorRoot.Item value={6}>Six</SelectorRoot.Item>
              <SelectorRoot.Item value={9}>Nine</SelectorRoot.Item>
            </SelectorRoot>
          )}
        </section>
        <section className={styles.settingsPageSections}>
          <h3>
            {settingsPage_T ? settingsPage_T.selectTheme : "Select theme"}{" "}
          </h3>
          {isMobile ? (
            <SelectRootModal selectorKey="theme">
              <SelectRootModal.Item value="default" />
              {/*<SelectRootModal.Item value="ocean" />*/}
            </SelectRootModal>
          ) : (
            <SelectorRoot selectorIdentifier="theme">
              <SelectorRoot.Item value="default">Default</SelectorRoot.Item>
              {/*<SelectorRoot.Item value="ocean">Ocean</SelectorRoot.Item>*/}
            </SelectorRoot>
          )}
        </section>

        <section className={styles.settingsPageSections}>
          <h3>
            {settingsPage_T
              ? settingsPage_T.deleteAllTasks
              : "Delete all Tasks"}
          </h3>
          <div className={styles.btnContainer}>
            <button onClick={() => setIsLockOn(!isLockOn)}>
              {isLockOn
                ? settingsPage_T
                  ? settingsPage_T.unlock
                  : "Unlock"
                : settingsPage_T
                  ? settingsPage_T.lock
                  : "Lock"}
            </button>
            <button
              onClick={() => handleDeleteAllTodos(dispatch)}
              disabled={isLockOn}
            >
              {settingsPage_T ? settingsPage_T.delete : "Delete"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default SettingsPage;
