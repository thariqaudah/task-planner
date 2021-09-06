const express = require('express')
const Task = require('../../models/Task')

const router = express.Router()

// @desc    Get all tasks
// @route   GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort('-createdAt')

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Get single task by id
// @route   GET /api/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id of ${req.params.id} is not found`,
      })
    }

    res.status(200).json({
      success: true,
      task,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Create new task
// @route   POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
    })
    res.status(201).json({
      success: true,
      task,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Update task
// @route   PUT /api/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id of ${req.params.id} is not found`,
      })
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      task,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Delete task
// @route   DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id of ${req.params.id} is not found`,
      })
    }

    await task.remove()

    res.status(200).json({
      success: true,
      task: {},
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
