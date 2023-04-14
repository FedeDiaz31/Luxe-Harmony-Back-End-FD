const { Status } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
    const status = await Status.find()
    return res.json(status)
}

// Display the specified resource.
async function show(req, res) {
    const statusId = req.body.id;
    const status = await Status.findById(statusId)
    return res.json(status)
}

// Show the form for creating a new resource
async function create(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) { }

// Show the form for editing the specified resource.
async function edit(req, res) { }

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) { }


module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
};
