module.exports = {
  '/location': {
    post: {
      summary: 'Ingest location data',
      tags: ['Location'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                trainId: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                speed: { type: 'number' },
                direction: { type: 'string' },
              },
              required: ['trainId', 'latitude', 'longitude', 'speed', 'direction'],
            },
          },
        },
      },
      responses: {
        201: { description: 'Location created successfully' },
        500: { description: 'Internal server error' },
      },
    },
  },
  '/location/{trainId}': {
    get: {
      summary: 'Get current location of a train',
      tags: ['Location'],
      parameters: [
        {
          in: 'path',
          name: 'trainId',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'Success' },
        404: { description: 'Location not found' },
        500: { description: 'Internal server error' },
      },
    },
  },
  '/locations': {
    get: {
      summary: 'Get locations with optional filters',
      tags: ['Location'],
      parameters: [
        { in: 'query', name: 'trainId', schema: { type: 'string' } },
        { in: 'query', name: 'startDate', schema: { type: 'string', format: 'date' } },
        { in: 'query', name: 'endDate', schema: { type: 'string', format: 'date' } },
      ],
      responses: {
        200: { description: 'Success' },
        500: { description: 'Internal server error' },
      },
    },
  },
  '/routes/{trainId}': {
    get: {
      summary: 'Get route of a specific train within a date range',
      tags: ['Location'],
      parameters: [
        {
          in: 'path',
          name: 'trainId',
          required: true,
          schema: { type: 'string' },
        },
        { in: 'query', name: 'startDate', schema: { type: 'string', format: 'date' } },
        { in: 'query', name: 'endDate', schema: { type: 'string', format: 'date' } },
      ],
      responses: {
        200: { description: 'Success' },
        500: { description: 'Internal server error' },
      },
    },
  },
};
