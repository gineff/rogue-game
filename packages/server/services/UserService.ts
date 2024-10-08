import { Op } from 'sequelize'
import type { BaseRESTService } from '@services/BaseService'
import { User } from '@models/User'
import { Theme } from '@models/Theme'
import { UserTheme } from '@models/UserTheme'
import { sequelize } from '@db/init'

interface FindRequest {
  yandex_id?: number
  login?: string
}

interface CreateRequest {
  yandex_id: number
  login: string
  theme: string
}
interface DeleteRequest {
  yandex_id: number
}
class UserService implements BaseRESTService {
  public getAll = () => {
    return User.findAll()
  }
  public find = ({ yandex_id }: FindRequest) => {
    return User.findOne({
      where: { yandex_id },
      include: [
        {
          model: UserTheme,
          attributes: ['id', 'theme_id'],
          include: [
            {
              model: Theme,
              attributes: ['theme', 'description'],
            },
          ],
        },
      ],
    })
  }
  public create = async (data: CreateRequest) => {
    const { yandex_id, login, theme } = data
    if (theme === undefined) {
      return User.create({ yandex_id, login })
    } else {
      const transaction = await sequelize.transaction()
      try {
        const user = await User.create({ yandex_id, login }, { transaction })
        const user_theme = await Theme.findOne({
          where: {
            theme: {
              [Op.like]: `%${theme}%`,
            },
          },
        })
        if (user_theme !== null) {
          await UserTheme.create(
            { user_id: user.yandex_id, theme_id: user_theme.id },
            { transaction }
          )
        }
        return await transaction.commit()
      } catch (error) {
        return await transaction.rollback()
      }
    }
  }
  public delete = ({ yandex_id }: DeleteRequest) => {
    return User.destroy({
      where: {
        yandex_id,
      },
    })
  }
}

export { UserService }
