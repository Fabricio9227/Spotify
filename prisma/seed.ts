import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'senha123',
      isPremium: true
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'seguro456',
      isPremium: false
    }
  })

  // Artistas
  const artist1 = await prisma.artist.create({
    data: {
      name: 'Aurora Sky',
      bio: 'Uma artista de pop alternativo',
      imageUrl: 'https://example.com/artists/aurora.jpg'
    }
  })

  const artist2 = await prisma.artist.create({
    data: {
      name: 'Echo Pulse',
      bio: 'Música eletrônica com alma',
      imageUrl: 'https://example.com/artists/echo.jpg'
    }
  })

  // Álbuns
  const album1 = await prisma.album.create({
    data: {
      title: 'Reflexos do Amanhecer',
      releaseDate: new Date('2022-01-01'),
      coverUrl: 'https://example.com/albums/reflexos.jpg',
      artistId: artist1.id
    }
  })

  const album2 = await prisma.album.create({
    data: {
      title: 'Noite Digital',
      releaseDate: new Date('2023-06-15'),
      coverUrl: 'https://example.com/albums/noite.jpg',
      artistId: artist2.id
    }
  })

  // Músicas
  await prisma.song.createMany({
    data: [
      {
        title: 'Acordar',
        duration: 200,
        albumId: album1.id,
        artistId: artist1.id,
        audioUrl: 'https://example.com/songs/acordar.mp3'
      },
      {
        title: 'Vento Solar',
        duration: 180,
        albumId: album1.id,
        artistId: artist1.id,
        audioUrl: 'https://example.com/songs/vento-solar.mp3'
      },
      {
        title: 'Circuito',
        duration: 210,
        albumId: album2.id,
        artistId: artist2.id,
        audioUrl: 'https://example.com/songs/circuito.mp3'
      },
      {
        title: 'Fluxo',
        duration: 190,
        albumId: album2.id,
        artistId: artist2.id,
        audioUrl: 'https://example.com/songs/fluxo.mp3'
      }
    ]
  })

  console.log('🌱 Banco populado com sucesso!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })