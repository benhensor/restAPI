import express from 'express'
const router = express.Router()
import Subscriber from '../models/subscriber'

// getting all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// getting one 
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// creating one 
router.post('/', async (req, res) => {
  const subscriber = new Subscriber ({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

try {
  const newSubscriber = await subscriber.save()
  res.status(201).json(newSubscriber)
} catch (err) {
  res.status(400).json({ message: err.message })
}
})

// updating one 
router.patch('/:id', (req, res) => {

})

// deleting one 
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted subscriber'})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber === null) {
      return res.status(404).json({ message: 'Cannot fnd subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router