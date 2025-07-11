import bcrypt from "bcryptjs";

const users = [
  {
    name: "callerbalogun",
    email: "callerbalogun@gmail.com",
    password: bcrypt.hashSync("encrypted98", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
