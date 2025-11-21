const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const app = express();
const port = 3001;

//Middleware
app.use(express.json());

//Conexion a la base de datos 
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri); 
//variable donde se guardara la bd
let db; 

//funcion de conexion
async function connectDB() {
    try {
        await client.connect();
        db = client.db('db_logistica_social');
        console.log('Conexion exitosa con la base de datos');
    } catch (error) {
        console.error('Conexion errónea ', error);
    }
}


// Llamando a la funcion
connectDB();

//Creando las rutas(endpoints)


//Ruta /users
//POST
app.post('/users', async(req,res) =>{
    try {
        //Simulamos que enviamos de un formulario los datos(POSTMAN o ThunderClient)
        const {username, full_name, email, registered_date} = req.body;
        const result = await db.collection('users').insertOne({username, full_name, email,registered_date});
        res.status(201).json({id: result.insertedId});
    } catch (error) {
        res.status(500).json({error: 'Error al crear el usuario'});
    }
})

// GET
app.get('/users', async(req,res)=>{
    try {
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: 'Error al tratar de objetener los usuarios'});
    }
})

// PUT
app.put('/users/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const {username, full_name, email, registered_date} = req.body;
        const result = await db.collection('users').updateOne(
            {_id : new ObjectId(id)},
            {$set:{username, full_name, email, registered_date}}
        )
        if(result.matchedCount === 0){
            return res.status(404).json({message: 'Usuario no actualizado'})
        }
        res.status(200).json({message:'Usuario actualizado'});
    } catch (error) {
                res.status(500).json({error: 'Error al actualizar el usuario'});
    }
})

// DELETE
app.delete('/users/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await db.collection('users').deleteOne({
            _id: new ObjectId(id)
        });
        if(result.deletedCount ===0){
            return res.status(404).json({message: 'No encontrado'});
        }
        res.status(200).json({message:'Usuario eliminado'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el usuario'});
    }
})


//Ruta /logistic_providers
//POST
app.post('/logistic_providers', async(req,res)=>{
    try {
        const {company_name, ruc, contact_email, services} = req.body;
        const result = await db.collection('logistic_providers').insertOne({company_name,ruc, contact_email, services});
        res.status(201).json({id:result.insertedId});
    } catch (error) {
        res.status(500).json({error: 'Error al crear el distribuidor'});
    }
})

// GET
app.get('/logistic_providers', async(req,res)=>{
    try {
        const providers = await db.collection('logistic_providers').find().toArray();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({error: 'Error al tratar de traer los providers'});
    }
})

// PUT
app.put('/logistic_providers/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const {company_name, ruc, contact_email, services} = req.body;
        const result = await db.collection('logistic_providers').updateOne(
            {_id : new ObjectId(id)},
            {$set:{company_name, ruc, contact_email, services}}
        )
        if(result.matchedCount === 0){
            return res.status(404).json({message: 'Provedor de Logistica no actualizado'})
        }
        res.status(200).json({message:'Proveedor actualizado'});
    } catch (error) {
                res.status(500).json({error: 'Error al actualizar el proveedor'});
    }
})

//DELETE
app.delete('/logistic_providers/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await db.collection('logistic_providers').deleteOne({
            _id: new ObjectId(id)
        });
        if(result.deletedCount ===0){
            return res.status(404).json({message: 'No encontrado'});
        }
        res.status(200).json({message:'Proveedor eliminado'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el proveedor'});
    }
})


//Ruta /reviews
//POST
app.post('/reviews', async(req,res)=>{
    try {
        const {userId, providerId, title, content, rating, created_at} = req.body;
        const result = await db.collection('reviews').insertOne({
            userId,
            providerId,
            title,
            content,
            rating,
            created_at
        });
        res.status(201).json({id:result.insertedId});
    } catch (error) {
        res.status(500).json({error: 'Error al crear la review'});
    }
})

// GET
app.get('/reviews', async(req,res)=>{
    try {
        const reviews = await db.collection('reviews').find().toArray();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({error: 'Error al tratar de traer las reviews'});
    }
})

//PUT
app.put('/reviews/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const {userId, providerId, title, content, rating, created_at} = req.body;
        const result = await db.collection('reviews').updateOne(
            {_id : new ObjectId(id)},
            {$set:{userId, providerId, title, content, rating, created_at}}
        )
        if(result.matchedCount === 0){
            return res.status(404).json({message: 'Reviews no actualizado'})
        }
        res.status(200).json({message:'Review actualizado'});
    } catch (error) {
                res.status(500).json({error: 'Error al actualizar la review'});
    }
})

//DELETE
app.delete('/reviews/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await db.collection('reviews').deleteOne({
            _id: new ObjectId(id)
        });
        if(result.deletedCount ===0){
            return res.status(404).json({message: 'No encontrado'});
        }
        res.status(200).json({message:'Review eliminado'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la review'});
    }
})


//Ruta /posts
//POSTS
/*app.post('/posts', async(req,res)=>{
    try {
        const {dato1, dato2, dato3, dato4, dato5} = req.body;
        const result = await db.collection('posts').insertOne({
            dato1,
            dato2,
            dato3,
            dato4,
            dato5
        });
        res.status(201).json({id:result.insertedId});
    } catch (error) {
        res.status(500).json({error: 'Error al crear el post'});
    }
})


// GET
app.get('/posts', async(req,res)=>{
    try {
        const posts = await db.collection('posts').find().toArray();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: 'Error al tratar de traer los posts'});
    }
})



//PUT
app.put('/posts/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const {dato1, dato2, dato3, dato4, dato5} = req.body;
        const result = await db.collection('posts').updateOne(
            {_id : new ObjectId(id)},
            {$set:{dato1, dato2, dato3, dato4, dato5}}
        )
        if(result.matchedCount === 0){
            return res.status(404).json({message: 'Post no actualizado'})
        }
        res.status(200).json({message:'Post actualizado'});
    } catch (error) {
                res.status(500).json({error: 'Error al actualizar el posts'});
    }
})


//DELETE
app.delete('/posts/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await db.collection('posts').deleteOne({
            _id: new ObjectId(id)
        });
        if(result.deletedCount ===0){
            return res.status(404).json({message: 'No encontrado'});
        }
        res.status(200).json({message:'Post eliminado'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el post'});
    }
})


*/


//Ruta /messages
//POST
/*app.post('/messages', async(req,res)=>{

    try {
        const {dato1, dato2, dato3, dato4, dato5} = req.body;
        const result = await db.collection('reviews').insertOne({
            dato1,
            dato2,
            dato3,
            dato4,
            dato5
        });
        res.status(201).json({id:result.insertedId});
    } catch (error) {
        res.status(500).json({error: 'Error al crear el mensaje'});
    }
})

// GET
app.get('/messages', async(req,res)=>{
    try {
        const messages = await db.collection('messages').find().toArray();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({error: 'Error al tratar de traer los mensajes'});
    }
})

//PUT
app.put('/messages/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const {dato1, dato2, dato3, dato4, dato5} = req.body;
        const result = await db.collection('messages').updateOne(
            {_id : new ObjectId(id)},
            {$set:{dato1, dato2, dato3, dato4, dato5}}
        )
        if(result.matchedCount === 0){
            return res.status(404).json({message: 'Mensaje no actualizado'})
        }
        res.status(200).json({message:'Mensaje actualizado'});
    } catch (error) {
                res.status(500).json({error: 'Error al actualizar el mensaje'});
    }
})

//DELETE
app.delete('/messages/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await db.collection('messages').deleteOne({
            _id: new ObjectId(id)
        });
        if(result.deletedCount ===0){
            return res.status(404).json({message: 'No encontrado'});
        }
        res.status(200).json({message:'Mensaje eliminado'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el mensaje'});
    }
})


*/



app.listen(port, ()=> console.log(`Hola mundo en el puerto ${port}`));