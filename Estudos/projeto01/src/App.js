import './App.css';
import { Component } from 'react/cjs/react.production.min';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.loadPosts();
  }
  //Melhoria seprar em uma class
  loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([postResponse, photosResponse]);
    const postJson = await posts.json();
    const photoJson = await photos.json();
    const postAndPhotos = postJson.map((post, index) => { return { ...post, cover: photoJson[index].url } });

    this.setState({ posts: postAndPhotos });
  }

  render() {
    const { posts } = this.state;
    console.log(posts);
    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <div className='post'>
              <img src={post.cover} alt={post.title}></img>
              <div className='post-content'>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default App;

