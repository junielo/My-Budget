import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 500 })
  hash_password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_date: Date;

  @Column({ type: "timestamp", nullable: true})
  deleted_date: Date;
}