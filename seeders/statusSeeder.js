const { Status } = require("../models");

let ArrayStatus = ["Processing", "Sent", "Received"];

const numbers = [1, 2, 3];
module.exports = async () => {
  const allStatus = [];
  for (let i = 0; i < ArrayStatus.length; i++) {
    const status = new Status({
      name: ArrayStatus[i],
      number: numbers[i],
      orders: [],
    });
    allStatus.push(status);
  }

  await Status.insertMany(allStatus);

  console.log("[Database] Se corrió el seeder de Status.");
};
