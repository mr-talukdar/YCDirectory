import React from 'react'
import {client} from "@/sanity/lib/client";
import {STARTUP_DETAILS_QUERY} from "@/sanity/lib/queries";
import SearchForm from "@/components/SearchForm";
import {formatDate} from "@/lib/utils";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import markdownit from 'markdown-it'

const md=markdownit();

export const experimental_ppr=true;


const Page =async  ({params}:{params: Promise<{id:string}>}) => {
    const {id}= await params;
    const data = await client.fetch(STARTUP_DETAILS_QUERY, {id})

    if(!data) return notFound();

    const parsedData=md.render(data.pitch);

    return (
        <>
            <section className={'pink_container !min-h-[230px]'}>
                <h2 className={'tag'}>{formatDate(data._createdAt)}</h2>
                <h1 className={'heading'}>{data.title}</h1>
                <p className={'sub-heading !max-w-5xl'}>{data.description}</p>
            </section>
            <section className={'section_container'}>
                <Image src={data.image} alt={data.title} height={100} width={200} className={'w-full h-auto rounded-xl'} />
                <div className={'space-y-5 mt-10 max-w-4xl mx-auto'}>
                    <div className={'flex-between gap-5'}>
                        <Link href={`/user/${data.author?.id}`} className={'flex gap-2 items-center mb-3'}>
                            <Image src={data.author?.image} alt={'avatar'} width={64} height={64} className={'rounded-full drop-shadow-lg'}/>
                            <div>
                                <p className={'text-20-medium'}>
                                    {data.author?.name}
                                </p>
                                <p className={'text-20-medium'}>
                                    @{data.author?.username}
                                </p>
                            </div>
                        </Link>
                        <p className={'category-tag'}>{data.category}</p>
                    </div>
                    <h3 className={'text-30-bold'}>
                        Pitch Details
                    </h3>
                    {parsedData ? (
                        <article className={'prose max-w-4xl font-work-sans break-all'} dangerouslySetInnerHTML={{__html: parsedData}}/>
                    )
                     : (
                         <p className={'no-result'}> No Pitch yet</p>
                        )
                    }
                </div>
                <hr className={'divider'}/>

            </section>
            {/*TODO: Editor SELECTED Startups*/}
        </>
    )
}
export default Page
