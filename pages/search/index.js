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

  const data = props.results.filter(story =>
    story.data.title.toLowerCase().includes(router.query.term)
  )

  return (
    <div className={styles.Page}>
      <Header pink />
      <div className={styles.Header}>
        <H2>Search Term</H2>
        <H1>
          {router.query.term}
        </H1>
      </div>
      <StoriesList stories={data} />
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
      // response is the response object, response.results holds the documents
    })

  return {
    props: stories
  }
}

export default Search
