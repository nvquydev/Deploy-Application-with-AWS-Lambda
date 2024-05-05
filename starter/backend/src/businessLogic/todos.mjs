import { createLogger } from '../utils/logger.mjs';
import { TodosAccess } from '../dataLayer/todos.mjs';
import { uuid } from 'uuidv4';
import { AttachmentS3 } from '../utils/s3Attachment.mjs';

const logger = createLogger('businessLogic');

const todosAccess = new TodosAccess();
const attachmentS3 = new AttachmentS3();

// get todo items
export async function getTodos(userId) {
    logger.info('getTodos Buzz event ');

    return todosAccess.getTodos(userId);
}

// create todo item  
export async function createTodo(newTodo, userId) {
    logger.info('createTodo Buzz event');

    const todoId = uuid();
    const createdAt = new Date().toISOString();
    const attachmentUrl = attachmentS3.buildAttachmentUrl(todoId);
    const newtodo = {
        userId,
        todoId,
        createdAt,
        done: false,
        attachmentUrl: attachmentUrl,
        ...newTodo
    };

    return await todosAccess.createTodo(newtodo);
}

// update todo item
export async function updateTodo(userId, todoId, todoUpdate) {
    logger.info('updateTodo Buzz event');

    return await todosAccess.updateTodo(userId, todoId, todoUpdate);
}

// delete todo item 
export async function deleteTodo(todoId, userId) {
    logger.info('deleteTodo Buzz event');

    return await todosAccess.deleteTodo(todoId, userId);
}

// generate upload url 
export async function createAttachmentPresignedUrl(todoId) {
    logger.info('createAttachmentPresignedUrl Buzz event');

    return await attachmentS3.getUploadUrl(todoId);
}