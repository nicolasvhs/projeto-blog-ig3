import styles from './styles.module.scss';
import { FiCalendar } from 'react-icons/fi';
import { FiUser, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import PrismicDOM from 'prismic-dom';

export default function PostSpec({ date , author, content}) {
  let wordsCount = 0;
  if(content){
    wordsCount = content.map(sec => {
      return PrismicDOM.RichText.asText(sec.body).trim().split(/\s+/).length;
    }).reduce((count,total) => {
      return total + count;
    }, 0);
  }
  const minutes = content ? Math.ceil(wordsCount / 200) : undefined;
  
  return (
    <div className={styles.postSpec}>
        <span>
            <FiCalendar />
            <p>{ format( new Date(date), 'd MMM yyyy', { locale: ptBR }) }</p>
        </span>
        <span>
            <FiUser />
            <p>{ author }</p>
        </span>
        { content &&
            <span>
              <FiClock />
              <p>{ minutes } min</p>
            </span>
        }
    </div>
  );
}
