import 'package:amigo_gigante_app/animals/model/animal.dart';
import 'package:flutter/material.dart';

class Reptile extends Animal{
  String name;
  num maintenance;
  bool extremities;
  String type;
  String danger;
  String food;
  String raza;
  String img;
  int nMatch;
  Reptile({Key key,this.name,this.maintenance,this.extremities,this.type,this.danger,this.food,this.raza,this.img,this.nMatch});

  String getName(){
    return '${this.name}';
  }
  String getNmatch(){
    return '${this.nMatch}';
  }
  factory Reptile.fromJson(Map<String,dynamic> parsedJson){
      
      return new Reptile(
        name: parsedJson['name'],
        extremities: parsedJson['extremities'],
        type: parsedJson['type'],
        danger: parsedJson['danger'],
        food: parsedJson['food'],
        maintenance: parsedJson['maintenance'],
        raza: parsedJson['raza'],
        img: parsedJson['photo'],
        nMatch: parsedJson['nMatch']
      );

    }
}
 
 