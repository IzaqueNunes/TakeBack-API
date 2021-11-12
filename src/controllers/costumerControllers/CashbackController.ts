import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Transactions } from "../../models/Transaction";

type AuthorizedTransactionProps = {
  value: number;
};

export const authorizePurchase = async (
  request: Request,
  response: Response
) => {
  try {
    const consumerID = request["tokenPayload"].id;

    const { value }: AuthorizedTransactionProps = request.body;

    const newTransaction = getRepository(Transactions).save({
      value,
    });

    return response.status(200);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const findTransactions = async (
  request: Request,
  response: Response
) => {
  try {
    const consumerID = request["tokenPayload"].id;

    const { offset, limit } = request.params;

    const transactions = await getRepository(Transactions).find({
      select: ["id", "cashbackAmount", "createdAt"],
      relations: ["company", "transactionType", "transactionStatus"],
      take: parseInt(limit),
      skip: parseInt(offset) * parseInt(limit),
      order: { createdAt: "DESC" },
    });

    if (transactions.length === 0) {
      return response.status(204).json({ message: "Fim da lista" });
    }

    return response.status(200).json(transactions);
  } catch (error) {
    return response.status(500).json(error);
  }
};
