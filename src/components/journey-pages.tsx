"use client";

import dynamic from "next/dynamic";

// Keep the booking validator and finder out of marketing-page downloads.
// A client boundary enables code splitting while retaining default server rendering.
export const Booking = dynamic(() =>
  import("./booking").then((module) => module.Booking),
);
export const ThankYou = dynamic(() =>
  import("./booking").then((module) => module.ThankYou),
);
export const PlanFinder = dynamic(() =>
  import("./finder").then((module) => module.PlanFinder),
);
export const Pricing = dynamic(() =>
  import("./pricing").then((module) => module.Pricing),
);
