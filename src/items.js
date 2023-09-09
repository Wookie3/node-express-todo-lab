import express from 'express'
const router = express.Router()
const items = [{id: 1, task: "buy groceries"}, {id:2, task: "clean room"}]

router.get('/', (req, res) => {
    return res.json(items)
})

router.post('/', (req, res) => {
    const requiredProperties = ['id', 'task']
    let missingProperties = []

    requiredProperties.forEach(prop => {
        if (!req.body.hasOwnProperty(prop)) {
            missingProperties.push(prop)
        }
    })

    if (missingProperties.length) { // we do not need a specific comparison here because a 0 is essentially the same as false
        // we have missing properties!
        let errorMessage = []
        missingProperties.forEach(prop => {
            errorMessage.push(`Missing property: ${prop}`)
        })
        return res.status(400).json({ errors: errorMessage })
    }
    items.push(req.body)
    return res.status(201).json(req.body)
})

router.get('/:id', (req, res) => {
    return res.send(`You just requested item that should be with id ${req.params.id}`) // we are using the send function here because we are not returning an object but only a string
})

export default router