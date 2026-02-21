import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Mulai nyuntik data dummy, awas meledak')

  // 1. Bikin Skill (Kategori Misi)
  const skillDesain = await prisma.skill.create({
    data: { name: 'Desain Grafis', iconUrl: '/icons/design.png' }
  })

  // 2. Bikin User UMKM (Pak Budi)
  const pakBudi = await prisma.user.create({
    data: {
      username: 'Kopi Pak Budi',
      email: 'budi@umkm.com',
      password: 'password123', // Ntar di aslinya harus di-hash pake bcrypt ya!
      role: 'UMKM',
      bio: 'Jual kopi susu terenak se-kabupaten.'
    }
  })

  // 3. Bikin User Siswa (Buat Tumbal Tester)
  const siswaBambang = await prisma.user.create({
    data: {
      username: 'Bambang The Killer',
      email: 'bambang@smk.com',
      password: 'password123',
      role: 'STUDENT',
      bio: 'Siap mengerjakan misi apapun demi EXP.'
    }
  })

  // 4. Bikin Quest (Misi dari Pak Budi)
  await prisma.quest.create({
    data: {
      title: 'Bikin Logo Kopi Susu Estetik',
      description: 'Tolong buatin logo buat kopi bapak, warnanya coklat senja gitu biar anak skena pada suka',
      rewardXp: 500,
      creatorId: pakBudi.id,
      categoryId: skillDesain.id,
    }
  })

  console.log(' SEEDING BERHASIL BINGIT BOSQUE! DATA UDAH MASUK!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })