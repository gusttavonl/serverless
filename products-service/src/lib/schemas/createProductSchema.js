const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        qtd: {
          type: 'string',
        },
      },
      required: ['title', 'qtd'],
    },
  },
  required: ['body'],
};

export default schema;