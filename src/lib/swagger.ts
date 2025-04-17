// src/lib/swagger.ts
import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  return createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Restaurant Management API',
        version: '1.0.0',
        description: 'API for managing restaurants, tables, and reservations',
      },
      servers: [
        {
          url: process.env.NODE_ENV === 'production' 
            ? 'https://your-production-url.com' 
            : 'http://localhost:3000',
        },
      ],
    },
  });
};