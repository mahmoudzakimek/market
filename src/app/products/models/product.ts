export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: IRange;
}

export interface IRange {
  rate: number;
  count: number;
}
