import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      user {
        id
        name
        posts {
          id
          title
          content
          createdAt
          published
        }
      }
      isMyProfile
      bio
    }
  }
`;

export default function Profile() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { userId: id },
  });

  if (error) return <p>Error</p>;

  if (loading) return <p>Loading...</p>;

  const { profile } = data;

  console.log(profile);

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div>{profile.isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div>
        {profile.user.posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            user={profile.user.name}
            published={post.published}
            isMyProfile={profile.isMyProfile}
          />
        ))}
      </div>
    </div>
  );
}
