import Head from 'next/head'
import Link from 'next/link'

export default function Home({albums}) {
  console.log(albums)
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Hello world</title>
        <meta name="aye" content='aye' />
      </Head>
      <div className="grid grid-cols-4 gap-8 p-10">
        {albums.albums.map(album => 
        <Link href="/album/[id]" key={album._id} as={`/album/${album._id}`} >
          <h1>{album.name}</h1>
        </Link>
          
        )}
      </div>
      
    </div>
  )
}

export async function getServerSideProps(context) {
  let res;
  if (process.env.NODE_ENV === 'development') {
      res = await fetch(`http://localhost:3333/api/users/?email=legion@gmail.com`)
    } else {
      res = await fetch(`https://nextjs-sandbox-server.herokuapp.com/api/users/?email=legion@gmail.com`)
    }
  const albums = await res.json()

  if (!albums) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      albums
    }
  }
}


// export const getStaticProps = async () => {
//   let res;
//   if (process.env.NODE_ENV === 'development') {
//     res = await fetch(`http://localhost:3333/api/users/?email=legion@gmail.com`)
//   } else {
//     res = await fetch(`https://nextjs-sandbox-server.herokuapp.com/api/users/?email=legion@gmail.com`)
//   }
//   const albums = await res.json()

//   return {
//     props: {
//       albums
//     }
//   }
// }