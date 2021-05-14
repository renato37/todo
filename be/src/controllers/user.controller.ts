import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  rejectNavigationalPropertiesInData,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {authenticate, TokenService} from '@loopback/authentication';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {genSalt, hash} from 'bcryptjs';
import {inject} from '@loopback/core';
import {
  TokenServiceBindings,
  MyUserService,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
  ) {}

  @post('/register')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: User,
  ): Promise<String> {
    const salt = await genSalt();
    const password = await hash(user.password, salt)
    user.salt = salt
    user.password = password
    return new Promise((resolve, reject) => {
      this.userRepository.create(user)
        .then(() => resolve("ok"))
        .catch(() => reject("ERROR"))
    })
  }

  @post('/login')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async post(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: User,
  ): Promise<String> {
    const findUser = await this.userRepository.findById(user.username)
    const salt = findUser.salt
    const password = await hash(user.password, salt)
    if(password != findUser.password){
      return Promise.reject("ERROR")
    }
    const token = await this.jwtService.generateToken({
      email:user.email,
      [securityId]: user.username,
      name: salt
    })
    return token;
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    return this.userRepository.findById(currentUserProfile[securityId]);
  }

  @authenticate('jwt')
  @patch('/user')
  @response(200, {
    description: 'Todo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    const findUser = await this.userRepository.findById(currentUserProfile[securityId])
    this.userRepository.delete(findUser)
    const salt = await genSalt();
    const password = await hash(user.password, salt)
    user.salt = salt
    user.password = password
    user.username=findUser.username
    user.email=findUser.email
    this.userRepository.create(user)
    //this.userRepository.delete()
    return "ok";
  }
}
