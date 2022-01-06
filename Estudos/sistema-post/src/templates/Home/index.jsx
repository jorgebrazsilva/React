import './styles.css';
import { Component } from 'react/cjs/react.production.min';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button'

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  }

  async componentDidMount() {
    await this.loadPost();
  }

  loadPost = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhotos = await this.getPosts();
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  //Melhoria separar em uma class
  getPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([postResponse, photosResponse]);
    const postJson = await posts.json();
    const photoJson = await photos.json();
    const postAndPhotos = postJson.map((post, index) => { return { ...post, cover: photoJson[index].url } });
    return postAndPhotos;
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page+ postsPerPage >= allPosts.length;
    return (
      <div>
        <h1 className='titulo-site'>Sistema de Posts</h1>
        <section className='container'>
          <Posts posts={posts} />
          <div className='button-container'>
            <Button text="Load more posts" loadMorePosts={this.loadMorePosts} disabled={noMorePosts} />
          </div>
        </section>
      </div>
    );
  }
}

