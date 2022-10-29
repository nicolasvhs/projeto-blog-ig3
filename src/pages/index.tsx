import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Head from "next/head";

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import PostPreview from '../components/Post/PostPreview';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination } :HomeProps) {

  const [postList, setPostList] = useState(postsPagination.results);
  const [nextPageURL, setNextPageURL] = useState(postsPagination.next_page);

  async function loadMore(){
    const data = await fetch(nextPageURL);
    const nextPage = await data.json();

    setNextPageURL(nextPage.next_page);
    setPostList([...postList,...nextPage.results ]);
  }

  return (
    <div className="root">
      <Head>
        <title>SpaceTravelling - Home</title>
      </Head>
      <main>
      {
        postList.map((post,index) => {
          return <PostPreview post={post} key={index}></PostPreview>
        })
      }
      { nextPageURL && <span className={styles.loadMore} onClick={loadMore}>Carregar mais posts</span>}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 3
  });

  return {
    props: {
      postsPagination: postsResponse
    }
  }
};