export const createUserHandler = (req, res) => {
    // retrieve users or, if there are none, init to empty array
    state.users = state.users || [];

    // persist user by adding to the state object
    state.users.push(req.body);

    res.status(201);

    return res.json({id: req.body.id});
}

export const getUsersHandler = (req, res) => {
    // retrieve users or, if there are none init, to empty array
    state.users = state.users || [];

    res.status(200);

    return res.json(state.users);
}

export const getUserByIdHandler = (req, res) => {
    // retrieve users or, if there are none, init to empty array
    state.users = state.users || [];

    // route param {username} is available on req.params
    var userid = req.params.userid;

    // log it to the console
    console.log("Getting user " + userid + " details");

    // use lodash to find the user in the array
    var user = _.find(state.users, { "id": userid});

    res.status(200);

    return res.json(user);
}