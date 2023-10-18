import express from "express"
import mysql2 from "mysql2"
import cors from "cors"


const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "asmevet"
})

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Funcionando en el puerto ${PORT}`);
})



/* Obtener los servicios */
app.get("/servicios", (req,res)=>{
    const q = "SELECT * FROM servicios"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/*  Crear nuevos servicios*/
app.post("/servicios", (req,res)=>{
    const q = "INSERT INTO servicios (`nombre`, `descripcion`, `imagen`) VALUES (?)";
    const values = [
        req.body.nombre,
        req.body.descripcion,
        req.body.imagen,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Servicio Creado");
    })
})

/* Modificar Disponibilidad de un servicio */
app.patch('/servicios', (req,res)=>{
    const id = req.body.idServicio
    const q = "UPDATE servicios SET disponible = 0 WHERE idServicio = ?"

    db.query(q,[id], (err,results)=>{
        if(err) return res.json(err)
        return res.json("Disponibilidad Actualizada Correctamente")
    })
})

app.use(express.json())
