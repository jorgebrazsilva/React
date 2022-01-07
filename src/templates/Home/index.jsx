import './styles.css';
import { useEffect, useState, useCallback } from 'react';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'


export const Home = () => {

  // const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 10,
  //   searchValue: '',
  // }

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  }) : posts;

  //Melhoria separar em uma class
  const getPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([postResponse, photosResponse]);
    const postJson = await posts.json();
    const photoJson = await photos.json();
    const postAndPhotos = postJson.map((post, index) => { return { ...post, cover: photoJson[index].url } });
    return postAndPhotos;
  }

  const handleLoadPost = useCallback(async (page, postsPerPage) => {
    const postAndPhotos = await getPosts();
    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts(postAndPhotos);
  },[]);


  useEffect(() => {
    handleLoadPost(0, postsPerPage);
  }, [handleLoadPost, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }


  return (
    <div>
      <h1 className='titulo-site'>Sistema de Posts</h1>
      <section className='container'>

        <div className='search-container'>
          {!!searchValue && <h1> Search Value: {searchValue}</h1>}
          <TextInput searchValue={searchValue} handleChange={handleChange} />
        </div>

        {
          filteredPosts.length === 0 ? <p>Não existe posts!!!</p> : <Posts posts={filteredPosts} />
        }


        <div className='button-container'>
          {!searchValue &&
            <Button text="Load more posts" loadMorePosts={loadMorePosts} disabled={noMorePosts} />
          }
        </div>
      </section>
    </div>
  );
}



// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: '',
//   }

//   async componentDidMount() {
//     await this.loadPost();
//   }

//   loadPost = async () => {
//     const { page, postsPerPage } = this.state;
//     const postAndPhotos = await this.getPosts();
//     this.setState({
//       posts: postAndPhotos.slice(page, postsPerPage),
//       allPosts: postAndPhotos
//     });
//   }

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   }

//   //Melhoria separar em uma class
//   getPosts = async () => {
//     const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
//     const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
//     const [posts, photos] = await Promise.all([postResponse, photosResponse]);
//     const postJson = await posts.json();
//     const photoJson = await photos.json();
//     const postAndPhotos = postJson.map((post, index) => { return { ...post, cover: photoJson[index].url } });
//     return postAndPhotos;
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;
//     const filteredPosts = !!searchValue ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
//     }) : posts;
//     return (
//       <div>
//         <h1 className='titulo-site'>Sistema de Posts</h1>
//         <section className='container'>

//           <div className='search-container'>
//             {!!searchValue && <h1> Search Value: {searchValue}</h1>}
//             <TextInput searchValue={searchValue} handleChange={this.handleChange} />
//           </div>

//           {
//             filteredPosts.length === 0 ? <p>Não existe posts!!!</p> : <Posts posts={filteredPosts} />
//           }


//           <div className='button-container'>
//             {!searchValue &&
//               <Button text="Load more posts" loadMorePosts={this.loadMorePosts} disabled={noMorePosts} />
//             }
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

