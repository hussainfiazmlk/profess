const Sequelize = require("sequelize");
const dayjs = require("dayjs");

app.get("/admin/store-best-profession", async (req, res) => {
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

    // const result = await Profile.findOne({
    //   attributes: [
    //     "profession",
    //     [
    //       sequelize.fn("SUM", sequelize.col("Contractor.Jobs.price")),
    //       "totalEarned",
    //     ],
    //   ],
    //   where: dateFilter,
    //   include: [
    //     {
    //       model: Contract,
    //       as: "Contractor",
    //       required: false,
    //       duplicating: false,
    //       attributes: [],
    //       include: [
    //         {
    //           model: Job,
    //           required: false,
    //           duplicating: false,
    //           attributes: [],
    //         },
    //       ],
    //     },
    //   ],
    //   group: ["Profile.profession"],
    //   order: [[Sequelize.literal("totalEarned"), "DESC"]],
    // });

    const dateFilter = {};
    if (start && end) {
      dateFilter["$Contractor.Jobs.paymentDate$"] = {
        [Op.between]: [start, end],
      };
    }
    const result = await Contract.findAll({
      attributes: ["ClientId", [fn("SUM", col("Jobs.price")), "totalPaid"]],
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
    console.error(error);
    return res.status(500).json({ error });
  }
});
