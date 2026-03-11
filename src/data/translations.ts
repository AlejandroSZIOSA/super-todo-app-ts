//Record Record<K, V>
//english language is the default thats why is null
interface TranslationTypes {
  en: {
    homePage_T: null;
    cardView_T: null;
    confirmDialog_T: null;
    todoForm_T: null;
  };

  sv: {
    homePage_T: Record<string, string>;
    cardView_T: Record<string, string>;
    confirmDialog_T: Record<string, string>;
    todoForm_T: Record<string, string>;
  };

  es: {
    homePage_T: Record<string, string>;
    cardView_T: Record<string, string>;
    confirmDialog_T: Record<string, string>;
    todoForm_T: Record<string, string>;
  };
}

export const translations: TranslationTypes = {
  en: {
    homePage_T: null,
    cardView_T: null,
    confirmDialog_T: null,
    todoForm_T: null,
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
      expired: "Utgånget",
      changeStatusBtn: "Byt status",
      daysRemaining: "Dagar kvar",
      deadline: "Sista datum",
      removeBtn: "Ta bort",
    },

    confirmDialog_T: {
      confirmRemove: "Bekräfta borttagning",
      removeTodoTitle: "uppgift med titel:",
    },

    todoForm_T: {
      title: "Titel",
      description: "Beskrivning",
      deadline: "Sista datum",
      priority: "Prioritet",
      low: "Låg",
      medium: "Medel",
      high: "Hög",
      add: "Lägg till",
      edit: "Redigera",
      save: "Spara",
    },
  },
  es: {
    homePage_T: {
      appTitle: "Agenda de tareas",
      addBtn: "Agregar Tarea",
      subHeaderTitle: "Tus tareas",
    },

    cardView_T: {
      priority: "Prioridad",
      done: "Hecho",
      notDone: "No hecho",
      expired: "Expirado",
      changeStatusBtn: "Cambiar estado",
      daysRemaining: "Días restantes",
      deadline: "Fecha límite",
      removeBtn: "Eliminar",
    },

    confirmDialog_T: {
      confirmRemove: "Confirma eliminar",
      removeTodoTitle: "tarea con título:",
    },

    todoForm_T: {
      title: "Título",
      description: "Descripción",
      deadline: "Fecha límite",
      priority: "Prioridad",
      low: "Baja",
      medium: "Media",
      high: "Alta",

      add: "Agregar",
      edit: "Editar",
      save: "Guardar",
    },
  },
};
