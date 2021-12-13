let express = require("express");
let axios = require("axios");
let port = 3000;
let app = express();

async function fetchPokemon(x) {
    // var randomNumb = Math.floor(Math.random() * 898);
    // console.log(randomNumb);
    let regions =
        [
            {
                region: "Kanto",
                id: 151
            },
            {
                region: "Johto",
                id: 248
            },
            {
                region: "Hoenn",
                id: 386
            },
            {
                region: "Sinnoh",
                id: 493
            },
            {
                region: "Unova",
                id: 649
            },
            {
                region: "Kalos",
                id: 721
            },
            {
                region: "Alola",
                id: 809
            },
            {
                region: "Galar",
                id: 898
            }
        ];
    let pokeObj = await axios.get("https://pokeapi.co/api/v2/pokemon/" + x)
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log(Object.keys(res));
            console.log(Object.values(res));
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);
            let reg;
            for (let i = 0; i < 8; i++) {
                if (x <= regions[i].id) {
                    reg = regions[i].region;
                    break;
                }
            }
            let tempPokemonObject = {
                pokemonID: res.data.id,
                name: res.data.species.name,
                type: res.data.types[0].type.name,
                region: reg,
                image: res.data.sprites.front_default
            }
            //checking the type of the response
            //let charURL = move.results[3].url;
            //changing the JSON object to a string to pass into writeData to print into a file
            return tempPokemonObject;
        })
        .catch(err => {
            console.log('Error: ', err.message);
            return "The Pokemon API is having technical issues.";
        });
    return pokeObj;
}
app.get('/', (req, res) => {
    res.send('<h1>Pokemon API DEMO</h1> <h4>Message: Successs again </h4><p>Version 2.xxxx</p>');
});

//API ENDPOINT to get pokemon data
app.get("/api/:id", async function (req, res) {
    var pokemonObj = await fetchPokemon(req.params.id);
    console.log(pokemonObj);
    res.send(pokemonObj);
});
var server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});