import { type FC, useState, useEffect } from "react";
import SelectorLanguages from "../components/SelectorLanguages";
import Header from "../components/Header/Header";
import { saveDaysRemainingCounter } from "../utils/localstorage/localstorage";
import { loadDaysRemainingCounter } from "../utils/localstorage/localstorage";

const SettingsPage: FC = () => {
  const [counterWarning, setCounterWarning] = useState(
    loadDaysRemainingCounter
  );

  useEffect(() => {
    saveDaysRemainingCounter(counterWarning);
  }, [counterWarning]);

  return (
    <>
      <Header>
        <h2>Settings</h2>
      </Header>
      <main>
        <section>
          <h3>Language</h3>
          <SelectorLanguages />
        </section>
        <section>
          <label>remain days warning</label>
          <input
            type="number"
            value={counterWarning}
            onChange={(e) => setCounterWarning(Number(e.target.value))}
          ></input>
        </section>
      </main>
    </>
  );
};

export default SettingsPage;
