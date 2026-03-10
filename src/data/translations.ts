//Record Record<K, V>
interface TranslationTypes {
  /* en: {
    cardView_T: Record<string, string>;
  }; */

  sv: {
    homePage_T: Record<string, string>;
    cardView_T: Record<string, string>;
  };

  es: {
    homePage_T: Record<string, string>;
    cardView_T: Record<string, string>;
  };
}

export const translations: TranslationTypes = {
  /*   en: {
    cardView_T: {
      title: "Welcome",
      removeBtn: "Remove",
      completeBtn: "Done",
      unCompleteBtn: "Undone",
    },
  }, */

  sv: {
    homePage_T: {
      appTitle: "Uppgifts Påminnare",
      addBtn: "Lägg till",
      subHeaderTitle: "Dina uppgifter",
    },

    cardView_T: {
      title: "Välkommen",
      removeBtn: "Radera",
      completeBtn: "Klart",
      unCompleteBtn: "Inte klart",
    },
  },
  es: {
    homePage_T: {
      appTitle: "Agenda",
      addBtn: "Agregar Tarea",
      subHeaderTitle: "Tus tareas",
    },

    cardView_T: {
      title: "Bienvenido",
      removeBtn: "Eliminar",
      completeBtn: "Hecho",
      unCompleteBtn: "incompleto",
    },
  },
};
