import { Body, Controller, Get, Post } from "@nestjs/common";
import { PosService, SaleLine } from "./pos.service";

@Controller("pos")
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Get("fuels")
  getFuels() {
    return this.posService.getFuels();
  }

  @Post("sales/quote")
  quoteSale(@Body() body: { lines?: SaleLine[] }) {
    return this.posService.createSale(body.lines ?? []);
  }
}
