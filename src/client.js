import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: "bearer 5e6a3bcafbc11273c57e075f224f773bb75bd832"
  }
});

export default client;
