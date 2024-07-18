import { Injectable } from '@angular/core';

@Injectable()
export class PlayersDataService {
  playersNames: Array<string> = [];
  public savefirstPlayer(playersNames: Array<string>): void {
    this.playersNames = playersNames;
    console.log(playersNames);
  }

  public getPlayersNames(): Array<string> {
    return this.playersNames;
  }
  // private cartItems: ProductDetails[] = [];
  // private cartProducts = new Subject<ProductDetails[]>();
  // constructor() {}
  // public addToCart(product: ProductDetails): void {
  //   const checkCart = this.checkCart(product);
  //   if (!checkCart) {
  //     this.cartItems.push(product);
  //     //console.log(this.cartItems);
  //     product.inCart = true;
  //     this.cartProducts.next(this.cartItems);
  //   }
  // }
  // public removeFromCart(product: ProductDetails): void {
  //   this.cartItems = this.cartItems.filter(
  //     (item: ProductDetails) => item.id !== product.id
  //   );
  //   delete product.inCart;
  //   this.cartProducts.next(this.cartItems);
  // }
  // public removeAll(): void {
  //   this.cartItems.map((item) => {
  //     delete item.inCart;
  //   });
  //   this.cartItems = [];
  //   this.cartProducts.next(this.cartItems);
  // }
  // public getItems(): Observable<ProductDetails[]> {
  //   return this.cartProducts.asObservable();
  // }
  // private checkCart(product: ProductDetails): boolean {
  //   return this.cartItems.some((item) => product.id === item.id);
  // }
}
