import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";

interface SearchParams {
    searchParams: Promise<{query?: string}>
}



export default async function Home({searchParams}: SearchParams) {
    const query = (await searchParams).query;
    const params={search: query || null}
    const {data: posts} = await sanityFetch({query:STARTUPS_QUERY, params});


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
                      posts.map((post:StartupTypeCard, index:number)=>(
                          <StartupCard key={post._id} post={post} />
                          ))
                  ):(
                      <p className={'no-result'}> No Startups Found</p>
                  )}
              </ul>
          </section>
        <SanityLive/>
      </>
  );
}
