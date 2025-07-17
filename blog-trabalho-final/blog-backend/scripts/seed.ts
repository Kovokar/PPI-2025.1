import sql from "../db";
import { Postagem } from "../models/Postagem";
import { Comentario } from "../models/Comentario";
import { Usuario } from "../models/Usuario";

async function seedDatabase() {
  try {
    console.log("Iniciando o processo de seed do banco de dados...");

    console.log("Deletando tabelas existentes (se houver)...");
    await sql`DROP TABLE IF EXISTS comments CASCADE`;
    await sql`DROP TABLE IF EXISTS posts CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log("Tabelas deletadas.");

    console.log("Recriando tabelas...");
    await sql`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          post_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          likes INTEGER DEFAULT 0,
          categories TEXT[] DEFAULT ARRAY[]::TEXT[],
          shares INTEGER DEFAULT 0
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          post_id INTEGER NOT NULL,
          author VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          comment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          likes INTEGER DEFAULT 0,
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
      )
    `;
    console.log("Tabelas recriadas.");

    console.log("Reiniciando sequências de ID...");
    await sql`ALTER SEQUENCE comments_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE posts_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
    console.log("Sequências reiniciadas.");

    const gerarDataAleatoria = (anosPassados = 5): Date => {
      const hoje = new Date();
      const anoInicial = hoje.getFullYear() - anosPassados;
      const anoAleatorio =
        Math.floor(Math.random() * (hoje.getFullYear() - anoInicial)) +
        anoInicial;
      const mesAleatorio = Math.floor(Math.random() * 12);
      const diaAleatorio = Math.floor(Math.random() * 28) + 1;
      return new Date(anoAleatorio, mesAleatorio, diaAleatorio);
    };

    console.log("Inserindo usuários de exemplo...");
    const usersData = [
      new Usuario(0, "Admin User", "admin@example.com", "password123"),
      new Usuario(0, "João Blogueiro", "joao@example.com", "senha456"),
      new Usuario(0, "Maria Comentadora", "maria@example.com", "abc789"),
    ];

    const insertedUsers: Usuario[] = [];
    for (const user of usersData) {
      const result = await sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.getNome()}, ${user.getEmail()}, ${user.getSenha()})
        RETURNING *
      `;
      insertedUsers.push(
        new Usuario(
          result[0].id,
          result[0].name,
          result[0].email,
          result[0].password
        )
      );
    }
    console.log(`Usuários inseridos: ${insertedUsers.length}`);

    console.log("Inserindo postagens de exemplo...");
    const postsData = [
      new Postagem(
        0,
        "A Importância da Educação",
        "A educação é a base para uma sociedade mais justa e equitativa. Ela promove o desenvolvimento individual e coletivo, permitindo que pessoas realizem seu potencial. Investir em educação é investir no futuro de todos nós.",
        gerarDataAleatoria(),
        10,
        ["Educação", "Sociedade"],
        2
      ),
      new Postagem(
        0,
        "Tecnologia e Inovação",
        "Vivemos em uma era onde a tecnologia avança a passos largos. Inovações constantes estão mudando a forma como vivemos, trabalhamos e nos comunicamos. É essencial acompanhar essas mudanças para não ficarmos para trás. A tecnologia tem o poder de transformar o mundo em que vivemos.",
        gerarDataAleatoria(),
        15,
        ["Tecnologia", "Inovação"],
        5
      ),
      new Postagem(
        0,
        "Sustentabilidade Ambiental",
        "Preservar o meio ambiente é crucial para o futuro das próximas gerações. Cada ação nossa tem um impacto, e precisamos ser conscientes das nossas escolhas. A sustentabilidade não é uma opção, mas uma necessidade urgente. Devemos agir agora para garantir um planeta habitável no futuro.",
        gerarDataAleatoria(),
        20,
        ["Meio Ambiente", "Sustentabilidade"],
        1
      ),
      new Postagem(
        0,
        "Saúde e Bem-Estar",
        "Manter o bem-estar físico e mental é essencial para uma vida equilibrada. O cuidado com a saúde deve ser uma prioridade diária. Pequenos hábitos saudáveis podem fazer uma grande diferença a longo prazo. Não negligencie seu bem-estar, ele é a chave para uma vida plena.",
        gerarDataAleatoria(),
        8,
        ["Saúde", "Bem-Estar"],
        0
      ),
      new Postagem(
        0,
        "Economia Digital",
        "A transformação digital está mudando a maneira como fazemos negócios. Empresas que não se adaptam a essa nova realidade correm o risco de ficar obsoletas. A digitalização não é apenas uma tendência, mas uma necessidade para a sobrevivência no mercado. O futuro é digital, e devemos nos preparar para ele.",
        gerarDataAleatoria(),
        12,
        ["Economia", "Digital"],
        3
      ),
      new Postagem(
        0,
        "Impacto das Redes Sociais",
        "As redes sociais têm um papel central na comunicação moderna. Elas conectam pessoas em todo o mundo, criando novas formas de interação. No entanto, também trazem desafios, como a disseminação de informações falsas. É crucial usar essas ferramentas de forma responsável e consciente.",
        gerarDataAleatoria(),
        7,
        ["Redes Sociais", "Comunicação"],
        0
      ),
      new Postagem(
        0,
        "Mobilidade Urbana",
        "Soluções de mobilidade inteligente são o futuro das grandes cidades. O crescimento populacional exige novas abordagens para o transporte urbano. A integração de tecnologia no transporte pode melhorar a qualidade de vida nas cidades. Investir em mobilidade sustentável é essencial para um futuro melhor.",
        gerarDataAleatoria(),
        9,
        ["Cidades", "Transporte"],
        1
      ),
      new Postagem(
        0,
        "Educação Financeira",
        "Gerir as finanças pessoais é fundamental para a estabilidade econômica. A educação financeira deve começar desde cedo, para evitar problemas no futuro. Entender como o dinheiro funciona é o primeiro passo para uma vida financeira saudável. Planejamento e controle são as chaves para o sucesso financeiro.",
        gerarDataAleatoria(),
        5,
        ["Finanças", "Educação"],
        0
      ),
      new Postagem(
        0,
        "Alimentação Saudável",
        "Uma dieta equilibrada é essencial para manter corpo e mente saudáveis. Os alimentos que consumimos impactam diretamente nossa saúde e bem-estar. Fazer escolhas alimentares conscientes pode prevenir doenças e melhorar a qualidade de vida. Invista em uma alimentação rica em nutrientes e pobre em alimentos processados.",
        gerarDataAleatoria(),
        11,
        ["Saúde", "Alimentação"],
        2
      ),
      new Postagem(
        0,
        "Inovações na Saúde",
        "A tecnologia está revolucionando o setor de saúde com novos tratamentos. Inovações como a telemedicina estão tornando o atendimento mais acessível. A pesquisa e o desenvolvimento em saúde estão em um ritmo acelerado, trazendo esperança para muitas doenças. O futuro da saúde está cada vez mais integrado com a tecnologia.",
        gerarDataAleatoria(),
        13,
        ["Saúde", "Inovação"],
        4
      ),
    ];

    const insertedPosts: Postagem[] = [];
    for (const post of postsData) {
      const result = await sql`
        INSERT INTO posts (title, content, post_date, likes, categories, shares)
        VALUES (
          ${post.getTitulo()},
          ${post.getConteudo()},
          ${post.getData()},
          ${post.getCurtidas()},
          ${post.getCategorias()},
          ${post.getShares()}
        )
        RETURNING *
      `;
      insertedPosts.push(
        new Postagem(
          result[0].id,
          result[0].title,
          result[0].content,
          result[0].post_date,
          result[0].likes,
          result[0].categories,
          result[0].shares
        )
      );
    }
    console.log(`Postagens inseridas: ${insertedPosts.length}`);

    if (insertedPosts.length > 0) {
      console.log("Inserindo comentários de exemplo...");
      const postId1 = insertedPosts[0].getId();
      const postId2 = insertedPosts[1].getId();

      const commentsData = [
        new Comentario(
          0,
          postId1,
          "João Silva",
          "Ótimo artigo sobre educação!",
          new Date(),
          3
        ),
        new Comentario(
          0,
          postId1,
          "Maria Oliveira",
          "Concordo plenamente, a educação é a chave.",
          new Date(Date.now() - 86400000),
          1
        ),
        new Comentario(
          0,
          postId2,
          "Carlos Souza",
          "A tecnologia realmente avança rápido, impressionante!",
          new Date(),
          5
        ),
        new Comentario(
          0,
          postId2,
          "Ana Paula",
          "Quais as próximas grandes inovações que você prevê?",
          new Date(Date.now() - 172800000),
          0
        ),
      ];

      for (const comment of commentsData) {
        await sql`
          INSERT INTO comments (post_id, author, content, comment_date, likes)
          VALUES (
            ${comment.getPostId()},
            ${comment.getAutor()},
            ${comment.getConteudo()},
            ${comment.getData()},
            ${comment.getLikes()}
          )
        `;
      }
      console.log(`Comentários inseridos: ${commentsData.length}`);
    }

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await sql.end();
  }
}

seedDatabase();
