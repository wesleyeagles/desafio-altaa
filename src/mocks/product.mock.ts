const mockProductSingle = {
    id: 1,
    title: 'Produto Teste',
    price: 99.99,
    description: 'Descrição teste',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: { rate: 3, count: 100 },
}

const mockProducts = [
      {
        id: 1,
        title: 'Produto Teste',
        price: 99.99,
        description: 'Descrição teste',
        category: 'electronics',
        image: 'https://example.com/image.jpg',
        rating: { rate: 4.5, count: 100 },
      },
      {
        id: 2,
        title: 'Produto Teste 2',
        price: 149.99,
        description: 'Descrição teste 2',
        category: 'jewelery',
        image: 'https://example.com/image2.jpg',
        rating: { rate: 4.8, count: 200 },
      },
];

export { mockProducts, mockProductSingle }