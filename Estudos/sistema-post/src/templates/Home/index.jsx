import './styles.css';
import { Component } from 'react/cjs/react.production.min';
import { Posts } from '../../components/Posts';

export class Home extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    const postAndPhotos = await this.loadPosts();
    this.setState({ posts: postAndPhotos });
  }
  //Melhoria seprar em uma class
  loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([postResponse, photosResponse]);
    const postJson = await posts.json();
    const photoJson = await photos.json();
    const postAndPhotos = postJson.map((post, index) => { return { ...post, cover: photoJson[index].url } });
    return postAndPhotos;

  }

  render() {
    const { posts } = this.state;
    console.log(posts);
    return (
      <div>
        <h1 className='titulo-site'>Sistema de Posts</h1>
        <section className='container'>
          <Posts posts={posts} />
        </section>
      </div>
    );
  }
}
