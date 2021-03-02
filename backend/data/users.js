import bcrypt from "bcryptjs";

const users = [
  {
    name: "Elon Musk",
    email: "test_admin1@gmail.com",
    password: bcrypt.hashSync("iamtheadmin4321", 10),
    image: "/images/test_user1.jpg",
    isAdmin: true,
  },
  {
    name: "TestUser1",
    email: "test_user1@gmail.com",
    password: bcrypt.hashSync("shopuser1", 10),
    image: "/images/test_user1.jpg",
  },
  {
    name: "Testuser2",
    email: "test_user2@gmail.com",
    password: bcrypt.hashSync("shopuser2", 10),
  },
  {
    name: "Testuser3",
    email: "test_user3@gmail.com",
    password: bcrypt.hashSync("shopuser3", 10),
  },
  {
    name: "Testuser4",
    email: "test_user4@gmail.com",
    password: bcrypt.hashSync("shopuser4", 10),
  },
  {
    name: "Testuser5",
    email: "test_user5@gmail.com",
    password: bcrypt.hashSync("shopuser5", 10),
  },
];

export default users;
