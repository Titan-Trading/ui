export default interface IProduct {
    id: number;
    userName: string;
    image: string;
    title: string;
    description: string;
    price: number;
    stats: {
      title: string;
      value: string;
    }[];
}