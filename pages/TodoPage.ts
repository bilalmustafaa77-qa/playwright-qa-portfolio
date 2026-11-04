import { type Page, type Locator } from '@playwright/test';

/** Page object for the public Playwright TodoMVC demo app. */
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly items: Locator;
  readonly counter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
    this.counter = page.getByTestId('todo-count');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async completeTodo(index: number): Promise<void> {
    await this.items.nth(index).getByRole('checkbox').check();
  }

  async showFilter(name: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.page.getByRole('link', { name }).click();
  }
}
