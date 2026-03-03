//Record Record<K, V>
interface TranslationTypes {
  en: {
    cardView_T: Record<string, string>;
  };

  sv: {
    cardView_T: Record<string, string>;
  };

  es: {
    cardView_T: Record<string, string>;
  };
}

export const translations: TranslationTypes = {
  en: {
    cardView_T: {
      title: "Welcome",
      removeBtn: "Remove",
      completeBtn: "Done",
      unCompleteBtn: "Undone",
    },
  },
  sv: {
    cardView_T: {
      title: "Välkommen",
      removeBtn: "Radera",
      completeBtn: "Klart",
      unCompleteBtn: "Inte klart",
    },
  },
  es: {
    cardView_T: {
      title: "Bienvenido",
      removeBtn: "Eliminar",
      completeBtn: "Hecho",
      unCompleteBtn: "incompleto",
    },
  },
};
