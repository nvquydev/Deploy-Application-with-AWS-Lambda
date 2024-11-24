import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import { createAttachmentPresignedUrl } from '../../businessLogic/todos.mjs';
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('http layer');

export const handler = middy()
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )
    .handler(async(event) => {
        logger.info('Http event CreateAttachmentPresignedUrl');
        const todoId = event.pathParameters.todoId;

        const url = await createAttachmentPresignedUrl(todoId);

        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
              },
            body: JSON.stringify({
                upload: url
            })
        };
    });