import pg from "pg";
import { HOST, USER, DATABASE, PGPASSWORD, PGPORT } from '../src/config.js';

export default class DBase {
    constructor() {
        this.pool = exportConnection();
    };

    async getClients() {
        console.log("INICIO DE QUERY getClients");
        const result = await this.pool.query("SELECT * FROM client");
        result.release;
        console.log("FIN DE QUERY getClients");
        return result.rows;
    }

    async getClientsByEmail(email) {
        console.log("INICIO DE QUERY getClientsByEmail");
        const result = await this.pool.query("SELECT clientname,clientphone,clientemail FROM client WHERE clientemail=$1)", [email]);
        result.release;
        console.log("FIN DE QUERY getClientsByEmail");
        return result.rows
    }

    async setClient(user_details) {
        console.log("INICIO DE QUERY setClient");
        const result = await this.pool.query(
        `insert into 
            "user" 
            (
                username, 
                userpassword,
                isEmployee
                )
            values
            (
                $1, 
                $2,
                false
        ) RETURNING userid`
        ,[user_details.username, user_details.userpassword]);
        console.log(result);

        const result2 = await this.pool.query(
        `insert into 
            "client" 
            ( 
                clientname, 
                clientphone, 
                clientemail, 
                user_id
                )
            values
            (
                $1, 
                $2, 
                $3, 
                $4
        )`
        ,[user_details.clientname, user_details.clientphone, user_details.clientemail, result.rows[0].userid])
        
        result.release;
        result2.release;
        console.log("FIN DE QUERY setClient");
        return true;

    }

    async editClient() {
        //Logica para editar un cliente
    }

    async deleteClient() {
        //Logica para eliminar un cliente
    }

    async getRestaurants() {
        console.log("INICIO DE QUERY getRestaurants");
        const result = await this.pool.query("SELECT restaurantid,restaurantrut,restaurantname,restaurantaddress,restaurantphone,restaurantemail,districtname,regionname FROM restaurant INNER JOIN district ON restaurant.district_id = district.districtid INNER JOIN region ON restaurant.region_id = region.regionid");
        result.release;
        console.log("FIN DE QUERY getRestaurants");
        return result.rows;
    }

    async getRestaurantsById(id) {
        console.log("INICIO DE QUERY getRestaurantsById");
        const result = await this.pool.query(`SELECT restaurantid,restaurantrut,restaurantname,restaurantaddress,restaurantphone,restaurantemail,districtname,regionname FROM restaurant INNER JOIN district ON restaurant.district_id = district.districtid INNER JOIN region ON restaurant.region_id = region.regionid WHERE restaurantid = $1`, [id]);
        result.release;
        console.log("FIN DE QUERY getRestaurantsById");
        return result.rows;
    }

    async setRestaurant(restaurant_details) {
        console.log("INICIO DE QUERY setRestaurant");
        const result = await this.pool.query(
            `insert into 
                restaurant 
                (
                    restaurantrut, 
                    restaurantname,
                    restaurantaddress, 
                    restaurantphone, 
                    restaurantemail, 
                    district_id,
                    region_id
                    )
                values
                (
                    $1, 
                    $2, 
                    $3, 
                    $4,
                    $5,
                    $6,
                    $7
            )`
            ,[restaurant_details.restaurantrut, restaurant_details.restaurantname, restaurant_details.restaurantaddress, restaurant_details.restaurantphone, restaurant_details.restaurantemail, 1,1])
            
        result.release;
        console.log("FIN DE QUERY setRestaurant");

        return true; 
    }

    async editRestaurant() {
        //Logica para editar un restaurant
    }

    async deleteRestaurant() {
        //Logica para eliminar un restaurant
    }

    async getOrderByRestaurant(restaurantid) {
        console.log("INICIO DE QUERY getOrderByRestaurant");
        const result = await this.pool.query("SELECT (orderid, ordertable, orderstate, ordername, clientname FROM order INNER JOIN client ON order.client_id = client.clientid INNER JOIN restaurant ON order.restaurantid = restaurant.restaurantid WHERE restaurantid = $1", [restaurantid]);
        result.release;
        console.log("FIN DE QUERY getOrderByRestaurant");
        return result.rows;
    }

    async getOrderByClient(clientid) {
        console.log("INICIO DE QUERY getOrderByClient");
        const result = await this.pool.query("SELECT (orderid, ordertable, orderstate, ordername, clientname FROM order INNER JOIN client ON order.client_id = client.clientid WHERE clientid = $1", [clientid]);
        result.release;
        console.log("FIN DE QUERY getOrderByClient");
        return result.rows;
    }

    async setOrder() {
        //Logica para agregar nueva orden
    }

    async editOrder() {
        //logica para editar orden
    }

    async deleteOrder() {
        //Logica para eliminar una orden
    }

    async getMenuByRestaurant(restaurantid) {
        console.log("INICIO DE QUERY getMenuByRestaurant");
        const result = await this.pool.query("SELECT menuname, menuprice, stock, categoryname FROM menu INNER JOIN category ON menu.category_id = category.categoryid WHERE restaurant_id = $1", [restaurantid])
        console.log("FIN DE QUERY getMenuByRestaurant");

        return result.rows;
    }

    async setMenu(menu_details){
        console.log("INICIO DE QUERY setMenu");
        const result = await this.pool.query(
            `insert into 
                menu 
                (
                    menuname, 
                    menuprice,
                    stock, 
                    category_id, 
                    restaurant_id,
                    )
                values
                (
                    $1, 
                    $2, 
                    $3, 
                    $4,
                    $5
            );`
            ,[menu_details.menuname, menu_details.menuprice, menu_details.stock, 1, 1])
            
        result.release;
        console.log("FIN DE QUERY setMenu");

            return true; 
    }

    async editMenu() {
        //Logica para editar un plato de un restaurant
    }

    async deleteMenu() {
        //Logica para eliminar un plato de un restaurant
    }

    async getCategory() {
        //Logica para obtener categorias
    }

    async setCategory() {
        //Logica para crear una categoria
    }

    async editCategory() {
        //Logica para editar el nombre de una categoria
    }

    async deleteCategory() {
        //Logica para eliminar una categoria
    }

    async getMenuOrderbyId(orderid) {
        //Logica para obtener los detalles de una orden
    }

    async getUsers() {
        //Logica para traer a todos los usuarios
    }

    async getUserByUsername(username){
        console.log("INICIO DE QUERY getUserByUsername");
        const result = await this.pool.query("SELECT userid, username, userpassword, isemployee FROM public.user WHERE username=$1",[username])
        
        if (result.rows[0].isemployee == true){
            const result2 =  await this.pool.query("SELECT userid, username, userpassword, isemployee, restaurant_id, user_restaurant_name FROM public.user INNER JOIN user_restaurant ON public.user.userid = user_restaurant.user_id WHERE username=$1",[username])

            console.log("FIN DE QUERY getUserByUsername ADMIN MODE");
            return result2.rows
        }
        console.log("FIN DE QUERY getUserByUsername");

        return result.rows;
    }

    async setUserByRestaurant(user_restaurant_details){
        console.log("INICIO DE QUERY setUserByRestaurant");
        console.log(user_restaurant_details);
        const result = await this.pool.query(
        `insert into 
            "user" 
            (
                username, 
                userpassword,
                isEmployee
                )
            values
            (
                $1, 
                $2,
                true
        ) RETURNING userid`
        ,[user_restaurant_details.username, user_restaurant_details.userpassword]);
        
        const result2 = await this.pool.query(
            `insert into 
                user_restaurant
                (
                    user_id,
                    restaurant_id,
                    user_restaurant_name
                    )
                values
                (
                    $1, 
                    $2,
                    $3
            )`
            ,[result.rows[0].userid, user_restaurant_details.user_restaurantid, user_restaurant_details.user_restaurantname]);
        
        result.release;
        result2.release;

        return true;
    }

    async editUser() {
        //Logica para editar un usuario
    }

    async deleteUser() {
        //Logica para eliminar un usuario
    }

};

function exportConnection() {

    const { Pool } = pg;

    const pool = new Pool({
        host: HOST,
        user: USER,
        database: DATABASE,
        password: PGPASSWORD,
        port: PGPORT
    })

    pool.connect((err, client, done) => {
        if (err) throw (err)
    })

    return pool;
};
