export type ICreateOrderPayload = {
  userId: string;
  orderedBooks: {
    bookId: string;
    quantity: number;
  }[];
};

export type IUserIdAndRole = {
  userId: string;
  role: string;
};
