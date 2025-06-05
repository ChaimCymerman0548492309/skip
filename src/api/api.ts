// api.ts

import type { Skip } from "../types/types";

export const fetchSkips = async (
  postcode: string = "NR32",
  area: string = "Lowestoft"
): Promise<Skip[]> => {
  const response = await fetch(
    `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Skip[] = await response.json();
  return data;
};
