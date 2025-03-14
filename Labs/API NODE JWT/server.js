import express from 'express'
import publicRoutes from './routes/public.js'
import privateRouters from'./routes/private.js';

import auth from './middlewares/auth.js'

const app = express();
app.use(express.json()); 

app.use('/', publicRoutes); 
app.use('/', auth, privateRouters) // Antes de entrar na rota privada, ira passar pelo auth

app.listen(3000, () => {
    console.log("SERVIDOR RODANDO!")
})
