import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { products } from './data.js';
import { ProductDto } from './product.dto.js';
import { error } from 'console';
import { type } from 'os';

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
    const addressRegex = /^[A-Z]{1}[a-z]*\,\ \d\d\d\d\,\ [A-Z]{1}[a-z]*\ [a-z]*\ \d{1}$/m
    const phoneRegex = /^[0][6][0-9]{9}$/gm
    const phoneRegexPlus = /^[+][3][6][0-9]{9}$/gm
    const cuponRegex = /^[A-Z]{2}\-[0-9]{4}$/gm 
    const cardNumberRegex = /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/gm
    const monthRegex = /^[0-1][0-9]$/gm
    const yearRegex = /^[0-9][0-9]$/gm
    const cvcRegex = /^[0-9]{3}$/gm

    const nameErr = nameRegex.test(body.name)? null : 'Rossz név!';
    const addressErr = addressRegex.test(body.address)? null : 'Rossz szállítási cím!';
    const billErr = addressRegex.test(body.bill)? null : 'Rossz számlázási cím!';
    let cuponErr = cuponRegex.test(body.cupon)? null : 'Rossz kupon kód!';
    if (body.cupon == '') {
      cuponErr == null
    }
    const cardNumbErr = cardNumberRegex.test(body.card)? null : 'Rossz bankkártya szám!';
    let monthErr = monthRegex.test(body.month)? null : 'Rossz hónap!';
    if (Number(body.month.trim()) > 12 || Number(body.month.trim()) <= 0) {
      monthErr = 'Rossz hónap!';
    }
    const yearErr = yearRegex.test(body.year)? null : 'Rossz évszám!';
    const cvcErr = cvcRegex.test(body.cvc)? null : 'Rossz CVC!';
    let phoneErr = phoneRegex.test(body.phone)? null : 'Rossz telefonszám!';
    if (phoneErr != null) {
      phoneErr = phoneRegexPlus.test(body.phone)? null : 'Rossz telefonszám!'
    }
    const errList: (string | null)[] = [
      nameErr, addressErr, billErr,
      cuponErr, cardNumbErr, monthErr,
      yearErr, cvcErr, phoneErr
    ]
    const d = new Date(Number(body.year), Number(body.month)+1);
    console.log(d)
    const expired = 'Lejárt a bankkártyád!'
    if (monthErr == null && yearErr == null && d < new Date()) {
      errList.push(expired);
      error = true;
    }
    console.log(errList)
    if (errList.some(i => typeof i == 'string')) {
      if (error) {
        // nem sikerült, a bankkártya lejárt
        return {
          products: products,
          nameErr: nameErr,
          addressErr: addressErr,
          billErr: billErr,
          phoneErr: phoneErr,
          cuponErr: cuponErr,
          cardNumbErr: cardNumbErr,
          monthErr: monthErr,
          yearErr: yearErr,
          cvcErr: cvcErr,
          expired: expired,
          formData: body
        }
      }
      else {
        //nem sikerült, a bankkártya nem járt le
        return {
          products: products,
          nameErr: nameErr,
          addressErr: addressErr,
          billErr: billErr,
          phoneErr: phoneErr,
          cuponErr: cuponErr,
          cardNumbErr: cardNumbErr,
          monthErr: monthErr,
          yearErr: yearErr,
          cvcErr: cvcErr,
          formData: body
        }
      }
    }
    else {
      // sikeres vásárlás - én írtam a kommenteket, csak már elveszek ezek nélkül
      return {
        products: products,
        success: 'Sikeres vásárlás!'
      }
    }
  }
}
