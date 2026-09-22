import { Injectable } from "@nestjs/common";

export type Fuel = { id: string; name: string; price: number; colour: string };
export type SaleLine = {
  name: string;
  quantity: number;
  unitPrice: number;
  detail: string;
};

@Injectable()
export class PosService {
  private readonly fuels: Fuel[] = [
    { id: "super-petrol", name: "Super Petrol", price: 214.03, colour: "blue" },
    { id: "diesel", name: "Diesel", price: 217.86, colour: "amber" },
    { id: "kerosene", name: "Kerosene", price: 191.38, colour: "red" },
  ];

  getFuels() {
    return this.fuels;
  }

  createSale(lines: SaleLine[]) {
    const subtotal = lines.reduce(
      (sum, line) => sum + line.quantity * line.unitPrice,
      0,
    );
    return {
      saleNumber: "#10483",
      lines,
      subtotal: this.round(subtotal),
      tax: this.round(subtotal * 0.1),
      total: this.round(subtotal),
      currency: "Ksh",
    };
  }

  private round(value: number) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
