const TiposFilmesEnum = Object.freeze({ TERROR: 'terror', COMEDIA: 'comedia', CULT: 'cult' });

const Filmes = [
    {
        id: 1,
        titulo: 'A Bolha Assassina',
        tipo: TiposFilmesEnum.TERROR,
        diretor: 'Cuck Russell',
        ano: '1988',
        foto: 'img/theblob.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
            iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
            vero nulla aspernatur nemo, unde saepe.`,
        preco: 19.99
    },
    {
        id: 2,
        titulo: 'The Thing',
        tipo: TiposFilmesEnum.TERROR,
        diretor: 'John Carpenter',
        ano: '1983',
        foto: 'img/thething.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 20.99
    },
    {
        id: 3,
        titulo: 'Apertem os Cintos... O Piloto Sumiu!',
        tipo: TiposFilmesEnum.COMEDIA,
        diretor: 'David Zucker, Jim Abrahams, Jerry Zucker',
        ano: '1980',
        foto: 'img/airplane.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 9.99
    },
    {
        id: 4,
        titulo: 'Bob Esponja: O Filme',
        tipo: TiposFilmesEnum.COMEDIA,
        diretor: 'Stephen Hillenburg, Mark Osborne',
        ano: '2004',
        foto: 'img/bobesponja.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 4.99
    },
    {
        id: 5,
        titulo: 'Eraserhead',
        tipo: TiposFilmesEnum.CULT,
        diretor: 'David Lynch',
        ano: '1977',
        foto: 'img/eraserhead.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 19.99
    },
    {
        id: 6,
        titulo: 'O Sétimo Selo',
        tipo: TiposFilmesEnum.CULT,
        diretor: 'Ingmar Bergman',
        ano: '1959',
        foto: 'img/setimoselo.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 29.99
    },
    {
        id: 7,
        titulo: 'Dr. Strangelove',
        tipo: TiposFilmesEnum.CULT,
        diretor: 'Stanley Kubrick',
        ano: '1964',
        foto: 'img/drstrangelove.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 19.99,
        avaliacao: { nota: 5, escala: 5 },
        fornecedor: 'Trabalho Final - João Leonardo',
        infoExterna: 'https://en.wikipedia.org/wiki/Dr._Strangelove',
        imagens: [
            'img/drstrangelove-banner.jpg',
            'img/drstrangelove-banner-2.jpg',
            'img/drstrangelove-banner-3.jpg',
        ]
    },
    {
        id: 8,
        titulo: 'Metropolis',
        tipo: TiposFilmesEnum.CULT,
        diretor: 'Fritz Lang',
        ano: '1927',
        foto: 'img/metropolis.jpg',
        sinopse: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicab delectus
        iste sit soluta vitae corporis molestias quis consequatur quibusdam? Eos accusantium neque id
        vero nulla aspernatur nemo, unde saepe.`,
        preco: 39.99
    },
];

const HomepageText = `
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
    since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`

const ParcelaMaxima = {
    parcelas: 5,
};

const FreteNormal = {
    id: 1,
    texto: 'Grátis',
    valor: null,
    prazo: '8 a 10 dias úteis'
};

const FreteExpresso = {
    id: 2,
    texto: 'R$',
    valor: 22.86,
    prazo: '2 a 4 dias úteis'
};
