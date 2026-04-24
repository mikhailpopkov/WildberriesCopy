import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {
      username: 'alice',
    },
    create: {
      email: 'alice@prisma.io',
      hash: '123456',
      salt: '123456',
      username: 'alice',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {
      username: 'bob',
    },
    create: {
      email: 'bob@prisma.io',
      hash: '123456',
      salt: '123456',
      username: 'bob',
    },
  });

  const good1 = await prisma.good.upsert({
    where: { id: '1' },
    update: {
      name: 'good1',
    },
    create: {
      name: 'good1',
      price: 100,
      image: 'https://prisma.io/good1.png',
      user: {
        connect: {
          id: alice.id,
        },
      },
    },
  });

  const good2 = await prisma.good.upsert({
    where: { id: '2' },
    update: {
      name: 'good2',
    },
    create: {
      name: 'good2',
      price: 200,
      image: 'https://prisma.io/good2.png',
      user: {
        connect: {
          id: bob.id,
        },
      },
    },
  });

  const good3 = await prisma.good.upsert({
    where: { id: '3' },
    update: {
      name: 'good3',
    },
    create: {
      name: 'good3',
      price: 300,
      image: 'https://prisma.io/good3.png',
      user: {
        connect: {
          id: bob.id,
        },
      },
    },
  });

  const good4 = await prisma.good.upsert({
    where: { id: '4' },
    update: {
      name: 'good4',
    },
    create: {
      name: 'good4',
      price: 400,
      image: 'https://prisma.io/good4.png',
      user: {
        connect: {
          id: bob.id,
        },
      },
    },
  });

  const good5 = await prisma.good.upsert({
    where: { id: '5' },
    update: {
      name: 'good5',
    },
    create: {
      name: 'good5',
      price: 500,
      image: 'https://prisma.io/good5.png',
      user: {
        connect: {
          id: bob.id,
        },
      },
    },
  });

  const good6 = await prisma.good.upsert({
    where: { id: '6' },
    update: {
      name: 'good6',
    },
    create: {
      name: 'good6',
      price: 600,
      image: 'https://prisma.io/good6.png',
      user: {
        connect: {
          id: bob.id,
        },
      },
    },
  });

  console.log(alice, bob, good1, good2, good3, good4, good5, good6);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
