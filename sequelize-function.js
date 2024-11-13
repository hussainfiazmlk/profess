const dayjs = require("dayjs");

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
