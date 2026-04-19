import { type FC, useState } from "react";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";

import Header from "../../components/Header/Header";
import SelectorRoot from "../../components/selector/SelectorRoot";
import SelectRootModal from "../../components/mobile-ui/SelectModal/SelectRootModal";
import { useAppSelector } from "../../hooks/reduxHooks";

import { type RootState } from "../../store";
import { translations } from "../../data/translations";

import styles from "./Settings.module.css";

import { appVersion } from "../../utils/constants";
import { deleteAllTasksDb } from "../../services/db/crudsDB";

const SettingsPage: FC = () => {
  const [isLockOn, setIsLockOn] = useState(true); //TODO: add lock me before feature, this is to manage the lock state, if the user click on the lock button, the lock state will be on, otherwise it will be off, this is to manage the lock style in the delete all events section.
  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); //It is working perfectly

  //translations  en - swe as context param, this change the current language state
  const { language } = useAppSelector((state: RootState) => state.settings);

  const TRANSLATION = translations[language];
  const { settingsPage_T, daysRemainingFig_T } = TRANSLATION;

  const handleDeleteAll = async () => {
    try {
      await deleteAllTasksDb();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return;
    }
  };

  //Note: Using compound components pattern :)
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
              <SelectRootModal.Item value="en">
                {settingsPage_T ? settingsPage_T.english : "English"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="sv">
                {settingsPage_T ? settingsPage_T.swedish : "Swedish"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="es">
                {settingsPage_T ? settingsPage_T.spanish : "Spanish"}
              </SelectRootModal.Item>
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
              <SelectRootModal.Item value="2">
                2 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="3">
                3 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="4">
                4 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="6">
                6 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="9">
                9 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectRootModal.Item>
              <SelectRootModal.Item value="14">
                14 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectRootModal.Item>
            </SelectRootModal>
          ) : (
            <SelectorRoot selectorIdentifier="daysCountdown">
              <SelectorRoot.Item value={2}>
                2 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectorRoot.Item>
              <SelectorRoot.Item value={3}>
                3 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectorRoot.Item>
              <SelectorRoot.Item value={4}>
                4 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectorRoot.Item>
              <SelectorRoot.Item value={6}>
                6 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectorRoot.Item>
              <SelectorRoot.Item value={9}>
                9 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectorRoot.Item>
              <SelectorRoot.Item value={14}>
                14 {daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}
              </SelectorRoot.Item>
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
              : "Delete all Tasks ?"}
          </h3>
          <div className={styles.btnsDeleteContainer}>
            <button onClick={() => setIsLockOn(!isLockOn)}>
              {isLockOn
                ? settingsPage_T
                  ? settingsPage_T.unlock
                  : "Unlock"
                : settingsPage_T
                  ? settingsPage_T.lock
                  : "Lock"}
            </button>
            <button onClick={handleDeleteAll} disabled={isLockOn}>
              {settingsPage_T ? settingsPage_T.delete : "Delete"}
            </button>
          </div>
        </section>
        <p className={styles.appVersionText}>App version: {appVersion} </p>
      </main>
    </>
  );
};

export default SettingsPage;
