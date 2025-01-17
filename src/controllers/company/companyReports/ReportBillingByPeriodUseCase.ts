import { getRepository, In } from "typeorm";
import { Companies } from "../../../models/Company";
import { Transactions } from "../../../models/Transaction";
import { TransactionStatus } from "../../../models/TransactionStatus";
import { TransactionTypes } from "../../../models/TransactionType";

interface Props {
  companyId: string;
}

class ReportBillingByPeriodUseCase {
  async execute({ companyId }: Props) {
    const date = new Date();
    const today = date.toLocaleDateString();
    const sevenDaysAgo = new Date(
      date.setDate(date.getDate() - 7)
    ).toLocaleDateString();

    // Buscando os status de transações válidos
    const transactionStatus = await getRepository(TransactionStatus).find({
      select: ["id"],
      where: {
        description: In(["Pendente", "Aprovada"]),
      },
    });

    // Criando array com os IDs dos tipos de transações válidas
    const transactionStatusIds = [];
    transactionStatus.map((item) => {
      transactionStatusIds.push(item.id);
    });

    // Buscando o tipo de transação válida
    const transactionsTypes = await getRepository(TransactionTypes).findOne({
      where: {
        description: "Ganho",
      },
    });

    // Buscando as transações realizadas no período
    const transactions = await getRepository(Transactions)
      .createQueryBuilder("transactions")
      .select("SUM(transactions.value)", "total")
      .where("transactions.companyId = :companyId", { companyId })
      .andWhere(
        "transactions.dateAt >= :sevenDaysAgo AND transactions.dateAt < :today",
        { sevenDaysAgo, today }
      )
      .andWhere(
        "transactions.transactionStatusId IN (:...transactionStatusId)",
        {
          transactionStatusId: [...transactionStatusIds],
        }
      )
      .andWhere("transactions.transactionType = :transactionsTypeId", {
        transactionsTypeId: transactionsTypes.id,
      })
      .getRawMany();

    const company = await getRepository(Companies).findOne(companyId);

    const totalBilling = transactions[0].total;
    const balance = company.balance;

    return { totalBilling, balance };
  }
}

export { ReportBillingByPeriodUseCase };
