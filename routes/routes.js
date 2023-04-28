import { Router } from "express";
import DBase from '../class/Connection.js';

const dbase = new DBase();

const myRouter = Router();

myRouter.get("/api/v1/client/:email", async (req,res)=>{ //Traer Cliente por email
    try {
        const result = dbase.getClientsByEmail(req.params.email);
        res.json(result);
    } catch (error) {
        res.send("Error al traer Cliente por email")
    }
});

myRouter.get("/api/v1/clients", async (req,res) => {
    try {
        const result = await dbase.getClients();
        res.json(result);
    } catch (error) {
        res.send("Error al traer los clientes");
    }
});

myRouter.post("/api/v1/client", async (req,res) => {  //Crear Cliente y usuario
    
    try {
        const user_details = {
            username: req.body.username,
            userpassword: req.body.password,
            clientname: req.body.name,
            clientphone: req.body.phone,
            clientemail: req.body.email
        }
        const result = await dbase.setClient(user_details);
        res.send("Se inserto el registro");
    } catch (error) {
        res.send("Error al crear cliente");
    }
})

myRouter.put("/api/v1/client/:clientid", async (req,res) => { //Modificar cliente
    try {
        const {id, nombre,apellido} = req.body;
        const resultado =  await pool.query("update personas set nombre =$1, apellido=$2 where id=$3",[nombre,apellido,id]);
        res.json({})
    } catch (error) {
        res.send("Error al modificar un cliente")
    }
});

myRouter.get("/api/v1/restaurant/:rut", async (req,res)=>{ //Traer Restaurant por id
    try {
        
    } catch (error) {
        
    }
});

myRouter.post("/api/v1/restaurant", async (req,res) => { //Crear Restaurant
    try {
        const restaurant_details = {
            restaurantrut: req.body.rut,
            restaurantname: req.body.name,
            restaurantphone: req.body.phone,
            restaurantemail: req.body.email,
            restaurantaddress: req.body.address
        }
        const result = await dbase.setRestaurant(restaurant_details);
        res.send("Se inserto el registro");
    } catch (error) {
        res.send("Error al crear cliente");
    }
});

myRouter.get("/api/v1/order/restaurants", async (req,res)=>{ //Traer todos los Restaurantes
    try {
        
    } catch (error) {
        
    }
})

myRouter.get("/api/v1/orders/restaurant/:restaurantid", async (req,res) => { //Traer todas las ordenes de un restaurant por id
    try {
        
    } catch (error) {
        
    }
})

myRouter.get("api/v1/orders/client/:clientid", async (req,res) => { //Traer todas las ordenes de un cliente por id
    try {
        //res.json(resultado)
    } catch (error) {
        
    }
})

myRouter.post("api/v1/newmenu", async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

export default myRouter;