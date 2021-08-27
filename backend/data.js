import bcrypt from 'bcryptjs';
const data = {
   users: [
      {
        firstName:' Fathia',
        lastName:'JARRAY',
        email: 'fathiajarray1993@gmail.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
      },
      {
   
        firstName:'Mounira',
        lastName:'JARRAY',
        email: 'user@example.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: false,
      },
    ],

    products: [
      {
       
        name: 'p1',
        category: 'photographie',
        image: '/images/p1.jpg',
        price: 11,
        countInStock: 11,
        artiste: 'Fathia JR.',
        description: 'high quality product',
        availableSizes:["A2, A3"]
     },
     {
       
        name: 'p2',
        category: 'photographie',
        image: '/images/p2.jpg',
        price: 12,
        countInStock: 12,
        artiste: 'Fathia JR.',
        description: 'high quality product',
        availableSizes:["A2, A3"]
     },
     {
     
        name: 'p3',
        category: 'photographie',
        image: '/images/p3.jpg',
        price: 13,
        countInStock: 0,
        artiste: 'Fathia JR.',
        description: 'high quality product',
        availableSizes:["A2, A3"]
     },
     {
    
        name: 'p4',
        category: 'dessin',
        image: '/images/p4.jpg',
        price: 14,
        countInStock: 14,
        artiste: 'Mouna BT.',
        description: 'high quality product',
        availableSizes:["A1, A4"]
     },
     {
        
        name: 'p5',
        category: 'dessin',
        image: '/images/p5.jpg',
        price: 15,
        countInStock: 15,
        artiste: 'Mouna BT.',
        description: 'high quality product',
        availableSizes:["A1, A4"]
     },
     {
        
        name: 'p6',
        category: 'dessin',
        image: '/images/p6.jpg',
        price: 16,
        countInStock: 16,
        artiste: 'Mouna BT.',
        description: 'high quality product',
        availableSizes:["A1, A4"]
     },
    ],
};
export default data;

