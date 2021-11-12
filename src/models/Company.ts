import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CompaniesAddress } from "./CompanyAddress";
import { Categories } from "./Categories";
import { Transactions } from "./Transaction";

@Entity()
export class Companies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  corporateName: string;

  @Column()
  fantasyName: string;

  @Column()
  registeredNumber: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  socialContract: string;

  @Column({
    nullable: true,
  })
  acceptanceTerm: string;

  @Column({
    default: 0,
    type: "float",
  })
  cashbackPercentDefault: number;

  @Column({
    default: 0,
    type: "float",
  })
  balance: number;

  @Column({
    default: 0,
    type: "float",
  })
  blockedBalance: number;

  @Column({
    default: 0,
    type: "float",
  })
  monthlyPayment: number;

  @OneToOne(() => CompaniesAddress)
  @JoinColumn()
  address: CompaniesAddress;

  @OneToMany(() => Transactions, () => Companies)
  transactions: Transactions;

  @ManyToOne(() => Categories, () => Companies)
  category: Categories;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
