const express = require('express')
const EventModel = require('../model/event')
const router = express.Router()

//create a new event
router.post('/events', async (req, res) => {
    const { title, description, location, startTime, endTime } = req.body

    //to check all fields are present or not
    if (!title || "") {
        return res.status(400).json({ error: "Validation error: title is required" })
    }
    if (!description || "") {
        return res.status(400).json({ error: "Validation error: description is required" })
    }
    if (!location || "") {
        return res.status(400).json({ error: "Validation error: location is required" })
    }
    if (!startTime || "") {
        return res.status(400).json({ error: "Validation error: startTime is required" })
    }
    if (!endTime || "") {
        return res.status(400).json({ error: "Validation error: endTime is required" })
    }

    const newEvent = new EventModel({
        title,
        description,
        location,
        startTime,
        endTime
    })

    try {
        await newEvent.save()
        res.status(201).json(newEvent)
    } catch (err) {
        console.log(err);
    }
})

//list all events 
router.get('/events', async (req, res) => {
    try {
        const events = await EventModel.find()
        res.status(200).json(events)
    } catch (err) {
        console.log(err);
    }
})

//get a specific event
router.get('/events/:id', async (req, res) => {
    const eventId = req.params.id
    try {
        const event = await EventModel.findOne({ _id: eventId })
        if (!event) {
            res.status(404).json({ error: "There is no event with that id" })
        } else {
            res.status(200).json(event)
        }
    } catch (err) {
        console.log(err);
    }
})

//delete a specific id
router.delete('/events/:id', async (req, res) => {
    const eventId = req.params.id
    try {
        await EventModel.deleteOne({ _id: eventId })
        res.status(204).json("None")
    } catch (err) {
        console.log(err);
    }
})

//update a event
router.put('/events/:id', async (req, res) => {
    const id = req.params.id
    const { title, description, location, startTime, endTime } = req.body

    //to check all fields are present or not
    if (!title || "") {
        return res.status(400).json({ error: "Validation error: title is required" })
    }
    if (!description || "") {
        return res.status(400).json({ error: "Validation error: description is required" })
    }
    if (!location || "") {
        return res.status(400).json({ error: "Validation error: location is required" })
    }
    if (!startTime || "") {
        return res.status(400).json({ error: "Validation error: startTime is required" })
    }
    if (!endTime || "") {
        return res.status(400).json({ error: "Validation error: endTime is required" })
    }

    try {
        let event = await EventModel.findById(id)

        event.title = title
        event.description = description
        event.location = location
        event.startTime = startTime
        event.endTime = endTime

        await event.save()
        res.status(200).json(event)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
/*
1 done
2 done
3 done
4 done
5 done
6 done
7 done
8 done
9 done
 */