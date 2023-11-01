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

/* Actualizar infromacion de los servicios */
app.put('/servicios', (req,res)=>{
    const id = req.body.idServicio
    const q = "UPDATE servicios SET `nombre` = ?, `descripcion` = ?, `imagen` = ? WHERE idServicio = ?"

    const values = [
        req.body.nombre,
        req.body.descripcion,
        req.body.imagen,
    ]

    db.query(q,[...values, id], (err,results)=>{
        if(err) return res.json(err)
        return res.json("El servicio se ha actualizado correctamente")
    })
})

app.use(express.json())
