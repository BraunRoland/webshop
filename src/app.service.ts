import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Product } from './data.js';

const mysqlCon = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webshop'
})

@Injectable()
export class AppService {
  async createNewProduct(p: Product) {
    const [post] = await mysqlCon.execute(
      'INSERT INTO orders (product,customerName,billingAddress,shippingAddress) VALUES (?,?,?,?)',
      [p.product,p.customerName,p.billingAddress,p.shippingAddress]
    )
  }
}
