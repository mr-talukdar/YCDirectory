import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import {formatDate} from "@/lib/utils";

interface SearchParams {
    searchParams: Promise<{query?: string}>
}

interface StartupCardType{
    _createdAt: Date,
    views:string,
    author:{_id:number, name: string},
    _id: number,
    description:string,
    image:string,
    category:string,
    title:string,
}

export default async function Home({searchParams}: SearchParams) {
    const query = (await searchParams).query;

    const posts=[{
        _createdAt: new Date(),
        views:'55',
        author:{_id:1, name:'Rahul'},
        _id: 1,
        description:'Tired of being a chill guy',
        image:'https://scontent.fhyd7-1.fna.fbcdn.net/v/t39.30808-6/468103176_1076898184085104_2290982403133980901_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=kfGG19lggt0Q7kNvgHA8_Cn&_nc_zt=23&_nc_ht=scontent.fhyd7-1.fna&_nc_gid=A5OE4gZSSJvGLQ9rM7IUhCf&oh=00_AYDRjxGXdkQOV0wQ6rdrvpR4DrzsKRzwOaOv0A7TqX8FgA&oe=6752FD70',
        category:'meme',
        title:"Chill Guy"
    },
    ];

    return (
      <>
          <section className={'pink_container'}>
              <h2 className={'tag'}>Pitch, Vote, and grow</h2>
              <h1 className={'heading'}>Pitch Your Startup, <br/> Connect with Entrepreneurs</h1>
              <p className={'sub-heading !max-w-3xl'}> Submit Ideas, Vote on Pitches and get noticed in Competitions  </p>
              <SearchForm query={query} />
          </section>

          <section className={'section_container'}>
              <p className={'text-30-semibold'}>
                  { query ? `Search Results for ${query} ` : 'All Startups'}
              </p>
              <ul className={'mt-7 card_grid'}>
                  {posts?.length >0?(
                      posts.map((post:StartupCardType, index:number)=>(
                          <StartupCard key={post._id} post={post} />
                          ))
                  ):(
                      <p className={'no-result'}> No Startups Found</p>
                  )}
              </ul>
          </section>

      </>
  );
}
