import {createMachine, assign} from 'xstate';

type AddEntryFieldEvent = {
  type: 'ADD_ENTRY_FIELD';
  value: 'bpm';
};

type OpenEntryFieldMenuEvent = {
  type: 'OPEN_ENTRY_FIELD_MENU';
};

type ChangeEntryTitleEvent = {
  type: 'CHANGE_ENTRY_TITLE';
  value: string;
};

type FocusEntryTitleEvent = {
  type: 'FOCUS_ENTRY_TITLE';
};

type BlurEntryTitleEvent = {
  type: 'BLUR_ENTRY_TITLE';
};

type DoneAddingEntryFieldEvent = {
  type: 'DONE_ADDING_ENTRY_FIELD';
};

type PracticePreviewEvent =
  | ChangeEntryTitleEvent
  | FocusEntryTitleEvent
  | OpenEntryFieldMenuEvent
  | AddEntryFieldEvent
  | DoneAddingEntryFieldEvent
  | BlurEntryTitleEvent;

type PracticePreviewContext = {
  entryTitle: string;
  entryFields: {
    bpm: {
      active: boolean;
      value: number;
    };
  };
};

const practicePreviewMachine = createMachine<
  PracticePreviewContext,
  PracticePreviewEvent
>({
  predictableActionArguments: true,
  initial: 'idle',
  context: {
    entryFields: {
      bpm: {
        active: false,
        value: 120,
      },
    },
    entryTitle: '',
  },
  states: {
    idle: {
      on: {
        OPEN_ENTRY_FIELD_MENU: {
          target: 'addingEntryField',
        },
        FOCUS_ENTRY_TITLE: 'entryTitleFocused',
        CHANGE_ENTRY_TITLE: {
          actions: assign({
            entryTitle: (_, event) => {
              return event.value;
            },
          }),
        },
      },
    },
    entryTitleFocused: {
      on: {
        BLUR_ENTRY_TITLE: {
          target: 'idle',
        },
        CHANGE_ENTRY_TITLE: {
          actions: assign({
            entryTitle: (_, event) => {
              return event.value;
            },
          }),
        },
      },
    },
    addingEntryField: {
      on: {
        DONE_ADDING_ENTRY_FIELD: {
          target: 'idle',
        },
        ADD_ENTRY_FIELD: {
          actions: assign({
            entryFields: (context, event) => {
              return {
                ...context.entryFields,
                [event.value]: {
                  ...context.entryFields[event.value],
                  active: true,
                },
              };
            },
          }),
        },
      },
    },
  },
});

export default practicePreviewMachine;
