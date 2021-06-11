import Head from 'next/head'
import Layout from '../../components/layout/layout'
import Date from '../../components/date'

import utilStyles from '../../styles/utils.module.scss'

import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Post({ postData } : {
  postData: {
    title: string;
    id: string;
    contentHtml: string;
    date: string;
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title || ''}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title || ''}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date || ''} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}