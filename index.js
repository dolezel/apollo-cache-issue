const { ApolloServer, gql } = require("apollo-server");
const responseCachePlugin = require("apollo-server-plugin-response-cache");

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: (a, b, c, info) => {
      info.cacheControl.setCacheHint({ maxAge: 5 })
      console.log('cache miss')
      return [
        {
          title: "Harry Potter and the Chamber of Secrets" + Math.random(),
          author: "J.K. Rowling",
        },
        {
          title: "Jurassic Park" + Math.random(),
          author: "Michael Crichton",
        },
      ]
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cacheControl: {
  //   defaultMaxAge: 5,
  // },
  // cacheControl: true,
  plugins: [responseCachePlugin],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
