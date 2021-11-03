const Task = require('../models/Task');

// Create
module.exports = class TaskController {
  static createTask(req, res) {
    res.render('tasks/create');
  }
  // Method Save
  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);

    res.redirect('/tasks');
  }
  // Deletando
  static async removeTask(req, res) {
    const id = req.body.id;

    await Task.destroy({ where: { id: id } });

    res.redirect('/tasks');
  }
  // update editando dados da tabela
  static async updateTask(req, res) {
    const id = req.params.id;

    const task = await Task.findOne({ where: { id: id }, raw: true });

    res.render('tasks/edit', { task });
  }
  // method post for update table
  static async updateTaskPost(req, res) {
    const id = req.body.id;

    const task = {
      title: req.body.title,
      description: req.body.description,
    };

    await Task.update(task, { where: { id: id } });
    res.redirect('/tasks');
  }
  // change status done task
  static async toggleTaskStatus(req, res) {
    const id = req.body.id;

    const task = {
      done: req.body.done === '0' ? true : false,
    };

    await Task.update(task, { where: { id: id } });

    res.redirect('/tasks');
  }

  // Resgatando dados
  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    res.render('tasks/all', { tasks });
  }
};
