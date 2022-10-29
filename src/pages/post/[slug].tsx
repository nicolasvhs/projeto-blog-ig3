
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';
import PostSpec from '../../components/Post/PostSpec';
import PrismicDOM from 'prismic-dom';
import Head from 'next/head';
import { useRouter } from 'next/router'
interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post } :PostProps) {
  const { banner, title, author, content } = post.data;
  const { first_publication_date } = post;
  const router = useRouter()

  return (
    <>
      <Head>
        <title>SpaceTravelling - { title }</title>
      </Head>
      <section className={styles.banner}>
        <img src={banner.url} alt="banner"></img>
      </section>
      <main className={styles.post}>
        {
          router.isFallback && <h2 className={styles.loading}>Carregando...</h2>
        }
        <h1>{ title }</h1>
        <PostSpec date={first_publication_date} author={author} content={content}></PostSpec>
        <section>
          {
            content.map((section, index) => {
              return (
                <div className={styles.contentBlock} key={index}>
                  <h2>{ section.heading }</h2>
                  <p>{ PrismicDOM.RichText.asText(section.body) }</p>
                </div>
              )
            })
          }
        </section>
      </main>
    </>
    
  );
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 3
  });
   
  const slugs = postsResponse.results.map(e => ({params: { slug: e.uid} }));

  return { paths: slugs, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const postResponse = await prismic.getByUID('posts', slug);

  return {
    props: {
      post: postResponse
    }
  }
};
