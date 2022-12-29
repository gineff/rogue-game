import { useState, createRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { formUserErrorHandler } from '../../utils/errors_handling'
import { updatePassword, updateProfile } from '../../services/userController'
import ProfileAvatar from '../../components/ProfileAvatar'
import ProfileForm from '../../components/ProfileForm'
import ConfirmPassword from '../../components/ConfirmPassword'
import './index.css'

type ProfileProps = {
  user: UserDTO | undefined
}

const Profile = ({ user }: ProfileProps) => {
  const [readOnly, setReadOnly] = useState(true)
  const [modalOptions, setModalOptions] = useState({})
  const [submitError, setSubmitError] = useState('')
  const refForm = createRef()

  const saveChanges = async () => {
    const form = refForm.current as HTMLFormElement

    const formData = Object.fromEntries(new FormData(form).entries())
    const { password: newPassword } = formData
    delete formData.password

    if (newPassword) {
      const promise = new Promise(res => {
        setModalOptions({ res, newPassword })
      })

      const passwords = (await promise) as PasswordData | null
      setModalOptions({})

      if (passwords) {
        await updatePassword(passwords)
      }
    }
    await updateProfile(formData)
      .catch(error => formUserErrorHandler(error, setSubmitError))
  }

  const handleButtonClick = async () => {
    if (!readOnly) {
      await saveChanges()
    }
    setReadOnly(!readOnly)
  }

  return (
    <div className="user-profile">
      <Container fluid="sm">
        <Form className="user-profile__form mt-5" ref={refForm as any}>
          <Row>
            <Col sm={4} className="px-0">
              <ProfileAvatar avatar={user?.avatar} />
            </Col>
            <Col sm={8} className="py-4 user-profile__form-wrapper">
              {submitError ? (
                <p className="text-danger mb-3">{submitError}</p>
              ) : (
                ''
              )}

              <ProfileForm user={user} readOnly={readOnly} />

              <Button variant="dark" onClick={handleButtonClick}>
                {readOnly ? 'Изменить данные профиля' : 'Сохранить'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      {Object.keys(modalOptions).length !== 0 ? (
        <ConfirmPassword options={modalOptions} />
      ) : null}
    </div>
  )
}

export default Profile
