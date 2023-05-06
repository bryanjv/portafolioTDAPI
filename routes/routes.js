import { Router } from "express";
import DBase from '../class/Connection.js';

const dbase = new DBase();

const myRouter = Router();

myRouter.get("/api/v1/client/:email", async (req,res)=>{ //OK Traer Cliente por email
    try {
        const result = dbase.getClientsByEmail(req.params.email);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send("Error al traer Cliente por email")
    }
});

myRouter.get("/api/v1/clients", async (req,res) => { //OK Traer a todos los clientes
    try {
        const result = await dbase.getClients();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send("Error al traer los clientes");
    }
});

myRouter.post("/api/v1/client", async (req,res) => {  //OK Crear Cliente y usuario
    
    try {
        const user_details = {
            username: req.body.username,
            userpassword: req.body.userpassword,
            clientname: req.body.clientname,
            clientphone: req.body.clientphone,
            clientemail: req.body.clientemail
        }

        console.log(user_details);

        const result = await dbase.setClient(user_details);
        res.send("Se inserto el registro");
    } catch (error) {
        console.log(error);
        res.send("Error al crear cliente");
    }
})

myRouter.get("/api/v1/restaurants", async (req,res) => { //OK Trae todos los restaurantes
    try {
        const result = await dbase.getRestaurants();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({});
    }
})

myRouter.get("/api/v1/restaurant/:restaurantid", async (req,res) => {
    try {
        const result = await dbase.getRestaurantsById(req.params.restaurantid);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({});
    }
})

myRouter.post("/api/v1/restaurant", async (req,res) => { //OK Crear Restaurant
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

myRouter.get("/api/v1/restaurant/:restaurantid/menu", async (req,res) => { //Trae todos los platillos de un restaurant
    try {
        const result = await dbase.getMenuByRestaurant(req.params.restaurantid);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({});
    }
})

myRouter.post("api/v1/newmenu", async (req,res) => {
    try {
        
    } catch (error) {
        
    }
});

myRouter.post("/api/v1/user/restaurant", async (req,res) => { //OK Crea un empleado
    try {
        const user_restaurant_details = {
            username: req.body.username,
            user_restaurantname:req.body.user_restaurantname,
            user_restaurantid: req.body.user_restaurantid,
            userpassword: req.body.userpassword
        }

        console.log(req.body);

        const result = await dbase.setUserByRestaurant(user_restaurant_details);
        res.send("Se inserto el registro de Empleado");
    } catch (error) {
        console.log(error);
        res.send("Error al crear cliente");
    }
})

myRouter.get("/api/v1/user/:username", async (req,res) => { //OK Trae usuario por username
    try {
        const result = await dbase.getUserByUsername(req.params.username);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

export default myRouter;