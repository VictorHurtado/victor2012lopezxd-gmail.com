const { Router } = require('express');
const router= Router();
const animals=require("../models/animal");
const functionsAnimals=require('../functions/functions_animals');

//animales
const dogModel= animals.dog;
const catModel= animals.cat;
const birdModel= animals.bird;
const reptileModel= animals.reptile;
//rutas para animales
//_____________________________especiales perros____________________________

router.post('/api/dogs/analyzeDogs',async(req,res)=>{
    const myDogs= await dogModel.find();
    const body= req.body;
   
    const prototype={};
    var responses = JSON.parse(body.myResponses);
    for (const resp in responses) {
        //accedo a cada llave que llega por el json y extraigo la segunda posicion que corresponde a mi respuesta
       var mystring =responses[resp][1];
       //la respuesta vuelve a venir en formato json por lo que es necesario parsearlo y al realizar el parseo se añade este al objeto prototipo
       Object.assign(prototype,JSON.parse(mystring));
       
    }
    console.log(prototype);

    var myPreferences=[];
    for (const animal in myDogs) {
       
        value=functionsAnimals.compare(myDogs[animal],prototype);
        myPreferences.push(functionsAnimals.addProperty(myDogs[animal]['_doc'],value));
  
    }
    myPreferences.sort(function(a,b){
        return  (b.nMatch - a.nMatch);
    });
    var slicesMP= myPreferences.slice(0,3);
   
    res.json({mensaje:"terminado exitosamente",slicesMP});
    
});
//_____________________________especiales Gatos_______________________________
router.post('/api/cats/analyzeCats',async(req,res)=>{
    const myCats= await catModel.find();
    const body= req.body;
    
    var myPreferences=[];
    const prototype={};
    var responses = JSON.parse(body.myResponses);
    for (const resp in responses) {
        //accedo a cada llave que llega por el json y extraigo la segunda posicion que corresponde a mi respuesta
       var mystring =responses[resp][1];
       //la respuesta vuelve a venir en formato json por lo que es necesario parsearlo y al realizar el parseo se añade este al objeto prototipo
       Object.assign(prototype,JSON.parse(mystring));
       
    }
    for (const animal in myCats) {
       
        value=functionsAnimals.compare(myCats[animal]['_doc'],prototype);
        myPreferences.push(functionsAnimals.addProperty(myCats[animal]['_doc'],value));
  
    }
    myPreferences.sort(function(a,b){
        return  (b.nMatch - a.nMatch);
    });
    var slicesMP= myPreferences.slice(0,3);
    res.json({mensaje:"terminado exitosamente",slicesMP});
    
});
//_____________________________especiales Aves_______________________________
router.post('/api/birds/analyzeBirds',async(req,res)=>{
    const myBirds= await birdModel.find();
    const body= req.body;
    var myPreferences=[];
    const prototype={};
    var responses = JSON.parse(body.myResponses);
    for (const resp in responses) {
        //accedo a cada llave que llega por el json y extraigo la segunda posicion que corresponde a mi respuesta
       var mystring =responses[resp][1];
       //la respuesta vuelve a venir en formato json por lo que es necesario parsearlo y al realizar el parseo se añade este al objeto prototipo
       Object.assign(prototype,JSON.parse(mystring));
       
    }
    for (const animal in myBirds) {
       
        value=functionsAnimals.compare(myBirds[animal]['_doc'],prototype);
        myPreferences.push(functionsAnimals.addProperty(myBirds[animal]['_doc'],value));
  
    }
    myPreferences.sort(function(a,b){
        return  (b.nMatch - a.nMatch);
    });
    var slicesMP= myPreferences.slice(0,3);
    console.log(slicesMP);
    res.json({mensaje:"terminado exitosamente",slicesMP});
    
});
//_____________________________especiales Reptiles_______________________________
router.post('/api/reptiles/analyzeReptiles',async(req,res)=>{
    const myReptile= await reptileModel.find();
    const body= req.body;
    var myPreferences=[];
    const prototype={};
    var responses = JSON.parse(body.myResponses);
    for (const resp in responses) {
        //accedo a cada llave que llega por el json y extraigo la segunda posicion que corresponde a mi respuesta
       var mystring =responses[resp][1];
       //la respuesta vuelve a venir en formato json por lo que es necesario parsearlo y al realizar el parseo se añade este al objeto prototipo
       Object.assign(prototype,JSON.parse(mystring));
       
    }
    for (const animal in myReptile) {
       
        value=functionsAnimals.compare(myReptile[animal]['_doc'],prototype);
        myPreferences.push(functionsAnimals.addProperty(myReptile[animal]['_doc'],value));
  
    }
    myPreferences.sort(function(a,b){
        return  (b.nMatch - a.nMatch);
    });
    var slicesMP= myPreferences.slice(0,3);
    res.json({mensaje:"terminado exitosamente",slicesMP});
    
});
// perros
router.get('/api/dogs/extractDogs',async(req,res)=>{
    const totalDogs= await dogModel.find();
    console.log(totalDogs);
    res.json({mensaje:"se extrageron con exito todos los perros",totalDogs});
});
router.post('/api/dogs/generateDog',async(req,res)=>{

    const body = req.body;
   try {
    const newDog = await dogModel.create(body);
    res.status(200).json(newDog);
    
   } catch (error) {
       return res.status(500).json({
           mensaje: "no se logro generar el perro",
       });
   }
});
router.delete('/api/dogs/deleteDog/:id',async(req,res)=>{
    const _id= req.params.id;
    try {
        const dogdelete = await dogModel.findByIdAndDelete({_id});
        if(!dogdelete){
            return res.json({message:"no se encontro el id",error});
        }
        res.json({message:"Se elimino el perro con exito",dogdelete});
        
    } catch (error) {
        return res.json({
            message: 'ocurrio un error',
            error
        });
    }
});
// Gatos
router.get('/api/cats/extractCats',async(req,res)=>{
    const totalCats= await catModel.find();
    res.json({mensaje:"se extrageron con exito todos los gatos",totalCats});
});
router.post('/api/cats/generateCat',async(req,res)=>{
   
    const body = req.body;
   try {
    const newCat= await catModel.create(body);
    res.status(200).json(newCat);
    
   } catch (error) {
       return res.status(500).json({
           mensaje: "no se logro generar el gato",
       });
   }
});
router.delete('/api/cats/deleteCat/:id',async(req,res)=>{
    const _id= req.params.id;
    try {
        const catdelete = await catModel.findByIdAndDelete({_id});
        if(!catdelete){
            return res.json({message:"no se encontro el id",error});
        }
        res.json({message:"Se elimino la el gato con exito",catdelete});
        
    } catch (error) {
        return res.json({
            message: 'ocurrio un error',
            error
        });
    }
});
// Bird
router.get('/api/birds/extractBirds',async(req,res)=>{
    const totalBirds= await birdModel.find();
    res.json({mensaje:"se extrageron con exito",totalBirds});
});
router.post('/api/birds/generateBird',async(req,res)=>{
   
    const body = req.body;
   try {
    const newBird= await birdModel.create(body);
    res.status(200).json(newBird);
    
   } catch (error) {
       return res.status(500).json({
           mensaje: "no se logro generar",
       });
   }
});
router.delete('/api/birds/deleteBird/:id',async(req,res)=>{
    const _id= req.params.id;
    try {
        const birdDelete = await birdModel.findByIdAndDelete({_id});
        if(!birdDelete){
            return res.json({message:"no se encontro el id",error});
        }
        res.json({message:"Se elimino con exito",birdDelete});
        
    } catch (error) {
        return res.json({
            message: 'ocurrio un error',
            error
        });
    }
});
// Reptile
router.get('/api/reptiles/extractReptiles',async(req,res)=>{
    const totalReptiles= await reptileModel.find();
    res.json({mensaje:"se extrageron con exito todos los gatos",totalReptiles});
});
router.post('/api/reptiles/generateReptile',async(req,res)=>{
   
    const body = req.body;
   try {
    const newReptile= await reptileModel.create(body);
    res.status(200).json(newReptile);
    
   } catch (error) {
       return res.status(500).json({
           mensaje: "no se logro generar el gato",
       });
   }
});
router.delete('/api/reptiles/deleteReptile/:id',async(req,res)=>{
    const _id= req.params.id;
    try {
        const reptileDelete = await reptileModel.findByIdAndDelete({_id});
        if(!reptileDelete){
            return res.json({message:"no se encontro el id",error});
        }
        res.json({message:"Se elimino la el gato con exito",reptileDelete});
        
    } catch (error) {
        return res.json({
            message: 'ocurrio un error',
            error
        });
    }
});
module.exports=router;