import {defineQuery} from "groq";

export const STARTUPS_QUERY =defineQuery('*[_type==\'startup\' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match "*"+$search+"*" ]| order(_createdAt desc){\n' +
    '  _id,\n' +
    '    _createdAt,\n' +
    '    category, \n' +
    '    views, \n' +
    '    image, \n' +
    '    title, \n' +
    '    author->{\n' +
    '      image, name, id, bio\n' +
    '    },\n' +
    '    slug, \n' +
    '    description\n' +
    '}')

export const STARTUP_DETAILS_QUERY= defineQuery(`*[_type=='startup'  && _id == $id ][0]{
    _createdAt,
    category, 
    views, 
    image, 
    title, 
    author->{
      image, name, id, bio, username
    },
    slug, 
    description,
    pitch
}`)