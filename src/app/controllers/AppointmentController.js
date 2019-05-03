const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async changeStatus (req, res) {
    const { id, status } = req.params

    try {
      await Appointment.update({ status: status }, { where: { id: id } })

      return res.json({ success: true })
    } catch (error) {
      return res.json({ success: false })
    }
  }
}

module.exports = new AppointmentController()
