const readline = require('readline-sync')
const axios = require('axios')
const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

function insertMongo(myobj){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("StarWars").insertOne(myobj, function(err, res) {
      if (err) throw err;
    //   console.log("1 document inserted");
      db.close();
    });
  });
}


async function getSW(){
    console.log(`Categorias existentes: 
[1] - Films
[2] - People
[3] - Starships
[4] - Vehicles
[5] - Species
[6] - Planets
`)
    const cat = readline.question('Digite uma categoria para consulta: ').toLocaleLowerCase()
    try{
        if (cat == 'films' || cat == '1'){
            const response = await axios.get(`https://swapi.dev/api/films/`)
            for (let i of response.data.results){

                var myobj = {
                    "Título": i.title, 
                    "Episódio": i.episode_id, 
                    "Diretor": i.director, 
                    "Produtor": i.producer, 
                    "Data de lançamento": i.release_date
                }

                insertMongo(myobj)

                console.log(`
                Título: ${i.title}
                Episódio: ${i.episode_id}
                Diretor: ${i.director}
                Produtor: ${i.producer}
                Data de lançamento: ${i.release_date}
                `)
            }
        } else if (cat == 'people' || cat == '2'){
            const response = await axios.get(`https://swapi.dev/api/people/`)
            for (let i of response.data.results){
                var myobj = {
                    "Nome": i.name, 
                    "Gênero": i.gender, 
                    "Altura": i.height, 
                    "Peso": i.mass
                }
                insertMongo(myobj)

                console.log(`
                Nome: ${i.name}
                Gênero: ${i.gender}
                Altura: ${i.height}
                Peso: ${i.mass}
                `)
            }
        } else if (cat == 'starships' || cat == '3'){
            const response = await axios.get(`https://swapi.dev/api/starships/`)
            for (let i of response.data.results){

                var myobj = {
                    "Nome": i.name, 
                    "Modelo": i.model, 
                    "Valor em créditos": i.cost_in_credits, 
                    "Velocidade máxima": i.max_atmosphering_speed,
                    "Passageiros": i.passengers,
                    "Classe": i.starship_class
                }
                insertMongo(myobj)

                console.log(`
                Nome: ${i.name}
                Modelo: ${i.model}
                Valor em créditos: ${i.cost_in_credits}
                Velocidade máxima: ${i.max_atmosphering_speed}
                Passageiros: ${i.passengers}
                Classe: ${i.starship_class}
                `)
            }
        } else if (cat == 'vehicles' || cat == '4'){
            const response = await axios.get(`https://swapi.dev/api/vehicles/`)
            for (let i of response.data.results){

                var myobj = {
                    "Nome": i.name, 
                    "Modelo": i.model, 
                    "Valor em créditos": i.cost_in_credits, 
                    "Velocidade máxima": i.max_atmosphering_speed,
                    "Passageiros": i.passengers,
                    "Classe": i.vehicle_class
                }
                insertMongo(myobj)

                console.log(`
                Nome: ${i.name}
                Modelo: ${i.model}
                Valor em créditos: ${i.cost_in_credits}
                Velocidade máxima: ${i.max_atmosphering_speed}
                Passageiros: ${i.passengers}
                Classe: ${i.vehicle_class}
                `)
            }
        } else if (cat == 'species' || cat == '5'){
            const response = await axios.get(`https://swapi.dev/api/species/`)
            for (let i of response.data.results){

                var myobj = {
                    "Nome": i.name, 
                    "Classificação": i.classification, 
                    "Raça": i.designation, 
                    "Altura média": i.average_height,
                    "Longevidade": i.average_lifespan,
                    "Idioma": i.language
                }
                insertMongo(myobj)
                
                console.log(`
                Nome: ${i.name}
                Classificação: ${i.classification}
                Raça: ${i.designation}
                Altura média: ${i.average_height}
                Longevidade: ${i.average_lifespan}
                Idioma: ${i.language}
                `)
            }
        } else if (cat == 'planets' || cat == '6'){
            const response = await axios.get(`https://swapi.dev/api/planets/`)
            for (let i of response.data.results){

                var myobj = {
                    "Nome": i.name, 
                    "Período de Órbita": i.orbital_period, 
                    "População": i.population, 
                    "Diâmetro": i.diameter,
                    "Clima": i.climate,
                    "Gravidade": i.gravity
                }
                insertMongo(myobj)

                console.log(`
                Nome: ${i.name}
                Período de Órbita: ${i.orbital_period}
                População: ${i.population}
                Diâmetro: ${i.diameter}
                Clima: ${i.climate}
                Gravidade: ${i.gravity}
                `)
            }
        }
    } catch(err){
        console.log('Categoria não encontrada!')
    }
}
getSW()
