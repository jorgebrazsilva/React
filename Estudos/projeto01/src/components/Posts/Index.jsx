import { PostCard } from "../PostCard/Index";

export const Posts = ({ posts }) => {
    return (
        <div className="posts">
            {posts.map(post => (
                <PostCard key={post.id} post={post}></PostCard>
            ))}
        </div>
    );
}