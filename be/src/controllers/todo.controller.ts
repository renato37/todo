import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
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
import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { UserRepository } from '../repositories';
import { rejects } from 'assert';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @authenticate('jwt')
  @post('/todos')
  @response(200, {
    description: 'Todo model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Todo) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodo',
            exclude: ['id'],
          }),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Todo[]> {
    const user = await this.userRepository.findOne({
      where: { username: currentUserProfile[securityId] }
    })
    if (user == undefined) {
      return Promise.reject("ERROR");
    }
    else {
      todo.username = user.username;
      await this.todoRepository.create(todo);
      const todos = this.todoRepository.find({
        where: { username: user.username }
      })
      return todos;
    }
    //return this.todoRepository.create(todo);
  }

  @authenticate('jwt')
  @get('/todos')
  @response(200, {
    description: 'Array of Todo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todo, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Todo[]> {
    const userId = currentUserProfile[securityId];
    const todos = this.todoRepository.find({
      where: { username: userId }
    })
    return todos;
  }

  @authenticate('jwt')
  @patch('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Todo,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Todo[]> {
    const userId = currentUserProfile[securityId];
    const findTodo = await this.todoRepository.findOne({
      where: { id: todo.id, username: userId }
    })
    if (findTodo == undefined) {
      return Promise.reject("ERROR");
    }
    todo.username = userId
    await this.todoRepository.updateById(id, todo);
    const todos = this.todoRepository.find({
      where: { username: userId }
    })
    return todos
  }
  @authenticate('jwt')
  @del('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo DELETE success',
      },
    },
  })
  async deleteById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') 
    id: number
    ): Promise<Todo[]> {
    const userId = currentUserProfile[securityId];
    const findTodo = await this.todoRepository.findOne({
      where: { id: id, username: userId }
    })
    if (findTodo == undefined) {
      return Promise.reject("ERROR");
    }
    await this.todoRepository.deleteById(id)
    const todos = this.todoRepository.find({
      where: { username: userId }
    })

    return todos;
  }
}