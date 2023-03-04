import { createSlice } from "@reduxjs/toolkit";
import { IEventState } from "../../Interfaces";
import { TEvent } from "../../Types";

const initialState: IEventState = {
  event: [],
  filteredEvent: [],
  currentEvent: null,
  status: null,
};

const eventReducer = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {
    fetchEvent(state, action) {
      state.event = [...action.payload.event];
    },
    fetchEventById(state, action) {
      state.currentEvent = action.payload.event;
    },
    searchEvent(state, action) {
      let AllEvents = [...state.event];
      let searchedEvents: TEvent[] = [];

      searchedEvents = AllEvents.filter((event) =>
        Object.values(event).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredEvent = searchedEvents;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const eventActions = eventReducer.actions;

export default eventReducer;
