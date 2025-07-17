function buscarPokemon() {
    const nome = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(data => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p><strong>Altura:</strong> ${data.height}</p>
                <p><strong>Peso:</strong> ${data.weight}</p>
                <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}

let selecionados = [];

async function escolhePkm(id) {
  const box = document.getElementById(`pkm-${id}`);

  try {
    let id_pokedex;

    // Gera um ID que ainda não foi selecionado
    do {
      id_pokedex = Math.floor(Math.random() * 151) + 1;
    } while (selecionados.includes(id_pokedex));

    selecionados.push(id_pokedex);

    const shinny_factor = Math.floor(Math.random() * 20)

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_pokedex}`);
    const data = await response.json();

    const shiny = shinny_factor !== 1 ? 'normal' : 'shiny';
    console.log(shiny)

    const linkPkm3D = `https://projectpokemon.org/images/${shiny}-sprite/${data.name}.gif`
    // Mostra o nome e a imagem do Pokémon
    box.innerHTML = `
      <img class="pkm-img" src="${linkPkm3D}" alt="${data.name}" style="width: 100%; heigth:100%">
    `;
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    box.innerHTML = 'Erro ao buscar Pokémon!';
  }
}

async function preencherTodosPokemons() {
  // Limpa a lista de IDs já selecionados
  selecionados = [];
  mostrarLogo(true)
  // Executa a função de seleção para cada box de 1 a 6
  await sleep(2000)
  mostrarLogo(false)
  for (let i = 1; i <= 6; i++) {
    await escolhePkm(i);
  }


}

function resetarPokemons() {
  selecionados = [];

  for (let i = 1; i <= 6; i++) {
    const box = document.getElementById(`pkm-${i}`);
    box.innerHTML = `<i class="fi fi-sr-plus"></i>`;
    box.setAttribute("onclick", `escolhePkm(${i})`);
  }
}

function mostrarLogo(bool) {
  const container = document.getElementById("text-logo");

  if (bool) {
    // Remove o <h2> se existir
    const h2 = container.querySelector("h2");
    if (h2) {
      container.removeChild(h2);
    }

    // Adiciona a Pokébola se ainda não estiver presente
    if (!container.querySelector(".container-pkball")) {
      const pkballDiv = document.createElement("div");
      pkballDiv.className = "container-pkball";
      pkballDiv.innerHTML = `
        <img class="animated-img" src="assets/pok.jpg" alt="Pokémon">
      `;
      container.appendChild(pkballDiv);
    }

  } else {
    // Remove a Pokébola se existir
    const pkball = container.querySelector(".container-pkball");
    if (pkball) {
      container.removeChild(pkball);
    }

    // Adiciona o <h2> se ainda não estiver presente
    if (!container.querySelector("h2")) {
      const h2 = document.createElement("h2");
      h2.innerHTML = `“Select 
        <span class="underline">POKÉMON</span>
        to add to your party. Any slots left empty will be filled in to create a strategic team.”`;
      container.appendChild(h2);
    }
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


    function getRandomImage() {
      const images = [
        "https://projectpokemon.org/images/shiny-sprite/charizard.gif",
        "https://projectpokemon.org/images/normal-sprite/charizard.gif",
        "https://projectpokemon.org/images/normal-sprite/pikachu-kantocap.gif",
        "https://projectpokemon.org/images/normal-sprite/venomoth.gif",
        "https://projectpokemon.org/images/shiny-sprite/marowak-totem.gif",
        "https://projectpokemon.org/images/shiny-sprite/aerodactyl-mega.gif",
        "https://projectpokemon.org/images/normal-sprite/articuno.gif",
        "https://projectpokemon.org/images/normal-sprite/zapdos.gif",
        "https://projectpokemon.org/images/normal-sprite/moltres.gif",
        "https://projectpokemon.org/images/normal-sprite/dragonite.gif",
        "https://projectpokemon.org/images/normal-sprite/mewtwo-megay.gif",
        "https://projectpokemon.org/images/normal-sprite/mew.gif",
        "https://static.wikia.nocookie.net/theairridegroup/images/d/d3/Rayquaza_BW.gif/revision/latest?cb=20161009174358"
      ];

      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    }

    // Define a imagem assim que a página carregar
    document.getElementById("pokeImg").src = getRandomImage();