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