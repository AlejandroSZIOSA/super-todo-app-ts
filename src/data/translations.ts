//Record Record<K, V>
//english language is the default thats why is null
interface TranslationTypes {
  en: {
    homePage_T: null;
    cardView_T: null;
  };

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
  en: {
    homePage_T: null,
    cardView_T: null,
  },

  sv: {
    homePage_T: {
      appTitle: "Uppgifts Påminnare",
      addBtn: "Lägg till",
      subHeaderTitle: "Dina uppgifter",
    },

    cardView_T: {
      priority: "Prioritet",
      done: "Klart",
      notDone: "Inte klart",

      changeStatusBtn: "Byt status",

      daysRemaining: "Dagar kvar",
      deadline: "Sista datum",

      removeBtn: "Ta bort",
    },
  },
  es: {
    homePage_T: {
      appTitle: "Agenda",
      addBtn: "Agregar Tarea",
      subHeaderTitle: "Tus tareas",
    },

    cardView_T: {
      priority: "Prioridad",
      done: "Hecho",
      notDone: "No hecho",

      changeStatusBtn: "Cambiar estado",

      daysRemaining: "Días restantes",
      deadline: "Fecha límite",

      removeBtn: "Eliminar",
    },
  },
};
