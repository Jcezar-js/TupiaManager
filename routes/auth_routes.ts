import express from 'express';
import {auth_middleware} from '../middlewares/auth_middleware';
import {
  login,
  update_password
} from '../controllers/auth_controller';
import { create_rate_limiter, rate_limiter_login } from '../middlewares/rate_limiting';


const auth_router = express.Router();

auth_router.use(create_rate_limiter());

//Rotas de produto p�blicas
auth_router.post('/login', rate_limiter_login, login);

//Rotas protegidas
auth_router.patch('/updatepsw', auth_middleware, update_password);



export default auth_router;