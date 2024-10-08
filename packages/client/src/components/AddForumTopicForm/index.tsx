import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { addTopic } from '@store/slices/forum'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { inputData, defaultValues, ForumTopicStruct } from './constants'
import './AddForumTopicForm.scss'
import { selectForum } from '@store/selectors'
export type AddForumTopicFormProps = HTMLAttributes<HTMLDivElement>
import { Link } from 'react-router-dom'
import { LoadingStatus } from '@constants/user'

const AddForumTopicForm: FC<AddForumTopicFormProps> = ({
  className: cls,
  ...attrs
}) => {
  const [readOnly, setReadOnly] = useState(false)
  const { loadingStatus, topics } = useAppSelector(selectForum)
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ForumTopicStruct>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const dispatch = useAppDispatch()

  /** обновляем форму после добавления топика */
  useEffect(() => {
    reset({})
    setReadOnly(false)
  }, [topics])

  const formSubmit: SubmitHandler<ForumTopicStruct> = data => {
    clearErrors()
    setReadOnly(true)
    dispatch(addTopic(data))
  }

  const formControls = inputData.map((controlProps, index) => (
    <FormControl
      key={index}
      formName="forumTopicForum"
      register={register}
      errors={errors}
      readOnly={readOnly}
      controlProps={controlProps}
    />
  ))

  return (
    <div className={classNames(cls, 'add-forum-topic-form')} {...attrs}>
      <h2 className="h4 fw-light mb-4">Создание новой темы</h2>
      <Form onSubmit={handleSubmit(formSubmit)}>
        {formControls}
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <SpinnerButton
              className="me-2"
              loading={loadingStatus === LoadingStatus.Loading}>
              Создать
            </SpinnerButton>
            <Link to={'..'}>
              <Button variant="secondary">Отменить</Button>
            </Link>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumTopicForm
