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
              },
              required: ['trainId', 'latitude', 'longitude', 'speed'],
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
  '/location-history': {
    get: {
      summary: 'Fetch all location history logs',
      tags: ['Location'],
      responses: {
        200: {
          description: 'A list of location history logs',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    trainId: { type: 'string' },
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                    timestamp: { type: 'string', format: 'date-time' },
                    speed: { type: 'number' },
                    direction: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                  }
                }
              }
            }
          }
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/trains': {
    post: {
      summary: 'Create a new train',
      tags: ['Train'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                trainId: {
                  type: 'string',
                  description: 'Unique ID for the train',
                  example: 'T001'
                },
                trainName: {
                  type: 'string',
                  description: 'Name of the train',
                  example: 'Udarata Menike'
                },
                routeId: {
                  type: 'string',
                  description: 'ID of the route the train follows',
                  example: 'R001'
                },
                engineNo: {
                  type: 'string',
                  description: 'Engine number of the train',
                  example: 'EN001'
                }
              },
              required: ['trainId', 'trainName', 'routeId', 'engineNo']
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Train created successfully'
        },
        500: {
          description: 'Internal server error'
        }
      }
    },
    get: {
      summary: 'Get all trains',
      tags: ['Train'],
      responses: {
        200: {
          description: 'A list of trains',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    trainId: { type: 'string' },
                    trainName: { type: 'string' },
                    routeId: { type: 'string' },
                    engineNo: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/trains/{trainId}': {
    get: {
      summary: 'Get a train by ID',
      tags: ['Train'],
      parameters: [
        {
          in: 'path',
          name: 'trainId',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'ID of the train to retrieve'
        }
      ],
      responses: {
        200: {
          description: 'Train details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  trainId: { type: 'string' },
                  trainName: { type: 'string' },
                  routeId: { type: 'string' },
                  engineNo: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Train not found'
        },
        500: {
          description: 'Internal server error'
        }
      }
    },
    put: {
      summary: 'Update a train by ID',
      tags: ['Train'],
      parameters: [
        {
          in: 'path',
          name: 'trainId',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'ID of the train to update'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                trainName: {
                  type: 'string',
                  description: 'Name of the train',
                  example: 'Podi Menike'
                },
                routeId: {
                  type: 'string',
                  description: 'ID of the route the train follows',
                  example: 'R001'
                },
                engineNo: {
                  type: 'string',
                  description: 'Engine number of the train',
                  example: 'EN001'
                }
              },
              required: ['trainName', 'routeId', 'engineNo']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Train updated successfully'
        },
        404: {
          description: 'Train not found'
        },
        500: {
          description: 'Internal server error'
        }
      }
    },
    delete: {
      summary: 'Delete a train by ID',
      tags: ['Train'],
      parameters: [
        {
          in: 'path',
          name: 'trainId',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'ID of the train to delete'
        }
      ],
      responses: {
        200: {
          description: 'Train deleted successfully'
        },
        404: {
          description: 'Train not found'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/train-history': {
    get: {
      summary: 'Fetch all train history logs',
      tags: ['Train'],
      responses: {
        200: {
          description: 'A list of train history logs',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    trainId: { type: 'string' },
                    trainName: { type: 'string' },
                    routeId: { type: 'string' },
                    engineNo: { type: 'string' },
                    operation: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                  }
                }
              }
            }
          }
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
};
