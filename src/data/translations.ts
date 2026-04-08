//Record Record<K, V>
//english language is the default thats why is null
interface TranslationTypes {
  en: {
    homePage_T: null;
    cardView_T: null;
    confirmDialog_T: null;
    todoForm_T: null;
    editPage_T: null;
    cardEdit_T: null;
    settingsPage_T: null;
    daysRemainingFig_T: null;
  };

  sv: {
    homePage_T: Record<string, string>;
    cardView_T: Record<string, string>;
    confirmDialog_T: Record<string, string>;
    todoForm_T: Record<string, string>;
    editPage_T: Record<string, string>;
    cardEdit_T: Record<string, string>;
    settingsPage_T: Record<string, string>;
    daysRemainingFig_T: Record<string, string>;
  };

  es: {
    homePage_T: Record<string, string>;
    cardView_T: Record<string, string>;
    confirmDialog_T: Record<string, string>;
    todoForm_T: Record<string, string>;
    editPage_T: Record<string, string>;
    cardEdit_T: Record<string, string>;
    settingsPage_T: Record<string, string>;
    daysRemainingFig_T: Record<string, string>;
  };
}

export const translations: TranslationTypes = {
  en: {
    homePage_T: null,
    cardView_T: null,
    confirmDialog_T: null,
    todoForm_T: null,
    editPage_T: null,
    cardEdit_T: null,
    settingsPage_T: null,
    daysRemainingFig_T: null,
  },

  sv: {
    homePage_T: {
      addTask: "Lägg till uppgift",
      appTitle: "Uppgifts Påminnare",
      addBtn: "Lägg till",
      subHeaderTitle: "Dina uppgifter",
    },

    cardView_T: {
      verySoon: "Väldigt snart",
      quite: " Lugnt",
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
    editPage_T: {
      editTask: "Redigera uppgift",
    },
    cardEdit_T: {
      success: "Succé",
      quite: "Lugnt",
      expired: "Utgånget",
      verySoon: "Väldigt snart",
      today: "Idag",
      status: "Status",
      done: "Klart",
      notDone: "Inte klart",

      priority: "Prioritet",
      low: "Låg",
      medium: "Medel",
      high: "Hög",
      deadline: "Sista datum",
      daysRemaining: "Dagar kvar",
      edit: "Redigera",
      remove: "Ta bort",
    },
    settingsPage_T: {
      settings: "Inställningar",
      language: "Språk",
      warnMeFrom: "Varning från?",
      selectTheme: "Välj tema",
      deleteAllTasks: "Radera alla uppgifter",
      lock: "Lås",
      unlock: "Lås upp",
      delete: "Radera",
    },
    daysRemainingFig_T: {
      today: "Idag",
      for: "För",
      in: "Om",
      day: "dag",
      days: "dagar",
    },
  },
  es: {
    homePage_T: {
      addTask: "Agregar tarea",
      appTitle: "Recordatorio de tareas",
      addBtn: "Agregar",
      subHeaderTitle: "Tus tareas",
    },

    cardView_T: {
      verySoon: "Muy pronto",
      quite: "Tranquilo",
      priority: "Prioridad",
      done: "Hecho",
      notDone: "No Listo",
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

    editPage_T: {
      editTask: "Editar Tarea",
    },
    cardEdit_T: {
      success: "Éxito",
      quite: "Tranquilo",
      expired: "Expirado",
      verySoon: "Muy pronto",
      today: "Hoy",
      status: "Estado",
      done: "Hecho",
      notDone: "No listo",
      priority: "Prioridad",
      low: "Baja",
      medium: "Media",
      high: "Alta",
      deadline: "Fecha límite",
      daysRemaining: "Días restantes",
      edit: "Editar",
      remove: "Eliminar",
    },
    settingsPage_T: {
      settings: "Configuraciones",
      language: "Idioma",
      warnMeFrom: "Advertencia desde?",
      selectTheme: "Seleccionar tema",
      deleteAllTasks: "Eliminar todas las tareas",
      lock: "Bloquear",
      unlock: "Desbloquear",
      delete: "Eliminar",
    },
    daysRemainingFig_T: {
      today: "Hoy",
      for: "Hace",
      in: "En",
      day: "día",
      days: "días",
    },
  },
};
