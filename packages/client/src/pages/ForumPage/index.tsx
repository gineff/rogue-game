import AddForumTopicForm from '@components/AddForumTopicForm'
import AppDefaultTpl from '@components/AppDefaultTpl'
import ForumTopicsList from '@components/ForumTopicsList'
import './ForumPage.scss'
import { authorizedPageAccessOpts, LoggedInCheck } from 'hoc/LoggedInCheck'

function ForumPage() {
  return (
    <AppDefaultTpl className="forum-page">
      <h1 className="h3 mb-4">Игровой форум</h1>
      <AddForumTopicForm />
      <ForumTopicsList />
    </AppDefaultTpl>
  )
}

export default LoggedInCheck(authorizedPageAccessOpts)(ForumPage)
