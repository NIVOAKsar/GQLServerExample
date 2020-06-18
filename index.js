const { ApolloServer, gql } = require('apollo-server');


let currId = 3


const books = [
    {
        id: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        id: 2,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
 
type Book {
  id: Int
  title: String
  author: String
}

type Query {
  books: [Book]
}

type Mutation {
  addBook(title: String, author: String): Book
}
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: (parent, args, context, info) => {
            console.log(args)
            return books
        },
    },
    Mutation: {
        addBook: (root, args, context) => {
            const id = currId
            const title = args.title
            const author = args.author
            const book = { id, title, author }
            books.push(book)
            currId++
            return book
        }
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // playground: true,
    // introspection: true
});

// The `listen` method launches a web server.
server.listen().then(async ({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});