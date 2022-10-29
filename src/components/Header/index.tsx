import styles from './header.module.scss';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.appHeader} id="global-app-header">
      <section className={"appWidth"}>
        <Link href="/">
          <Image className="testeimagem" src={"/Logo.png"} alt="logo" onClick={() => router.push('/')} width="238px" height="25px"/>
        </Link>      
      </section>
    </header>
  );
}
