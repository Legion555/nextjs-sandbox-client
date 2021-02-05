import Head from 'next/head'

export default function Home({albums}) {
  console.log(albums)
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Hello world</title>
        <meta name="aye" content='aye' />
      </Head>
      <div className="grid grid-cols-4 gap-8 p-10">
        {albums && albums.albums.map(album => 
          <h1 key={album._id}>{album.name}</h1>
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