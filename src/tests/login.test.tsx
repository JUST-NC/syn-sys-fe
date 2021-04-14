import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import localforage from 'localforage';
import { holiday } from '../apis/holiday';
import { FlowStatus } from '../enum/FlowStatus';

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

test('tests for changing router', () => {
  console.log(location.pathname);
});

test('test for holiday', () => {
  holiday.get({ page: 1, page_size: 10, flow_status: FlowStatus.applied });
});
