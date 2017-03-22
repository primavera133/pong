import Item from '../models/item'
import Boom from 'boom';

const getItems = (request, reply) => {
  Item.find({}, (error, items) => {
    if (error) return reply(Boom.badGateway(error))

    return reply(items)
  })
}

const addItem = (request, reply) => {
  Item.findOne({name: request.payload.name}, (error, item) => {
    if (error) return reply(Boom.badGateway(error))

    if (item) return reply(Boom.conflict('Item already exists'))

    item = new Item(request.payload)
    item.save(error => {
      if (error) return reply(Boom.badGateway(error.message))

      return reply(item)
    })
  })
}

const updateItem = (request, reply) => {
  Item.findOne({_id: request.params.id}, (error, item) => {
    if (error) return reply(Boom.badGateway(error))

    const i = Object.assign(item, request.payload)

    i.save((error, doc) => {
      if (error) return reply(Boom.badGateway(error.message))

      return reply(doc)
    })
  })
}

const deleteItem = (request, reply) => {
  Item.findOne({_id: request.params.id}, (error, item) => {
    if (error) return reply(Boom.badGateway(error))

    item.remove(error => {
      if (error) return reply(Boom.badGateway(error.message))
      return reply({id: request.params.id})
    })
  })
}

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/api/items',
      config: {
        handler: getItems,
        auth: 'session'
      }
    },

    {
      method: 'POST',
      path: '/api/items',
      config: {
        handler: addItem,
        auth: 'session'
      }
    },

    {
      method: 'PUT',
      path: '/api/items/{id}',
      config: {
        handler: updateItem,
        auth: 'session'
      }
    },

    {
      method: 'DELETE',
      path: '/api/items/{id}',
      config: {
        handler: deleteItem,
        auth: 'session'
      }
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'administrators'
}
