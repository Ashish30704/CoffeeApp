export const Coffees = [
  {
    id: 11,
    type: 'Cappuccino',
    name: 'Cappuccino 1',
    with: 'With Steamed Milk',
    price: 4.5,
    imageSource: require('../../assets/images/coffee/coffee1.jpg'),
    description:
      'Cappuccino is a latte made with mroe foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
    size: sizeCoffees,
    roasted: {
      light: 'light Roasted',
      medium: 'medium roasted',
      full: 'full roasted',
    },
    rating: 4.5,
  },
  {
    id: 12,
    type: 'Cappuccino',
    name: 'Cappuccino 2',
    with: 'With Foam',
    price: 3.5,
    imageSource: require('../../assets/images/coffee/coffee2.jpg'),
    description:
      'Cappuccino is a latte made with mroe foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
    size: sizeCoffees,
    roasted: {
      light: 'light Roasted',
      medium: 'medium roasted',
      full: 'full roasted',
    },
    rating: 4.5,
  },
  {
    id: 13,
    type: 'Espresso',
    name: 'Espresso 1',
    with: 'With nothing! lol',
    price: 3.5,
    imageSource: require('../../assets/images/coffee/coffee1.jpg'),
    description:
      'Cappuccino is a latte made with mroe foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
    size: sizeCoffees,
    roasted: {
      light: 'light Roasted',
      medium: 'medium roasted',
      full: 'full roasted',
    },
    rating: 4.5,
  },
];

export const sizeCoffees = [
  {
    id: 1,
    size: 'S',
    price: Coffees[0].price
  },
  {
    id: 2,
    size: 'M',
  },
  {
    id: 3,
    size: 'L',
  },
];

export const Beans = [
  {
    id: '21',
    name: 'Robusta Beans',
    with: 'Roasted',
    price: 4.5,
    imageSource: require('../../assets/images/beans/bean1.jpg'),
    description:
      'Cappuccino is a latte made with mroe foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
    size: sizeBeans,
    roasted: {
      light: 'light Roasted',
      medium: 'medium roasted',
      full: 'full roasted',
    },
    rating: 4.5,
  },
  {
    id: '22',
    name: 'Some Beans',
    with: 'With Dirt',
    price: 3.5,
    imageSource: require('../../assets/images/beans/bean1.jpg'),
    description:
      'Cappuccino is a latte made with mroe foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
    size: sizeBeans,
    roasted: {
      light: 'light Roasted',
      medium: 'medium roasted',
      full: 'full roasted',
    },
    rating: 4.5,
  },
  {
    id: '23',
    name: 'Joking Beans',
    with: 'With nothing! lol',
    price: 3.5,
    imageSource: require('../../assets/images/beans/bean1.jpg'),
    description:
      'Cappuccino is a latte made with mroe foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
    size: sizeBeans,
    roasted: {
      light: 'light Roasted',
      medium: 'medium roasted',
      full: 'full roasted',
    },
    rating: 4.5,
  },
];

export const sizeBeans = [
  {
    id: 1,
    size: '250gm',
  },
  {
    id: 2,
    size: '500gm',
  },
  {
    id: 2,
    size: '750gm',
  },
];

export const coffeeTypes = [
  {
    id: '0',
    name: 'All',
  },
  {
    id: '1',
    name: 'Cappuccino',
  },
  {
    id: '2',
    name: 'Espresso',
  },
  {
    id: '3',
    name: 'Americano',
  },
  {
    id: '4',
    name: 'Africano, hehe jk',
  },
];
