import pg from "pg";
import { HOST, USER, DATABASE, PGPASSWORD, PGPORT } from '../src/config.js';

export default class DBase {
    constructor() {
        this.pool = exportConnection();
    };

    async getClients() {
        const result = await this.pool.query("SELECT * FROM client");
        result.release;
        return result.rows;
    }

    async getClientsByEmail(email) {
        const result = await this.pool.query("SELECT (clientname,clientphone,clientemail FROM client WHERE clientemail=$1)", [email]);
        result.release;
        return result.rows
    }

    async setClient(user_details) {
        const result = await this.pool.query(
        `insert into 
            "user" 
            (
                username, 
                userpassword
                )
            values
            (
                $1, 
                $2
        ) RETURNING userid`
        ,[user_details.username,user_details.userpassword]);

        const result2 = await this.pool.query(
        `insert into 
            client 
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
        
        return true;

    }

    async editClient() {
        //Logica para editar un cliente
    }

    async deleteClient() {
        //Logica para eliminar un cliente
    }

    async getRestaurants() {
        const result = await this.pool.query("SELECT (restaurantrut,restaurantname,restaurantaddress,restaurantphone,restaurantemail,districtname,regionname FROM restaurant INNER JOIN district ON restaurant.distric_id = district.districtid INNER JOIN region ON restaurant.region_id = region.regionid");
        result.release;
        return result.rows;
    }

    async getRestaurantsByRut(rut) {
        const result = await this.pool.query("SELECT (restaurantrut,restaurantname,restaurantaddress,restaurantphone,restaurantemail,districtname,regionname FROM restaurant INNER JOIN district ON restaurant.distric_id = district.districtid INNER JOIN region ON restaurant.region_id = region.regionid WHERE restaurantrut = $1)", [rut]);
        result.release;
        return result.rows;
    }

    async setRestaurant(restaurant_details) {
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

        return true; 
    }

    async editRestaurant() {
        //Logica para editar un restaurant
    }

    async deleteRestaurant() {
        //Logica para eliminar un restaurant
    }

    async getOrderByRestaurant(restaurantid) {
        const result = await this.pool.query("SELECT (orderid, ordertable, orderstate, ordername, clientname FROM order INNER JOIN client ON order.client_id = client.clientid INNER JOIN restaurant ON order.restaurantid = restaurant.restaurantid WHERE restaurantid = $1", [restaurantid]);
        result.release;
        return result.rows;
    }

    async getOrderByClient(clientid) {
        const result = await this.pool.query("SELECT (orderid, ordertable, orderstate, ordername, clientname FROM order INNER JOIN client ON order.client_id = client.clientid WHERE clientid = $1", [clientid]);
        result.release;
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
        const result = await this.pool.query("SELECT (menuname, menuprice, categoryname) FROM ")
    }

    async setMenu(menu_details){
        const result = await this.pool.query(
            `insert into 
                menu 
                (
                    menuname, 
                    menuprice, 
                    category_id, 
                    restaurant_id
                    )
                values
                (
                    $1, 
                    $2, 
                    $3, 
                    $4
            );`
            ,[menu_details.menuname, menu_details.menuprice, 1, 1])
            
            result.release;
            
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

    async GetUsers() {
        //Logica para traer a todos los usuarios
    }

    async GetUserById() {
        //Logica para traer un usuario especifico por su id
    }

    async SetUser() {
        //Logica para crear un nuevo usuario
    }

    async EditUser() {
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
