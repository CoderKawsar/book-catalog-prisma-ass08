export type ICreateOrderPayload = {
  userId: string;
  orderedBooks: {
    bookId: string;
    quantity: number;
  }[];
};
