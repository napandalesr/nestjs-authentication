import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { hash } from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar',length:255})
  name:string;

  @Column({name:'last_name', type:'varchar',length:255})
  lastName:string

  @Column({type:'varchar',length:255, nullable: false})
  username:string;

  @Column({type:'varchar',length:255})
  email:string;

  @Column({type:'varchar',length:255, nullable: false, select:false})
  password:string;

  @Column({name: 'created_at' ,type:'timestamp'})
  createdAt:Date;


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    if(!this.password){
      return
    }
    this.password = await hash(this.password,10);
  }
}
