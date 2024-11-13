const express = require("express");
const { sequelize, Job, Profile, Contract } = require("./db");
const Sequelize = require("sequelize");
const dayjs = require("dayjs");

const app = express();
sequelize.sync();

app.post("/seeder", async (req, res) => {
  try {
    /* WARNING THIS WILL DROP THE CURRENT DATABASE */
    seed();

    async function seed() {
      // create tables
      await Profile.sync({ force: true });
      await Contract.sync({ force: true });
      await Job.sync({ force: true });
      //insert data
      await Promise.all([
        Profile.create({
          id: 1,
          firstName: "Harry",
          lastName: "Potter",
          profession: "Wizard",
          balance: 1150,
          type: "client",
        }),
        Profile.create({
          id: 2,
          firstName: "Mr",
          lastName: "Robot",
          profession: "Hacker",
          balance: 231.11,
          type: "client",
        }),
        Profile.create({
          id: 3,
          firstName: "John",
          lastName: "Snow",
          profession: "Knows nothing",
          balance: 451.3,
          type: "client",
        }),
        Profile.create({
          id: 4,
          firstName: "Ash",
          lastName: "Kethcum",
          profession: "Pokemon master",
          balance: 1.3,
          type: "client",
        }),
        Profile.create({
          id: 5,
          firstName: "John",
          lastName: "Lenon",
          profession: "Musician",
          balance: 64,
          type: "contractor",
        }),
        Profile.create({
          id: 6,
          firstName: "Linus",
          lastName: "Torvalds",
          profession: "Programmer",
          balance: 1214,
          type: "contractor",
        }),
        Profile.create({
          id: 7,
          firstName: "Alan",
          lastName: "Turing",
          profession: "Programmer",
          balance: 22,
          type: "contractor",
        }),
        Profile.create({
          id: 8,
          firstName: "Aragorn",
          lastName: "II Elessar Telcontarvalds",
          profession: "Fighter",
          balance: 314,
          type: "contractor",
        }),
        Contract.create({
          id: 1,
          terms: "bla bla bla",
          status: "in-progress",
          ClientId: 1,
          ContractorId: 5,
        }),
        Contract.create({
          id: 2,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 1,
          ContractorId: 6,
        }),
        Contract.create({
          id: 3,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 2,
          ContractorId: 6,
        }),
        Contract.create({
          id: 4,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 2,
          ContractorId: 7,
        }),
        Contract.create({
          id: 5,
          terms: "bla bla bla",
          status: "new",
          ClientId: 3,
          ContractorId: 8,
        }),
        Contract.create({
          id: 6,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 3,
          ContractorId: 7,
        }),
        Contract.create({
          id: 7,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 4,
          ContractorId: 7,
        }),
        Contract.create({
          id: 8,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 4,
          ContractorId: 6,
        }),
        Contract.create({
          id: 9,
          terms: "bla bla bla",
          status: "in_progress",
          ClientId: 4,
          ContractorId: 8,
        }),
        Job.create({
          description: "work",
          price: 200,
          ContractId: 1,
        }),
        Job.create({
          description: "work",
          price: 201,
          ContractId: 2,
        }),
        Job.create({
          description: "work",
          price: 202,
          ContractId: 3,
        }),
        Job.create({
          description: "work",
          price: 200,
          ContractId: 4,
        }),
        Job.create({
          description: "work",
          price: 200,
          ContractId: 7,
        }),
        Job.create({
          description: "work",
          price: 2020,
          paid: true,
          paymentDate: "2020-08-15T19:11:26.737Z",
          ContractId: 7,
        }),
        Job.create({
          description: "work",
          price: 200,
          paid: true,
          paymentDate: "2020-08-15T19:11:26.737Z",
          ContractId: 2,
        }),
        Job.create({
          description: "work",
          price: 200,
          paid: true,
          paymentDate: "2020-08-16T19:11:26.737Z",
          ContractId: 3,
        }),
        Job.create({
          description: "work",
          price: 200,
          paid: true,
          paymentDate: "2020-08-17T19:11:26.737Z",
          ContractId: 1,
        }),
        Job.create({
          description: "work",
          price: 200,
          paid: true,
          paymentDate: "2020-08-17T19:11:26.737Z",
          ContractId: 5,
        }),
        Job.create({
          description: "work",
          price: 21,
          paid: true,
          paymentDate: "2020-08-10T19:11:26.737Z",
          ContractId: 1,
        }),
        Job.create({
          description: "work",
          price: 21,
          paid: true,
          paymentDate: "2020-08-15T19:11:26.737Z",
          ContractId: 2,
        }),
        Job.create({
          description: "work",
          price: 121,
          paid: true,
          paymentDate: "2020-08-15T19:11:26.737Z",
          ContractId: 3,
        }),
        Job.create({
          description: "work",
          price: 121,
          paid: true,
          paymentDate: "2020-08-14T23:11:26.737Z",
          ContractId: 3,
        }),
      ]);
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

app.get("/list", async (req, res) => {
  try {
    const result = await Promise.all([
      Profile.findAll(),
      Contract.findAll(),
      Job.findAll(),
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

app.get("/admin/store-best-profession", async (req, res) => {
  try {
    const { start, end } = req.query;
    const limit = parseInt(req?.query?.limit) || 1;
    const dateFilter = {};
    if (start && end) {
      const startDate = dayjs(start).startOf("day").format();
      const endDate = dayjs(end).endOf("day").format();
      dateFilter["$Contractor.Jobs.paymentDate$"] = {
        [Sequelize.Op.between]: [startDate, endDate],
      };
    }

    const result = await Profile.findAll({
      attributes: [
        "profession",
        [
          sequelize.fn("SUM", sequelize.col("Contractor.Jobs.price")),
          "totalEarned",
        ],
      ],
      where: dateFilter,
      include: [
        {
          model: Contract,
          as: "Contractor",
          required: false,
          duplicating: false,
          attributes: [],
          include: [
            {
              model: Job,
              required: false,
              duplicating: false,
              attributes: [],
            },
          ],
        },
      ],
      group: ["Profile.profession"],
      order: [[Sequelize.literal("totalEarned"), "DESC"]],
      limit,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

app.get("/admin/find-one-store-best-profession", async (req, res) => {
  try {
    const { start, end } = req.query;
    const dateFilter = {};
    if (start && end) {
      const startDate = dayjs(start).startOf("day").format();
      const endDate = dayjs(end).endOf("day").format();
      dateFilter["$Contractor.Jobs.paymentDate$"] = {
        [Sequelize.Op.between]: [startDate, endDate],
      };
    }

    const result = await Profile.findOne({
      attributes: [
        "profession",
        [
          sequelize.fn("SUM", sequelize.col("Contractor.Jobs.price")),
          "totalEarned",
        ],
      ],
      where: dateFilter,
      include: [
        {
          model: Contract,
          as: "Contractor",
          required: false,
          duplicating: false,
          attributes: [],
          include: [
            {
              model: Job,
              required: false,
              duplicating: false,
              attributes: [],
            },
          ],
        },
      ],
      group: ["Profile.profession"],
      order: [[Sequelize.literal("totalEarned"), "DESC"]],
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

app.get("/admin/best-clients", async (req, res) => {
  try {
    const { start, end } = req.query;

    // const dateFilter = {};
    // if (start && end) {
    //   const startDate = dayjs(start).startOf("day").format();
    //   const endDate = dayjs(end).endOf("day").format();
    //   dateFilter["$Contractor.Jobs.paymentDate$"] = {
    //     [Sequelize.Op.between]: [startDate, endDate],
    //   };
    // }

    const limit = req?.query?.limit || 2;

    // const result = await Contract.findAll({
    //   attributes: [
    //     "ClientId",
    //     [sequelize.fn("SUM", sequelize.col("Jobs.price")), "totalPaid"],
    //   ],
    //   where: dateFilter,
    //   include: [
    //     {
    //       model: Job,
    //       attributes: [],
    //       required: false,
    //       duplicating: false,
    //       where: {
    //         paid: true,
    //       },
    //     },
    //     {
    //       model: Profile,
    //       as: "Client",
    //       required: false,
    //       duplicating: false,
    //       attributes: ["firstName", "lastName"],
    //     },
    //   ],
    //   group: ["ClientId"],
    //   order: [[Profile.sequelize.literal("totalPaid"), "DESC"]],
    //   limit: parseInt(limit),
    // });

    const dateFilter = {};
    if (start && end) {
      dateFilter["$Jobs.paymentDate$"] = {
        [Sequelize.Op.between]: [start, end],
      };
    }

    const result = await Contract.findAll({
      attributes: [
        "ClientId",
        [Sequelize.fn("SUM", Sequelize.col("Jobs.price")), "totalPaid"],
      ],
      where: dateFilter,
      include: [
        {
          model: Job,
          attributes: [],
          required: false,
          duplicating: false,
          where: {
            paid: true,
          },
        },
        {
          model: Profile,
          as: "Client",
          required: false,
          duplicating: false,
          attributes: ["firstName", "lastName"],
        },
      ],
      group: ["ClientId"],
      order: [[Profile.sequelize.literal("totalPaid"), "DESC"]],
      limit: parseInt(limit),
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
