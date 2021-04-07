import { login } from '../apis/login';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import localforage from 'localforage';

const LOGIN_URL = '/login';

//相当于后端响应
const server = setupServer(
  rest.post(LOGIN_URL, (req, res, ctx) => {
    return res(ctx.json({ token: 'temp_token' }));
  }),
);

//测试数据
const user_info = {
  account: '18221960512x',
  password: '12345678',
};

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  //测试前预设localStorage
  localforage.setItem('user-info', user_info).then((r) => true);
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('preparations for the action of login ', () => {
  login(LOGIN_URL, user_info);
  expect(localforage.getItem('token')).toBe('temp_token');
});

test('tests for changing router', () => {
  console.log(location.pathname);
});
