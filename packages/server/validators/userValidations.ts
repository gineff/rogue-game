import type { Theme } from '@models/Theme'
import type { User } from '@models/User'
import type { BodyValidatorRules } from '@validators/bodyValidator'
import type { ParamsValidatorRules } from '@validators/paramsValidator'

export const findUserValidations: ParamsValidatorRules = [
  {
    key: 'id',
    validator: value => isNaN(Number(value)),
    required: true,
  },
]

export const createUserValidations: BodyValidatorRules<
  User & { theme?: string }
> = [
  {
    key: 'yandex_id',
    validator: value => typeof value !== 'number',
    required: true,
  },
  {
    key: 'login',
    validator: value => typeof value !== 'string',
    required: true,
  },
  {
    key: 'theme',
    validator: value => typeof value !== 'string',
    required: false,
  },
]

export const deleteUserValidations: BodyValidatorRules<User> = [
  {
    key: 'yandex_id',
    validator: value => typeof value !== 'number',
    required: true,
  },
  {
    key: 'login',
    validator: value => typeof value !== 'string',
    required: false,
  },
]

export const setUserThemeValidations: BodyValidatorRules<Theme> = [
  {
    key: 'id',
    validator: value => typeof value !== 'number',
    required: true,
  },
]
