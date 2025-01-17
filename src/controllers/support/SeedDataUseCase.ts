import { getRepository } from "typeorm";
import { InternalError } from "../../config/GenerateErros";

import { State } from "../../models/State";
import { City } from "../../models/City";
import { TransactionTypes } from "../../models/TransactionType";
import { TransactionStatus } from "../../models/TransactionStatus";
import { CompanyUserTypes } from "../../models/CompanyUserTypes";
import { CompanyStatus } from "../../models/CompanyStatus";
import { PaymentMethods } from "../../models/PaymentMethod";

// import { StatesSeed } from "../../database/seeds/statesSeed";
// import { TransactionTypesSeed } from "../../database/seeds/transactionTypesSeed";
// import { TransactionStatusSeed } from "../../database/seeds/transactionStatusSeed";
// import { CompanyUserTypesSeed } from "../../database/seeds/companyUserTypesSeed";
// import { CompanyStatusSeed } from "../../database/seeds/companyStatuSeed";

const StatesSeed = [
  {
    name: "Acre",
    initials: "AC",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Alagoas",
    initials: "AL",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Amapá",
    initials: "AP",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Amazonas",
    initials: "AM",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Bahia",
    initials: "BA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Ceará",
    initials: "CE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Espírito Santo",
    initials: "ES",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Goiás",
    initials: "Go",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Maranhão",
    initials: "MA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mato Grosso",
    initials: "MT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mato Grosso do Sul",
    initials: "MS",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Minas Gerais",
    initials: "MG",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Pará",
    initials: "PA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Paraíba",
    initials: "PB",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Paraná",
    initials: "PR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Pernambuco",
    initials: "PE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Piauí",
    initials: "PI",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Rio de Janeiro",
    initials: "RJ",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Rio Grande do Norte",
    initials: "RN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Rio Grande do Sul",
    initials: "RS",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Rondônia",
    initials: "RO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Roraima",
    initials: "RR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Santa Catarina",
    initials: "SC",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "São Paulo",
    initials: "SP",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sergipe",
    initials: "SE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tocantins",
    initials: "TO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Distrito Federal",
    initials: "DF",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const TransactionStatusSeed = [
  {
    description: "Pendente",
    blocked: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Aprovada",
    blocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Aguardando",
    blocked: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Cancelada pelo parceiro",
    blocked: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Cancelada pelo cliente",
    blocked: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const TransactionTypesSeed = [
  {
    description: "Ganho",
    isUp: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Abatimento",
    isUp: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const CompanyUserTypesSeed = [
  {
    description: "Administrador",
    isManager: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Colaborador",
    isManager: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const CompanyStatusSeed = [
  {
    description: "Ativo",
    blocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: "Bloqueado",
    blocked: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

class GenerateSeedData {
  async execute() {
    const [, count] = await getRepository(State).findAndCount();

    if (count > 0) {
      return new InternalError("Operação já executada", 400);
    }

    // Gerando os Estados
    const generetadStatesData = await getRepository(State).save(StatesSeed);

    if (generetadStatesData.length === 0) {
      return new InternalError("Erro ao gerar os estados", 400);
    }

    // Gerando a Cidade de Porteirinha
    const minas = await getRepository(State).findOne({
      where: {
        initials: "MG",
      },
    });

    const generatedCitiesData = await getRepository(City).save({
      name: "Porteirinha",
      zipCode: "39520000",
      state: minas,
    });

    if (!generatedCitiesData) {
      return new InternalError("Erro ao gerar a cidade", 400);
    }

    // Gerando os Tipos de Transações
    const generatedTransactionTypes = await getRepository(
      TransactionTypes
    ).save(TransactionTypesSeed);

    if (generatedTransactionTypes.length === 0) {
      return new InternalError("Erro ao gerar os tipos de transações", 400);
    }

    // Gerando os Status das Transações
    const generatedTransactionStatus = await getRepository(
      TransactionStatus
    ).save(TransactionStatusSeed);

    if (generatedTransactionStatus.length === 0) {
      return new InternalError("Erro ao gerar os status de transações", 400);
    }

    // Gerando os Tipos de Usuários
    const generatedUserTypes = await getRepository(CompanyUserTypes).save(
      CompanyUserTypesSeed
    );

    if (generatedUserTypes.length === 0) {
      return new InternalError("Erro ao gerar os tipos de usuários", 400);
    }

    // Gerando os Status das Empresas Parceiras
    const generatedCompanyStatus = await getRepository(CompanyStatus).save(
      CompanyStatusSeed
    );

    if (generatedCompanyStatus.length === 0) {
      return new InternalError("Erro ao gerar os status das empresas", 400);
    }

    // Gerando o método de pagamneto Takeback
    const generatedPaymentMethod = await getRepository(PaymentMethods).save({
      description: "Takeback",
    });

    if (!generatedPaymentMethod) {
      return new InternalError("Erro ao gerar método de pagamento", 400);
    }

    return "Dados semeados";
  }
}

export { GenerateSeedData };
