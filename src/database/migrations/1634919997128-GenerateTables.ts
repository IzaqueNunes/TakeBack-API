import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateTables1634919997128 implements MigrationInterface {
    name = 'GenerateTables1634919997128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "initials" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "zipCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "stateId" uuid, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying, "district" character varying, "number" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cityId" uuid, CONSTRAINT "PK_ad150e1e829fc0c9013267f3e4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "corporateName" character varying NOT NULL, "fantasyName" character varying NOT NULL, "registeredNumber" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "socialContract" character varying, "acceptanceTerm" character varying, "cashbackPercentDefault" integer NOT NULL DEFAULT '0', "balance" integer NOT NULL DEFAULT '0', "blockedBalance" integer NOT NULL DEFAULT '0', "monthlyPayment" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumer_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying, "district" character varying, "number" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cityId" uuid, CONSTRAINT "PK_c0e86059b3acb674fa2496704d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "saledFee" integer NOT NULL, "isUp" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "saledFee" integer NOT NULL, "blocked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05fbbdf6bc1db819f47975c8c0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "salesFee" integer NOT NULL, "cashbackAmount" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionTypeId" uuid, "transactionStatusId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "phone" character varying, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "signature" character varying, "balance" integer NOT NULL DEFAULT '0', "blockedBalance" integer NOT NULL DEFAULT '0', "emailConfirmated" boolean NOT NULL DEFAULT false, "phoneConfirmated" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "transactionsId" uuid, CONSTRAINT "REL_b5f7e72fb19b6e4d6d50b5dde1" UNIQUE ("addressId"), CONSTRAINT "PK_85625b4d465d3aa0eb905127822" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_address" ADD CONSTRAINT "FK_f5e207e2b37aaeff6d68a11fe1d" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b" FOREIGN KEY ("addressId") REFERENCES "companies_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer_address" ADD CONSTRAINT "FK_8a5879957ffa4ceab700ee332a3" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_13ec2f6f02ddbb52a02ab867156" FOREIGN KEY ("transactionTypeId") REFERENCES "transaction_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_7d6803adce40f000540e7d5fdb9" FOREIGN KEY ("transactionStatusId") REFERENCES "transaction_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD CONSTRAINT "FK_b5f7e72fb19b6e4d6d50b5dde13" FOREIGN KEY ("addressId") REFERENCES "consumer_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD CONSTRAINT "FK_cd311d818f1791c8ca0ef3a6dee" FOREIGN KEY ("transactionsId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP CONSTRAINT "FK_cd311d818f1791c8ca0ef3a6dee"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP CONSTRAINT "FK_b5f7e72fb19b6e4d6d50b5dde13"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_7d6803adce40f000540e7d5fdb9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_13ec2f6f02ddbb52a02ab867156"`);
        await queryRunner.query(`ALTER TABLE "consumer_address" DROP CONSTRAINT "FK_8a5879957ffa4ceab700ee332a3"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b"`);
        await queryRunner.query(`ALTER TABLE "companies_address" DROP CONSTRAINT "FK_f5e207e2b37aaeff6d68a11fe1d"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_e99de556ee56afe72154f3ed04a"`);
        await queryRunner.query(`DROP TABLE "consumer"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "transaction_status"`);
        await queryRunner.query(`DROP TABLE "transaction_types"`);
        await queryRunner.query(`DROP TABLE "consumer_address"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "companies_address"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
