//Record Record<K, V>
interface TranslationTypes {
  en: {
    cardViewT: Record<string, string>;
  };

  sv: {
    cardViewT: Record<string, string>;
  };
}

export const translations: TranslationTypes = {
  en: {
    cardViewT: {
      title: "Welcome",
      removeBtn: "Remove",
      completeBtn: "Done",
      unCompleteBtn: "Undone",
    },
  },
  sv: {
    cardViewT: {
      title: "Välkommen",
      removeBtn: "Skicka",
      completeBtn: "Klart",
      unCompleteBtn: "Inte klart",
    },
  },
};
