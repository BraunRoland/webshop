import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { products } from './data.js';
import { ProductDto } from './product.dto.js';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getProducts() {
    return {
      products: products
    }
  }

  @Post()
  @Render('index')
  postProducts(@Body() body: ProductDto) {
    let error: boolean = false;
    const nameRegex = /^[A-Z]{1}[a-z]*\ [A-Z]{1}[a-z]*$/gm;
    const addressRegex = /^[A-Z]{1}[a-z]*\,\ \d\d\d\d\,\ [A-Z]{1}[a-z]*\ [a-z]*\ \d{1}/gm
    const phoneRegex = /^[0][6][0-9]{9}$/gm
    const phoneRegexPlus = /^[+][3][6][0-9]{9}$/gm
    const cuponRegex = /^[A-Z]{2}\-[0-9]{4}$/gm 
    const cardNumberRegex = /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/gm
    const monthRegex = /^[0-2][0-9]$/gm
    const yearRegex = /^[0-9][0-9]$/gm
    const cvcRegex = /^[0-9]{3}$/gm


    return {
      products: products,

    }
  }
}
