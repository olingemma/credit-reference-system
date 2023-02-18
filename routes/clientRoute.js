import express from 'express';
import {deleteClient, createClient,getAllClients,getSingleClient } from '../controllers/clientController.js';
const clientRouter = express.Router();

clientRouter.route('/').post(createClient).get(getAllClients);
clientRouter.route('/:id').delete(deleteClient).get(getSingleClient);
// clientRouter.route('/info/:id').get(getSingleClient);

export default clientRouter