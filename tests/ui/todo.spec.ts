import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test.describe('TodoMVC – end-to-end user flows', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('adds items and shows the correct remaining count', async () => {
    await todo.addTodo('Review test plan');
    await todo.addTodo('Run regression suite');
    await todo.addTodo('Report results');

    await expect(todo.items).toHaveCount(3);
    await expect(todo.counter).toHaveText('3 items left');
  });

  test('completing an item updates the counter and the Completed filter', async () => {
    await todo.addTodo('Validate API contract');
    await todo.addTodo('Reconcile report totals');
    await todo.completeTodo(0);

    await expect(todo.counter).toHaveText('1 item left');
    await todo.showFilter('Completed');
    await expect(todo.items).toHaveCount(1);
    await expect(todo.items.first()).toHaveText('Validate API contract');
  });

  test('edge case: pressing Enter on an empty input does not create an item', async () => {
    await todo.newTodoInput.press('Enter');
    await expect(todo.items).toHaveCount(0);
  });

  test('items persist after a page reload', async ({ page }) => {
    await todo.addTodo('Persist me');
    await page.reload();
    await expect(todo.items).toHaveText(['Persist me']);
  });
});
