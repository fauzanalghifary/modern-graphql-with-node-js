import React from "react";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (error) return <p>Error</p>;

  if (loading) return <p>Loading...</p>;

  const { posts } = data;

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.createdAt}
          user={post.user.name}
        />
      ))}
    </div>
  );
}
