import express from 'express';
const loanRouter = express.Router();
import { createLoan,getLoan,showStats,updateLoan } from '../controllers/loanController.js';

loanRouter.route('/').post(createLoan);
loanRouter.route('/stats').get(showStats);
loanRouter.route('/:id').patch(updateLoan).get(getLoan);

export default loanRouter;