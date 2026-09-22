export type Fuel = { id: string; name: string; price: number; colour: string };
export type SaleLine = {
  name: string;
  quantity: number;
  unitPrice: number;
  detail: string;
};
export type SaleQuote = {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function getFuels(): Promise<Fuel[]> {
  const response = await fetch(`${API_URL}/pos/fuels`);
  if (!response.ok) throw new Error("Fuel catalog unavailable");
  return response.json();
}

export async function quoteSale(lines: SaleLine[]): Promise<SaleQuote> {
  const response = await fetch(`${API_URL}/pos/sales/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lines }),
  });
  if (!response.ok) throw new Error("Sale quote unavailable");
  return response.json();
}
