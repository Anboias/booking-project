import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Passenger, Baggage } from "@/lib/schema";

const loadState = () => {
  return {
    passengers: [],
    passengersDraft: [],
    baggage: {
      cabinBaggage: false,
      checkedBaggage: false,
    },
  };
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState: loadState() as {
    passengers: Passenger[];
    passengersDraft: Partial<Passenger>[];
    baggage: Baggage;
  },
  reducers: {
    addPassengerDraft: (state, action: PayloadAction<Partial<Passenger>>) => {
      if (
        state.passengersDraft.find(
          (passenger) => passenger.id === action.payload.id
        )
      ) {
        return;
      }

      state.passengersDraft.push(action.payload);
    },
    savePassengers: (state, action: PayloadAction<Passenger[]>) => {
      state.passengers = action.payload;
    },
    removePassengerDraft: (state, action: PayloadAction<number>) => {
      state.passengersDraft = state.passengersDraft.filter(
        (passenger: Partial<Passenger>) => passenger.id !== action.payload
      );
    },
    updatePassengerDraft: (
      state,
      action: PayloadAction<Partial<Passenger>>
    ) => {
      const index = state.passengersDraft.findIndex(
        (passenger) => passenger.id === action.payload.id
      );

      if (index === -1) {
        return;
      }

      state.passengersDraft[index] = {
        ...state.passengersDraft[index],
        ...action.payload,
      };
    },
    toggleBaggage: (
      state,
      action: PayloadAction<{
        id: number;
        type: keyof Baggage;
      }>
    ) => {
      const index = state.passengersDraft.findIndex(
        (passenger) => passenger.id === action.payload.id
      );

      if (index === -1) {
        return;
      }

      state.passengers[index] = {
        ...state.passengers[index],
        baggage: {
          ...(state.passengers[index].baggage || loadState().baggage),
          [action.payload.type]:
            !state.passengers[index].baggage?.[action.payload.type] || false,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPassengerDraft,
  removePassengerDraft,
  savePassengers,
  updatePassengerDraft,
  toggleBaggage,
} = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
