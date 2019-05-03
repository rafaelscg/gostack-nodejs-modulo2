const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const { provider, id } = req.session.user

    if (!provider) {
      const providers = await User.findAll({
        where: { provider: true }
      })

      return res.render('dashboard', { providers })
    } else {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        },
        raw: true
      })

      return res.render('dashboard', { appointments, moment: moment })
    }
  }
}

module.exports = new DashboardController()
