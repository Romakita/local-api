import {Model, PreHook, Trim, Unique} from "@tsed/mongoose";
import {Default, Property, Required} from "@tsed/schema";
import {hash} from "bcrypt";
import {Roles} from "../constants/Roles";
import {Base} from "./Base";

@Model()
@PreHook("save", async (user: User, next: any) => {
  const password = user.password;
  user.password = await hash(password, 10);
  next();
})
@PreHook("findOneAndUpdate", async (user: User, next: any) => {
  const password = user.password;
  user.password = await hash(password, 10);
  user.updatedAt = new Date();
  next();
})
export class User extends Base {
  @Trim()
  @Unique()
  @Required()
  email: string;

  @Property()
  @Required()
  firstName: string;

  @Property()
  @Required()
  lastName: string;

  @Trim()
  @Required()
    //@Ignore()
  password: string;

  @Property()
  @Default(0)
  cardMoneyAmount: number = 0;

  @Property()
  @Default(0)
  cashMoneyAmount: number = 0;

  @Property()
  @Default(Roles.Employee)
  role: string;
}