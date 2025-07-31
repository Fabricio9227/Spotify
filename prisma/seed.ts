import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "João",
      email: "joao@email.com",
      password: "senha123",
      isPremium: true,
    },
    {
      name: "Ana",
      email: "ana@email.com",
      password: "123senha",
      isPremium: false,
    },
  ];

  const artists = [
    {
      name: "Aurora Beats",
      bio: "Som etéreo e imersivo.",
      imageUrl: "https://utfs.io/f/aurora.jpg",
    },
    {
      name: "Urban Flow",
      bio: "O melhor do hip hop urbano.",
      imageUrl: "https://utfs.io/f/urban.jpg",
    },
  ];

  const albums = [
    {
      title: "Ecos de Luz",
      artistIndex: 0,
      releaseDate: new Date("2023-06-01"),
      coverUrl: "https://utfs.io/f/ecos.jpg",
    },
    {
      title: "Ritmo da Rua",
      artistIndex: 1,
      releaseDate: new Date("2022-09-15"),
      coverUrl: "https://utfs.io/f/ritmo.jpg",
    },
  ];

  const songs = [
    {
      title: "Nascer do Sol",
      duration: 210,
      artistIndex: 0,
      albumIndex: 0,
      audioUrl: "https://utfs.io/f/sol.mp3",
    },
    {
      title: "Neon Dreams",
      duration: 198,
      artistIndex: 0,
      albumIndex: 0,
      audioUrl: "https://utfs.io/f/neon.mp3",
    },
    {
      title: "Batalha Final",
      duration: 250,
      artistIndex: 1,
      albumIndex: 1,
      audioUrl: "https://utfs.io/f/batalha.mp3",
    },
  ];

  // Cria usuários
  for (const user of users) {
    await prisma.user.create({ data: { ...user, createdAt: new Date() } });
  }

  // Cria artistas
  const createdArtists = [];
  for (const artist of artists) {
    const created = await prisma.artist.create({ data: artist });
    createdArtists.push(created);
  }

  // Cria álbuns
  const createdAlbums = [];
  for (const album of albums) {
    const created = await prisma.album.create({
      data: {
        title: album.title,
        releaseDate: album.releaseDate,
        coverUrl: album.coverUrl,
        artistId: createdArtists[album.artistIndex].id,
      },
    });
    createdAlbums.push(created);
  }

  // Cria músicas
  for (const song of songs) {
    await prisma.song.create({
      data: {
        title: song.title,
        duration: song.duration,
        audioUrl: song.audioUrl,
        artistId: createdArtists[song.artistIndex].id,
        albumId: createdAlbums[song.albumIndex].id,
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
