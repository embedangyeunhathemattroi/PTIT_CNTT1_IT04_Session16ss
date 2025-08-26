
// product.data.ts
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy A16",
    price: 20000000,
    stock: 5,
    image: "https://cdn.tgdd.vn/Products/Images/42/331206/samsung-galaxy-a16-gray-thumb-600x600.jpg",
  },
  {
    id: 2,
    name: "iPhone 14 Pro Max",
    price: 25000000,
    stock: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWyG4yd2heSly9wXyXKAAzuIO5aq_wpXcgw&s",
  },
  {
    id: 3,
    name: "Oppo F19 pro",
    price: 25000000,
    stock: 3,
    image: "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/a5-series-en/v2/navigation/440-440-white.png.thumb.webp",
  },
  {
    id: 4,
    name: "Huawei P60 Pro",
    price: 25000000,
    stock: 3,
    image: "https://dienthoaihay.vn/images/products/2023/04/08/original/huawei-60-pro-ti%CC%81m-_1680944951.jpg.jpg",
  },
  {
    id: 5,
    name: "Huawei Mate 80",
    price: 25000000,
    stock: 3,
    image: "https://cdn.24h.com.vn/upload/3-2025/images/2025-08-15/1755221053-220-thumbnail-width740height495_anh_cat_3_2_schema_article.jpg",
  },
  {
    id: 6,
    name: "Iphone 13",
    price: 25000000,
    stock: 3,
    image: "  https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_2.jpg",
  },
 



];
