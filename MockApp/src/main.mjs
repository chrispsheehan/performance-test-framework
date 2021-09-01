/**
 * My API Sandbox
 * 
 */

import { createUserHandler, getUsersHandler, getUserByIdHandler } from "users.mjs";

state.hellos = state.hellos || [];

// A basic route returning a canned response
Sandbox.define('/hello', 'get', function(req, res) {
    // send 'Hello world' response
    state.hellos.push({ welcome: "hi"});
    res.send('Hello world');
});

// Using stateful behaviour to simulate creating users
Sandbox.define('/users', 'POST', createUserHandler);

// Using stateful behaviour to simulate getting all users
Sandbox.define('/users', 'GET', getUsersHandler);

// Using named route parameters to simulate getting a specific user
Sandbox.define('/users/{userid}', 'GET', getUserByIdHandler);