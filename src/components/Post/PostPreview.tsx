import PostSpec from './PostSpec';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PostPreview({ post }) {
    const { title, subtitle, author } = post.data;
    const { first_publication_date, slugs } = post;

    const router = useRouter();

    function openPost() {
        // router.push('/post/' + post.uid);
    }

    return (
        <Link href={'/post/' + post.uid}>
            <div className={styles.postPreview} >
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <PostSpec date={first_publication_date} author={author} ></PostSpec>
            </div>
        </Link>
    );
}
