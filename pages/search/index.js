import { useRouter } from 'next/router'
import Prismic from 'prismic-javascript'
import styles from './index.module.scss'
import Header from '../../components/Header'
import Head from '../../components/Head'
import { H1, Meta, H5, H3, H2, Body } from '../../components/Typography'
import Photo from '../../components/Photo'
import { Client } from '../../prismic-configuration.js'
import StoriesList from '../../components/StoriesList'

const Search = props => {
  const router = useRouter()
  const searched = []

  const data = JSON.parse(JSON.stringify(props.results)).forEach(story => {
    if (story.data.title.toLowerCase().indexOf(router.query.term) > -1) {
      searched.push({ ...story })
    }
  })

  return (
    <div className={styles.Page}>
      <Header pink />
      <div className={styles.Header}>
        <H2>Searching for</H2>
        <H1>
          {router.query.term}
        </H1>
      </div>
      <StoriesList stories={props.results} searchTerm={router.query.term} />
    </div>
  )
}

export async function getServerSideProps (ctx) {
  const req = ctx.req

  const stories = await Client(req)
    .query(Prismic.Predicates.at('document.type', 'article'), {
      pageSize: 100,
      orderings: '[my.article.released desc]',
      fetchLinks: [
        'tag.title',
        'tag.color',
        'link.display_text',
        'link.link',
        'author.name'
      ]
    })
    .then(function (response) {
      return response
    })

  return {
    props: stories
  }
}

export default Search
