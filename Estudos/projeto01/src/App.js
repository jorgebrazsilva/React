import './App.css';
import { Component } from 'react/cjs/react.production.min';
import { Posts } from './components/Posts/Index';

class App extends Component {
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
      <section className='container'>
        <Posts posts={posts} />
      </section>
    );
  }
}
export default App;

