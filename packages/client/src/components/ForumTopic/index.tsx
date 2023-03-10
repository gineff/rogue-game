import { FC, HTMLAttributes } from 'react'
import dummyAvatarImg from '@images/king.png'
import './ForumTopic.scss'

export type ForumTopicProps = HTMLAttributes<HTMLLIElement> & {
  author: string
  avatar?: string
  title: string
  dateCreate: Date
  msgCount?: number  
  dateLastMsg?: Date
}
const ForumTopic: FC<ForumTopicProps> = ({ 
  author, 
  avatar,
  title,
  dateCreate,
  msgCount,  
  dateLastMsg,
  className: cls,
  ...attrs 
}) => {
  return (
    <li className="forum-topic__container border d-flex align-items-center justify-content-between" {...attrs}>
      <div className="forum-topic__left-block d-flex align-items-center">
        <img
          className="rounded-circle flex-2 d-inline-block border border-2 p-1 forum-topic__avatar"
          src={avatar ? avatar : dummyAvatarImg} 
        />
        <div className="forum-topic__data">
          <p className="forum-topic__title fw-bold">{title}</p>
          <p className="forum-topic__author">Автор: {author}</p>
        </div>
        <div>Собощений: {msgCount}</div>
        {dateLastMsg ? <div>Последнее: {dateLastMsg.getDate()}</div> : null}
        <div>Создан:{dateCreate.getDate()}</div>
      </div>
    </li>
  )
}

export default ForumTopic
