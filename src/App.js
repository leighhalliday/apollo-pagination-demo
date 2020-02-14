import React from "react";
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import client from "./client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Repos />
    </ApolloProvider>
  );
}

const REPOS_QUERY = gql`
  query repoQuery($after: String) {
    viewer {
      repositories(first: 5, isFork: true, after: $after) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

function Repos() {
  const { data, error, loading, fetchMore } = useQuery(REPOS_QUERY, {
    variables: { after: null }
  });
  if (error) return <div>errors</div>;
  if (loading || !data) return <div>loading</div>;

  return (
    <>
      <ul>
        {data.viewer.repositories.edges.map(({ node }) => (
          <li key={node.id}>{node.name}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          const { endCursor } = data.viewer.repositories.pageInfo;

          fetchMore({
            variables: { after: endCursor },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              fetchMoreResult.viewer.repositories.edges = [
                ...prevResult.viewer.repositories.edges,
                ...fetchMoreResult.viewer.repositories.edges
              ];
              return fetchMoreResult;
            }
          });
        }}
      >
        more
      </button>
    </>
  );
}

export default App;
